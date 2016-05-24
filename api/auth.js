var uuid = require('uuid');
var PG_PASSWORD = process.env.PG_PASSWORD;
var PG_USER = process.env.PG_USER;
var PG_URL = process.env.PG_URL;
var PG_PORT = process.env.PG_PORT;
var PG_DATABASE = process.env.PG_DATABASE;




var pg = require('pg');
var conString = "postgres://"+PG_USER+":"+PG_PASSWORD+"@"+PG_URL+":"+PG_PORT+"/"+PG_DATABASE"";