/**
* @author mrdoob / http://mrdoob.com/
* @author alteredq / http://alteredqualia.com/
* @author paulirish / http://paulirish.com/
*
* Modified from default:
* - Added this.clickMove, which differentiates between mouse-looking and
*   click-to-move.
* - Changed camera movement in this.update() to respect wall collisions
* - Changed this.update() to use this.noFly to disallow going up/down with R/F
*/

var audioArray=new Array();
var audioArray3=new Audio('/sound/run2.mp3');
audioArray[0]= new Audio('/sound/step.mp3');
audioArray[1]= new Audio('/sound/step1.mp3');
audioArray[2]= new Audio('/sound/step2.mp3');
audioArray[3]= new Audio('/sound/step3.mp3');
audioArray[0].volume=0.1;
audioArray[1].volume=0.2;
audioArray[2].volume=0.3;
audioArray[3].volume=0.2;
audioArray3.volume=0.4;
var Run=0;
var move=0;
THREE.FirstPersonControls = function ( object,a,domElement ) {

  this.object = object;
  this.a=a;
  this.target = new THREE.Vector3( 0, 0, 0 );

  this.domElement = ( domElement !== undefined ) ? domElement : document;

  this.movementSpeed = 200;//////////////////////////////////////////////////////
  this.lookSpeed = 0.005;

  this.noFly = false;
  this.lookVertical = true;
  this.autoForward = false;

  this.activeLook = true;
  this.clickMove = false;

  this.heightSpeed = false;
  this.heightCoef = 1.0;
  this.heightMin = 0.0;

  this.constrainVertical = false;
  this.verticalMin = 0;
  this.verticalMax = Math.PI/3;

  this.autoSpeedFactor = 0.0;

  this.mouseX = 0;
  this.mouseY = 0;

  this.lat = 0;
  this.lon = 0;
  this.phi = 0;
  this.theta = 0;

  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;
  this.freeze = false;


  this.mouseDragOn = false;

  if ( this.domElement === document ) {

    this.viewHalfX = window.innerWidth / 2;
    this.viewHalfY = window.innerHeight / 2;

  } else {

    this.viewHalfX = this.domElement.offsetWidth / 2;
    this.viewHalfY = this.domElement.offsetHeight / 2;
    this.domElement.setAttribute( 'tabindex', -1 );

  }

  this.onMouseDown = function ( event ) {

    if ( this.domElement !== document ) {

      this.domElement.focus();

    }

    event.preventDefault();
    event.stopPropagation();

    if ( this.clickMove ) {

      switch ( event.button ) {

        case 0: this.moveForward = true; break;
        case 2: this.moveBackward = true; break;

      }

    }

    this.mouseDragOn = true;

  };

  this.onMouseUp = function ( event ) {

    event.preventDefault();
    event.stopPropagation();

    if ( this.clickMove ) {

      switch ( event.button ) {

        case 0: this.moveForward = false; break;
        case 2: this.moveBackward = false; break;

      }

    }

    this.mouseDragOn = false;

  };

  this.onMouseMove = function ( event ) {

    if ( this.domElement === document ) {

      this.mouseX = event.pageX - this.viewHalfX;
      this.mouseY = event.pageY - this.viewHalfY;

    } else {

      this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
      this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;

    }

  };

  this.onKeyDown = function ( event ) {

switch( event.keyCode ) {

  case 38: /*up*/
  case 87: /*W*/ this.moveForward = true; move=1;  break;

  case 37: /*left*/
  case 65: /*A*/ this.moveLeft = true; move=1; break;

  case 40: /*down*/
  case 83: /*S*/ this.moveBackward = true; move=1; break;

  case 39: /*right*/
  case 68: /*D*/ this.moveRight = true; move=1; break;

  case 82: /*R*/ this.moveUp = true; break;
  case 70: /*F*/ this.moveDown = true; break;

  case 81: /*Q*/
  this.freeze = !this.freeze;
  break;



  case 16: /*shift*/this.movementSpeed=300;
   move=1;
 Run=1;

  break;/////////////////////////////////
}

};

this.onKeyUp = function ( event ) {

  switch( event.keyCode ) {

    case 38: /*up*/
    case 87: /*W*/ this.moveForward = false; move=0;break;

    case 37: /*left*/
    case 65: /*A*/ this.moveLeft = false; move=0;break;

    case 40: /*down*/
    case 83: /*S*/ this.moveBackward = false; move=0;break;

    case 39: /*right*/
    case 68: /*D*/ this.moveRight = false; move=0;break;

    case 82: /*R*/ this.moveUp = false; break;
    case 70: /*F*/ this.moveDown = false; break;

    //case 77:/*M*/ this.freeze = false; document.getElementById('radar').style.display = "none"; break;



    case 16: /*shift*/ this.movementSpeed=200;
    // move=1;
  Run=0;
    break;//////////////////////////////////////////////
  }

};

this.update = function( delta ) {
  var actualMoveSpeed = 0;

  if ( this.freeze ) {

    return;

  } else {

    if ( this.heightSpeed ) {

      var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
      var heightDelta = y - this.heightMin;

      this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

    } else {

      this.autoSpeedFactor = 0.0;

    }

    actualMoveSpeed = delta * this.movementSpeed;

    if ( this.moveForward || ( this.autoForward && !this.moveBackward ) ) {
      move=1;
      if(this.movementSpeed==300){
        Run=1;
      audioArray3.play();
}
      else{
        var i=Math.floor(Math.random() * 4);
        audioArray[i].play();}
        this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
        if (checkWallCollision(this.object.position)) {
          this.object.translateZ( actualMoveSpeed + this.autoSpeedFactor+15 );
        }
        if (checkWallCollision2(this.object.position)) {
          this.object.translateZ( actualMoveSpeed + this.autoSpeedFactor+15 );
        }
        if (checkAICollision(this.object.position)) {
          this.object.translateZ( actualMoveSpeed + this.autoSpeedFactor+15 );
        }
        this.a.position.x=this.object.position.x;
        this.a.position.y=this.object.position.y;
        this.a.position.z=this.object.position.z;
      }
      if ( this.moveBackward ) {
        move=1;
        if(this.movementSpeed==300)
        audioArray3.play();
        else{
          var i=Math.floor(Math.random() * 4);
          audioArray[i].play();}
          this.object.translateZ( actualMoveSpeed );
          if (checkWallCollision(this.object.position)) {

            this.object.translateZ( - actualMoveSpeed-15 );
          }
          if (checkWallCollision2(this.object.position)) {
            this.object.translateZ( - actualMoveSpeed-15 );
          }
          if (checkAICollision(this.object.position)) {
            this.object.translateZ( - actualMoveSpeed-15 );
          }
          this.a.position.x=this.object.position.x;
          this.a.position.y=this.object.position.y;
          this.a.position.z=this.object.position.z;
        }


        if ( this.moveLeft ) {
          move=1;
          if(this.movementSpeed==300)
          audioArray3.play();
          else{
            var i=Math.floor(Math.random() * 4);
            audioArray[i].play();}
            this.object.translateX( - actualMoveSpeed );
            if (checkWallCollision(this.object.position)) {
              this.object.translateX( actualMoveSpeed+15 );
            }
            if (checkWallCollision2(this.object.position)) {
              this.object.translateX( actualMoveSpeed + this.autoSpeedFactor+15 );
            }
            if (checkAICollision(this.object.position)) {
              this.object.translateX( actualMoveSpeed+15 );
            }
            this.a.position.x=this.object.position.x;
            this.a.position.y=this.object.position.y;
            this.a.position.z=this.object.position.z;
          }
          if ( this.moveRight ) {
            move=1;
            if(this.movementSpeed==300)
            audioArray3.play();
            else{
              var i=Math.floor(Math.random() * 4);
              audioArray[i].play();}
              this.object.translateX( actualMoveSpeed );
              if (checkWallCollision(this.object.position)) {
                this.object.translateX( - actualMoveSpeed-15 );
              }
              if (checkWallCollision2(this.object.position)) {
                this.object.translateX( - actualMoveSpeed-15 );
              }
              if (checkAICollision(this.object.position)) {
                this.object.translateX( - actualMoveSpeed-15 );
              }
              this.a.position.x=this.object.position.x;
              this.a.position.y=this.object.position.y;
              this.a.position.z=this.object.position.z;
            }

            if (!this.noFly) {
              if ( this.moveUp ) {
                this.object.translateY( actualMoveSpeed );
                if (checkWallCollision(this.object.position)) {
                  this.object.translateY( - actualMoveSpeed );
                }
                if (checkWallCollision2(this.object.position)) {
                  this.object.translateY( actualMoveSpeed + this.autoSpeedFactor+20 );
                }
              }
              if ( this.moveDown ) {
                this.object.translateY( - actualMoveSpeed );
                if (checkWallCollision(this.object.position)) {
                  this.object.translateY( actualMoveSpeed );
                }
                if (checkWallCollision2(this.object.position)) {
                  this.object.translateY( actualMoveSpeed + this.autoSpeedFactor+20 );
                }
              }
              this.a.position.x=this.object.position.x;
              this.a.position.y=this.object.position.y;
              this.a.position.z=this.object.position.z;
            }

            var actualLookSpeed = delta * this.lookSpeed;

            if ( !this.activeLook ) {

              actualLookSpeed = 0;

            }

            this.lon += this.mouseX * actualLookSpeed;
            if( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed; // * this.invertVertical?-1:1;

            this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
            this.phi = ( 90 - this.lat ) * Math.PI / 180;
            this.theta = this.lon * Math.PI / 180;

            var targetPosition = this.target,
            position = this.object.position;

            targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
            targetPosition.y = position.y + 100 * Math.cos( this.phi );
            targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

          }

          var verticalLookRatio = 1;

          if ( this.constrainVertical ) {

            verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

          }

          this.lon += this.mouseX * actualLookSpeed;
          if( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

          this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
          this.phi = ( 90 - this.lat ) * Math.PI / 180;

          this.theta = this.lon * Math.PI / 180;

          if ( this.constrainVertical ) {

            this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

          }

          var targetPosition = this.target,
          position = this.object.position;

          targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
          targetPosition.y = position.y + 100 * Math.cos( this.phi );
          targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

          this.object.lookAt( targetPosition );

        };


        this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
        this.domElement.addEventListener( 'mousemove', bind( this, this.onMouseMove ), false );
        this.domElement.addEventListener( 'mousedown', bind( this, this.onMouseDown ), false );
        this.domElement.addEventListener( 'mouseup', bind( this, this.onMouseUp ), false );
        this.domElement.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );
        this.domElement.addEventListener( 'keyup', bind( this, this.onKeyUp ), false );

        function bind( scope, fn ) {

          return function () {

            fn.apply( scope, arguments );

          };

        };

      };
