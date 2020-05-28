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

    socket.on("canvasComing", (c) =>{
        socket.broadcast.emit('canvasComing', c);
    });
    
    socket.on("addedObject", (c) =>{
        socket.broadcast.emit('addedObject', c);
    });

    socket.on("modifiedObject", (c) =>{
        console.log("Hello");
        socket.broadcast.emit('modifiedObject', c);
    });
    socket.on("regrouping", (c) =>{
        socket.broadcast.emit('regrouping', c);
    });
    socket.on("drawingLines", (c) =>{
        socket.broadcast.emit('drawingLines', c);
    });
});


app.get("/", (req, res) => {
    res.send("Hello");
});


server.listen(3000, () =>{ 
    console.log("Server Started");
});