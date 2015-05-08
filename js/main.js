/**
 * Created by Louis Lam on 3/10/2015.
 */
var camera, scene, renderer;
var started = false;
var height = 60000;

/**
 * THREE.StereoEffect
 */
var effect;

var controls;
var element, container;
var clock = new THREE.Clock();
var isStereo = false;

var currentPlayer = null;
var playerModel;
var playerList = [];

var loader = new THREE.OBJLoader;
var keyboard = new THREEx.KeyboardState();
var movementSpeed = 30;
var coin;

var cloud;

var counter = 0;

/*
Jquery elements
 */
var heightJQuery = null;

init();

// All resources Ready
var ready = function () {
	animate();
};

function gameStart() {
	currentPlayer.position.y = height;
	started = true;
}

function updatePosition(json) {
	if (playerList[json.position.id] == undefined) {
		playerList[json.position.id] = currentPlayer.clone();
		scene.add(playerList[json.position.id]);
	}

	playerList[json.position.id].position.x = json.position.x;
	playerList[json.position.id].position.y = json.position.y;
	playerList[json.position.id].position.z = json.position.z;

}

function init() {
	heightJQuery = $("#height");

	if (localStorage.getItem("stereo") == "true") {
		isStereo = true;
	} else {
		isStereo = false;
	}

	renderer = new THREE.WebGLRenderer({alpha: true});
	element = renderer.domElement;

	var canvas = document.createElement( 'canvas' );
	canvas.width = 32;
	canvas.height = window.innerHeight;

	// Background Color
	var context = canvas.getContext( '2d' );

	var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
	gradient.addColorStop(0, "#1e4877");
	gradient.addColorStop(0.5, "#4584b4");
	context.fillStyle = gradient;
	context.fillRect(0, 0, canvas.width, canvas.height);

	container = document.getElementById('example');
	container.appendChild(element);
	container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
	container.style.backgroundSize = '32px 100%';

	// StereoEffect
	effect = new THREE.StereoEffect(renderer);

	var loader = new THREE.ObjectLoader;

	// Load the scene
	loader.load('json/scene.json?v=' + VERSION, function (obj) {
		scene = obj;
		onSceneLoaded();
	});
}


var onSceneLoaded = function () {
	scene.fog = new THREE.Fog(0xffffff, 0.05, 9800);
	camera = scene.getObjectByName("PerspectiveCamera 1", true);
	currentPlayer = scene.getObjectByName("player", true);
	playerModel = scene.getObjectByName("playerModel", true);
	coin = scene.getObjectByName("coin", true)


	// TODO: Generate Coins
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

	var fog = new THREE.Fog( 0x4584b4, -100, 3000 );

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

	for ( var i = 7000; i < height;  i+= 1000) {

		plane.position.x = Math.random() * 3000 - 1500;
		plane.position.z = - Math.random() * Math.random() * 600 - 45;
		plane.position.y = i;
		plane.rotation.z = Math.random() * Math.PI;
		plane.rotation.x = Math.PI / -2;
		plane.scale.x = plane.scale.y = 100 + Math.random() * Math.random() * 100+ 0.5;
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
		camera.position.x = 0.37;
		camera.position.y =150.67;
		camera.position.z =14.00;
		camera.rotation.x = -1.8085;
		camera.rotation.y = 0.003820;
		camera.rotation.z = 3.1258;
	}

	window.addEventListener('resize', resize, false);
	setTimeout(resize, 1);

	ready();
};


function animate() {
	counter++;

	requestAnimationFrame(animate);
	resize();
	camera.updateProjectionMatrix();

	var delta = clock.getDelta();

	if (controls != null) {
		controls.update(delta);
	}

	if (started) {

		if (currentPlayer != null) {
			if (currentPlayer.position.y > 16) {
				currentPlayer.position.y = currentPlayer.position.y -  (delta * 100) ;


				if (keyboard.pressed("W")) {
					if (currentPlayer.position.z <= 4000)
						currentPlayer.position.z += delta * movementSpeed;
				}

				if (keyboard.pressed("A")) {
					if (currentPlayer.position.x <= 4000)
						currentPlayer.position.x += delta * movementSpeed;
				}

				if (keyboard.pressed("S")) {
					if (currentPlayer.position.z >= -4000)
						currentPlayer.position.z -= delta * movementSpeed;
				}

				if (keyboard.pressed("D")) {
					if (currentPlayer.position.x >= -4000)
						currentPlayer.position.x -= delta * movementSpeed;
				}



			} else {
				//currentPlayer.position.y = 30000;
			}


			playerList.forEach(function (player) {
				player.position.y = player.position.y - (delta * 100);
			});


			if (currentPlayer.position.y > 15) {
				room.send({"position" : {
					x: currentPlayer.position.x,
					y: currentPlayer.position.y,
					z: currentPlayer.position.z
				}});
			}



		}



		coin.rotation.z = coin.rotation.z + 0.1;


		heightJQuery.html(Math.round(currentPlayer.position.y));


		if (isStereo) {
			effect.render(scene, camera);
		} else {
			renderer.render(scene, camera);
		}
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
