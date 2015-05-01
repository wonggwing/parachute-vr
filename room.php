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


<script src="js/jquery-2.1.3.min.js"></script>
<script src="js/room.js?v=<?=VERSION ?>"></script>



</body>
</html>