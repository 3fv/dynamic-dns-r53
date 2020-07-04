# Installation

> `npm install -g @3fv/dynamic-dns-r53`
or
> `yarn add global @3fv/dynamic-dns-r53`

# Example

The following will `UPSERT` an `A` DNS record named `office`
in the `Route53` domain identified by zone id `Z38974KCMD0AO6`
and will run forever updating on change.

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

```bash
 dynamic-dns-r53 -v -a office -z Z38974KCMD0AO6 -p 3fv -d
```

# Options

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



# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node.

### Additional Details
 * Last updated: Wed, 24 Jun 2020 08:56:20 GMT
 * Dependencies: none
 * Global values: `Buffer`, `Symbol`, `__dirname`, `__filename`, `clearImmediate`, `clearInterval`, `clearTimeout`, `console`, `exports`, `global`, `module`, `process`, `queueMicrotask`, `require`, `setImmediate`, `setInterval`, `setTimeout`

# Credits
These definitions were written by [Microsoft TypeScript](https://github.com/Microsoft), [DefinitelyTyped](https://github.com/DefinitelyTyped), [Alberto Schiabel](https://github.com/jkomyno), [Alexander T.](https://github.com/a-tarasyuk), [Alvis HT Tang](https://github.com/alvis), [Andrew Makarov](https://github.com/r3nya), [Benjamin Toueg](https://github.com/btoueg), [Bruno Scheufler](https://github.com/brunoscheufler), [Chigozirim C.](https://github.com/smac89), [David Junger](https://github.com/touffy), [Deividas Bakanas](https://github.com/DeividasBakanas), [Eugene Y. Q. Shen](https://github.com/eyqs), [Flarna](https://github.com/Flarna), [Hannes Magnusson](https://github.com/Hannes-Magnusson-CK), [Hoàng Văn Khải](https://github.com/KSXGitHub), [Huw](https://github.com/hoo29), [Kelvin Jin](https://github.com/kjin), [Klaus Meinhardt](https://github.com/ajafff), [Lishude](https://github.com/islishude), [Mariusz Wiktorczyk](https://github.com/mwiktorczyk), [Mohsen Azimi](https://github.com/mohsen1), [Nicolas Even](https://github.com/n-e), [Nicolas Voigt](https://github.com/octo-sniffle), [Nikita Galkin](https://github.com/galkin), [Parambir Singh](https://github.com/parambirs), [Sebastian Silbermann](https://github.com/eps1lon), [Simon Schick](https://github.com/SimonSchick), [Thomas den Hollander](https://github.com/ThomasdenH), [Wilco Bakker](https://github.com/WilcoBakker), [wwwy3y3](https://github.com/wwwy3y3), [Samuel Ainsworth](https://github.com/samuela), [Kyle Uehlein](https://github.com/kuehlein), [Jordi Oliveras Rovira](https://github.com/j-oliveras), [Thanik Bhongbhibhat](https://github.com/bhongy), [Marcin Kopacz](https://github.com/chyzwar), [Trivikram Kamat](https://github.com/trivikr), [Minh Son Nguyen](https://github.com/nguymin4), [Junxiao Shi](https://github.com/yoursunny), [Ilia Baryshnikov](https://github.com/qwelias), [ExE Boss](https://github.com/ExE-Boss), [Surasak Chaisurin](https://github.com/Ryan-Willpower), [Piotr Błażejewicz](https://github.com/peterblazejewicz), [Anna Henningsen](https://github.com/addaleax), and [Jason Kwok](https://github.com/JasonHK).
