
class Room {

	private address : string;
	private webSocket : WebSocket;

	constructor() {
		this.address = localStorage.getItem("address") || "panel.louislam.net:8324";
	}

	public run() : void {
		console.log("Connecting to " + this.address);
		this.webSocket = new WebSocket("ws://" + this.address);
		this.webSocket.onopen = this.onOpen;
		this.webSocket.onmessage = this.onMessage;
	}

	private onOpen = (event : Event) => {
		console.log("Connected to " + this.address);

		this.send({
			"command" : "join",
			"value" : {
				"name" : localStorage.getItem("name") || "Player",
				"ready" : 0
			}
		});
	};

	private onMessage = (event : MessageEvent) => {
		var json = JSON.parse(event.data);

		if (json.command == "list") {
			$("#player-list").html(json.value);
		}
	};

	public send(obj) : void {
		this.webSocket.send(JSON.stringify(obj));
	}

}

var room = new Room();
room.run();