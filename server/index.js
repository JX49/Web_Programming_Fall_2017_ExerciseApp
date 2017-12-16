
const express = require("express");
const handler = require("./httpHandler.js")
const activityController = require("./activity_controller"); 


const server = express();

server.use("/json", function(req, res, next){
    res.send({ result: "this is the result"})
    next();
});

server.use("/client",express.static("./jquery_mockup"))
server.use("/old", handler.main);
server.use("/activity", activityController.router);
    

server.listen(3000);

console.log("http://localhost:3000");