var audioArray2=new Array();
var audio=new Audio('/sound/africa3.mp3');
audio.loop=true;
audio.volume=0.5;
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
MOVESPEED = 200,
LOOKSPEED = 0.05,
BULLETMOVESPEED = 1200,
NUMAI = 5,
NUMOBJECT  = 1,
PROJECTILEDAMAGE = 20;
// Global vars
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
var step = 0;
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
      setInterval(drawRadar, 1000);
      animate();
    });
  });
});


// Setup
function init() {
  clock = new t.Clock(); // Used in render() for controls.update()
  projector = new t.Projector(); // Used in bullet projection
  scene = new t.Scene(); // Holds all objects in the canvas
  scene.fog = new t.FogExp2(0x000000, 0.0015); // color, density

  // Set up camera
  cam = new t.PerspectiveCamera(60, ASPECT, 1, 10000); // FOV, aspect, near, far
  cam.position.y = UNITSIZE *0.4 ;
  scene.add(cam);


  var pointlight = new t.PointLight(0xF7EFBE,2.5,1000,2);
  pointlight.position.y = UNITSIZE*0.4;
  scene.add(pointlight);
  var sphereSize = 1;
  var pointLightHelper = new THREE.PointLightHelper( pointlight, sphereSize );
  scene.add( pointLightHelper );

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
  setupobject();

  // Handle drawing as WebGL (faster than Canvas but less supported)
  renderer = new t.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);

  // Add the canvas to the document
  renderer.domElement.style.backgroundColor = '#00fddd'; // 뚜껑덮어서 딱히 의미 없음
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

  // Display HUD   <img src="images/다이아.png" id = "jewel">      Stamina:<span id="Stamina">10</span>/10<br/>
  $('body').append('<canvas id="radar" width="200" height="200"></canvas>');
  $('body').append('<div id="hud"><p>체력:<span id="health">100</span>/100<br />코발트:<span id="score">0</span>/5<br/>돌:<span id="Bullet">50</span>/50<br/></p></div>');
  // Set up "hurt" flash
  $('body').append('<div id="hurt"></div>');
  $('#hurt').css({width: WIDTH, height: HEIGHT,});
}

function animate() {
  if (runAnim) { //안디져 있다면??
    requestAnimationFrame(animate); //움직임
  }
  render();
}


