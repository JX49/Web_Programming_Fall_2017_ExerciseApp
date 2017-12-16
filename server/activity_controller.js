const express = require("express");
const activity = require("./activity_object.js");

const router = express.Router();
router
    
    .get("/activities",(req, res) => res.send(activity.activities))
    .get("/room", (req, res) => res.send(activity.room))
    .post("/room/activites",(req, res) => {
        activity.room.activities.push(req.body);
    })

    .post("/room/players",(req, res) => {
        if(req.body.password == "password"){
            let player = activity.room.players.find(x=> x.fbid == req.body.fbid);
            if(!player){
                player = { name: req.body.name, id: activity.room.players.length, fbid: req.body.fbid, picture: req.body.picture };
                activity.room.players.push(player);                
            }

            res.status(201).send(player);
        }else{
            res.status(403).send("Invalid Password");
        }
    })

    module.exports.router = router;
    