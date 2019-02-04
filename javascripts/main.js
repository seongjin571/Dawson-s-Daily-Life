var audio=new Audio('sound/pulmuone.mp3');
audio.loop=true;
audio.volume=0.1;
var audio2= new Audio('sound/backSound.mp3');
var audio3= new Audio('sound/clear.mp3');
audio3.volume=0.4;
var effect = new Audio('sound/pulmuoneSong.mp3');
effect.volume=0.5;
var mapwall =
[//0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//0
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//1
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//2
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//3
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//4
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//5
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//6
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//7
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//8
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//9
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//0
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//1
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//2
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//3
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//4
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//5
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//6
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//7
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],//8
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//9
],
map= //1 진열대, 2진열대 3진열대 4진열대 5진열대 6냉장류 7기둥 ps.진열대 패턴 바꿔서 여러개 바꿔야함

[//0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//0
  [0,5,5,5,14,14,7,7,4,4,4,4,4,4,4,4,7,7,7,0],//1
  [0,5,0,22,0,0,0,0,0,0,0,0,0,15,0,0,0,0,7,0],//2
  [0,5,0,11,11,11,11,0,0,7,7,0,13,13,13,13,13,0,7,0],//3
  [0,5,0,11,11,11,11,0,0,7,7,0,13,13,13,13,13,0,3,0],//4
  [0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0],//5
  [0,7,0,0,8,7,8,18,8,0,0,0,12,7,0,10,0,0,3,0],//0
  [0,2,0,0,8,7,8,8,8,0,0,0,12,12,0,10,0,0,3,0],//7
  [0,2,0,0,8,8,8,8,8,0,0,0,12,12,0,10,0,0,3,0],//8
  [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,3,0],//9
  [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0],//0
  [0,2,17,0,11,11,11,11,11,0,0,9,9,19,9,0,0,0,3,0],//1
  [0,2,0,0,12,7,7,0,0,0,0,9,9,9,7,0,0,0,3,0],//2
  [0,7,0,0,12,11,7,0,0,0,0,9,9,9,7,0,0,0,7,0],//3
  [0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0],//8
  [0,1,0,7,14,14,11,11,0,7,0,0,10,10,10,10,10,0,6,0],//5
  [0,1,0,11,11,11,11,11,0,0,0,0,10,10,10,10,10,0,6,0],//6
  [0,1,0,0,21,0,0,0,0,0,0,0,0,0,0,0,20,0,6,0],//7
  [0,1,1,1,1,1,7,7,14,14,14,14,7,7,6,6,6,6,6,0],//8
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//9
]
mapW = map.length, mapH = map[0].length;
// Semi-constants
var WIDTH = window.innerWidth,
HEIGHT = window.innerHeight,
ASPECT = WIDTH / HEIGHT,
UNITSIZE = 100,
WALLHEIGHT = UNITSIZE,//////////////////////////////////
MOVESPEED = 100,
LOOKSPEED = 0.04,
PROJECTILEDAMAGE = 20;
// Global vars
var t = THREE, scene, cam, renderer, controls, clock, projector, model, skin;
var runAnim = true, mouse = { x: 0, y: 0 }, food = 0; //runAnim이거는 약간 목숨같은 느낌
var health = 100;
var count=0; //총알 수
var cnt=0 //이거는 타이머 카운트
var run = 0; //0은 안달림 1은 달림
var Stamina = 10;
var MaxStamina = 10;
var step = 0;
var object=[];
var objectCheck=[];
$(document).ready(function() {
  $('body').append('<div id="intro2">Click to start</div>');
  $('#intro2').css({width: WIDTH, height: HEIGHT}).one('click', function(e) {
    $(this).fadeOut(500);
    $('body').append('<div id="intro">Click to start</div>');

    $('#intro').css({width: WIDTH, height: HEIGHT}).one('click', function(e) {
      e.preventDefault();
      $(this).fadeOut();
      init();
      setupScene();
      audio.play();
      animate();
    });
  });
});


