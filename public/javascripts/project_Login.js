$(document).ready(function() {
  var createAccount=document.getElementById('aTag');
  var login=document.getElementById('all');
  var join=document.getElementById('all2');
  var joinOk=document.getElementById('all3');
  var cancel=document.getElementById('cancelButton');
  var joinButton=document.getElementById('joinButton');
  var okButton=document.getElementById('confirmImage');
  join.style.display='none';
  joinOk.style.display='none';

  $('#signButton').click(function() {
    var id = $('#textForm').val();
    var password = $('#textForm2').val();
    var data = {
      'Id': id,
      'Password': password
    }
    $.ajax({
      type: "POST",
      url: "/gameProject",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      cache: false,
      datatype: "json", // expecting JSON to be returned
      data: data,
      success: function(result) {
        if(result['results']==100)
        $(window).attr('location','/gameProject/Intro');
        else
        alert('아이디나 비밀번호가 잘 못 되었습니다.');
      },
    })
  });

  $('#aTag').click(function(){
    login.style.display='none';
    join.style.display='block';
  })

  $('#cancelButton').click(function(){
    login.style.display='block';
    join.style.display='none';
  });


  $('#joinButton').click(function() {
    var id = $('#textForm3').val();
    var password = $('#textForm4').val();
    var data = {
      'Id': id,
      'Password': password
    }
    $.ajax({
      type: "POST",
      url: "/gameProject/join",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      cache: false,
      datatype: "json", // expecting JSON to be returned
      data: data,
      success: function(result) {
        var userName=document.getElementsByClassName('textForm2')[0];
        login.style.display='none';
        join.style.display='none';
        document.getElementById('userValue').innerHTML=result['contents']+"님 가입 성공하셨습니다.";
        joinOk.style.display='block';
      },
    })
  });
  $('#confirmImage').click(function(){
    join.style.display='none';
    joinOk.style.display='none';
    login.style.display='block';
  })
});
