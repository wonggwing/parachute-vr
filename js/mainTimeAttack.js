/**
 * Created by Louis Lam on 3/10/2015.
 */

var startTime, endTime;

var lessThan15 = false;
var openParachute = false;
var parachuteModel;
var autoOpenParachute = false;

var camera, scene, renderer;
var started = false;
var isReady = false;
var height = 30000;



var targetCameraPosition = {
	x: 0.37,
	y: 150.67,
	z: 14.00
};

var targetPlayerRotation = {
	x: 0,
	y: 0,
	z: 0
};


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

/* Birds */
var bird;
var birdsList = [];
var birdsJson = null;

var cloud;

var timeAttackRunPer10 = 10;
var accelerationPer10 = 10;
var moveDragPer10 = 11;

/*
Jquery elements
 */
var heightJQuery = null;

init();

// All resources Ready
var ready = function () {
	isReady = true;
	currentPlayer.position.y = height;
	animate();
};

function gameStart() {

	started = true;
    playSound("bg");
	$(".speedometer").css("visibility", "visible");
    startTime = new Date();
}

function updatePosition(json) {
	if (currentPlayer == null) {
		return;
	}

	if (playerList[json.position.id] == undefined) {
		playerList[json.position.id] = currentPlayer.clone();
		playerList[json.position.id].openParachute = false;
		var para = playerList[json.position.id].getObjectByName("Parachute.obj", true);
		para.visible = false;
		scene.add(playerList[json.position.id]);
	}

	playerList[json.position.id].targetPosition = {
		x: json.position.x,
		y: json.position.y,
		z: json.position.z
	};

	//playerList[json.position.id].position.x = json.position.x;
	//playerList[json.position.id].position.y = json.position.y;
	//playerList[json.position.id].position.z = json.position.z;

	var para = playerList[json.position.id].getObjectByName("Parachute.obj", true);
	para.visible = json.position.open;
	playerList[json.position.id].openParachute = json.position.open;
}


// Generate Coins
function initCoinsPosition() {
	// removed for time attack mode
}


function initBirdsPosition() {



	if (bird == undefined) {

	} else {

		var tempJson = birdsJson;
		birdsJson = null;

		console.log(birdsJson);
		var temp;
		for (var i = 0; i < tempJson.birds.length; i++) {
			temp = bird.clone();
			temp.position.x = tempJson.birds[i].x;
			temp.position.y = tempJson.birds[i].y;
			temp.position.z = tempJson.birds[i].z;
			scene.add(temp);
			birdsList.push(temp);
		}
	}
}


