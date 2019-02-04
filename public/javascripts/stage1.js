var audioArray2=new Array();
var audio=new Audio('/sound/rain.mp3');
audio.loop=true;
audio.volume=0.3;
audioArray2[0]= new Audio('/sound/hit1.mp3');
audioArray2[1]= new Audio('/sound/hit2.mp3');
audioArray2[2]= new Audio('/sound/hit3.mp3');
var audio2= new Audio('/sound/backSound.mp3');
var audio3= new Audio('/sound/clear.mp3');
audio3.volume=0.4;
var beat=new Audio('/sound/Hearbeat2.mp3');
beat.volume=1.0;
var cobalt = new Audio('/sound/cobalt.mp3');
var map =
[//0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19
  [1,1,1,1,1,1,1,1,1,1,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ],//0
  [1,0,1,0,0,0,0,0,0,0,3 ,0 ,0 ,0 ,3 ,0 ,0 ,0 ,0 ,1 ],//1
  [1,0,1,0,1,1,1,1,1,0,3 ,0 ,3 ,0 ,3 ,0 ,1 ,1 ,0 ,1 ],//2
  [1,0,1,3,1,0,0,1,0,0,0 ,0 ,3 ,0 ,0 ,0 ,1 ,0 ,0 ,1 ],//1
  [1,0,0,2,0,0,0,3,3,1,1 ,1 ,3 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ],//4
  [1,1,1,1,0,3,0,3,0,2,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ],//5
  [1,0,1,0,0,3,0,3,0,1,1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ],//6
  [1,0,1,0,1,3,0,0,0,1,0 ,0 ,1 ,0 ,1 ,0 ,1 ,0 ,0 ,1 ],//7
  [1,0,1,0,1,0,1,1,1,1,1 ,0 ,3 ,0 ,1 ,0 ,1 ,1 ,1 ,1 ],//8
  [1,0,1,0,1,0,0,0,0,0,0 ,0 ,3 ,0 ,2 ,0 ,0 ,0 ,0 ,1 ],//9
  [1,0,0,0,0,0,1,0,3,0,0 ,0 ,3 ,0 ,1 ,0 ,1 ,1 ,1 ,1 ],//10
  [1,1,1,3,3,3,3,3,3,0,0 ,0 ,3 ,0 ,1 ,0 ,0 ,0 ,0 ,3 ],//11
  [1,0,3,0,0,0,3,0,0,0,1 ,1 ,3 ,0 ,1 ,3 ,3 ,3 ,0 ,3 ],//12
  [1,0,3,0,1,0,0,0,1,0,2 ,0 ,3 ,0 ,1 ,0 ,0 ,0 ,0 ,3 ],//11
  [1,0,3,0,1,1,1,1,1,1,1 ,0 ,3 ,0 ,1 ,0 ,3 ,0 ,0 ,3 ],//14
  [1,0,3,0,1,0,0,0,0,1,0 ,0 ,0 ,0 ,1 ,0 ,3 ,0 ,3 ,1 ],//15
  [1,0,0,0,1,0,1,1,0,0,0 ,3 ,3 ,3 ,3 ,0 ,3 ,0 ,0 ,1 ],//16
  [1,1,1,1,1,1,1,0,0,3,3 ,3 ,0 ,0 ,0 ,0 ,3 ,3 ,0 ,1 ],//17
  [1,0,0,0,0,0,0,0,0,2,0 ,0 ,0 ,1 ,0 ,0 ,1 ,0 ,0 ,1 ],//18
  [1,1,1,1,1,1,1,1,1,1,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ],//19
],
mapW = map.length, mapH = map[0].length;
// Semi-constants
var WIDTH = window.innerWidth,
HEIGHT = window.innerHeight,
ASPECT = WIDTH / HEIGHT,
UNITSIZE = 250,
WALLHEIGHT = UNITSIZE*1.5,//////////////////////////////////
MOVESPEED = 230,
LOOKSPEED = 0.05,
BULLETMOVESPEED = 1200,
NUMAI = 5,
PROJECTILEDAMAGE = 20;
// window vars
var t = THREE, scene, cam, renderer, controls, clock, projector, model, skin;
var runAnim = true, mouse = { x: 0, y: 0 }, score = 0; //runAnim이거는 약간 목숨같은 느낌
var health = 100;
var count=0; //총알 수
var countbullet=50 //
var cnt=0 //이거는 타이머 카운트
var run = 0; //0은 안달림 1은 달림
var Stamina = 10;
var MaxStamina = 10;
var aicnt;
var aix=[];
var aiz=[];
var sky, sunSphere;
var phi;
var theta;
var distanceS = 400000;
var step = 0;
var check=0;
var object  = [];
var object2 = [];
var objectMaterial = new t.MeshBasicMaterial({map: t.ImageUtils.loadTexture('/images/podae2.jpg')});
// var obgeo = new t.OctahedronGeometry(35,1);
// var obgeo = new t.DodecahedronBufferGeometry(30, 0)
var obgeo = new t.SphereBufferGeometry(40, 8, 4, 3, 6.3, 6, 3.5);
function msg_time()
{
  if(health==50)
  {
    audio.pause();
    beat.play();
    $('body').append('<div class="warning"><p>체력이 얼마 없습니다. 체력이 더 빨리 감소합니다.</p></div>');
  }
  beat.onended=function(){
    audio.play();
    $('.warning').fadeOut(1000);
  }

  if(move==1){
    if(health>50){
      if(Run==1){
        run=run+1;
        if(run==3) //5초에 Hp1 깎임
        {
          if(health>0)
          {
            health=health-1;
            run=0;
          }
        }
      }
    if(Run==0) {
        cnt=cnt+1;
        if(cnt==5) //5초에 Hp1 깎임
        {
          if(health>0)
          {
            health=health-1;
            cnt=0;
          }
        }
      }
  }
    if(health<=50){
      if(Run==1){
        run=run+1;
        if(run==1) //5초에 Hp1 깎임
        {
          if(health>0)
          {
            health=health-1;
            run=0;
          }
        }
      }
      if(Run==0){
        cnt=cnt+1;
        if(cnt==3) //5초에 Hp1 깎임
        {
          if(health>0)
          {
            health=health-1;
            cnt=0;
          }
        }
      }
    }
  }
  if(move!=1){
    cnt=cnt+1;
    if(cnt==7) //5초에 Hp1 깎임
    {
      if(health>0)
      {
        health=health-1;
        cnt=0;
      }
    }
  }
  }
