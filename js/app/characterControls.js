'use strict';


const SPEED = 1.0;
const JUMP_VELOCITY = 35.0;

class CharacterControls {
  constructor(cameraYaw, cameraPitch) {
    this.cameraYaw = cameraYaw;
    this.cameraPitch = cameraPitch;
    this.controlsEnabled = true;
    this.movementBools = {
      move_forward: false,
      move_backward: false,
      move_left: false,
      move_right: false,
      move_up: false,
      move_down: false
    };
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.cameraDirection = new THREE.Vector3();
  }

  getMovementTypeFromKeyCode(keyCode) {
    for (var key in configs.controls) {
      if (!configs.controls.hasOwnProperty(key)) {
        continue;
      }
      for (var i = 0; i < configs.controls[key].length; i++) {
        if (keyCode == configs.controls[key][i]) {
          return key;
        }
      }
    }
    return null;
  }

  onKeyEvent(event, isKeyDown) {
    var movementType = this.getMovementTypeFromKeyCode(event.keyCode);
    if (this.movementBools[movementType] !== null) {
      this.movementBools[movementType] = isKeyDown;
      event.preventDefault();
      return false;
    }
    return true;
  }

  registerKeyEvents() {
    var x = this;
    document.addEventListener('keydown', function(event) {
      x.onKeyEvent(event, true)
    }, false);
    document.addEventListener('keyup', function(event) {
      x.onKeyEvent(event, false)
    }, false);
    window.onbeforeunload = function() { //Prevent Ctrl+W
      return false;
    };

  }


  updateVelocity(deltaTime) {
    this.direction.z = Number(this.movementBools["move_forward"]) -
      Number(this.movementBools["move_backward"]);
    this.direction.x = Number(this.movementBools["move_left"]) -
      Number(this.movementBools["move_right"]);
    this.direction.y = Number(this.movementBools["move_up"]) -
      Number(this.movementBools["move_down"]);
    this.direction.normalize();

    if (this.direction.x !== 0) {
      var vect = new THREE.Vector3(-1, 0, 0);
      this.velocity.add(vect.applyQuaternion(this.cameraYaw.quaternion).multiplyScalar(this.direction.x * SPEED * deltaTime));
    }

    if (this.direction.y !== 0) {
      var vect = new THREE.Vector3(0, 1, 0);
      this.velocity.add(vect.applyQuaternion(camera.quaternion).multiplyScalar(this.direction.y * SPEED * deltaTime));
    }

    console.log(this.movementBools["move_forward"] + " " + this.movementBools["move_backward"] + " " + this.direction.z);
    if (this.direction.z !== 0) {
      this.velocity.add(this.cameraDirection.multiplyScalar(this.direction.z * SPEED * deltaTime));
    }
  }


  update(deltaTime) {
    if (!this.controlsEnabled) {
      return;
    }
    camera.getWorldDirection(this.cameraDirection);
    var forward = this.cameraDirection;

    this.updateVelocity(deltaTime);

    this.cameraYaw.position.set(
      this.cameraYaw.position.x + this.velocity.x,
      this.cameraYaw.position.y + this.velocity.y,
      this.cameraYaw.position.z + this.velocity.z
    );

  }
}
