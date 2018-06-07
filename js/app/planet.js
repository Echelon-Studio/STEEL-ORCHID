var Planet = function( size, position, mStats ) {
    var newPlanet = new THREE.Object3D();

    var geometry = new THREE.IcosahedronGeometry( size,5 );
    //var skygeometry = new THREE.IcosahedronGeometry( size+4,5 );
    geometry.vertices.forEach(( element,i ) => {
        var r = 70 + ( Math.random() );
        element.setLength(r);
    });

    //var skymaterial = new THREE.MeshPhongMaterial( { color: 0x00f0f0, specular: 0x555555, shininess: 3, transparent: true, opacity: 0.25 }  );
    var material = new THREE.MeshPhongMaterial( mStats );
    var wireframe = new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true } );
    newPlanet.add(new THREE.Mesh( geometry, material ));
    newPlanet.add(new THREE.Mesh( geometry, wireframe ));
    //newPlanet.add(new THREE.Mesh( skygeometry, skymaterial ));
    scene.add(newPlanet);
    newPlanet.position.x = position.x;
    newPlanet.position.y = position.y;
    newPlanet.position.z = position.z;
    return newPlanet;
    //cube.position.z = -130;
    //.position.y = 75;
    //cube.rotation.x = 10 * (180/Math.PI);
}