class Planet {
  constructor(ico, color) {
    this.size = ico.size;
    this.geometry = new THREE.IcosahedronGeometry(ico.size, ico.subdivisions);
    this.buildGeometry(this.size);
    this.materials = {
      surface: new THREE.MeshPhongMaterial({color:color, specular:0x333333, shininess:3, flatShading:true}),
      wireframe: new THREE.MeshBasicMaterial({color:0x111111, wireframe:true}),
    };
    this.object = new THREE.Mesh(
      this.geometry,
      this.materials.surface
    );
  }

  buildGeometry (size) {
    var unit = size*0.05;
    this.geometry.vertices.forEach(function(vertex) {
      vertex.add( new THREE.Vector3(
        Math.floor(Math.random()*unit),
        Math.floor(Math.random()*unit),
        Math.floor(Math.random()*unit),
      ));
      vertex.setLength(size+Math.floor(Math.random()*unit/2));
    });
  }

  getMesh() {
    return this.object;
  }

}
