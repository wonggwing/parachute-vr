
class Room {

	private address : string;
	private webSocket : WebSocket;
	private ready : boolean = false;

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
			"join" : {
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
		var str = JSON.stringify(obj);
		console.log(str);
		this.webSocket.send(str);
	}

	public toggleReady() : void {
		this.ready = !this.ready;
		this.send({
			"ready" : this.ready
		});

	}

	public closeAll() : void {
		this.send({"close" : null});
	}

	public close() : void {
		$("body").html("This room has been closed.");
	}
}

var room = new Room();
room.run();