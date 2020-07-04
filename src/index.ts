#!/usr/bin/env node

import * as AWS from "aws-sdk"
import IP from "public-ip"
import {getLogger, setLoggingProvider, Level, ILogger} from "@3fv/logger-proxy"
import logConfigure from "@3fv/logger"
import {memoize} from "lodash"
import {ConsoleAppender} from "@3fv/logger/appenders/console/ConsoleAppender"
import Yargs from "yargs"
import * as Path from 'path'
import * as Fs from 'fs'

const
  //log = getLogger(__filename),
  pkgJson = require(Path.resolve(__dirname, "package.json")),
  name = pkgJson.name.split("/").pop()

let
  level = Level.info,
  log:ILogger = null,
  debug:ILogger["debug"],
  info:ILogger["info"],
  warn:ILogger["warn"],
  error:ILogger["error"]

function setupLogger(level:Level) {
  const factory = logConfigure()
    .appenders([
      new ConsoleAppender({
        level
      })
    ])
    .rootLevel(level)
    .getFactory()
  
  setLoggingProvider(factory.getLogger)
  log = getLogger(name)
  
  debug = log.debug
  info = log.info
  warn = log.warn
  error = log.error
  
}

setupLogger(level)

const
  argv = Yargs
    .scriptName(name)
    .usage("$0 [args]")
    .option("verbose", {
      type: "boolean",
      default: false,
      desc: "Set log level to `debug`"
    })
    //
    .option("zoneId", {
      type: "string",
      demand: true,
      desc: "Route53 Zone ID.  An example is Z38974KCMD0AO6 (a 3fv example from AWS console)",
      alias: ["z"]
    })
    .option("aRecordName", {
      desc: "Name of A record to create or update",
      demand: true,
      type: "string",
      alias: ["a"]
    })
    .option("awsRegion", {
      desc: "AWS Region",
      demand: false,
      default: process.env.AWS_DEFAULT_REGION || "us-east-1",
      type: "string",
      alias: ["r"]
    })
    .option("awsProfile", {
      desc: "AWS Profile to use for creds",
      demand: false,
      default: null,
      type: "string",
      alias: ["p"]
    })
    .option("daemon", {
      desc: "Run forever and update when IP changes",
      
      default: false,
      type: "boolean",
      alias: ["d"]
    })
    .help()
    .argv,
  {daemon, aRecordName, zoneId, awsRegion: region, verbose, awsProfile} = argv

if (verbose) {
  setupLogger(Level.debug)
  debug("verbose enabled")
}

async function run() {
  info("Starting IP setup")
  
  //AWS
  debug("Configuring AWS with profile", awsProfile, "if null or undefined then using env vars")
  AWS.config.update({
    region,
    ...(awsProfile ? {
      credentials: new AWS.SharedIniFileCredentials({profile: awsProfile})
    } : {
      credentials: new AWS.EnvironmentCredentials("AWS_")
    })
  })
  
  const
    R53 = new AWS.Route53(),
    domain = (await R53.getHostedZone({
      Id: zoneId
    }).promise()).HostedZone.Name,
    fqdn = `${aRecordName}.${domain}`
  
  info(`Using FQDN: ${fqdn}`)
  
  let lastIp:string = null
  
  while (true) {
    try {
      info("Getting IP Address")
      const ip = await IP.v4()
      
      info("Your IP is ", ip)
      if (lastIp === ip) {
        debug("IP has not changed, no update needed")
      } else {
        lastIp = ip
        
        await R53.changeResourceRecordSets({
          HostedZoneId: zoneId,
          ChangeBatch: {
            Changes: [
              {
                Action: "UPSERT",
                ResourceRecordSet: {
                  Name: fqdn,
                  Type: "A",
                  TTL: 60,
                  ResourceRecords: [
                    {
                      Value: ip
                    }
                  ]
                }
              }
            ]
          }
        }).promise()
        info("Update completed")
      }
      
    } catch (err) {
      error("Failed to update", err)
      if (!daemon) {
        process.exit(-1)
      }
    }
    
    if (daemon) {
      debug("Waiting 60s to run again")
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 60000)
      })
    } else {
      break
    }
  }
}

export default run()
  .catch(log.error)