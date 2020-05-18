var http = require("http");
var express = require("express");

var socketio = require("socket.io");
var app = express();
var server = http.createServer(app);
var io = socketio(server);

io.on("connection", socket =>{
    console.log("connection added");

    socket.on("message", msg => {
        console.log(msg);
    });
});
app.get("/", (req, res) => {
    res.send("Hello");
});


server.listen(3000, () =>{ 
    console.log("Server Started");
});