Starting
--------

Set environmental variables
* `NODE_ENV=production`
* `APP_DBHOST=<path to postgresql database server>`
* `APP_DBPORT=5432`
* `APP_DBNAME=<database name, e.g. nodeapp_production>`
* `APP_DBUSER=<postgres role, e.g. nodeapp>`
* `APP_DBPASS=<database password>`


Run
* `node index.js`

Example Run via Docker
`docker run -e "NODE_ENV=production" -e "APP_DBHOST=docker.for.win.localhost" -e "APP_DBPORT=5432" -e "APP_DBNAME=nodeapp_production" -e "APP_DBUSER=nodeapp" -e "APP_DBPASS=<database password>" -p 8080:8080 nodeapp:latest`