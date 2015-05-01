var Room = (function () {
    function Room() {
        this.address = localStorage.getItem("address") || "panel.louislam.net:8324";
    }
    Room.prototype.run = function () {
        console.log("Connecting to " + this.address);
        this.webSocket = new WebSocket("ws://" + this.address);
        this.webSocket.onopen = this.onOpen;
        this.webSocket.onmessage = this.onMessage;
    };
    Room.prototype.onOpen = function (event) {
        console.log("Connected to " + this.address);
    };
    Room.prototype.onMessage = function (event) {
    };
    return Room;
})();
var room = new Room();
room.run();
//# sourceMappingURL=room.js.map