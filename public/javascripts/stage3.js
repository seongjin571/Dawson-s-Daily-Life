var audio2= new Audio('/sound/sound1.mp3');
var audio= new Audio('/sound/africa2.mp3');
var audio3= new Audio('/sound/clear.mp3');
var effect = new Audio('/sound/effect3.mp3');
// var audio4= new Audio('/sound/backSound.mp3');
audio3.volume=0.4;
// audio4.volume=0.4;
// audio4.loop=true;

audio2.onended=function(){
  audio2.pause();
  audio.volume=0.4;
  audio.loop=true;
  audio.play();
}

//0-길 1-벽 2-중간나무 3-큰나무 4-작은나무 5-바위  6-덤불
var map =
[//0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19
  [1,1,1,1,1,1,1,1,1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],//0
  [1,0,0,0,1,1,0,0,0,1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1 ],//1
  [1,0,1,0,0,1,0,1,0,1, 1, 0, 1, 1, 1, 5, 1, 1, 0, 1 ],//2
  [1,0,5,1,0,1,1,1,0,5, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1 ],//3
  [1,0,1,0,0,0,0,0,0,0, 0, 0, 2, 0, 1, 0, 0, 0, 1, 1 ],//4
  [1,0,1,0,1,0,0,0,0,1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1 ],//5
  [1,1,1,0,1,0,1,3,0,0, 0, 0, 1, 0, 0, 0 ,0 ,0 ,1 ,1 ],//1
  [1,0,1,0,1,0,1,0,0,1, 0, 1, 1, 0, 1, 1, 1, 4, 1, 1 ],//7
  [1,0,0,0,1,0,1,0,1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],//8
  [1,1,1,1,1,0,4,1,1,0, 0, 5, 1, 0, 0, 1, 0, 1, 0, 0 ],//9
  [1,0,0,0,0,0,1,0,0,1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0 ],//10
  [1,1,1,1,0,1,1,1,0,1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 1 ],//11
  [1,0,1,0,0,0,1,0,0,0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1 ],//12
  [1,0,5,0,1,1,1,0,1,1, 0, 0, 1, 0, 1, 5, 1, 1, 0, 1 ],//13
  [1,0,1,0,0,0,1,0,0,1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],//14
  [1,0,1,0,1,0,0,0,0,0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1 ],//15
  [1,0,1,1,1,1,1,1,1,0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1 ],//16
  [1,0,1,0,0,0,0,1,0,0, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1 ],//17
  [1,0,0,0,2,0,0,0,0,0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1 ],//18
  [1,1,1,1,1,1,1,1,1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],//19
],

mapW = map.length, mapH = map[0].length;
// Semi-constants
var settime = 0;



var WIDTH = window.innerWidth,
HEIGHT = window.innerHeight,
ASPECT = WIDTH / HEIGHT,
UNITSIZE = 250,
WALLHEIGHT = UNITSIZE/100,//////////////////////////////////원애는 UNITSIZE
MOVESPEED = 200,
LOOKSPEED = 0.075,
BULLETMOVESPEED = MOVESPEED * 15,
NUMAI = 5,
NUMOBJECT  = 1,
PROJECTILEDAMAGE = 20;

// Global vars
var t = THREE, scene, cam, renderer, controls, clock, projector, model, skin;
var runAnim = true, mouse = { x: 0, y: 0 }, score = 0; //runAnim이거는 약간 목숨같은 느낌
var health = 100;
var cnt=0; //이거는 타이머 카운트
var run = 0; //0은 안달림 1은 달림
var Stamina = 10;
var MaxStamina = 10;
var step = 0;
var sky, sunSphere;
var phi;
var theta;
var distance = 400000;


// $(window).load(function() {//////AJAX통신할때 로딩중 움짤 보여줌
//   $('#loading').hide();
// });


$(document).ready(function() {
  $('body').append('<div id="intro">Click to start</div>');
  $('#intro').css({width: WIDTH, height: HEIGHT}).one('click', function(e) {
    e.preventDefault();
    $(this).fadeOut();
    init();
    audio2.play();
    render();

  });
});

var spotColor = "#ffffff";
var spotLight = new THREE.SpotLight(spotColor);
spotLight.castShadow = true;
spotLight.distance=0;
spotLight.angle = Math.PI/2;

