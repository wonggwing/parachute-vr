<?
define("VERSION", rand(0,99999999));
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Parachute VR</title>
	<meta charset='utf-8'>
	<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

	<style>
		body {
			margin: 0;
			overflow: hidden;
		}

		#example {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		#state {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
		}
	</style>
</head>
<body>

<div id="room">
	<table>
		<thead>
		<tr>
			<th></th>
			<th>Name</th>
			<th>Ready?</th>
		</tr>
		</thead>
		<tfoot>

		</tfoot>
		<tbody id="player-list">

		</tbody>
	</table>

	<ul>
		<li><a href="javascript:room.toggleReady();">Ready</a></li>
		<li><a href="javascript:room.send({'start' : ''})">Start</a></li>
		<li><a href="javascript:room.send({'close' : ''})">Close Room</a></li>
	</ul>

	<div id="state">
		<div>Height: <span id="height">30000</span>m</div>
		<div>Coins: <span id="coin">0</span></div>
	</div>
</div>

<div id="example" style="display:none"></div>

<script>
	var VERSION = <?=VERSION ?>;
</script>
<script src="js/jquery-2.1.3.min.js"></script>
<script src="js/room.js?v=<?=VERSION ?>"></script>

<script src="js/third-party/threejs/three.min.js"></script>
<script src="js/third-party/threejs/OBJLoader.js"></script>
<script src="js/third-party/threejs/StereoEffect.js"></script>
<script src="js/third-party/threejs/DeviceOrientationControls.js"></script>
<script src="js/third-party/threejs/OrbitControls.js"></script>
<script src="js/third-party/threejs/threex.keyboardstate.js"></script>
<script src="js/main.js?v=<?=VERSION ?>"></script>


</body>
</html>