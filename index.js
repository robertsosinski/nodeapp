const http = require("http");

const port = 8080;

const {Pool} = require("pg");

const pool = new Pool({
  host: process.env.APP_DBHOST,
  user: process.env.APP_DBUSER,
  port: process.env.APP_DBPORT,
  database: process.env.APP_DBNAME,
  password: process.env.APP_DBPASS
});

pool.connect();

const server = http.createServer(async (req, res) => {
  console.log(`${new Date()}: ${req.method}: ${req.url}`);

  let dbres = await pool.query("SELECT version()::text as version, now()::text as timestamp", []);
  let version = dbres.rows[0].version;
  let timestamp = dbres.rows[0].timestamp;
  
  console.log(timestamp, version);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`REQ_URL: ${req.url}\nNODE_ENV: ${process.env.NODE_ENV}\nAPP_DBHOST: ${process.env.APP_DBHOST}\nDB_VERSION: ${version}\nDB_TIMESTAMP: ${timestamp}`);
});

server.listen(port);