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

function buildObjects() {

  var planet = new Planet(
    {size:600,subdivisions:3},
    0xd6650a
  );
  planet.getMesh().position.z = -1000;
  scene.add(planet.getMesh());

  var moon = new Planet(
    {size:60,subdivisions:3},
    0x996841
  );
  moon.getMesh().position.z = -1000;
  moon.getMesh().position.y = 1000;
  scene.add(moon.getMesh());
}

function setupLighting(){
  scene.background = new THREE.Color(0x111111);
  scene.fog = new THREE.Fog(0x111111, 0, 7500);
  var light = new THREE.DirectionalLight(0xffffff,  0.75);
  light.position.set(
    Math.random(),
    Math.random(),
    Math.random(),
  );
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x111111));
}

function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000);
    scene = new THREE.Scene();

    setupLighting();

    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());
    characterControls = new CharacterControls(controls.getObject(), controls.getPitchObject())

    characterControls.registerKeyEvents();

    buildObjects();

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
