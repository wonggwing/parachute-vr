/**
 * Created by Louis Lam on 3/10/2015.
 */

var lessThan15 = false;

var camera, scene, renderer;
var started = false;
var isReady = false;
var height = 30000;


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
var playerCollision;
var playerList = [];

var loader = new THREE.OBJLoader;
var keyboard = new THREEx.KeyboardState();
var movementSpeed = 300;

/** Coin Model */
var coin;
var coinsList = [];
var coinsJson = null;
var coinAmount = 0;
var coinJQuery;


var cloud;

var counter = 0;

/*
Jquery elements
 */
var heightJQuery = null;

init();

// All resources Ready
var ready = function () {
	isReady = true;
	currentPlayer.position.y = height;
	if (coinsJson != null) {
		initCoinsPosition();
	}

	animate();
};

function gameStart() {

	started = true;
    playSound("bg");
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

// Generate Coins
function initCoinsPosition() {

	if (coin == undefined) {

	} else {
		var temp;
		for (var i = 0; i < coinsJson.coins.length; i++) {
			temp = coin.clone();
			temp.position.x = coinsJson.coins[i].x;
			temp.position.y = coinsJson.coins[i].y;
			temp.position.z = coinsJson.coins[i].z;
			scene.add(temp);
			coinsList.push(temp);
		}
	}

}

function init() {
	heightJQuery = $("#height");
	coinJQuery = $("#coin");

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
	playerCollision = scene.getObjectByName("c", true);
	coin = scene.getObjectByName("coin", true)

	if (!isStereo) {
		controls = new THREE.OrbitControls(camera, element);
		controls.rotateUp(Math.PI / 4);
		controls.target.set(
			camera.position.x + 0.1,
			camera.position.y,
			camera.position.z
		);
		controls.noZoom = true;
		controls.noPan = true;
	}

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

	for ( var i = 6000; i < height;  i+= 1000) {

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
				currentPlayer.position.y = currentPlayer.position.y -  (delta * 200) ;


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
				player.position.y = player.position.y - (delta * 200);
			});


			if (currentPlayer.position.y > 15) {
				room.send({"position" : {
					x: currentPlayer.position.x,
					y: currentPlayer.position.y,
					z: currentPlayer.position.z
				}});
			}else if(!lessThan15){
                lessThan15 = true;
                console.log('less than : '+coinAmount);

                var player = localStorage.getItem("nickname");
                var score = coinAmount;

                $.get("insert_db.php", { player: player, score: score });
                window.location = "scores.php";


            }


		}

		// Collision Detection
		var x1 = currentPlayer.position.x - 50;
		var x2 = currentPlayer.position.x + 100;
		var y1 = currentPlayer.position.y - 50;
		var y2 = currentPlayer.position.y + 50;
		var z1 = currentPlayer.position.z - 0;
		var z2 = currentPlayer.position.z + 100;

		// Coin Rotate
		coinsList.forEach(function (c) {
			c.rotation.z = c.rotation.z + 0.07;

			var cx1 = c.position.x - 50;
			var cx2 = c.position.x + 50;
			var cy1 = c.position.y - 50;
			var cy2 = c.position.y + 50;
			var cz1 = c.position.z - 50;
			var cz2 = c.position.z + 50;

			if ((cx1 <= x1  &&  x1<= cx2) || (cx1 <= x2 && x2 <= cx2)) {

				if ((cy1 <=  y1 && y1 <= cy2) || (cy1 <=  y2 && y2 <= cy2)) {
					if ((cz1 <=  z1 && z1 <= cz2) || (cz1 <=  z2 && z2 <= cz2)) {
						 // Hit a coin!
						scene.remove(c);
						var index = coinsList.indexOf(c);

						if (index > -1) {
							coinsList.splice(index, 1);
						}

						coinJQuery.html(++coinAmount);
                        playSound("coin");
					}
				}
			}
		})


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
