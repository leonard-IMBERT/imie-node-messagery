var PG_PASSWORD = process.env.PG_PASSWORD;
var PG_USER = process.env.PG_USER;
var PG_URL = process.env.PG_URL;
var PG_PORT = process.env.PG_PORT;
var PG_DATABASE = process.env.PG_DATABASE;
var API_PORT = process.env.API_PORT;

if(
  (PG_URL === undefined ||
  (PG_PASSWORD === undefined &&
  PG_USER === undefined &&
  PG_PORT === undefined &&
  PG_DATABASE === undefined)) &&
  API_PORT === undefined
) {
  console.error(process.env);
  throw 'Cannot retrieve environement variables';
}

var CONNECTION_URL = PG_URL || "postgres://" + PG_USER + ":" + PG_PASSWORD + "@" + PG_URL + ":" + PG_PORT + "/" + PG_DATABASE"";

module.exports = {
  PG_PASSWORD,
  PG_USER,
  PG_URL,
  PG_PORT,
  PG_DATABASE,
  CONNECTION_URL,
  API_PORT
}
