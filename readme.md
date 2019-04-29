### Tech Stack
 * Bootstrap:4.2.1
 * EJS


### Commands to remember:

Navigate to dir:
 ```bash
 cd /area51/Experiments
```

Execute sql db file:
 ```bash
 psql -a -f 'db/seedscripts/v1.0/2 updates.sql'
```
 To stop running instance:
 ```bash
 pm2 stop 0
```
 To start new instance:
 ```bash
 pm2 start
```
 To look at the stats
```bash
 pm2 status 0
```
 Detailed stats:
 ```bash
 pm2 monit 0
 ```