var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

// 지원 사이트(동아리 메인 사이트)로 들어가는 부분입니다.
router.get('/', function(req, res, next) {
  res.render('applyform',{title:'apply page'});
});

router.post('/goApply',function(req,res,next){//접수 버튼 클릭 시 ajax 통신하는 부분입니다.
  var name = req.body.name; //변수명 보면 다 아실거라 믿습니다.
  var major = req.body.major;
  var student_number = req.body.student_number;
  var grade = req.body.grade;
  var phone_number = req.body.phone_number;
  var apply_reason = req.body.apply_reason;
  var want_service = req.body.want_service;
  var project = req.body.project;
  var gender = req.body.gender;
  var military = req.body.military;
  var email = req.body.email;
  var home = req.body.home;

  var sql = 'insert into `applicant` (`name`,`major`,`student_number`,`phone_number`,`apply_reason`,`want_service`,`project`,`gender`,`military`,`email`,`home`,`grade`) values (?,?,?,?,?,?,?,?,?,?,?,?);';
  //입력한 정보를 테이블에 저장하는 쿼리문
  conn.query(sql,[name,major,student_number,phone_number,apply_reason,want_service,project,gender,military,email,home,grade],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('applicant insert failed');
    }//if
    else{
      console.log(results);
      res.send({result:'success'});//ajax 통신이 성공하면 다시 success 메세지를 보냅니다.
    }
  });//query
});//router post
module.exports = router;
