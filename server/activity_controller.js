const express = require("express");
const activity = require("./activity_object.js");

const router = express.Router();
router
    
    .get("/activities",(req, res) => res.send(activity.activities))
    .get("/room", (req, res) => res.send(activity.room))
    .post("/room/activities",(req, res) => {
        activity.room.activities.push(req.body);

        res.status(201).send("posted");
    })

    .post("/room/users",(req, res) => {
        if(req.body.password == "password"){
            console.log("password verified")
            let user = activity.room.users.find(x=> x.fbid == req.body.fbid);
            if(!user){
                user = { name: req.body.name, id: activity.room.users.length, fbid: req.body.fbid, picture: req.body.picture };
                activity.room.users.push(user);                
            }

            res.status(201).send(user);
        }else{
            res.status(403).send("Invalid Password");
        }
    })

    module.exports.router = router;
    