// Setup
function init() {
  clock = new t.Clock(); // Used in render() for controls.update()
  projector = new t.Projector(); // Used in bullet projection
  scene = new t.Scene(); // Holds all objects in the canvas

  // Set up camera
  cam = new t.PerspectiveCamera(60, ASPECT, 1, 10000); // FOV, aspect, near, far
  cam.position.y = UNITSIZE * .6;
  scene.add(cam);


  var pointlight = new t.PointLight(0xFFFFFF,0.7,1,1);
  pointlight.position.y = 120;
  scene.add(pointlight);
  var pointlight2 = new t.PointLight(0xFFFFFF,0.7,0,1);
  pointlight2.position.y = 120;
  pointlight2.position.x = 500;
  scene.add(pointlight2);
  var pointlight3 = new t.PointLight(0xFFFFFF,0.7,0,1);
  pointlight3.position.y = 120;
  pointlight3.position.x = -500;
  scene.add(pointlight3);
  var pointlight4 = new t.PointLight(0xFFFFFF,0.7,0,1);
  pointlight4.position.y = 120;
  pointlight4.position.z = 500;
  scene.add(pointlight4);
  var pointlight5 = new t.PointLight(0xFFFFFF,0.7,0,1);
  pointlight5.position.y = 120;
  pointlight5.position.z = -500;
  scene.add(pointlight5);

  var pointlight6= new t.PointLight(0xFFFFFF,0.7,0,1);
  pointlight6.position.y = 120;
  pointlight6.position.x = 500;
  pointlight6.position.z = 500;
  scene.add(pointlight6);
  var pointlight7 = new t.PointLight(0xFFFFFF,0.7,0,1);
  pointlight7.position.y = 120;
  pointlight7.position.x = -500;
  pointlight6.position.z = 500;
  scene.add(pointlight7);
  var pointlight8 = new t.PointLight(0xFFFFFF,0.7,0,1);
  pointlight8.position.y = 120;
  pointlight8.position.x = 500;
  pointlight8.position.z = -500;
  scene.add(pointlight8);
  var pointlight9 = new t.PointLight(0xFFFFFF,0.7,0,1);
  pointlight9.position.y = 120;
  pointlight9.position.x = -500;
  pointlight9.position.z = -500;
  scene.add(pointlight9);



  // Camera moves with mouse, flies around with WASD/arrow keys
  controls = new t.FirstPersonControls(cam,pointlight);
  controls.movementSpeed = MOVESPEED;
  controls.lookSpeed = LOOKSPEED;
  controls.lookVertical = false; // Temporary solution; play on flat surfaces only
  controls.noFly = true;
  // World objects



  // Artificial Intelligence\


  // Handle drawing as WebGL (faster than Canvas but less supported)
  renderer = new t.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);

  // Add the canvas to the document
  renderer.domElement.style.backgroundColor = '#ffffff'; // 뚜껑덮어서 딱히 의미 없음
  document.body.appendChild(renderer.domElement);

  // Track mouse position so we know where to shoot
  document.addEventListener('mousemove', onDocumentMouseMove, false );

  $('body').append('<div id="hud"><p>바른먹거리:<span id="food">0</span>/8<br/></p></div>');
  // Set up "hurt" flash
  $('body').append('<div id="hurt"></div>');
  $('#hurt').css({width: WIDTH, height: HEIGHT,});
}

function animate() {
  requestAnimationFrame(animate); //움직임
  render();
}


function render() { //화면에 렌더링 하는 부분인데 진작에 이렇게 해야 했음
  var delta = clock.getDelta();
  $('#health').html(health);


  controls.update(delta); // Move camera
  for(var i=0; i<object.length; i++){

    object[i].rotation.x += 0.01;
    object[i].rotation.y += 0.01;
    if(objectCheck[i]==0){
      if (distance(cam.position.x,cam.position.z,object[i].position.x,object[i].position.z) < 15)
      {

        scene.remove(object[i]);
        if(food!=7){
          audio.pause();
          effect.play();
          effect.onended=function(){
            audio.play();
          }
        }
        newdiv();

        food=food+1;
        $('#food').html(food);///////////////////////////
        objectCheck[i]=1;
      }
    }
  }
  renderer.render(scene, cam); // Repaint

  if(food==8)
  {

    audio.pause();
    audio3.play();
    runAnim = false;
    setInterval(function(){
      // audio3.pause();
      // audio2.play();
      $(renderer.domElement).fadeOut(2500);
      $('#hud, #credits').fadeOut(2500);
      setInterval(function(){
        if(audio3.volume-0.05 >0.0 ){
          audio3.volume-=0.05;
        }
        else{
          audio3.pause();
        }
      },4500);
      $('body').append('<div id="success"></div>').show(1200);
      $('#success').css({width: WIDTH, height: HEIGHT});
      $('#success').one('click', function() {
        $('#success').fadeOut(1200);
        $('body').append('<div id="success2"></div>').show(1200);
        $('#success2').css({width: WIDTH, height: HEIGHT});
      });
      $('#success2').one('click', function() {
        $('#success2').fadeOut(1200);
        $('body').append('<div id="success3"></div>').show(1200);
        $('#success3').css({width: WIDTH, height: HEIGHT});
      });
      $('#success3').one('click', function() {

        $('#success3').fadeOut(1200);

      });
    }, 3500);
  }
}


