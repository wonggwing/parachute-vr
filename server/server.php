<?php
use Ratchet\Server\IoServer;
use MyApp\Room;

require __DIR__ . '/vendor/autoload.php';
require "Room.php";

$port = 8324;
$server = IoServer::factory(new Room(), $port);
echo "Server running on $port";
$server->run();
