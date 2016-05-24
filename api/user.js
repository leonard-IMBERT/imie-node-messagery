var pg = require('pg');
var uuid = require('uuid');
var Conf = require('./conf/conf.js');

function getUserId(user_id, callback){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){

    if(err) {
      console.error('desole probleme', err);
      callback(null);
    }

    client.query("SELECT username, password, localisation, mail FROM me_user WHERE me_user_id = '"+user_id+"'", function(err, result){

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        callback(null);
      }

      callback(result.rows[0]);
    })
  });
}

function insertUsr(user, callback){
  var uuid_user = uuid.v4();

  pg.connect(Conf.CONNECTION_URL, function(err, client, done) {

    if(err) {
      console.error('desole probleme', err);
      callback(null);
    }

    client.query("INSERT INTO me_user (me_user_id, username, password, localisation, mail) VALUES ('"+ uuid_user +"', '"+user.username+"', '"+ user.password +"', '"+user.localisation+"', '"+user.mail+"')", function(err, result) {

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        callback(null);
      }

      callback(user);
    });
  });
};

function updateUsr(user, callbacl){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){

    if(err) {
      console.error('desole probleme', err);
      callback(null);
    }
    client.query("UPDATE me_user SET username = '"+user.username+"', '"+user.password+"', '"+user.localisation+"', '"+user.mail+"' WHERE user_id = '"+user.user_id+"'", function(err, result) {

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        callback(null);
      };
    });
  });
};

function deleteUsr(user_id, callback){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){

    if(err) {
      console.error('desole probleme', err);
      callback(null);
    };

    client.query("DELETE FROM me_user WHERE me_user_id = '"+user_id+"'",function(err, result){

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        callback(null);
      };
    });
  });
};

module.exports = {
  getUserId,
  insertUsr,
  updateUsr,
  deleteUsr
}
