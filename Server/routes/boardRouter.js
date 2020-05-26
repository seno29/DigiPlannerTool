const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');

const boardRouter = express.Router();

boardRouter.use(bodyParser.json());

boardRouter.route('/:userId')
    .get((req,res,next) => {
        let userId = req.params.userId;
        let rooms = [];
        let roomsinfo = {};
        req.redis.smembers(userId , function(err, roomsOfUser){
            if(!roomsOfUser){
                res.send(err);
            } else {
                rooms = roomsOfUser;
                async.forEach(rooms, function(room, callback) { 
                req.redis.hgetall(room, (err,reply)=>{
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
    })
    .post((req,res,next) => {
        let userId = req.params.userId;
        let roomId = req.body.room_id;
        let roomTitle = req.body.room_title;
        if(roomId != null && roomTitle != null){
        req.redis.sadd('rooms', roomId, (err, reply) => {
            if(!reply){
                res.send(err);
            }else{
                req.redis.sadd(userId, roomId, (err, reply) => {
                    if(!reply){
                    req.redis.srem('rooms', roomId, (error,response)=>{
                        if(!response){
                        res.send('0');
                        }else{
                        res.send(err);
                        }
                    });
                    }else{
                        req.redis.hmset(roomId, {
                        'room_title' : roomTitle,
                        'admin_id' : userId,
                        'canvas_json': '',
                        'base64': ''
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
            if(roomId == null && roomTitle == null && base64 == null){
                res.send("Send proper details");
            }else if(roomId == null){
                res.send("Send roomId");
            }else{
                res.send("Send roomTitle");
            }
        }
    });

module.exports = boardRouter;