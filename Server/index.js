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
app.get('/login',(req,res,next) => {
  client.hgetall('users', function(err, obj){
    if(!obj){
      res.send(err);
    } else {
      res.send(obj);
    }
  });
});   

// //View Board in Admin View, User View
app.get('/adminView/:userId',(req,res,next) => {
  //Here you can see a list of all rooms which you have visited
  let userId = req.params.userId;
  let rooms = [];
  let roomsinfo = {};
  client.smembers(userId , function(err, roomsOfUser){
    if(!roomsOfUser){
      res.send(err);
    } else {
      rooms = roomsOfUser;
      console.log(rooms);
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

app.post('/adminView/:userId',(req,res,next) => {
  let userId = req.params.userId;
  let roomId = req.body.room_id;
  client.sadd('rooms', roomId, (err, reply) => {
    if(!reply){
      res.send(err);
    }else{
      client.sadd(userId, roomId, (err, reply) => {
        if(!reply){
          res.send(err);
        }else{
            client.hmset(roomId, {
            'room_title' : req.body.room_title,
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
});

// // Edit Drawing Board User and Admin
app.get('/drawing/:roomId',(req,res,next) => {
  client.hgetall(req.params.roomId, (err,roomData) => {
    if(!roomData){
      res.send(err);
    }else{
      if(roomData.canvas_json != ''){
        res.send(JSON.parse(roomData.canvas_json));
      }else{
        res.send('');
      }
    }
  });
});
app.put('/drawing/:roomId',(req,res,next) => {
  client.hmset(req.params.roomId, {
    'canvas_json' : JSON.stringify(req.body.canvas_json),
  },(err,reply) => {
    if(!reply){
      res.send(err);
    }else{
      res.send(reply);
    }
  });
});

// // Check if room code is valid
app.get('/roomIdExists', (req,res,next) => {
  var roomId = '';
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