//장면 만들기

function setupScene() {

  var UNITSIZE = 100, units = mapW;

  // Geometry: floor
  var loader = new THREE.TextureLoader();
  var texture = loader.load('images/wood1.jpg',function(texture){
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0,0);
    texture.repeat.set(20,20);
  })
  var sideWallTexture = loader.load('images/wall5.jpg');
  var hotdog=loader.load('images/hotJ.png');
  var kalgugsu=loader.load('images/kalJ.png');
  var ssal=loader.load('images/ssalJ.png');
  var mush=loader.load('images/market4.jpg');
  var amond=loader.load('images/amondJ.png');
  var coffee=loader.load('images/coffeeJ.png');
  var sauce=loader.load('images/sauceJ.png');
  var healthFood=loader.load('images/healthJ.png');
  var basic=loader.load('images/market9.jpg');
  var basic2=loader.load('images/market10.jpg');
  var basic3=loader.load('images/ice2.png');
  var basic4=loader.load('images/market11.jpg');
  var basic5=loader.load('images/ice3.jpg');
  var floor = new t.Mesh(
    new t.CubeGeometry(units * UNITSIZE, 10, units * UNITSIZE),
    new t.MeshPhongMaterial({map:texture})
  );
  var stick=loader.load('images/wall.jpg');
  scene.add(floor);
  //천장
  var ceilTexture = loader.load('images/wall10.jpg',function(texture){
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0,0);
    texture.repeat.set(5,5);
  });
  var ceiling = new t.Mesh(
    new t.CubeGeometry(units * UNITSIZE, 10, units * UNITSIZE),/////////////////////////////////////천장
    new t.MeshLambertMaterial({map:ceilTexture })
  );
  ceiling.position.y=UNITSIZE*2+5;
  scene.add(ceiling);
  //////////////////////////////////// Geometry: 벽
  var cube = new t.CubeGeometry(UNITSIZE, 250, UNITSIZE);
  var cube2 = new t.CubeGeometry(UNITSIZE, 500, UNITSIZE);
  var one= new t.CubeGeometry(20 , 2, 20);
  var objectG1 = new t.CubeGeometry(3 , 28, 25);
  var objectG2 = new t.CubeGeometry(6 , 55, 38);
  var objectG3 = new THREE.CylinderGeometry(15.5, 12, 10, 4, 1, false, 0, 6.3);
  var objectG4 = new t.CubeGeometry(3 , 28, 20);
  var objectG5 = new t.CubeGeometry(14 ,8 , 8);
  var objectG6 = new t.CubeGeometry(10 ,15 , 8);

    var objectG8 = new t.CubeGeometry(10 ,3 ,1 );




  ////////////////////////////////////////////////////material
  var sideWallMe=  new t.MeshLambertMaterial({map:sideWallTexture});
  var objectMaterial = new t.MeshBasicMaterial({map: t.ImageUtils.loadTexture('images/wall5.jpg')});
  var iceM = [
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ice2.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ice2.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/iceU.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ice2.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ice2.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ice2.png')
    })
  ];
  var objectM1 = [
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/kal.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/kal.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/kal2.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/kal2.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/kal3.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/kal3.jpg')
    })
  ];
  var objectM2 = [
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ssal.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ssal.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ssal2.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ssal2.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ssal4.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ssal4.jpg')
    })
  ];

  var objectM3 = [
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ssal.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/mush.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/ssal2.jpg')
    })
  ];

  var objectM4 = [
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/sauce.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/sauce.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/sauce2.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/sauce2.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/sauce2.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/sauce2.jpg')
    })
  ];

  var objectM5 = [
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/lohas2.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/lohas2.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/lohas.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/lohas3.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/lohas.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/lohas.jpg')
    })
  ];

  var objectM6 = [
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/coffee3.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/coffee3.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/coffee5.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/coffee4.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/coffee1.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/coffee2.png')
    })
  ];

  var objectM8 = [
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/hot2.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/hot2.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/hot3.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/hot3.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/hot.png')
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/hot.png')
    })
  ];
  for (var i = 0; i < mapW; i++) {
    for (var j = 0, m = map[i].length; j < m; j++) {
      if (map[i][j]==1)
      {
        var cube = new t.CubeGeometry(UNITSIZE,100, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: amond});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 55;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==2)
      {
        var cube = new t.CubeGeometry(UNITSIZE,80, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: mush});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 45;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);

      }
      if (map[i][j]==3)
      {
        var cube = new t.CubeGeometry(UNITSIZE,100, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: ssal});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 55;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==4)
      {
        var cube = new t.CubeGeometry(UNITSIZE,100, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: kalgugsu});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 55;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==5)
      {
        var cube = new t.CubeGeometry(UNITSIZE,100, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: hotdog});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 55;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==6)
      {
        var cube = new t.CubeGeometry(UNITSIZE,100, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: coffee});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 55;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==7)
      {
        var cube = new t.CubeGeometry(UNITSIZE,UNITSIZE*2, UNITSIZE);
        var material = new t.MeshBasicMaterial({map:sideWallTexture});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = UNITSIZE;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==8)
      {
        var cube = new t.CubeGeometry(UNITSIZE,100, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: sauce});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 55;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==9)
      {
        var cube = new t.CubeGeometry(UNITSIZE,100, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: healthFood});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 55;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==10)
      {
        var cube = new t.CubeGeometry(UNITSIZE,100, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: basic});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 55;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==11)
      {
        var cube = new t.CubeGeometry(UNITSIZE,100, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: basic2});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 55;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==12)
      {
        var cube = new t.CubeGeometry(UNITSIZE,45, UNITSIZE);
        // var material = new t.MeshBasicMaterial({map: basic3});
        var wall = new t.Mesh(cube,iceM);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 25;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==13)
      {
        var cube = new t.CubeGeometry(UNITSIZE,100, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: basic4});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 50;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==14)
      {
        var cube = new t.CubeGeometry(UNITSIZE,120, UNITSIZE);
        var material = new t.MeshBasicMaterial({map: basic5});
        var wall = new t.Mesh(cube,material);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = 66;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if(map[i][j]>=15){
        if(map[i][j]==15){//kalgulsu
          object[0] = new t.Mesh(objectG1, objectM1);
          objectCheck[0]=0;
          object[0].position.y = UNITSIZE * 0.5;
          object[0].position.x = (i - units/2) * UNITSIZE;
          object[0].position.z = (j - units/2) * UNITSIZE;
          scene.add(object[0]);
        }
        if(map[i][j]==16){//ssal
          object[1] = new t.Mesh(objectG2, objectM2);
          objectCheck[1]=0;
          object[1].position.y = UNITSIZE * 0.5;
          object[1].position.x = (i - units/2) * UNITSIZE;
          object[1].position.z = (j - units/2) * UNITSIZE;
          scene.add(object[1]);
        }
        if(map[i][j]==17){//mush
          object[2] = new t.Mesh(objectG3,objectM3);
          objectCheck[2]=0;
          object[2].position.y = UNITSIZE * 0.5;
          object[2].position.x = (i - units/2) * UNITSIZE;
          object[2].position.z = (j - units/2) * UNITSIZE;
          scene.add(object[2]);
        }
        if(map[i][j]==18){//sauce
          object[3] = new t.Mesh(objectG4, objectM4);
          objectCheck[3]=0;
          object[3].position.y = UNITSIZE * 0.55;
          object[3].position.x = (i - units/2) * UNITSIZE;
          object[3].position.z = (j - units/2) * UNITSIZE;
          scene.add(object[3]);
        }
        if(map[i][j]==19){//health
          object[4] = new t.Mesh(objectG5, objectM5);
          objectCheck[4]=0;
          object[4].position.y = UNITSIZE * 0.55;
          object[4].position.x = (i - units/2) * UNITSIZE;
          object[4].position.z = (j - units/2) * UNITSIZE;
          scene.add(object[4]);
        }
        if(map[i][j]==20){//coffee
          object[5] = new t.Mesh(objectG6, objectM6);
          objectCheck[5]=0;
          object[5].position.y = UNITSIZE * 0.55;
          object[5].position.x = (i - units/2) * UNITSIZE;
          object[5].position.z = (j - units/2) * UNITSIZE;
          scene.add(object[5]);
        }
        if(map[i][j]==21){
          object[6] = new t.Mesh(one, objectMaterial);
          objectCheck[6]=0;
          object[6].position.y = UNITSIZE * 0.55;
          object[6].position.x = (i - units/2) * UNITSIZE;
          object[6].position.z = (j - units/2) * UNITSIZE;
          scene.add(object[6]);
        }
        if(map[i][j]==22){//hotdog
          object[7] = new t.Mesh(objectG8, objectM8);
          objectCheck[7]=0;
          object[7].position.y = UNITSIZE * 0.55;
          object[7].position.x = (i - units/2) * UNITSIZE;
          object[7].position.z = (j - units/2) * UNITSIZE;
          scene.add(object[7]);
        }
      }
    }
  }
  var wallcube = new t.CubeGeometry(UNITSIZE,UNITSIZE*2,UNITSIZE);
  var wallmat = new t.MeshBasicMaterial({map:sideWallTexture});
  for(var i = 0; i< mapW; i=i+1)
  {
    for (var j = 0, m = map[i].length; j < m; j=j+1)
    {
      if(mapwall[i][j]==1)
      {
        var wall = new t.Mesh(wallcube,wallmat);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = UNITSIZE;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
    }
  }

  ///////////// 빛
  // var directionalLight1 = new t.DirectionalLight( 0xF7EFBE, 0.2 );
  // directionalLight1.position.set( 0.5, 1, 0.5 );
  // scene.add( directionalLight1 );
  //
  // var directionalLight2 = new t.DirectionalLight( 0xF7EFBE, 0.2 );
  // directionalLight2.position.set( -0.5, -1, -0.5 );
  // scene.add( directionalLight2 );
}
//미니맵
//
function onDocumentMouseMove(e) {
  e.preventDefault();
  mouse.x = (e.clientX / WIDTH) * 2 - 1;
  mouse.y = - (e.clientY / HEIGHT) * 2 + 1;
}

