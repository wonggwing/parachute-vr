<?php
namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Room implements MessageComponentInterface {
	private $players;

	public function onOpen(ConnectionInterface $conn) {
		echo  "Joined\n";

	}

	public function onMessage(ConnectionInterface $from, $msg) {

	}

	public function onClose(ConnectionInterface $conn) {

	}

	public function onError(ConnectionInterface $conn, \Exception $e) {

	}

}