
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

	public onOpen(event : Event) : void {
		console.log("Connected to " + this.address);

	}

	public onMessage(event : MessageEvent) {

	}

}

var room = new Room();
room.run();