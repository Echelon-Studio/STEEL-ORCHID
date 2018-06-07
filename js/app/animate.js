var animate = function () {
    requestAnimationFrame(animate);
  
    // Do stuff
    var timer = 0.0001 * Date.now();
    var time = performance.now();
    var delta = (time - prevTime) / 1000;
    darkMoon.rotation.y += 0.003;

    darkMoon.position.x = Math.sin( timer * 1 ) * 300;
    //pointLight.position.y = Math.cos( timer * 5 ) * 400;
    darkMoon.position.z = Math.cos( timer * 1 ) * 300;
    //controls.getObject().position.set(darkMoon.position);


    if (moveForward) {
        controls.getObject().translateOnAxis( camera.getWorldDirection() , 100*delta );
    } else if (moveBackward) {
        controls.getObject().translateOnAxis( camera.getWorldDirection().negate() , 100*delta );
    }
    //
    
    prevTime = time;
    renderer.render(scene, camera);
}