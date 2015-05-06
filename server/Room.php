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

		foreach ($json as $command => $value) {
			if ($command == "join") {

				$from->name = $value->name;
				$from->ready = $value->ready;
				$this->updateList();
			} else if ($command == "ready") {

				echo "$from->name set ready to $value\n";
				$from->ready = $value;
				$this->updateList();
			} else if ($command == "close") {
				$this->sendToAll(array(
					"close" => true
				), $from, true);
			}

		}
	}

	public function sendToAll($obj, $sender, $includeMyself = true) {
		if ($includeMyself) {
			foreach ($this->players as $player) {
				if ($player != $sender) {
					$this->send($player, (object) $obj);
				}
			}
		} else {
			foreach ($this->players as $player) {
				$this->send($player, (object) $obj);
			}
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