var uuid = require('uuid');
var pg = require('pg');
var Conf = require('./conf/conf.js');

function getMessages(timestamp, callback){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){
    if(err) {
      console.error('desole probleme', err);
      callback(null);
      return;
    }

    var query = "SELECT me_message_id, time, content, me_user_id FROM me_message WHERE time < to_timestamp(" + timestamp + ") ORDER BY time ASC"

    client.query(query, function(err, result){

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', query, err);
        callback(null);
        return;
      }

      callback(result.rows);
    });
  });
};

function insertMsg(message, callback){
  var uuid_message = uuid.v4();

  pg.connect(Conf.CONNECTION_URL, function(err, client, done) {

    if(err) {
      console.error('desole probleme', err);
      callback(null);
      return;
    }

    var query = "INSERT INTO me_message (me_message_id, content, me_user_id) VALUES ('" + uuid_message + "'::uuid, '" + message.content + "', '" + message.user_id + "'::uuid)"

    client.query(query, function(err, result) {

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        callback(null);
        return;
      }

      callback(result);
    });
  });
}

module.exports = {
  getMessages,
  insertMsg
}