function init() {
	heightJQuery = $("#height");
	coinJQuery = $("#coin");
	coinJQuery.hide();

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
	if (isStereo) {
		effect = new THREE.StereoEffect(renderer);
	}

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
    parachuteModel = scene.getObjectByName("Parachute.obj", true);
    parachuteModel.visible = false;
	playerCollision = scene.getObjectByName("c", true);
	coin = scene.getObjectByName("coin", true)
	bird = scene.getObjectByName("bird", true);

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

	for (var i = 3000; i < height; i += 1500) {

		plane.position.x = Math.random() * 3000 - 1500;
		plane.position.z = -Math.random() * Math.random() * 600 - 45;
		plane.position.y = i;
		plane.rotation.z = Math.random() * Math.PI;
		plane.rotation.x = Math.PI / -2;
		plane.scale.x = plane.scale.y = 100 + Math.random() * Math.random() * 100 + 0.5;
		THREE.GeometryUtils.merge(geometry, plane);

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

	if (birdsJson != null) {
		initBirdsPosition();
	}

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

                if(!openParachute) {
                    currentPlayer.position.y = currentPlayer.position.y - (delta * movementSpeed);
                }else{
                    currentPlayer.position.y = currentPlayer.position.y - (delta * 50);
                }

                //console.log(currentPlayer.position.y);

				targetPlayerRotation.x = 0;
				targetPlayerRotation.z = 0;

                // even if he press all the key, it is the same drag
                var dragEnabled = false;
				if (keyboard.pressed("W")) {
					targetPlayerRotation.x = 0.2;
					if (currentPlayer.position.z <= 4000)
						currentPlayer.position.z += delta * 300;

					dragEnabled = true;
				}

				if (keyboard.pressed("A")) {
					targetPlayerRotation.z = -0.2;
					if (currentPlayer.position.x <= 4000)
						currentPlayer.position.x += delta * 300;

					dragEnabled = true;
				}

				if (keyboard.pressed("S")) {
					targetPlayerRotation.x = -0.2;
					if (currentPlayer.position.z >= -4000)
						currentPlayer.position.z -= delta * 300;

					dragEnabled = true;
				}

				if (keyboard.pressed("D")) {
					targetPlayerRotation.z = 0.2;
					if (currentPlayer.position.x >= -4000)
						currentPlayer.position.x -= delta * 300;

					dragEnabled = true;
				}

				if ( timeAttackRunPer10 >= 10 ){
					if ( dragEnabled ){
						if ( movementSpeed > 100 ){
							movementSpeed-=moveDragPer10;
						}
					}
				}

				if (keyboard.pressed("space") || (autoOpenParachute && currentPlayer.position.y < 1000)) {
					autoOpenParachute = false;
					parachuteModel.visible = true;
					openParachute = true;
					targetCameraPosition.x = -9.234444120401424;
					targetCameraPosition.y = 327.2596578677634;
					targetCameraPosition.z = -228.24005012029926;
					room.send({"open": true});
				}

				if (keyboard.pressed("F") || (autoOpenParachute && currentPlayer.position.y < 1000)) {
					autoOpenParachute = false;
					parachuteModel.visible = false;
					openParachute = false;
					targetCameraPosition.x = 0.37;
					targetCameraPosition.y = 150.67;
					targetCameraPosition.z = 14.00;
					room.send({"open": false});
				}


			} else {
				//currentPlayer.position.y = 30000;
			}


			playerList.forEach(function (player) {
				if (!player.openParachute) {
					player.position.y = player.position.y - (delta * 200);
				} else {
					player.position.y = player.position.y - (delta * 50);
				}

				if (player.position.x - player.targetPosition.x != 0) {
					player.position.x -= (player.position.x - player.targetPosition.x) * delta * 6;
				}

				if (player.position.y - player.targetPosition.y != 0) {
					player.position.y -= (player.position.y - player.targetPosition.y) * delta * 6;
				}

				if (player.position.z - player.targetPosition.z != 0) {
					player.position.z -= (player.position.z - player.targetPosition.z) * delta * 6;
				}
			});


			if (currentPlayer.position.y > 15) {
				room.send({"position" : {
					x: currentPlayer.position.x,
					y: currentPlayer.position.y,
					z: currentPlayer.position.z
				}});
			}



            if(currentPlayer.position.y <= 20 && !lessThan15){

	            if (!openParachute) {
		            alert("you are dead!");
		            started = false;
	            } else {
		            lessThan15 = true;
		            console.log('less than : '+coinAmount);

		            var player = localStorage.getItem("nickname");
		            var score = coinAmount;

		            endTime = new Date();
		            var diff = endTime - startTime;
		            //alert("diff:"+diff+" "+startTime+" "+endTime);

		            $.get("insert_db2.php", { player: player, time_attack: diff }, function(){
			            window.location = "scores2.php";
		            });

	            }



            }


		}

		// Collision Detection
		var x1 = currentPlayer.position.x - 70;
		var x2 = currentPlayer.position.x + 100;
		var y1 = currentPlayer.position.y - 70;
		var y2 = currentPlayer.position.y + 70;
		var z1 = currentPlayer.position.z - 30;
		var z2 = currentPlayer.position.z + 100;

		// Coin Rotate
		// removed for time attack mode

		birdsList.forEach(function (c) {

			if (c.position.y - currentPlayer.position.y > 500) {
				scene.remove(c);
			} else {
				// Rotate
				c.rotation.z = c.rotation.z + 0.07;


				// Collision
				var cx1 = c.position.x - 80;
				var cx2 = c.position.x + 80;
				var cy1 = c.position.y - 80;
				var cy2 = c.position.y + 80;
				var cz1 = c.position.z - 80;
				var cz2 = c.position.z + 80;

				if ((cx1 <= x1 && x1 <= cx2) || (cx1 <= x2 && x2 <= cx2)) {

					if ((cy1 <= y1 && y1 <= cy2) || (cy1 <= y2 && y2 <= cy2)) {
						if ((cz1 <= z1 && z1 <= cz2) || (cz1 <= z2 && z2 <= cz2)) {
							// Hit a bird!
							movementSpeed = 50;
							playSound("bird");
						}
					}
				}
			}


		})


		if (!isStereo) {
			// Update to target camera position
			if (camera.position.x - targetCameraPosition.x != 0) {
				camera.position.x += (targetCameraPosition.x - camera.position.x) * delta * 3;
				camera.position.y += (targetCameraPosition.y - camera.position.y) * delta * 3;
				camera.position.z += (targetCameraPosition.z - camera.position.z) * delta * 3;
			}

			// Update to target player rotation
			if (currentPlayer.rotation.x - targetPlayerRotation.x != 0) {
				currentPlayer.rotation.x += (targetPlayerRotation.x - currentPlayer.rotation.x) * delta * 2;

			}

			if (currentPlayer.rotation.z - targetPlayerRotation.z != 0) {
				currentPlayer.rotation.z += (targetPlayerRotation.z - currentPlayer.rotation.z) * delta * 2;

			}


		}

		heightJQuery.html(Math.round(currentPlayer.position.y));

		if ( timeAttackRunPer10 >= 10 ){
			var speedPerKMH = movementSpeed / 3.0 * 2 / 1000 * 3600;
			$("#speed").text(parseInt(speedPerKMH,10) + "");

			if ( !openParachute ){
				if (movementSpeed < 500) {
					movementSpeed+=accelerationPer10;
				}
			}
			else
			{
				if ( movementSpeed > 40 ){
					movementSpeed-=10;
				}
				else
				{
					movementSpeed = 40;
				}
			}

			timeAttackRunPer10 = 0;
		}
		timeAttackRunPer10++;

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
	if (isStereo) {
		effect.setSize(width, height);
	}
}
