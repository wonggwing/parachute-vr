<?php
namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Room implements MessageComponentInterface {

	/**
	 * @var SplObjectStorage
	 */
	private $players;

	public function __construct() {
		$this->players = new \SplObjectStorage();
	}

	public function onOpen(ConnectionInterface $conn) {
		$this->players->attach($conn);



	}

	public function onMessage(ConnectionInterface $from, $msg) {
		echo "Players: " .  $this->players->count() . "\n";
		$json = json_decode($msg);

		if ($json->command == "join") {
			$from->name = $json->value->name;
			$from->ready = $json->value->ready;
			$this->updateList();
		}


	}

	public function onClose(ConnectionInterface $conn) {
		$this->players->detach($conn);
		$this->updateList();
	}

	public function onError(ConnectionInterface $conn, \Exception $e) {

	}

	public function updateList() {
		$html = "";

		foreach ($this->players as $player) {
			if (isset($player->name)) {
				$ready = ($player->ready) ? "Ready" : "Not Ready";
				$html .= "<tr><td></td><td>$player->name</td><td>$ready</td></tr>";
			}
		}

		foreach ($this->players as $player) {
			$this->send($player, (object) array(
				'command' => 'list',
				'value' => $html
			));
		}
	}

	public function send($player, $obj) {
		$player->send(json_encode($obj));
	}
}