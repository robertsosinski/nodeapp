const http = require("http");

const hostname = "127.0.0.1";
const port = 8080;

const {Client} = require("pg");

const client = new Client({
  host: process.env.APP_DBHOST,
  user: process.env.APP_DBUSER,
  port: process.env.APP_DBPORT,
  database: process.env.APP_DBNAME,
  password: process.env.APP_DBPASS
});
client.connect();

const server = http.createServer((req, res) => {
  console.log(`${new Date()}: ${req.method}: ${req.url}`);

  client.query("SELECT version()::text as version", [], (err, dbres) => {
    console.log(err ? err.stack : dbres.rows[0].version); // Hello World!
    client.end();

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(`NODE_ENV: ${process.env.NODE_ENV}\nAPP_DBHOST: ${process.env.APP_DBHOST}\nDB_VERSION: ${dbres.rows[0].version}`);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});