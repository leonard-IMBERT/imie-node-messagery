var uuid = require('uuid');
var PG_PASSWORD = process.env.PG_PASSWORD;
var PG_USER = process.env.PG_USER;
var PG_URL = process.env.PG_URL;
var PG_PORT = process.env.PG_PORT;
var PG_DATABASE = process.env.PG_DATABASE;




var pg = require('pg');
var conString = "postgres://"+PG_USER+":"+PG_PASSWORD+"@"+PG_URL+":"+PG_PORT+"/"+PG_DATABASE"";

function getMessages(timestamp){

  pg.connect(conString, function(err, client, done){
    if(err){
      return console.error('desole probleme', err);
    };

    client.query("SELECT * FROM me_message WHERE timestamp < '"+json.timestamp+"' ORDER BY timestamp ASC", function(err, result){

      done();

      if(err){
        return console.error('erreur pendant l\'execution de la requete', err);
      };
      console.log(result.row.);
    });
  });
};

function insertMsg(message){


  var uuid_message = uuid.v4();

  pg.connect(conString, function(err, client, done) {

    if(err) {
      return console.error('desole probleme', err);
    }

    client.query("INSERT INTO me_message (me_message_id, content, me_user_id) VALUES ('"+ uuid_message +"', '"+json.content+"', '"+ json.me_user_id +"')", function(err, result) {

      done();

      if(err) {
        return console.error('erreur pendant l\'execution de la requete', err);
      }
      console.log(result);

    });
  });

}