function TimerStart2(){
  tid2=setInterval('msg_time()',1000);
};
$(document).ready(function() {
  $('body').append('<div id="intro2">Click to start</div>');
  $('#intro2').css({width: WIDTH, height: HEIGHT}).one('click', function(e) {
    $(this).fadeOut(500);
    $('body').append('<div id="intro">Click to start</div>');

    $('#intro').css({width: WIDTH, height: HEIGHT}).one('click', function(e) {
      e.preventDefault();
      $(this).fadeOut();
      init();
      TimerStart2();
      audio.play();
    render();
    });
  });
});
// var spotColor = "#ffffff";
// var spotLight = new THREE.SpotLight(spotColor);
// spotLight.castShadow = true;
// spotLight.distanceS=0;
// spotLight.angle = Math.PI/2;

function initSky() {
  // Add Sky Mesh
  sky = new THREE.Sky();
  scene.add( sky.mesh );
  // Add Sun Helper
  sunSphere = new THREE.Mesh
  (
    new THREE.SphereBufferGeometry( 2000, 16, 8 ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } )
  );
  sunSphere.position.y =  7000;
  sunSphere.visible = false;
  scene.add( sunSphere );
  /// GUI
  var effectController  = {
    turbidity: 5,
    rayleigh: 2,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    luminance: 1.1,
    inclination: 0.49, // elevation / inclination
    azimuth: 0.25, // Facing front,
    sun:  true
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
    sunSphere.position.x = distanceS * Math.cos( phi );
    sunSphere.position.y = distanceS * Math.sin( phi ) * Math.sin( theta );
    sunSphere.position.z = distanceS * Math.sin( phi ) * Math.cos( theta );
    sunSphere.visible = effectController.sun;
    sky.uniforms.sunPosition.value.copy( sunSphere.position );
    renderer.render( scene, cam );
  }
  guiChanged();
}
// Setup
function init() {
  clock = new t.Clock(); // Used in render() for controls.update()
  projector = new t.Projector(); // Used in bullet projection
  scene = new t.Scene(); // Holds all objects in the canvas
  scene.fog = new t.FogExp2(0xc1bfbf, 0.0001); // color, density

  // var cloud = new THREE.Cloud( 0xeeeeee );
  // cloud.scale.set( 3, 3, 3 );
  // cloud.position.set( 0, 200, 0 );
  // cloud.rotation.set( Math.PI * 0.25, Math.PI * 0.5, 0 );
  // scene.add( cloud );
  // Set up camera
  cam = new t.PerspectiveCamera(60, ASPECT, 1, 1000000); // FOV, aspect, near, far
  cam.position.y = UNITSIZE *0.4 ;
  scene.add(cam);


  var pointlight = new t.PointLight(0xF7EFBE,3,1000,2);
  pointlight.position.y = UNITSIZE*0.4;
  scene.add(pointlight);

  // var sphereSize = 1;
  // var pointLightHelper = new THREE.PointLightHelper( pointlight, sphereSize );
  // scene.add( pointLightHelper );

  // Camera moves with mouse, flies around with WASD/arrow keys
  controls = new t.FirstPersonControls(cam,pointlight);
  controls.movementSpeed = MOVESPEED;
  controls.lookSpeed = LOOKSPEED;
  controls.lookVertical = false; // Temporary solution; play on flat surfaces only
  controls.noFly = true;


  // World objects
  setupScene();

  setupAI();
  // Artificial Intelligence\
  addobject ();

  // Handle drawing as WebGL (faster than Canvas but less supported)
  renderer = new t.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);

  // Add the canvas to the document

  document.body.appendChild(renderer.domElement);

  // Track mouse position so we know where to shoot
  document.addEventListener('mousemove', onDocumentMouseMove, false );

  // Shoot on click
  $(document).click(function(e) {
    e.preventDefault;
    if (e.which === 1) { // Left click only
      count++;
      if(count>0){/*수정*/
        createBullet();

        countbullet=51-count;
        if(countbullet<=0)
        {
          countbullet=0;
        }
      }
    }

  });



  $('body').append('<div id="hud"><p>체력:<span id="health">100</span>/100<br />작업 수:<span id="score">0</span>/5<br/>돌:<span id="Bullet">50</span>/50<br/></p></div>');
  // Set up "hurt" flash
  $('body').append('<div id="hurt"></div>');
  $('#hurt').css({width: WIDTH, height: HEIGHT,});
    initSky();
}



