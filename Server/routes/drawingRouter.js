const express = require('express');
const bodyParser = require('body-parser');

const drawingRouter = express.Router();

drawingRouter.use(bodyParser.json());

drawingRouter.route('/:room_id')
    .get((req,res,next) => {
        let roomId = req.params.room_id;
        req.redis.hgetall(roomId, (err,roomData) => {
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
    })
    .put((req,res,next) => {
        let roomId = req.params.room_id;
        let json = req.body.canvas_json;
        let base64 = req.body.base64;
        if(json != null){
        req.redis.hmset(roomId, {
            'canvas_json' : JSON.stringify(req.body.canvas_json),
            'base64' : base64
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

module.exports = drawingRouter;