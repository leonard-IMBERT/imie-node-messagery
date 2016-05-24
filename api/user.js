var pg = require('pg');
var Conf = require('./conf/conf.js)

function getUserId(user_id){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){

    if(err) {
      console.error('desole probleme', err);
      return null;
    }

    client.query("SELECT * FROM me_user WHERE me_user_id = '"+json.user_id+"'", function(err, result){

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        return null;
      }

      console.log(result);
    })
  });
}

function insertUsr(user){
  var uuid_user = uuid.v4();

  pg.connect(Conf.CONNECTION_URL, function(err, client, done) {

    if(err) {
      console.error('desole probleme', err);
      return null;
    }

    client.query("INSERT INTO me_user (me_user_id, username, password, localisation, mail) VALUES ('"+ uuid_user +"', '"+json.username+"', '"+ json.password +"', '"+json.localisation+"', '"+json.mail+"')", function(err, result) {

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        return null;
      }

      console.log(result);
    });
  });
};

function checkUsr(user){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){

    if(err) {
      console.error('desole probleme', err);
      return null;
    }

    client.query("SELECT username, password, localisation, mail FROM user WHERE  me_user_id = '"+json.user_id+"'", function(err, result){

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        return null;
      }

      console.log(result);
    });
  });
};

function updateUsr(user){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){

    if(err) {
      console.error('desole probleme', err);
      return null;
    }
    client.query("UPDATE me_user SET username = '"+json.username+"', '"+json.password+"', '"+json.localisation+"', '"+json.mail+"' WHERE user_id = '"+json.user_id+"'", function(err, result) {

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        return null;
      };
    });
  });
};

function deleteUsr(user){

  pg.connect(Conf.CONNECTION_URL, function(err, client, done){

    if(err) {
      console.error('desole probleme', err);
      return null;
    };

    client.query("DELETE FROM me_user WHERE me_user_id = '"+json.user_id+"'",function(err, result){

      done();

      if(err) {
        console.error('erreur pendant l\'execution de la requete', err);
        return null;
      };
    });
  });
};