function render() { //화면에 렌더링 하는 부분인데 진작에 이렇게 해야 했음
  var delta = clock.getDelta(), speed = delta * BULLETMOVESPEED;
  $('#health').html(health);
  $('#Bullet').html(countbullet);

  controls.update(delta);
  // Move camera
  // var burd = new t.Mesh(obgeo,objectMaterial);
  // burd.position.set(cam.position.x, UNITSIZE * 0.25, cam.position.z);
  // cam.add(burd);
// scene.add(burd);

  for (var i = 0; i <object.length; i++) {/////////////////////////
    var thing = object[i];
    var pointT=object2[i];

    step+=0.05;

    pointT.position.y=300;
    object2[i].rotation.y += 0.05;

    if (distance(cam.position.x,cam.position.z,thing.position.x,thing.position.z) < 15)
    {
      scene.remove(thing);
      scene.remove(pointT);
      object.shift();
      object2.shift();
      check++;
      if(check%2==0)
      {
        cobalt.play();
        score=score+1;
        $('#score').html(score);
        controls.movementSpeed = MOVESPEED;
        var burden = new t.Mesh(obgeo,objectMaterial);
        burden.position.set(thing.position.x+20, UNITSIZE * 0.14, thing.position.z);
        scene.add(burden);
        addobject();
      }
      else{
        cobalt.play();
          controls.movementSpeed = MOVESPEED-100;

        addDest();
      }
    }
  }
  renderer.render(scene, cam); // Repaint

  // Death
  if (health <=0) {
    runAnim = false;
    $(renderer.domElement).fadeOut(2500);
    $('#hud, #credits').fadeOut(2500);
    setInterval(function(){
      $('body').append('<div id="fail"></div>');
      $('#fail').css({width: WIDTH, height: HEIGHT}).one('click', function() {
        location = location;
      });
    }, 1500);
    setInterval(function(){
      if(audio.volume-0.1 >0.0 ){
        audio.volume-=0.1;
      }
      else{
        audio.pause();
      }
    }, 2000);
  }


  if(score==3)
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
        location.href="http://54.70.8.39:3000/gameProject/Stage2";
      })
    }, 3500);
  }

  for (var i = bullets.length-1; i >= 0; i--) {
    var b = bullets[i], p = b.position, d = b.ray.direction;
    if (checkWallCollision(p)) {
      bullets.splice(i, 1);
      scene.remove(b);
      continue;
    }
    if (checkWallCollision2(p)) {
      bullets.splice(i, 1);
      scene.remove(b);
      continue;
    }
    // Collide with AI
    var hit = false;
    for (var j = ai.length-1; j >= 0; j--) {
      var a = ai[j];
      if(a.health>0){
      var v = a.geometry.vertices[0];
      var c = a.position;
      var x = Math.abs(v.x), z = Math.abs(v.z);
      //console.log(Math.round(p.x), Math.round(p.z), c.x, c.z, x, z);
      if (p.x < c.x + x && p.x > c.x - x &&
        p.z < c.z + z && p.z > c.z - z &&
        b.owner != a) {
          bullets.splice(i, 1);
          scene.remove(b);
          a.health -= PROJECTILEDAMAGE;

          var color = a.material.color, percent = a.health / 100;
          a.material.color.setRGB(
            percent * color.r,
            percent * color.g,
            percent * color.b
          );
          hit = true;
          var j=Math.floor(Math.random() * 3);
          audioArray2[j].play();
          break;
         }
        }
      }

      if (!hit)
      {
        b.translateX(speed * d.x);
        //bullets[i].translateY(speed * bullets[i].direction.y);
        b.translateZ(speed * d.z);
      }
    }

    // Update AI.
    for (var i = 0; i <ai.length; i++) {
      if (ai[i].health <= 0) {
        var aiposx = aix[i];
        var aiposz = aiz[i];
        scene.remove(ai[i]);
        map[aiposx][aiposz]=0;
      }
    }
  //   theta -=0.0003;
  //
  // sunSphere.position.y = distanceS * Math.sin( phi ) * Math.sin( theta );
  // sunSphere.position.z = distanceS * Math.sin( phi ) * Math.cos( theta );
  // sky.uniforms.sunPosition.value.copy( sunSphere.position );
  // spotLight.position.y = distanceS * Math.sin( phi ) * Math.sin( theta );
  // spotLight.position.z = distanceS * Math.sin( phi ) * Math.cos( theta );
    if (runAnim) { //안디져 있다면??
      requestAnimationFrame(render); //움직임
    }
    renderer.render(scene, cam);
  }

  //장면 만들기

  function setupScene() {

    var UNITSIZE = 250, units = mapW;
    var loader = new THREE.TextureLoader();
    var texture = loader.load('/images/sand1.jpg',function(texture){
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0,0);
      texture.repeat.set(10,10);
    })
    var floor = new t.Mesh(
      new t.CubeGeometry(units * UNITSIZE,1, units * UNITSIZE),
      new t.MeshPhongMaterial({map:texture/* t.ImageUtils.loadTexture('images/stone.jpg')*/})
    );
    scene.add(floor);

  // Geometry: 벽
  var cube = new t.CubeGeometry(UNITSIZE, WALLHEIGHT/3, UNITSIZE);
  var materials = [
    new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/sand5.jpg')}),
    new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/sand4.jpg')}),
    new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/sand5.jpg')}),
  ];
  for (var i = 0; i < mapW; i++) {
    for (var j = 0, m = map[i].length; j < m; j++) {
      if (map[i][j]!=0 && map[i][j]!=2)
      {
        var wall = new t.Mesh(cube, materials[map[i][j]-1]);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = WALLHEIGHT/8;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
    }
  }
}