// Setup
function initSky() {
  // Add Sky Mesh
  sky = new THREE.Sky();
  scene.add( sky.mesh );
  // Add Sun Helper
  sunSphere = new THREE.Mesh
  (
    new THREE.SphereBufferGeometry( 20000, 16, 8 ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } )
  );
  sunSphere.position.y = - 700000;
  sunSphere.visible = false;
  scene.add( sunSphere );
  /// GUI
  var effectController  = {
    turbidity: 10,
    rayleigh: 2,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    luminance: 1,
    inclination: 0.49, // elevation / inclination
    azimuth: 0.25, // Facing front,
    sun: true
  };

  function guiChanged()
  {
    var uniforms = sky.uniforms;
    uniforms.turbidity.value = effectController.turbidity;
    uniforms.rayleigh.value = effectController.rayleigh;
    uniforms.luminance.value = effectController.luminance;
    uniforms.mieCoefficient.value = effectController.mieCoefficient;
    uniforms.mieDirectionalG.value = effectController.mieDirectionalG;
    theta = Math.PI * ( effectController.inclination - 0.5 );
    phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );
    sunSphere.position.x = distance * Math.cos( phi );
    sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
    sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );
    sunSphere.visible = effectController.sun;
    sky.uniforms.sunPosition.value.copy( sunSphere.position );
    renderer.render( scene, cam );
  }
  guiChanged();
}

function init() {
  clock = new t.Clock(); // Used in render() for controls.update()
  projector = new t.Projector(); // Used in bullet projection
  scene = new t.Scene(); // Holds all objects in the canvas
  //scene.fog = new t.FogExp2(0xffffff, 0.0015); // color, density
  //scene.fog = new THREE.Fog( 0xffffff,1000, 5000 );

  // Set up camera
  cam = new t.PerspectiveCamera(60, ASPECT, 1, 1000000); // FOV, aspect, near, far
  //cam.position.y = UNITSIZE *0.4 ;

  cam.position.y =60;
  scene.add(cam);

  // Camera moves with mouse, flies around with WASD/arrow keys
  controls = new t.FirstPersonControls(cam);
  controls.movementSpeed = MOVESPEED;
  controls.lookSpeed = LOOKSPEED;
  controls.lookVertical = true; // Temporary solution; play on flat surfaces only
  controls.noFly = true;


  // World objects
  setupScene();


  // Artificial Intelligence
  setupobject();



  // Handle drawing as WebGL (faster than Canvas but less supported)
  renderer = new t.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);

  // Add the canvas to the document

  document.body.appendChild(renderer.domElement);

  // Track mouse position so we know where to shoot
  document.addEventListener('mousemove', onDocumentMouseMove, false );

  // Shoot on click


  // Display HUD   <img src="images/다이아.png" id = "jewel">      Stamina:<span id="Stamina">10</span>/10<br/>
  // $('body').append('<canvas id="radar" width="200" height="200"></canvas>');
  // $('body').append('<div id="hud"><p>Health:<span id="health">100</span>/100<br />Objects:<span id="score">0</span>/5<br/></p></div>');
  // // Set up "hurt" flash
  // $('body').append('<div id="hurt"></div>');
  // $('#hurt').css({width: WIDTH, height: HEIGHT,});

  initSky();
}




