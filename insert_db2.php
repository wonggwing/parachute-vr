<?php

$player = $_GET['player'];
$time_attack = intval($_GET['time_attack']);

$db = new SQLite3('time_attack.sqlite');

$stmt = $db->prepare("INSERT INTO time_attack VALUES(:player, :time_attack, datetime('now'))");

$stmt->bindValue(':player', $player, SQLITE3_TEXT);
$stmt->bindValue(':time_attack', $time_attack, SQLITE3_INTEGER);

$stmt->execute();

?>