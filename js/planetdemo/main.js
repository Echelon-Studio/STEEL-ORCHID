var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
pointerlock();
controls = new THREE.PointerLockControls(camera);
scene.add(controls.getObject());
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor( 0xf06d06 );
scene.fog = new THREE.Fog( 0xf06d06, 0, 750 );

var darkMoon = new Planet(
    70, 
    new THREE.Vector3(0,75,-130),
    { color: 0xf000f0, specular: 0x555555, shininess: 3, flatShading: true } 
);

camera.position.y = 30;

var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000);
floorGeometry.rotateX(- Math.PI / 2);
var floorMaterial = new THREE.MeshBasicMaterial({ color: 0xdd0033 });
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);

scene.add( new THREE.AmbientLight( 0x111111 ) );

//var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
//directionalLight.position.x = Math.random() - 0.5;
//directionalLight.position.y = Math.random() - 0.5;
//directionalLight.position.z = Math.random() - 0.5;
//directionalLight.position.normalize();
//scene.add( directionalLight );

pointLight = new THREE.PointLight( 0xffffff, 1 );
scene.add( pointLight );
pointLight.position.y = 75;

pointLight.add( new THREE.Mesh( new THREE.SphereBufferGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );

var controlsEnabled = false;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
animate();
