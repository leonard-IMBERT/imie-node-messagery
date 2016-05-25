var pg = require('pg');
var uuid = require('uuid');
var Conf = require('./conf/conf.js');

function getUserNamePass(email, password, callback){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done) {

    if(err) {
      console.error('desole probleme', err);
      callback(null);
    }

    var query = "SELECT me_user_id as id, username, localisation, mail as email, password FROM me_user WHERE mail = '" + email + "' AND password = '" + password + "'"

    client.query(query, function(err, result) {

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        callback(null);
      }

      callback(result.rows);
    });
  });
}

function getUserId(user_id, callback){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){

    if(err) {
      console.error('desole probleme', err);
      callback(null);
    }

    client.query("SELECT username, localisation, mail, active FROM me_user WHERE me_user_id = '"+user_id+"'", function(err, result){

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

    client.query("INSERT INTO me_user (me_user_id, username, password, localisation, mail, active) VALUES ('"+ uuid_user +"', '"+user.username+"', '"+ user.password +"', '"+user.localisation+"', '"+user.mail+"', true)", function(err, result) {

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        callback(null);
      }

      callback(user);
    });
  });
};

function updateUsr(user_id, user, callback){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){

    if(err) {
      console.error('desole probleme', err);
      callback(null);
    }
    var query = "UPDATE me_user SET";
    if(user.username) { query += (" username = '" + user.username + "'"); }
    if(user.localisation) { query += (", localisation = '" + user.localisation + "'"); }
    if(user.mail) { query += (", mail = '" + user.mail + "'"); }
    query += " WHERE me_user_id = '" + user_id + "'::uuid";

    client.query(query, function(err, result) {

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        callback(null);
      };

      callback(user);
    });
  });
};

function deleteUsr(user_id, callback){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){

    if(err) {
      console.error('desole probleme', err);
      callback(null);
    };

    client.query("UPDATE me_user SET active = false WHERE me_user_id = '"+user_id+"'",function(err, result){

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        callback(null);
      };

      callback(user_id);
    });
  });
};

module.exports = {
  getUserId,
  insertUsr,
  updateUsr,
  deleteUsr,
  getUserNamePass
}
