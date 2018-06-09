var camera, scene, renderer, controls;
var objects = [];
var raycaster;
pointerlock();
var prevTime = performance.now();
var vertex = new THREE.Vector3();
var color = new THREE.Color();
var characterControls;

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function buildFloor() {
  var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
  floorGeometry.rotateX(- Math.PI / 2);
  // vertex displacement
  var position = floorGeometry.attributes.position;
  for (var i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);
      vertex.x += Math.random() * 20 - 10;
      vertex.y += Math.random() * 2;
      vertex.z += Math.random() * 20 - 10;
      position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }
  floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
  count = floorGeometry.attributes.position.count;
  var colors = [];
  for (var i = 0; i < count; i++) {
      color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
      colors.push(color.r, color.g, color.b);
  }
  floorGeometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  var floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  scene.add(floor);
}

function setupLighting(){
  scene.background = new THREE.Color(0xffffff);
  scene.fog = new THREE.Fog(0xffffff, 0, 750);
  var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);
}

function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    scene = new THREE.Scene();

    setupLighting();

    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());
    characterControls = new CharacterControls(controls.getObject(), controls.getPitchObject())

    characterControls.registerKeyEvents();

    buildFloor();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    //
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);

    var time = performance.now();
    var delta = (time - prevTime) / 1000;

    characterControls.update(delta);

    prevTime = time;

    renderer.render(scene, camera);
}

init();
animate();
