/**
 * Created by Louis Lam on 3/10/2015.
 */
var camera, scene, renderer;
var effect, controls;
var element, container;
var clock = new THREE.Clock();

var player1 = null;
var object1 = null;

init();

// Ready
var ready = function () {
	animate();
};

function init() {
	renderer = new THREE.WebGLRenderer();
	element = renderer.domElement;
	container = document.getElementById('example');
	container.appendChild(element);

	effect = new THREE.StereoEffect(renderer);

	var loader = new THREE.ObjectLoader;
	loader.load('json/scene.json?v=' + VERSION, function(obj) {
		scene = obj;
		console.log(scene);
		onSceneLoaded();

	});


}


var onSceneLoaded = function () {
	camera = scene.getObjectByName( "PerspectiveCamera 1", true );

	player1 = scene.getObjectByName( "player", true );
	object1 = scene.getObjectByName( "TorusKnot 4", true );

	//console.log(player1);
	//scene.children.splice(7, 1);

	/*var loader = new THREE.OBJLoader;

	loader.load('json/LeonKennedy/Leon_kennedy.obj', function(obj) {
		player1= obj;

		scene.add(player1);
		player1.add(camera);

		player1.position.x = 0;
		player1.position.y = 2200;
		player1.position.z = 220;

		camera.lookAt(player1.position);

		console.log(player1);
		console.log(scene);
	});*/

	/*controls = new THREE.OrbitControls(camera, element);
	//controls.rotateUp(Math.PI / 4);
	controls.target.set(
		camera.position.x,
		camera.position.y,
		camera.position.z
	);
	controls.noZoom = true;
	controls.noPan = true;*/

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


	effect.render(scene, camera);
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