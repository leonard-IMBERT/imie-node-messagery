var uuid = require('uuid');
var pg = require('pg');
var Conf = require('conf/conf.js');

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

  pg.connect(Conf.CONNECTION_URL, function(err, client, done) {

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
