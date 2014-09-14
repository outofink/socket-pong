var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile('index.html', {root: __dirname});
});

var users = 0;
io.on('connection', function(socket){
	console.log("client connected");
	users++;
	console.log("there are now "+users+" user(s)")
	if (users % 2 == 0) {
		socket.broadcast.emit('send ball', {x:400,y:300,vx:8,vy:8,radius:50});
		console.log("beginning game");
	}
  socket.on('send ball', function(msg){
    console.log('ball: ' + msg.x);
    socket.broadcast.emit('send ball', msg);
   socket.on('disconnect', function(){
    console.log("client disconnected");
	users--;
	console.log("there are now "+users+" user(s)")
	});
  });
});

http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});