const express = require("express"),
   http = require("http"),
   socketIo = require("socket.io"),
   app = express();

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
<<<<<<< HEAD
   socket.on("canvas", (data) => {
      socket.broadcast.emit("canvas", data);
=======
   socket.on("message", (msg) => {
      console.log(msg);
      socket.broadcast.emit("message", msg);
>>>>>>> c1ff7e611a13461631037d583de1cf8ddf03138d
   });
});

server.listen(3000, () => `Server running on port 3000`);
