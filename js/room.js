var Room = (function () {
    function Room() {
        var _this = this;
        this.ready = false;
        this.onOpen = function (event) {
            console.log("Connected to " + _this.address);
            _this.send({
                "join": {
                    "name": localStorage.getItem("nickname") || "Player",
                    "ready": 0
                }
            });
        };
        this.onMessage = function (event) {
            console.log(event.data);
            var json = JSON.parse(event.data);
            for (var cmd in json) {
                if (cmd == "list") {
                    $("#player-list").html(json[cmd]);
                }
                else if (cmd == "start") {
                    _this.start();
                    console.log("123");
                }
                else if (cmd == "position") {
                    updatePosition(json);
                }
            }
        };
        this.address = localStorage.getItem("server") || "panel.louislam.net:8324";
    }
    Room.prototype.run = function () {
        console.log("Connecting to " + this.address);
        this.webSocket = new WebSocket("ws://" + this.address);
        this.webSocket.onopen = this.onOpen;
        this.webSocket.onmessage = this.onMessage;
    };
    Room.prototype.send = function (obj) {
        var str = JSON.stringify(obj);
        console.log(str);
        this.webSocket.send(str);
    };
    Room.prototype.toggleReady = function () {
        this.ready = !this.ready;
        this.send({
            "ready": this.ready
        });
    };
    Room.prototype.start = function () {
        $("#example").show();
        gameStart();
    };
    Room.prototype.closeAll = function () {
        this.send({ "close": null });
    };
    Room.prototype.close = function () {
        $("body").html("This room has been closed.");
    };
    return Room;
})();
var room = new Room();
room.run();
//# sourceMappingURL=room.js.map