var Room = (function () {
    function Room() {
        var _this = this;
        this.onOpen = function (event) {
            console.log("Connected to " + _this.address);
            _this.send({
                "command": "join",
                "value": {
                    "name": localStorage.getItem("name") || "Player",
                    "ready": 0
                }
            });
        };
        this.onMessage = function (event) {
            var json = JSON.parse(event.data);
            if (json.command == "list") {
                $("#player-list").html(json.value);
            }
        };
        this.address = localStorage.getItem("address") || "panel.louislam.net:8324";
    }
    Room.prototype.run = function () {
        console.log("Connecting to " + this.address);
        this.webSocket = new WebSocket("ws://" + this.address);
        this.webSocket.onopen = this.onOpen;
        this.webSocket.onmessage = this.onMessage;
    };
    Room.prototype.send = function (obj) {
        this.webSocket.send(JSON.stringify(obj));
    };
    return Room;
})();
var room = new Room();
room.run();
//# sourceMappingURL=room.js.map