// Handle window resizing
$(window).resize(function() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  ASPECT = WIDTH / HEIGHT;
  if (cam) {
    cam.aspect = ASPECT;
    cam.updateProjectionMatrix();
  }
  if (renderer) {
    renderer.setSize(WIDTH, HEIGHT);
  }
  $('#intro, #hurt, #fail').css({width: WIDTH, height: HEIGHT,});
});

// Stop moving around when the window is unfocused (keeps my sanity!)
$(window).focus(function() {
  if (controls)
  {
    controls.freeze = false;
  }
});
$(window).blur(function() {
  if (controls)
  {
    controls.freeze = true;
  }
});
function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
function getMapSector(v) {
  var x = Math.floor((v.x + UNITSIZE / 2) / UNITSIZE + mapW/2);
  var z = Math.floor((v.z + UNITSIZE / 2) / UNITSIZE + mapW/2);
  return {x: x, z: z};
}

function checkWallCollision(v) {
  var c = getMapSector(v);
  return mapwall[c.x][c.z] > 0;
}
function checkWallCollision(v) {
  var c = getMapSector(v);
  return map[c.x][c.z] <15 &&map[c.x][c.z] >0;
}

function checkWallCollision3(v) {
  var c = getMapSector(v);
  var foodpos;
  if(map[c.x][c.z]==21){
    foodpos=1;
  }
  else if(map[c.x][c.z]==17){
    foodpos=2;
  }
  else if(map[c.x][c.z]==16){
    foodpos=3;
  }
  else if(map[c.x][c.z]==15){
    foodpos=4;
  }
  else if(map[c.x][c.z]==22){
    foodpos=5;
  }
  else if(map[c.x][c.z]==20){
    foodpos=6;
  }
  else if(map[c.x][c.z]==19){
    foodpos=7;
  }
  else if(map[c.x][c.z]==18){
    foodpos=8;
  }
  return foodpos;
}

function degreesToRadians(degrees)
{
  return degrees * Math.PI / 180;
}

// Converts radians to degrees
function radiansToDegrees(radians)
{
  return radians * 180 / Math.PI;
}
