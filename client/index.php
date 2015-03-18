<?
define("VERSION", rand(0,99999999));
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Cardboard</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
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
	</style>
</head>
<body>
<div id="example"></div>

<script>
	var VERSION = <?=VERSION ?>;
</script>
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="js/third-party/threejs/three.min.js"></script>
<script src="js/third-party/threejs/OBJLoader.js"></script>
<script src="js/third-party/threejs/StereoEffect.js"></script>
<script src="js/third-party/threejs/DeviceOrientationControls.js"></script>
<script src="js/third-party/threejs/OrbitControls.js"></script>
<script src="js/main.js?v=<?=VERSION ?>"></script>
</body>
</html>
