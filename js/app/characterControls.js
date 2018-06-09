'use strict';


const SPEED = 1.0;
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
    this.cameraDirection = new THREE.Vector3();
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        this.moveForward = true;
        event.preventDefault();
        return false;
      case 37: // left
      case 65: // a
        this.moveLeft = true;
        event.preventDefault();
        return false;
      case 40: // down
      case 83: // s
        this.moveBackward = true;
        event.preventDefault();
        return false;
      case 39: // right
      case 68: // d
        this.moveRight = true;
        event.preventDefault();
        return false;
      case 16: // shift
        this.moveUp = true;
        event.preventDefault();
        return false;
      case 17: // control
        this.moveDown = true;
        event.preventDefault();
        break
      case 32: // space
        if (this.canJump === true) this.velocity.y += JUMP_VELOCITY;
        this.canJump = false;
        event.preventDefault();
        return false;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        this.moveForward = false;
        event.preventDefault();
        return false;
      case 37: // left
      case 65: // a
        this.moveLeft = false;
        event.preventDefault();
        return false;
      case 40: // down
      case 83: // s
        this.moveBackward = false;
        event.preventDefault();
        return false;
      case 39: // right
      case 68: // d
        this.moveRight = false;
        event.preventDefault();
        return false;
      case 16: // shift
        this.moveUp = false;
        event.preventDefault();
        return false;
      case 17: // control
        this.moveDown = false;
        event.preventDefault();
        return false;
    }
  }


  registerKeyEvents() {
    var x = this;
    document.addEventListener('keydown', function(event) {
      x.onKeyDown(event)
    }, false);
    document.addEventListener('keyup', function(event) {
      x.onKeyUp(event)
    }, false);
    console.log("key events registered");
  }

  update(deltaTime) {
    if (!this.controlsEnabled) {
      return;
    }

    camera.getWorldDirection(this.cameraDirection);
    var forward = this.cameraDirection;

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveLeft) - Number(this.moveRight);
    this.direction.y = Number(this.moveUp) - Number(this.moveDown);
    this.direction.normalize();


    if (this.moveForward || this.moveBackward) {
      this.velocity.add(forward.multiplyScalar(this.direction.z * SPEED * deltaTime));
    }
    if (this.moveLeft || this.moveRight) {
      var vect = new THREE.Vector3(-1, 0, 0);
      this.velocity.add(vect.applyQuaternion(this.cameraYaw.quaternion).multiplyScalar(this.direction.x * SPEED * deltaTime));
    }
    if (this.moveUp || this.moveDown) {
      var vect = new THREE.Vector3(0, 1, 0);
      this.velocity.add(vect.applyQuaternion(camera.quaternion).multiplyScalar(this.direction.y * SPEED * deltaTime));
    }


    this.cameraYaw.position.set(
      this.cameraYaw.position.x + this.velocity.x,
      this.cameraYaw.position.y + this.velocity.y,
      this.cameraYaw.position.z + this.velocity.z
    );

  }
}
