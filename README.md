# Dynamic DNS with Route 53

## Installation

> `npm install -g @3fv/dynamic-dns-r53`
or
> `yarn add global @3fv/dynamic-dns-r53`

## Run in Foreground or as a Service

The following will `UPSERT` an `A` DNS record named `office`
in the `Route53` domain identified by zone id `Z38974KCMD0AO6`
and will run forever updating on change.

```bash
 
# Run in foreground
dynamic-dns-r53 -v -a office -z Z38974KCMD0AO6 -p 3fv -d

# Once you know it works, use PM2 to run as a service
npm i -g pm2

# Configure PM2 to run at boot
pm2 startup

# Create the service
pm2 start --name dynamic-dns-r53 dynamic-dns-r53 -- \
  -v -a office -z Z38974KCMD0AO6 -p 3fv -d
```

Assuming a change is detected, you will see output like this:

```log
 15:28:28 [INFO] (dynamic-dns-r53) Starting IP setup  
 15:28:28 [INFO] (dynamic-dns-r53) Using FQDN: office.3form.ventures.  
 15:28:28 [INFO] (dynamic-dns-r53) Getting IP Address  
 15:28:28 [INFO] (dynamic-dns-r53) Your IP is  '173.68.74.234'  173.68.74.234
 15:28:28 [INFO] (dynamic-dns-r53) Update completed  
```

Remember, you likely still need to configure your router for
port mapping, etc.



## Options

All the command line options for the tool

```bash
Options:
  --version          Show version number                               [boolean]
  --verbose          Set log level to `debug`         [boolean] [default: false]
  --zoneId, -z       Route53 Zone ID.  
                     An example is Z38974KCMD0AO6            [string] [required]
  --aRecordName, -a  Name of A record to create or update    [string] [required]
  --awsRegion, -r    AWS Region                  [string] [default: "us-east-1"]
  --awsProfile, -p   AWS Profile to use for creds       [string] [default: null]
  --daemon, -d       Run forever and update when IP changes
                                                      [boolean] [default: false]
  --help             Show help                                         [boolean]

```

# Credits

[@jglanz](https://github.com/jglanz) Jonathan Glanz
