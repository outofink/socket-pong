var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});

var users = 0;
io.on('connection', function(socket) {
    console.log("client connected");
    users++;
    console.log("there are now " + users + " user(s)")
    if (users % 2 == 0) {
        socket.broadcast.emit('send ball', {x:512,y:468,vx:0,vy:-10,radius:35});
        console.log("beginning game");
    }
    socket.on('send ball', function(msg) {
        console.log('ball: ' + msg.x);
        socket.broadcast.emit('send ball', msg);
    });
    socket.on('you win', function() {
	    console.log('win');
	    setTimeout(function() {
	        socket.broadcast.emit('send ball', {x:512,y:468,vx:0,vy:-10,radius:35});
	    }, 1500);
	    socket.broadcast.emit('win');
	});
    socket.on('disconnect', function() {
        console.log("client disconnected");
        users--;
        console.log("there are now " + users + " user(s)")
    });
});

http.listen(process.env.PORT || 80, function() {
    console.log('listening on *:80');
});