var ai = [];
var aiGeo = new t.CubeGeometry(UNITSIZE, WALLHEIGHT/3, UNITSIZE/5);
function setupAI() {
  for (var i = 0; i < NUMAI; i++) {
    aicnt=i;
    addAI();

  }
}

//부서지는벽생성
function addAI() {
  var c = getMapSector(cam.position);
  var aiposition;
  var aiMaterial = new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/sand6.jpg')});

  var o = new t.Mesh(aiGeo, aiMaterial);
if(aicnt ==0){
  aix[0]=4;
  aiz[0]=3;
  aipostion=100;
}
else if(aicnt==1){
  aix[1]=5;
  aiz[1]=9;
  aipostion=-100;
}
else if(aicnt==2){
  aix[2]=9;
  aiz[2]=14;
  aipostion=-100;
}
else if(aicnt==3){
  aix[3]=18;
  aiz[3]=9;
  aipostion=-100;
}
else if(aicnt==4){
  aix[4]=13;
  aiz[4]=10;
  aipostion=-100;
}
var x = Math.floor(aix[aicnt] - mapW/2) * UNITSIZE;
var z = Math.floor(aiz[aicnt] - mapW/2) * UNITSIZE;
o.position.set(x, WALLHEIGHT/8, z+aipostion);
o.health = 100;
o.pathPos = 1;
o.lastRandomX = Math.random();
o.lastRandomZ = Math.random();
ai.push(o);
scene.add(o);
}