function render() { //화면에 렌더링 하는 부분인데 진작에 이렇게 해야 했음
  var delta = clock.getDelta(), speed = delta * BULLETMOVESPEED;
  $('#health').html(health);
  controls.update(delta); // Move camera

  for (var i = object.length-1; i >= 0; i--) {
    var a = object[i];
    // Rotate the health cube
    object[i].rotation.x += 0.02;
    object[i].rotation.y += 0.03;
    // Allow picking it up once per minute
    if (distance1(cam.position.x,cam.position.z,a.position.x,a.position.z) < 15)
    {
      scene.remove(a);
      if(score!=4)
      effect.play();
      object.shift();
      score=score+1;
      $('#score').html(score);///////////////////////////
      addobject();
    }
  }


  // Death
  if (cnt==250) {
    runAnim = false;
    setInterval(function(){
      if(audio.volume-0.1 >0.0 ){
        audio.volume-=0.1;
      }
      else{
        audio.pause();
      }
      $(renderer.domElement).fadeOut(2500);
      $(' #hud, #credits').fadeOut(2500);
      $('body').append('<div id="fail"></div>').fadeIn(1800);
      $('#fail').css({width: WIDTH, height: HEIGHT});
      $('#fail').one('click', function() {
        location = location;
      });
    },2000);
  }

  if(score==5)
  {
    // if(controls.position(-100,60,2400)){
    audio.pause();
    audio3.play();
    runAnim = false;
    setInterval(function(){
      $(renderer.domElement).fadeOut(2500);
      $(' #hud, #credits').fadeOut(2500);
      setInterval(function(){
        if(audio3.volume-0.05 >0.0 ){
          audio3.volume-=0.05;
        }
        else{
          audio3.pause();
          $('#success').fadeOut(00);
          location.href="http://54.70.8.39:3000/gameProject/Ending";
        }
        // audio3.onended=function(){
        //   setInterval(function(){
        //   // location.href="http://54.70.8.39:3000/gameProject/Ending";
        //   },300);
        // }
      },4500);
      $('body').append('<div id="success"></div>').fadeIn(1800);
      $('#success').css({width: WIDTH, height: HEIGHT});
      // $('#success').one('click', function() {
      //   $('#success').fadeOut(1800);
      //   location.href="http://54.70.8.39:3000/gameProject/Ending";
      // });

    }, 2500);
  // }
  }

  // theta -=0.0005625;
    theta -=0.0003;

  sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
  sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );
  sky.uniforms.sunPosition.value.copy( sunSphere.position );
  spotLight.position.y = distance * Math.sin( phi ) * Math.sin( theta );
  spotLight.position.z = distance * Math.sin( phi ) * Math.cos( theta );
  if (runAnim) { //안디져 있다면??
    requestAnimationFrame(render); //움직임
  }
  renderer.render(scene, cam); // Repaint
}
//장면 만들기

function setupScene() {

  var UNITSIZE = 250, units = mapW;

  // Geometry: floor
  var loader = new THREE.TextureLoader();
  var texture = loader.load('/images/sand.jpg',function(texture){
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0,0);
    texture.repeat.set(20,20);
  })
  var floor = new t.Mesh(
    new t.CubeGeometry(units * UNITSIZE*10, 1, units * UNITSIZE*10),
    new t.MeshLambertMaterial({map:texture/* t.ImageUtils.loadTexture('images/stone.jpg')*/})
  );
  scene.add(floor);

  var cube = new t.CubeGeometry(UNITSIZE, WALLHEIGHT, UNITSIZE);
  var materials =
  [
    new t.MeshLambertMaterial({/*color: 0x00CCAA,*/map: t.ImageUtils.loadTexture('/images/grass8.jpg')}),
    new t.MeshLambertMaterial({/*color: 0xC5EDA0,*/map: t.ImageUtils.loadTexture('/images/grass9.jpg')}),
    new t.MeshLambertMaterial({/*color: 0xC5EDA0,*/map: t.ImageUtils.loadTexture('/images/grass10.jpg')}),
  ];

  var schoolgeo = new t.CubeGeometry(UNITSIZE*7,UNITSIZE*3,UNITSIZE*3);
  var schoolmat = new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/school.jpg')});
  var school = new t.Mesh(schoolgeo,schoolmat);

  school.position.x = -100;
  school.position.z = 2800;
  school.position.y = UNITSIZE*1.5;
  scene.add(school);


  for (var i = 0; i < mapW; i++) {
    for (var j = 0, m = map[i].length; j < m; j++) {

      if (map[i][j]>0)
      {
        var g=Math.floor(Math.random() * 3);
        var wall = new t.Mesh(cube,materials[g]);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = WALLHEIGHT/2;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
      if (map[i][j]==2)
      {
        var woodgeo = new t.CylinderGeometry(UNITSIZE/3, UNITSIZE/3, UNITSIZE*6,1000);
        var woodmat = new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/wood.jpg')});
        var wood = new t.Mesh(woodgeo,woodmat);
        var leafgeo = new t.DodecahedronGeometry(UNITSIZE*2,1);
        var leafmat = new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/leaf.jpg')});
        var leaf = new t.Mesh(leafgeo,leafmat);
        wood.position.x = (i - units/2) * UNITSIZE;
        wood.position.y = UNITSIZE*3;
        wood.position.z = (j - units/2) * UNITSIZE;

        leaf.position.y = UNITSIZE*5;
        leaf.position.x = (i - units/2) * UNITSIZE;
        leaf.position.z = (j - units/2) * UNITSIZE;
        scene.add(leaf);


        scene.add(wood);
      }
      if (map[i][j]==3)
      {
        var woodgeo = new t.CylinderGeometry(UNITSIZE/4, UNITSIZE/4, UNITSIZE*6,1000);
        var woodmat = new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/wood.jpg')});
        var wood = new t.Mesh(woodgeo,woodmat);

        var leafgeo = new t.DodecahedronGeometry(UNITSIZE*2.5,1);
        var leafmat = new t.MeshLambertMaterial({color:0xffff00,map: t.ImageUtils.loadTexture('/images/leaf.jpg')});
        var leaf = new t.Mesh(leafgeo,leafmat);

        wood.position.x = (i - units/2) * UNITSIZE;
        wood.position.y = UNITSIZE*3;
        wood.position.z = (j - units/2) * UNITSIZE;
        scene.add(wood);

        leaf.position.y = UNITSIZE*5;
        leaf.position.x = (i - units/2) * UNITSIZE;
        leaf.position.z = (j - units/2) * UNITSIZE;
        scene.add(leaf);
      }
      if (map[i][j]==4)
      {
        var woodgeo = new t.CylinderGeometry(UNITSIZE/6, UNITSIZE/6, UNITSIZE*2,1000);
        var woodmat = new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/wood.jpg')});
        var wood = new t.Mesh(woodgeo,woodmat);

        var leafgeo = new t.DodecahedronGeometry(UNITSIZE/1.5,1);
        var leafmat = new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/leaf.jpg')});
        var leaf = new t.Mesh(leafgeo,leafmat);

        wood.position.x = (i - units/2) * UNITSIZE;
        wood.position.y = UNITSIZE;
        wood.position.z = (j - units/2) * UNITSIZE;
        scene.add(wood);

        leaf.position.y = UNITSIZE*1.7;
        leaf.position.x = (i - units/2) * UNITSIZE;
        leaf.position.z = (j - units/2) * UNITSIZE;
        scene.add(leaf);
      }

      if(map[i][j]==5)
    {

      var stonegeo = new t.DodecahedronGeometry(UNITSIZE/2 ,0);
      var stonemat = new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/rock4.jpg')});
      var stone = new t.Mesh(stonegeo,stonemat);
      stone.position.y = 0;
      stone.position.x = (i - units/2) * UNITSIZE;
      stone.position.z = (j - units/2) * UNITSIZE;

      stone.rotation.z = Math.random();
      scene.add(stone);

    }
    }
  }
  scene.add(spotLight);
  spotLight.target = floor;
}




