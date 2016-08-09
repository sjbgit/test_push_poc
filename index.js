//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

//var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

var data = [];

function generateRandomData() {
  data = [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10)
  ];
}


router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/', function(req, res){
  res.sendfile('./index.html');    
}); 

io.on('connection', function(socket){ 
    if (socket) {
        console.log('socket is not null');
    }
    else {
        console.log('socket null');
    }

  socket.on('getData', function(req) {
    generateRandomData();
    console.log(req);
    console.log('getData called');
    socket.emit('data', data);
  });

});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
});