<?php
namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

/**
 *
 */
class Room implements MessageComponentInterface {

	/**
	 * @var int
	 */
	private $i = 0;

	private $coinsJson = "{}";
	private $birdsJson = "{}";

	/**
	 * @var SplObjectStorage
	 */
	private $players;

	public function __construct() {
		$this->players = new \SplObjectStorage();

		$list = array(
			"coins" => array()
		);

		for ($i = 20; $i <= 30000; $i += 500) {
            $list["coins"][] = (object) array(
                "y" => $i,
                "x" => rand(-2000, 2000),
                "z" => rand(-2000, 2000)
            );

            $list["coins"][]= (object) array(
                "y" => $i,
                "x" => rand(-2000, 2000),
                "z" => rand(-2000, 2000)
            );

        }

        $this->coinsJson = json_encode((object) $list);

        $bird_list = array(
            "birds" => array()
        );

        for ($i = 20; $i <= 30000; $i += 800) {
            $bird_list["birds"][] = (object) array(
                "y" => $i,
                "x" => rand(-2000, 2000),
                "z" => rand(-2000, 2000)
            );

            $bird_list["birds"][]= (object) array(
                "y" => $i,
                "x" => rand(-2000, 2000),
                "z" => rand(-2000, 2000)
            );


        }

        $this->birdsJson = json_encode((object) $bird_list);
	}

	public function onOpen(ConnectionInterface $conn) {
		$this->players->attach($conn);
		$conn->id = $this->i++;
		echo "Players: " .  $this->players->count() . "\n";
	}

	public function onMessage(ConnectionInterface $from, $msg) {
		$json = json_decode($msg);

		foreach ($json as $command => $value) {
			//echo "Command: $command\n";

			if ($command == "join") {
				$from->name = $value->name;
				$from->ready = $value->ready;
				$this->updateList();

				$from->send($this->coinsJson);
				$from->send($this->birdsJson);

			} else if ($command == "ready") {
				//echo "$from->name set ready to $value\n";
				$from->ready = $value;
				$this->updateList();

			} else if ($command == "close") {
				$this->sendToAll(array(
					"close" => true
				), $from, true);

			} else if ($command == "start") {

			/*	foreach ($this->players as $p) {

					if ($p->ready != true) {
						return;
					}

				}*/

				$this->sendToAll(array(
					"start" => true
				), $from, true);
			} else if ($command == "position") {
				$from->x = $value->x;
				$from->y = $value->y;
				$from->z = $value->z;

				$this->sendToAll(array(
					"position" => array(
						"id" => $from->id,
						"x" => $value->x,
						"y" => $value->y,
						"z" => $value->z
					)
				), $from, false);
			}

		}
	}

	/**
	 * @param array $obj
	 * @param $sender
	 * @param bool $includeMyself
	 */
	public function sendToAll($obj, $sender, $includeMyself = true) {
		if ($includeMyself) {
			foreach ($this->players as $player) {
				$this->send($player, (object) $obj);
			}
		} else {
			foreach ($this->players as $player) {
				if ($player != $sender) {
					$this->send($player, (object) $obj);
				}
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
				'list' => $html
			));
		}
	}

	public function send($player, $obj) {
		$player->send(json_encode($obj));
	}
}