//미니맵

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
  $('#intro, #hurt').css({width: WIDTH, height: HEIGHT,});
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
function distance1(x1, y1, x2, y2) {
  return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
function getMapSector(v) {
  var x = Math.floor((v.x + UNITSIZE / 2) / UNITSIZE + mapW/2);
  var z = Math.floor((v.z + UNITSIZE / 2) / UNITSIZE + mapW/2);
  return {x: x, z: z};
}
function checkWallCollision(v) {
  var c = getMapSector(v);
  return map[c.x][c.z] == 1;
}

///////////////////////////////////////////////////////////////////////////////////////
var object  = [];
var objectGeo = new t.CubeGeometry(2, 40, 30);
var objectGeo1 = new t.CubeGeometry(8, 50, 40);
var objectGeo2 = new t.CubeGeometry(4,8,10);
// var objectGeo3 = THREE.CSG.toCSG(new t.CylinderBufferGeometry(2, 2, 35, 6, 1, false, 0, 6.3),new THREE.Vector3(0,-10,0));
var objectGeo4 = new t.CubeGeometry(10,10,25);
var objectGeo3 = new t.CylinderBufferGeometry(2, 2, 35, 6, 1, false, 0, 6.3);
// var objectGeo5 = THREE.CSG.toCSG(new t.CylinderBufferGeometry(0, 2, 5, 6, 1, false, 0, 6.3));
// var geometry = objectGeo3.union(objectGeo5);
function setupobject () {
    addobject ();
}
/////////////////////////////////////////////////////////////////////////////////////
function addobject () {



  var materials = [
       new THREE.MeshBasicMaterial({
           map: THREE.ImageUtils.loadTexture('/images/book2-4.jpg')
       }),
       new THREE.MeshBasicMaterial({
           map: THREE.ImageUtils.loadTexture('/images/book2-2.jpg')
       }),
       new THREE.MeshBasicMaterial({
           map: THREE.ImageUtils.loadTexture('/images/book2-5.jpg')
       }),
       new THREE.MeshBasicMaterial({
           map: THREE.ImageUtils.loadTexture('/images/book2-5.jpg')
       }),
       new THREE.MeshBasicMaterial({
           map: THREE.ImageUtils.loadTexture('/images/book2-3.jpg')
       }),
       new THREE.MeshBasicMaterial({
           map: THREE.ImageUtils.loadTexture('/images/book2-1.jpg')
       })
    ];
  var c = getMapSector(cam.position);
  var o = new t.Mesh(objectGeo1,materials);
  do
  {
    var x = getRandBetween(0, mapW-1);
    var z = getRandBetween(0, mapH-1);
  } while (map[x][z] > 0 || (x == c.x && z == c.z));
  x = Math.floor(x - mapW/2) * UNITSIZE;
  z = Math.floor(z - mapW/2) * UNITSIZE;
  o.position.set(x, UNITSIZE * 0.15, z);
  o.lastRandomX = Math.random();
  o.lastRandomZ = Math.random();
  if(score==0){
  object.push(o);
  scene.add(o);
}
  var loader = new THREE.TextureLoader();
  var texture = loader.load('/images/note2.jpg');
  var materials2 = new t.MeshBasicMaterial({map:texture});
  var o1 = new t.Mesh(objectGeo,materials2);
  do
  {
    var x = getRandBetween(0, mapW-1);
    var z = getRandBetween(0, mapH-1);
  } while (map[x][z] > 0 || (x == c.x && z == c.z));
  x = Math.floor(x - mapW/2) * UNITSIZE;
  z = Math.floor(z - mapW/2) * UNITSIZE;
  o1.position.set(x, UNITSIZE * 0.15, z);
  o1.lastRandomX = Math.random();
  o1.lastRandomZ = Math.random();
  if(score==1){
  object.push(o1);
  scene.add(o1);
}

var materials5 = [
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/case4.jpg')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/case2.jpg')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/case3.jpg')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/case4.jpg')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/case5.jpg')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/case6.jpg')
     })
  ];
