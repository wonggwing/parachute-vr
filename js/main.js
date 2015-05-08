/**
 * Created by Louis Lam on 3/10/2015.
 */
var camera, scene, renderer;

/**
 * THREE.StereoEffect
 */
var effect;
var controls;
var element, container;
var clock = new THREE.Clock();
var isStereo = false;
var player1 = null;
var loader = new THREE.OBJLoader;
var keyboard = new THREEx.KeyboardState();
var movementSpeed = 12;
var coin;

var cloud;

/*
Jquery elements
 */
var heightJQuery = null;

init();

// Ready
var ready = function () {
	animate();
};

function init() {
	heightJQuery = $("#height");

	if (localStorage.getItem("stereo") == "true") {
		isStereo = true;
	} else {
		isStereo = false;
	}


	renderer = new THREE.WebGLRenderer();
	element = renderer.domElement;
	container = document.getElementById('example');
	container.appendChild(element);

	effect = new THREE.StereoEffect(renderer);

	var loader = new THREE.ObjectLoader;

	loader.load('json/scene.json?v=' + VERSION, function (obj) {
		scene = obj;
		onSceneLoaded();
	});
}


var onSceneLoaded = function () {

	camera = scene.getObjectByName("PerspectiveCamera 1", true);
	player1 = scene.getObjectByName("player", true);
	coin = scene.getObjectByName("coin", true)

	var newQueen = coin.clone();
	newQueen.position.y -= 1000;
	scene.add(newQueen);

	controls = new THREE.OrbitControls(camera, element);
	controls.rotateUp(Math.PI / 4);
	controls.target.set(
		camera.position.x + 0.1,
		camera.position.y,
		camera.position.z
	);
	controls.noZoom = true;
	controls.noPan = true;



	// Cloud
	var geometry = new THREE.Geometry();

	var texture = THREE.ImageUtils.loadTexture( 'images/cloud10.png', null, animate );
	texture.magFilter = THREE.LinearMipMapLinearFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;

	var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );

	material = new THREE.ShaderMaterial( {

		uniforms: {

			"map": { type: "t", value: texture },
			"fogColor" : { type: "c", value: fog.color },
			"fogNear" : { type: "f", value: fog.near },
			"fogFar" : { type: "f", value: fog.far },

		},
		vertexShader: document.getElementById( 'vs' ).textContent,
		fragmentShader: document.getElementById( 'fs' ).textContent,
		depthWrite: false,

		transparent: true

	} );

	var plane = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ) );

	for ( var i = 0; i < 30000; i+= 1000) {

		plane.position.x = Math.random() * 1000 - 500;
		plane.position.z = - Math.random() * Math.random() * 200 - 15;
		plane.position.y = i;
		plane.rotation.z = Math.random() * Math.PI;
		plane.rotation.x = Math.PI / -2;
		plane.scale.x = plane.scale.y = Math.random() * Math.random() * 150 + 0.5;
		THREE.GeometryUtils.merge( geometry, plane );

	}

	cloud = new THREE.Mesh( geometry, material );
	scene.add( cloud );

	if (isStereo) {
		function setOrientationControls(e) {
			if (!e.alpha) {
				return;
			}
			controls = new THREE.DeviceOrientationControls(camera, true);
			controls.connect();
			controls.update();
			element.addEventListener('click', fullscreen, false);
			window.removeEventListener('deviceorientation', setOrientationControls, true);
		}

		window.addEventListener('deviceorientation', setOrientationControls, true);
	} else {
		camera.position.x =0.10137612238819838;
		camera.position.y =75.14169873396278;
		camera.position.z =69.24012387300077;
		camera.rotation.z = -1.9809898545831093;
		camera.rotation.z = 0.01376165859231555;
		camera.rotation.z = 3.1099581244630823;
	}

	window.addEventListener('resize', resize, false);
	setTimeout(resize, 1);

	ready();
};


function animate() {
	requestAnimationFrame(animate);
	resize();
	camera.updateProjectionMatrix();

	if (controls != null) {
		controls.update(clock.getDelta());
	}

	if (player1 != null) {
		if (player1.position.y > 0) {



			player1.position.y = player1.position.y - 5 ;


		} else {
			player1.position.y = 30000;
		}
	}

	if (keyboard.pressed("W")) {
		player1.position.z += movementSpeed;
	}

	if (keyboard.pressed("A")) {
		player1.position.x += movementSpeed;
	}

	if (keyboard.pressed("S")) {
		player1.position.z -= movementSpeed;
	}

	if (keyboard.pressed("D")) {
		player1.position.x -= movementSpeed;
	}


	coin.rotation.z = coin.rotation.z + 0.1;


	heightJQuery.html(Math.round(player1.position.y));


	if (isStereo) {
		effect.render(scene, camera);
	} else {
		renderer.render(scene, camera);
	}
}


function fullscreen() {
	if (container.requestFullscreen) {
		container.requestFullscreen();
	} else if (container.msRequestFullscreen) {
		container.msRequestFullscreen();
	} else if (container.mozRequestFullScreen) {
		container.mozRequestFullScreen();
	} else if (container.webkitRequestFullscreen) {
		container.webkitRequestFullscreen();
	}
}

function resize() {
	var width = container.offsetWidth;
	var height = container.offsetHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setSize(width, height);
	effect.setSize(width, height);
}
