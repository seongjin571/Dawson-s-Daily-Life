module.exports = function(app){
  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var dbconfig = require('../database.js');
  var conn = mysql.createConnection(dbconfig);

  // var rain = require('aframe');
  // var rain1 = require('aframe-rain');

  router.get('/daswon', function(req, res, next) {
    res.render('project_Login', {
      title: 'Home'
    });
  });

router.get('/Intro',function(req,res,next){
  res.render('project_Intro',{
    title:'Intro'
  });
});
router.get('/Stage1',function(req,res,next){
  res.render('project_Stage1',{
    title:'Stage1'
  });
});
router.get('/Stage2',function(req,res,next){
  res.render('project_Stage2',{
    title:'Stage2'
  });
});

router.get('/Stage3',function(req,res,next){
  res.render('project_Stage3',{
    title:'Stage3'
  });
});
router.get('/Ending',function(req,res,next){
  res.render('project_Ending',{
    title:'Ending'
  });
});
router.post('/join', function(req, res, next) {
  id = req.body.Id;
  password = req.body.Password;

  var sql = "INSERT INTO `game_user` (`user_id`, `password`) VALUES (?, ?);";

  conn.query(sql, [id, password], function(error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log('results', results);
      console.log('fileds', fields);
      req.session.authId = id;
      req.session.save(function() {
        res.send({contents:id});
      });
    }
  });
});

router.post('/', function(req, res, next) {
  id = req.body.Id;
  password = req.body.Password;

  var sql = "SELECT * FROM game_user WHERE user_id=? and password=?";

  conn.query(sql, [id,password], function(error, results, fields) {
    if (error) {
      console.log('fail!');
    }
    else {
      var user = results[0];
      if(user)
      {
        console.log('same password!');
        req.session.authId = id;
        req.session.save(function() {
          res.send({results:100});
        });
      }
      else {
        res.send({results:200});
      }
    }
  });
});
return router;
}