function render() { //화면에 렌더링 하는 부분인데 진작에 이렇게 해야 했음
  var delta = clock.getDelta(), speed = delta * BULLETMOVESPEED;
  $('#health').html(health);
  $('#Bullet').html(countbullet);

  controls.update(delta); // Move camera
  for (var i = object.length-1; i >= 0; i--) {/////////////////////////
    var a = object[i];
    step+=0.05;
    a.position.y =60+ ( 50 * Math.abs(Math.sin(step)));

    object[i].rotation.x += 0.05;
    object[i].rotation.y += 0.05;

    // Allow picking it up once per minute

    if (distance(cam.position.x,cam.position.z,a.position.x,a.position.z) < 15)
    {
      scene.remove(a);
      if(score!=4)
      cobalt.play();
      object.shift();
      score=score+1;
      $('#score').html(score);///////////////////////////
      addobject();
    }
    else
    {
    }
  }
  renderer.render(scene, cam); // Repaint

  // Death
  if (health <=0) {
    runAnim = false;
    $(renderer.domElement).fadeOut(2500);
    $('#radar, #hud, #credits').fadeOut(2500);
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


  if(score==5)
  {

    audio.pause();
    audio3.play();
    runAnim = false;
    setInterval(function(){
      // audio3.pause();
      // audio2.play();
      $(renderer.domElement).fadeOut(2500);
      $('#radar, #hud, #credits').fadeOut(2500);
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
        location.href="http://54.70.8.39:3000/gameProject/Stage3";
      });
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
  }

  //장면 만들기

  function setupScene() {

    var UNITSIZE = 250, units = mapW;
    var loader = new THREE.TextureLoader();
    var texture = loader.load('/images/rock8.jpg',function(texture){
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0,0);
      texture.repeat.set(20,20);
    })
    var floor = new t.Mesh(
      new t.CubeGeometry(units * UNITSIZE,1, units * UNITSIZE),
      new t.MeshPhongMaterial({map:texture/* t.ImageUtils.loadTexture('images/stone.jpg')*/})
    );
    scene.add(floor);

  var ceiling = new t.Mesh(
    new t.CubeGeometry(units * UNITSIZE, 10, units * UNITSIZE),/////////////////////////////////////천장
    new t.MeshLambertMaterial({map:texture })
  );
  ceiling.position.y = UNITSIZE*1.5;
  scene.add(ceiling);
  // Geometry: 벽
  var cube = new t.CubeGeometry(UNITSIZE, WALLHEIGHT, UNITSIZE);
  var materials = [
    new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/rock5.jpg')}),
    new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/rock4.jpg')}),
    new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/rock.jpg')}),
  ];
  for (var i = 0; i < mapW; i++) {
    for (var j = 0, m = map[i].length; j < m; j++) {
      if (map[i][j]!=0 && map[i][j]!=2)
      {
        var wall = new t.Mesh(cube, materials[map[i][j]-1]);
        wall.position.x = (i - units/2) * UNITSIZE;
        wall.position.y = WALLHEIGHT/2;
        wall.position.z = (j - units/2) * UNITSIZE;
        scene.add(wall);
      }
    }
  }
  ///////////// 빛
  var directionalLight1 = new t.DirectionalLight( 0xF7EFBE, 0.2 );
  directionalLight1.position.set( 0.5, 1, 0.5 );
  scene.add( directionalLight1 );

  var directionalLight2 = new t.DirectionalLight( 0xF7EFBE, 0.2 );
  directionalLight2.position.set( -0.5, -1, -0.5 );
  scene.add( directionalLight2 );
}


var ai = [];
var aiGeo = new t.CubeGeometry(UNITSIZE, WALLHEIGHT, UNITSIZE/5);
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
  var aiMaterial = new t.MeshLambertMaterial({map: t.ImageUtils.loadTexture('/images/rock9.png')});

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
o.position.set(x, WALLHEIGHT/2, z+aipostion);
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
function drawRadar() {
  var c = getMapSector(cam.position), context = document.getElementById('radar').getContext('2d');
  context.font = '10px Helvetica';
  for (var i = 0; i < mapW; i++) {
    for (var j = 0, m = map[i].length; j < m; j++) {
      var d = 0;
      var g=0;
      for (var k = 0, n = object.length; k < n; k++) {
        var e = getMapSector(object[k].position);
        if (i == e.x && j == e.z)
        {
          d=d+1;
        }

      }
      for (var k = 0, n = ai.length; k < n; k++) {
        var h = getMapSector(ai[k].position);
        if (i == h.x && j == h.z)
        {
          g=g+1;
        }

      // if(map[h.x][h.z]==0)
      // {
      //   context.fillStyle = '#ffffff';
      //   context.fillRect(h.x * 10, h.z * 10, (h.x+1)*10, (h.z+1)*10);
      // }
    }
      /////숫자를 200에 가로세로를 나누기
      if (i == c.x && j == c.z && d == 0 && g==0) {
        context.fillStyle = '#FF0000';
        context.fillRect(i * 10, j * 10, (i+1)*10, (j+1)*10);
      }
      // else if (i == c.x && j == c.z) {
      //   context.fillStyle = '#AA33FF';
      //   context.fillRect(i * 10, j * 10, (i+1)*10, (j+1)*10);
      //   context.fillStyle = '#000000';
      //   context.fillText(''+d, i*10+8, j*10+12);
      // }


      else if (g > 0) {
        context.fillStyle = '#FFFF00';
        context.fillRect(i * 10, j * 10, (i+1)* 10, (j+1)* 10);
        // context.fillStyle = '#000000';
        // context.fillText(''+g, i*10+8, j*10+12);
      }
      else if (map[i][j]>0) {
        context.fillStyle = '#787878';
        context.fillRect(i * 10, j * 10, (i+1)* 10, (j+1)*10);
      }
      // for(var t=0; t<ai.length; t++){
      //   if(ai[t].health<0){
      //     context.fillStyle = '#ffffff';
      //     context.fillRect(i * 10, j * 10, (i+1)*10, (j+1)*10);
      //   }
      // }
      else {
        context.fillStyle = '#ffffff';
        context.fillRect(i * 10, j * 10, (i+1)*10, (j+1)*10);
      }

      if((i>=c.x+4||i<=c.x-4)||(j>=c.z+4||j<=c.z-4))
      {
        context.fillStyle = '#000000';
        context.fillRect(i * 10, j * 10, (i+1)*10, (j+1)*10);
      }
      if (d > 0 && d < 10) {
        context.fillStyle = '#0000FF';
        context.fillRect(i * 10, j * 10, (i+1)* 10, (j+1)* 10);
        context.fillStyle = '#000000';
        context.fillText(''+d, i*10+8, j*10+12);
      }
    }
  }
}
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
var object  = [];
var objectGeo = new t.CubeGeometry(40, 40, 40);
function setupobject () {
  for (var i = 0; i < NUMOBJECT; i++) {
    addobject ();
  }
}
/////////////////////////////////////////////////////////////////////////////////////
function addobject () {
  var c = getMapSector(cam.position);
  var objectMaterial = new t.MeshBasicMaterial({map: t.ImageUtils.loadTexture('/images/blue.jpg')});
  var obgeo = new t.OctahedronGeometry(25);
  var o = new t.Mesh(obgeo,objectMaterial);
  do
  {
    var x = getRandBetween(0, mapW-1);
    var z = getRandBetween(0, mapH-1);
  } while (map[x][z] > 0 || (x == c.x && z == c.z));
  x = Math.floor(x - mapW/2) * UNITSIZE;
  z = Math.floor(z - mapW/2) * UNITSIZE;
  o.position.set(x, UNITSIZE * 0.15, z);
  //o.path = getAIpath(o);
  o.health = 100;
  o.lastRandomX = Math.random();
  o.lastRandomZ = Math.random();
  object.push(o);
  scene.add(o);
}
//Get a random integer between lo and hi, inclusive.
//Assumes lo and hi are integers and lo is lower than hi.
function getRandBetween(lo, hi) {
  return parseInt(Math.floor(Math.random()*(hi-lo+1))+lo, 10);
}
var bullets = [];
var loader1 = new THREE.TextureLoader();
var texture1 = loader1.load('/images/rock2.jpg');
var sphereMaterial = new t.MeshBasicMaterial({map:texture1});
var sphereGeo = new t.DodecahedronGeometry(6 ,0);
function createBullet(obj) {
  if (obj === undefined) {
    obj = cam;
  }
  if(count<=50){
    var sphere = new t.Mesh(sphereGeo, sphereMaterial);
    sphere.position.set(obj.position.x, obj.position.y * 1.1, obj.position.z);

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
