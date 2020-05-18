var http = require("http");
var express = require("express");

var socketio = require("socket.io");
var app = express();
var server = http.createServer(app);


app.get("/", (req, res) => {
    res.send("Hello");
});


server.listen(3000, () =>{ 
    console.log("Server Started");
});