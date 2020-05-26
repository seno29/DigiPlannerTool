const express = require('express');
const bodyParser = require('body-parser');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/:userId')
    .get((req,res,next) => {
        let userId = req.params.userId;
        req.redis.hget('users',userId, function(err, userList){
            if(!userList){
                res.send('User does not exist');
            } else {
                res.send(userList);
            }
        });
    }); 
    
module.exports = userRouter;