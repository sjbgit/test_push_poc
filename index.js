var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var data = [];

function generateRandomData() {
  data = [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10)
  ];
}

// var interval = setInterval(function() {
//     console.log();
// }, 5000);

app.get('/', function(req, res){
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

http.listen(process.env.PORT || 8000, process.env.IP || "0.0.0.0", function () {
    var addr = http.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});


// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });