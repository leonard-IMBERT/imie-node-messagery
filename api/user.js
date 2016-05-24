var PG_PASSWORD = process.env.PG_PASSWORD;
var PG_USER = process.env.PG_USER;
var PG_URL = process.env.PG_URL;
var PG_PORT = process.env.PG_PORT;
var PG_DATABASE = process.env.PG_DATABASE;

var pg = require('pg');
var conString = "postgres://"+PG_USER+":"+PG_PASSWORD+"@"+PG_URL+":"+PG_PORT+"/"+PG_DATABASE"";

function getUserId(user_id){

		pg.connect(conString, function(err, client, done){
			if(err){
		 	   return console.error('desole probleme', err);
			};

			client.query("SELECT * FROM me_user WHERE me_user_id = '"+json.user_id+"'", function(err, result){

				done();

				if(err){
					return console.error('erreur pendant l\'execution de la requete', err);
				};
				console.log(result);
			})
		});
}

function insertUsr(user){
		var uuid_user = uuid.v4();

		pg.connect(conString, function(err, client, done) {

		  if(err) {
		    return console.error('desole probleme', err);
		  }

		  client.query("INSERT INTO me_user (me_user_id, username, password, localisation, mail) VALUES ('"+ uuid_user +"', '"+json.username+"', '"+ json.password +"', '"+json.localisation+"', '"+json.mail+"')", function(err, result) {

		    done();
		 
		    if(err) {
		      return console.error('erreur pendant l\'execution de la requete', err);
		    };
		    console.log(result);

		  });
		});
};

function checkUsr(user){

	pg.connect(conString, function(err, client, done){

		if(err){
			return console.error('desole probleme', err);
		};

		client.query("SELECT username, password, localisation, mail FROM user WHERE  me_user_id = '"+json.user_id+"'", function(err, result){

			done();

			if(err){
				return false;
			};
			console.log(result);
		});
	});
};

function updateUsr(user){

	pg.connect(conString, function(err, client, done){

		if(err){
			return console.error('desole probleme', err);
		}
			client.query("UPDATE me_user SET username = '"+json.username+"', '"+json.password+"', '"+json.localisation+"', '"+json.mail+"' WHERE user_id = '"+json.user_id+"'", function(err, result) {

				done();

				if(err){
					return console.error('erreur pendant l\'execution de la requete', err);
				};
			});
		});
};

function deleteUsr(user){

	pg.connect(conString, function(err, client, done){

		if(err){
			return console.error('desole probleme', err);
		};

		client.query("DELETE FROM me_user WHERE me_user_id = '"+json.user_id+"'",function(err, result){
			
			done();

			if(err){
				return console.error('erreur pendant l\'execution de la requete', err);
			};
		});

	});
};