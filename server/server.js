const express = require("express"),
   http = require("http"),
   socketIo = require("socket.io"),
   app = express();

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
   socket.on("canvas", (data) => {
      socket.broadcast.emit("canvas", data);
   });
});

server.listen(3000, () => `Server running on port 3000`);
