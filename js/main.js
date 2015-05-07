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
var object1 = null;

init();

// Ready
var ready = function () {
	animate();
};

function init() {

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
	object1 = scene.getObjectByName("TorusKnot 4", true);



	controls = new THREE.OrbitControls(camera, element);
	controls.rotateUp(Math.PI / 4);
	controls.target.set(
		camera.position.x + 0.1,
		camera.position.y,
		camera.position.z
	);
	controls.noZoom = true;
	controls.noPan = true;


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
		if (player1.position.y > 0)
			player1.position.y = player1.position.y - 6;
		else {
			player1.position.y = 8000;
			console.log(player1.position.y);
		}
	}

	if (object1 != null) {
		object1.position.y += 0.1;
	}


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
