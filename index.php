<?
define("VERSION", rand(0,99999999));
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Parachute VR</title>
	<meta charset='utf-8'>
	<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
</head>
<body>
<ul>
	<li><a href="room.php?mode=time">Time Attack</a></li>
	<li><a href="room.php?mode=coins">Coin collecting</a></li>
	<li>Enable/Disable Stereo</li>
</ul>

<input type="text" name="name" placeholder="Nickname" />

<input type="text" name="server" value="panel.louislam.net:8324" />

<script>
	var VERSION = <?=VERSION ?>;
</script>

<script src="js/jquery-2.1.3.min.js"></script>
</body>
</html>
