'use strict';


const SPEED = 50.0;
const JUMP_VELOCITY = 35.0;

class CharacterControls {
  constructor(cameraYaw, cameraPitch) {
    this.cameraYaw = cameraYaw;
    this.cameraPitch = cameraPitch;
    this.controlsEnabled = true;
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
  }

  onKeyDown (event) {
    console.log("onkeydown " + event.keyCode);
      switch (event.keyCode) {
          case 38: // up
          case 87: // w
            console.log(this)
            console.log(this.moveforward)
            this.moveForward = true;
            break;
          case 37: // left
          case 65: // a
            this.moveLeft = true;
            break;
          case 40: // down
          case 83: // s
            this.moveBackward = true;
            break;
          case 39: // right
          case 68: // d
            this.moveRight = true;
            break;
          case 16: // shift
            this.moveUp = true;
            break;
          case 17: // control
            this.moveDown = true;
            break
          case 32: // space
            if (this.canJump === true) this.velocity.y += JUMP_VELOCITY;
            this.canJump = false;
            break;
      }
  };

  onKeyUp (event) {
    console.log("onkeyup " + event.keyCode);
      switch (event.keyCode) {
          case 38: // up
          case 87: // w
              console.log(this)
              console.log(this.moveforward)
              this.moveForward = false;
              break;
          case 37: // left
          case 65: // a
              this.moveLeft = false;
              break;
          case 40: // down
          case 83: // s
              this.moveBackward = false;
              break;
          case 39: // right
          case 68: // d
              this.moveRight = false;
              break;
          case 16: // shift
            this.moveUp = false;
            break;
          case 17: // control
            this.moveDown = false;
            break
      }
  };


  registerKeyEvents(){
    var x = this;
    document.addEventListener('keydown', function(event) { x.onKeyDown(event) }, false);
    document.addEventListener('keyup', function(event) { x.onKeyUp(event) }, false);
    console.log("key events registered");
  }

  update(deltaTime){
    if (!this.controlsEnabled) {
      return;
    }

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveLeft) - Number(this.moveRight);
    this.direction.y = Number(this.moveUp) - Number(this.moveDown);
    this.direction.normalize();


    if (this.moveForward || this.moveBackward) {
      console.log("x axis movement")
      this.velocity.z -= this.direction.z * SPEED * deltaTime;
    }
    if (this.moveLeft || this.moveRight) {
      this.velocity.x -= this.direction.x * SPEED * deltaTime;
    }

    if (this.moveUp || this.moveDown) {
      this.velocity.y -= -this.direction.y * SPEED * deltaTime;
    }

    this.cameraYaw.translateX(this.velocity.x);
    this.cameraYaw.translateY(this.velocity.y);
    this.cameraYaw.translateZ(this.velocity.z);

    this.velocity.x -= Math.sign(this.velocity.x) * Math.min(Math.abs(this.velocity.x) * deltaTime, SPEED * deltaTime);
    this.velocity.y -= Math.sign(this.velocity.y) * Math.min(Math.abs(this.velocity.y) * deltaTime, SPEED * deltaTime);
    this.velocity.z -= Math.sign(this.velocity.z) * Math.min(Math.abs(this.velocity.z) * deltaTime, SPEED * deltaTime);

  }
}
