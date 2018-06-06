var movement = function () {
	
	var onKeyDown = function (event) {
		switch (event.keyCode) {
			case Controls.movement.forward: // w
				moveForward = true;
				break;
			case Controls.movement.left: // a
				moveLeft = true; break;
			case Controls.movement.backward: // s
				moveBackward = true;
				break;
			case Controls.movement.right: // d
				moveRight = true;
				break;
			case Controls.movement.up: // space
				if (canJump === true) velocity.y += 350;
				canJump = false;
				break;
		}
	};
	var onKeyUp = function (event) {
		switch (event.keyCode) {
			case Controls.movement.forward: // w
				moveForward = false;
				break;
			case Controls.movement.left: // a
				moveLeft = false; break;
			case Controls.movement.backward: // s
				moveBackward = false;
				break;
			case Controls.movement.right: // d
				moveRight = false;
				break;
		}
	};
	document.addEventListener('keydown', onKeyDown, false);
	document.addEventListener('keyup', onKeyUp, false);
}();

