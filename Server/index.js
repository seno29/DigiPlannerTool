const express = require('express');
const http = require('http');
const async = require('async');
const bodyParser = require('body-parser');

const redis = require('redis');

const hostname = 'localhost';
const port = '3000';

const app = express();
const client = redis.createClient();

const server = http.createServer(app);

app.use(bodyParser.json());

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

client.on('connect', function() {
    console.log('connected');
});

//getUsers
app.get('/users',(req,res,next) => {
  client.hgetall('users', function(err, userList){
    if(!userList){
      res.send(err);
    } else {
      res.send(userList);
    }
  });
});   

//View Existing Boards in Admin View, User View
app.get('/boards/:userId',(req,res,next) => {
  let userId = req.params.userId;
  let rooms = [];
  let roomsinfo = {};
  client.smembers(userId , function(err, roomsOfUser){
    if(!roomsOfUser){
      res.send(err);
    } else {
      rooms = roomsOfUser;
      async.forEach(rooms, function(room, callback) { 
        client.hgetall(room, (err,reply)=>{
          if(err){
            callback();
          }else{
            roomsinfo[room] = reply.room_title;
            // console.log(roomsinfo);
            callback();
          }
        });
        }, function(err) {
          if (err) return next(err);
          res.send(roomsinfo);
      });
    };
  }); 
});

// //Create Board in Admin View
app.post('/boards/:userId',(req,res,next) => {
  let userId = req.params.userId;
  let roomId = req.body.room_id;
  let roomTitle = req.body.room_title;
  if(roomId != null && roomTitle != null){
    client.sadd('rooms', roomId, (err, reply) => {
      if(!reply){
        res.send(err);
      }else{
        client.sadd(userId, roomId, (err, reply) => {
          if(!reply){
            res.send(err);
          }else{
              client.hmset(roomId, {
              'room_title' : roomTitle,
              'admin_id' : userId,
              'canvas_json': '',
            },(err,reply) => {
              if(!reply){
                res.send(err);
              }else{
                res.send(reply);
              }
            });
          }
        });
      }
    });
  }else{
    if(roomId == null && roomTitle == null){
      res.send("Send proper details");
    }else if(roomId == null){
      res.send("Send roomId");
    }else{
      res.send("Send roomTitle");
    }
  }
});

// Edit Drawing Board User and Admin
app.get('/drawing/:room_id',(req,res,next) => {
  let roomId = req.params.room_id;
  client.hgetall(roomId, (err,roomData) => {
    if(!roomData){
      res.send(err);
    }else{
      // if(roomData.canvas_json != ''){
      //   res.send(JSON.parse(roomData.canvas_json));
      // }else{
      //   res.send('');
      // }
      res.send(roomData);
    }
  });
});
app.put('/drawing/:room_id',(req,res,next) => {
  let roomId = req.params.room_id;
  let json = req.body.canvas_json;
  if(json != null){
    client.hmset(roomId, {
      'canvas_json' : JSON.stringify(req.body.canvas_json),
    },(err,reply) => {
      if(!reply){
        res.send(err);
      }else{
        res.send(reply);
      }
    });
  }else{
    res.send("Send JSON Content");
  }
});

// Check if room code is valid
app.get('/roomIdExists', (req,res,next) => {
  let roomId = '';
  roomId = req.body.room_id;
  client.sismember('rooms',roomId, (err,reply)=>{
    if(!reply){
      res.send(false);
    }
    else{
      res.send(true);
    }
  });
});

// add room id to the userid's set
app.post('/addJoinedRoom/:userId', (req,res,next) => {
  let roomId = '';
  let userId = '';
  roomId = req.body.room_id;
  userId = req.params.userId;
  client.sadd(userId, roomId, (err, reply) => {
    if(!reply){
      res.send('0');
    }else{
      res.send(reply.toString());
    }
  });
});