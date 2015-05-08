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

var coin;

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

	camera.position.x =0.10137612238819838;
	camera.position.y =75.14169873396278;
	camera.position.z =69.24012387300077;
	camera.rotation.z = -1.9809898545831093;
	camera.rotation.z = 0.01376165859231555;
	camera.rotation.z = 3.1099581244630823;


	// Cloud
	var texture = THREE.ImageUtils.loadTexture( 'cloud10.png', null, animate );
	texture.magFilter = THREE.LinearMipMapLinearFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;

	var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );

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
			var t = clock.getDelta();

			player1.position.y = player1.position.y - 20;


		} else {
			player1.position.y = 30000;
		}
	}

	if (keyboard.pressed("W")) {
		player1.position.z += 20;
	}

	if (keyboard.pressed("A")) {
		player1.position.x += 20;
	}

	if (keyboard.pressed("S")) {
		player1.position.z -= 20;
	}

	if (keyboard.pressed("D")) {
		player1.position.x -= 20;
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