function getAIpath(a) {
  var p = getMapSector(a.position);
  do { // Cop-out
    do {
      var x = getRandBetween(0, mapW-1);
      var z = getRandBetween(0, mapH-1);
    } while (map[x][z] > 0 || distance(p.x, p.z, x, z) < 3);
    var path = findAIpath(p.x, p.z, x, z);
  } while (path.length == 0);
  return path;
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
  return map[c.x][c.z] == 1;
}
function checkWallCollision2(v) {
  var c = getMapSector(v);
  return map[c.x][c.z] == 3;
}
function checkAICollision(v) {
  var c = getMapSector(v);
  return map[c.x][c.z] == 2;
}
///////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////
function addobject () {
  var c = getMapSector(cam.position);
  var pointGeo = new THREE.CylinderGeometry(25, 1, 40, 4, 1, false, 6, 6.3)
  var pointMe = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  var o = new t.Mesh(obgeo,objectMaterial);
  var point = new THREE.Mesh( pointGeo, pointMe );
  do
  {
    var x = getRandBetween(0, mapW-1);
    var z = getRandBetween(0, mapH-1);
  } while (map[x][z] > 0 || (x == c.x && z == c.z));
  x = Math.floor(x - mapW/2) * UNITSIZE;
  z = Math.floor(z - mapW/2) * UNITSIZE;
  o.position.set(x, UNITSIZE * 0.15, z);
  point.position.set(x, UNITSIZE * 2, z);
  //o.path = getAIpath(o);
  o.health = 100;
  o.lastRandomX = Math.random();
  o.lastRandomZ = Math.random();
  point.lastRandomX = Math.random();
  point.lastRandomZ = Math.random();
  object.push(o);
  scene.add(o);
  object2.push(point);
  scene.add(point);
}
function addDest () {
  var c = getMapSector(cam.position);
  var destGeo = new THREE.CylinderGeometry(90, 90, 1, 64, 1, false, 6, 6.3)
  var destMe = new THREE.MeshBasicMaterial( {color: 0xff0000} );
  var destPointGeo = new THREE.CylinderGeometry(25, 1, 40, 4, 1, false, 6, 6.3)
  var destPointMe = new THREE.MeshBasicMaterial( {color: 0xff0000} );
  // var obgeo = new t.OctahedronGeometry(35,1);
  var dest = new t.Mesh(destGeo,destMe);
  var destPoint = new THREE.Mesh( destPointGeo, destPointMe );
  do
  {
    var x = getRandBetween(0, mapW-1);
    var z = getRandBetween(0, mapH-1);
  } while (map[x][z] > 0 || (x == c.x && z == c.z));
  x = Math.floor(x - mapW/2) * UNITSIZE;
  z = Math.floor(z - mapW/2) * UNITSIZE;
  dest.position.set(x, 10, z);
  destPoint.position.set(x, UNITSIZE * 2, z);
  //o.path = getAIpath(o);
  dest.health = 100;
  dest.lastRandomX = Math.random();
  dest.lastRandomZ = Math.random();
  destPoint.lastRandomX = Math.random();
  destPoint.lastRandomZ = Math.random();
  object.push(dest);
  scene.add(dest);
  object2.push(destPoint);
  scene.add(destPoint);
}
//Get a random integer between lo and hi, inclusive.
//Assumes lo and hi are integers and lo is lower than hi.
function getRandBetween(lo, hi) {
  return parseInt(Math.floor(Math.random()*(hi-lo+1))+lo, 10);
}
var bullets = [];
var loader1 = new THREE.TextureLoader();
var texture1 = loader1.load('/images/sand2.jpg');
var sphereMaterial = new t.MeshBasicMaterial({map:texture1});
var sphereGeo = new t.DodecahedronGeometry(6 ,0);
function createBullet(obj) {
  if (obj === undefined) {
    obj = cam;
  }
  if(count<=50){
    var sphere = new t.Mesh(sphereGeo, sphereMaterial);
    sphere.position.set(obj.position.x, obj.position.y * 1, obj.position.z);

    if (obj instanceof t.Camera) {
      var vector = new t.Vector3(mouse.x, mouse.y, 1);
      projector.unprojectVector(vector, obj);
      sphere.ray = new t.Ray(
        obj.position,
        vector.sub(obj.position).normalize()
      );
    }
    else {
      var vector = cam.position.clone();
      sphere.ray = new t.Ray(
        obj.position,
        vector.sub(obj.position).normalize()
      );
    }
    sphere.owner = obj;

    bullets.push(sphere);
    scene.add(sphere);

    return sphere;
  }
  else if(count>50){
    scene.remove(sphere);
  }
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
