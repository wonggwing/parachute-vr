<?php

$player = $_GET['player'];
$score = intval($_GET['score']);

$db = new SQLite3('scores.sqlite');

$stmt = $db->prepare("INSERT INTO scores VALUES(:player, :score, datetime('now'))");

$stmt->bindValue(':player', $player, SQLITE3_TEXT);
$stmt->bindValue(':score', $score, SQLITE3_INTEGER);

$stmt->execute();

?>