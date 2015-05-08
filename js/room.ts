
class Room {

	private address : string;
	private webSocket : WebSocket;
	private ready : boolean = false;

	constructor() {
		this.address = localStorage.getItem("server") || "panel.louislam.net:8324";
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
				"name" : localStorage.getItem("nickname") || "Player",
				"ready" : 0
			}
		});
	};

	private onMessage = (event : MessageEvent) => {
		console.log(event.data);

		var json = JSON.parse(event.data);

		for (var cmd in json) {
			if (cmd == "list") {
				$("#player-list").html(json[cmd]);
			} else if (cmd == "start") {
				this.start();
				console.log("123");
			}
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

	private start() : void {
		$("#example").show();
	}

	public closeAll() : void {
		this.send({"close" : null });
	}

	public close() : void {
		$("body").html("This room has been closed.");
	}
}

var room = new Room();
room.run();