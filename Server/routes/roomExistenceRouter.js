const express = require('express');
const bodyParser = require('body-parser');

const roomExistenceRouter = express.Router();

roomExistenceRouter.use(bodyParser.json());

roomExistenceRouter.route('/')
    .get( (req,res,next) => {
        let roomId = '';
        roomId = req.body.room_id;
        req.redis.sismember('rooms',roomId, (err,reply)=>{
            if(!reply){
                res.send(false);
            }
            else{
                res.send(true);
            }
        });
    });

module.exports = roomExistenceRouter;