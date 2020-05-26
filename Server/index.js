const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const redis = require('redis');
// const path = require('path');

const userRouter = require('./routes/userRouter');
const boardRouter = require('./routes/boardRouter');
const drawingRouter = require('./routes/drawingRouter');
const roomExistenceRouter = require('./routes/roomExistenceRouter');
const addJoinedRoomRouter = require('./routes/addJoinedRoomRouter');

const hostname = 'localhost';
const port = '3000';

const app = express();
const client = redis.createClient();
const server = http.createServer(app);

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname,'../Client/dist/Client')));
app.use((req, res, next) => {
  req.redis = client;
  next();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

client.on('connect', function() {
  console.log('connected');
});

//getUsers
app.use('/users', userRouter); 
//View Existing Boards in Admin View, User View
app.use('/boards', boardRouter); 
// Edit Drawing Board User and Admin
app.use('/drawing', drawingRouter); 
// Check if room code is valid
app.use('/roomIdExists', roomExistenceRouter); 
// add room id to the userid's set
app.use('/addJoinedRoom', addJoinedRoomRouter); 

// //Initial connect
// app.get('/', (req,res,next) => {
//   res.sendFile(path.join(__dirname,'../Client/dist/Client/index.html'));
// });
