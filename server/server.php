<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use MyApp\Room;

require __DIR__ . '/vendor/autoload.php';
require "Room.php";

$port = 8324;

$http = new HttpServer(new WsServer(new Room()));
$server = IoServer::factory($http, $port);
echo "Server running on $port";
$server->run();