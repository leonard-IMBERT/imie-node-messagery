var express = require('express');
var msg = require('./messages.js');
var usr = require('./user.js');
var conf = require('./conf/conf.js');
var auth = require('./auth.js');
var url = require('url');
var app = express();


/* GET de message */

app.get('/messages', function(req, res) {

  var timestamp =  url.parse(req.url,true).query.timestamp;

  if(timestamp === undefined) {
    res.status(400).send('KO');
  } else {
    msg.getMessages(timestamp, (msgs) => {
      res.status(200).send(msgs)
    });
  }
});


app.get('/user',function(req, res){

  var user_id = url.parse(req.url,true).query.user_id;
  var email = url.parse(req.url, true).query.email;
  var password = url.parse(req.url, true).query.password;

  if(user_id === undefined && (email === undefined && password === undefined)){
    res.status(400).send('KO');
  } else {
    if(user_id !== undefined) {
      usr.getUserId(user_id, (user) => {
        if(user === undefined) {
          res.status(404).send('KO');
        } else {
          res.status(200).send(user);
        }
      });
    } else {
      usr.getUserNamePass(email, password, (user) => {
        if(user === undefined) {
          res.status(404).send('KO');
        } else {
          res.status(200).send(user);
        }
      })
    }
  }
});

app.post('/messages', function(req, res){

  var dataReq = '';

  req.on('error',function(e){
    console.error(e);
    res.status(500).send('KO');
  });

  req.on('data', function(d){
    dataReq += d;
  });

  req.on('end', function(){
    var json = JSON.parse(dataReq || "{}");

    if(json.content === undefined || json.user_id === undefined){
      res.status(400).send('KO');
    } else {
      msg.insertMsg(json, (result) => {
        if(result === null) {
          res.status(500).send('KO');
        } else {
          res.status(200).send('OK');
        }
      });
    }
  });
});

app.post('/user', function(req, res){
  var dataRes = '';

  req.on('error', function(e){
    console.error(e);
    res.status(500).send('KO');
  });

  req.on('data', function(d){
    dataRes += d;
  });

  req.on('end', function(){
    var json = JSON.parse(dataRes);

    if(json.username === undefined || json.localisation === undefined || json.password === undefined || json.mail === undefined ){
      res.status(400).send('KO');
    } else {
      usr.insertUsr(json, (ret) => {
        if(ret === null) {
          res.status(500).send('KO');
        } else {
          res.status(200).send('OK');
        }
      });
    };
  });
});

app.put('/user', function(req, res){
  var user_id = url.parse(req.url,true).query.user_id;
  var dataRes = '';

  req.on('error', function(e){
    console.error(e);
    res.status(500).send('KO');
  });

  req.on('data', function(d){
    dataRes += d;
  });

  req.on('end', function(){
    var json = JSON.parse(dataRes);

    if(user_id === undefined || (json.username === undefined && json.localisation === undefined && json.mail === undefined)){
      res.status(400).send('KO');
    } else {
      usr.getUserId(user_id, (ret) => {
        if(ret === undefined){
          res.status(404).send('User not found');
        } else {
          usr.updateUsr(user_id, json, (re) => {
            if(re === null) {
              res.status(500).send('KO');
            } else {
              res.status(200).send('OK');
            }
          });
        }
      });
    };
  });
});

app.delete('/user', function(req, res){
  var user_id = url.parse(req.url,true).query.user_id;
  if(user_id === undefined){
      res.status(400).send('KO');
  } else {
    usr.getUserId(user_id, (user) => {
      if(user === undefined){
        res.status(404).send('User not found');
      } else {
        usr.deleteUsr(user_id, (result) => {
          if(result === null) {
            res.status(500).send('KO');
          } else {
            res.status(200).send('OK');
          }
        });
      }
    });
  }
});

app.post('/auth',function(req, res){

});

app.listen(conf.API_PORT)
