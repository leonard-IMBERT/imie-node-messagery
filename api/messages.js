var uuid = require('uuid');
var pg = require('pg');
var Conf = require('./conf/conf.js');

function getMessages(timestamp){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){
    if(err) {
      console.error('desole probleme', err);
      return null;
    }

    var query = "SELECT * FROM me_message WHERE timestamp < '"+json.timestamp+"' ORDER BY timestamp ASC"

    client.query(query, function(err, result){

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', query, err);
        return null;
      }

      return result.row
    });
  });
};

function insertMsg(message){
  var uuid_message = uuid.v4();

  pg.connect(Conf.CONNECTION_URL, function(err, client, done) {

    if(err) {
      console.error('desole probleme', err);
      return null;
    }

    client.query("INSERT INTO me_message (me_message_id, content, me_user_id) VALUES ('"+ uuid_message +"', '"+json.content+"', '"+ json.me_user_id +"')", function(err, result) {

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        return null;
      }

      console.log(result);
    });
  });
}
