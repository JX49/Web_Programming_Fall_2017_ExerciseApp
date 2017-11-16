const express = require("express");
const activity = require("./activity_object.js");

const router = express.Router();
router
    
    .get("/activities",(req, res) => res.send(activity.activities))
  
    module.exports.router = router;
    