var c = getMapSector(cam.position);
var o5 = new t.Mesh(objectGeo4,materials5);
do
{
  var x = getRandBetween(0, mapW-1);
  var z = getRandBetween(0, mapH-1);
} while (map[x][z] > 0 || (x == c.x && z == c.z));
x = Math.floor(x - mapW/2) * UNITSIZE;
z = Math.floor(z - mapW/2) * UNITSIZE;
o5.position.set(x, UNITSIZE * 0.15, z);
o5.lastRandomX = Math.random();
o5.lastRandomZ = Math.random();
if(score==2){
object.push(o5);
scene.add(o5);
}

var materials4 = [
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/pencil2.png')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/pencil3.png')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/pencil4.png')
     })
  ];
// var texture1 = loader.load('/images/pencil2.png');
// var material = new THREE.MeshBasicMaterial( {map:texture1} );
var o3 = new THREE.Mesh( objectGeo3, materials4 );
var c = getMapSector(cam.position);
do
{
  var x = getRandBetween(0, mapW-1);
  var z = getRandBetween(0, mapH-1);
} while (map[x][z] > 0 || (x == c.x && z == c.z));
x = Math.floor(x - mapW/2) * UNITSIZE;
z = Math.floor(z - mapW/2) * UNITSIZE;
o3.position.set(x, UNITSIZE * 0.15, z);
o3.lastRandomX = Math.random();
o3.lastRandomZ = Math.random();
if(score==3){
object.push(o3);
scene.add(o3);
}


var materials3 = [
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/eraser4.png')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/eraser.png')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/eraser2.png')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/eraser5.png')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/eraser3.png')
     }),
     new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture('/images/eraser3.png')
     })
  ];
var c = getMapSector(cam.position);
var o2 = new t.Mesh(objectGeo2,materials3);
o2.opacity=0;
do
{
  var x = getRandBetween(0, mapW-1);
  var z = getRandBetween(0, mapH-1);
} while (map[x][z] > 0 || (x == c.x && z == c.z));
x = Math.floor(x - mapW/2) * UNITSIZE;
z = Math.floor(z - mapW/2) * UNITSIZE;
o2.position.set(x, UNITSIZE * 0.15, z);
o2.lastRandomX = Math.random();
o2.lastRandomZ = Math.random();
if(score==4){
object.push(o2);
scene.add(o2);
}
}
//Get a random integer between lo and hi, inclusive.
//Assumes lo and hi are integers and lo is lower than hi.
function getRandBetween(lo, hi) {
  return parseInt(Math.floor(Math.random()*(hi-lo+1))+lo, 10);
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
