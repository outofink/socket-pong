var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var rooms = [];

function createRoom() {
    var room = parseInt(Math.random() * 10000)
    while (rooms[room] != undefined) {
        room = parseInt(Math.random() * 10000)
    }
    return room
}
app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});
app.use(express.static(__dirname));

io.on('connection', function(socket) {
    console.log("client connected");

    socket.on('send ball', function(msg) {
        socket.broadcast.to(parseInt(msg[2])).emit('send ball', [msg[0], msg[1]]);
    });
    socket.on('getRoom', function() {
        var room =createRoom();
        rooms[room]= [socket.id];
        socket.join(room);
        socket.emit('getRoom', room)
    });
    socket.on('checkRoom', function(msg) {
        if (rooms[parseInt(msg)] == undefined) {
            socket.emit('checkRoom', "No game exists with that ID")
        }
        else if (rooms[parseInt(msg)].length != 1) {
            socket.emit('checkRoom', "Game is already full")
        }
        else {
            socket.emit('checkRoom', "success");
            rooms[parseInt(msg)][1] = socket.id;
            socket.join(parseInt(msg));
            socket.broadcast.to(parseInt(msg)).emit('start');
            socket.broadcast.to(parseInt(msg)).emit('send ball', [{x:988,y:722,vx:0,vy:-20,radius:70}, true]);
        }
    });
    socket.on('point', function(msg) {
	    socket.broadcast.to(parseInt(msg)).emit('send ball', [{x:988,y:722,vx:0,vy:-20,radius:70}, true]);
	    socket.broadcast.to(parseInt(msg)).emit('point');
	});
    socket.on('win', function(msg) {
        socket.broadcast.to(parseInt(msg[0])).emit('win', 1-msg[1]);
    });
    socket.on('leaveRoom', function(msg) {
        oldRooms = Object.keys(io.sockets.adapter.rooms);
        for (i = 0; i < oldRooms.length; i++) {
            if (oldRooms[i].toString().length<=4) {
                if (!msg) socket.broadcast.to(oldRooms[i]).emit('gameOver', 'disconnect')
                rooms[oldRooms[i]] = undefined;
                socket.leave(oldRooms[i]);
            }
        }
    });
    socket.on('disconnect', function() {
        oldRooms = Object.keys(io.sockets.adapter.rooms);
        for (i = 0; i < oldRooms.length; i++) {
            var clients = Object.keys(io.sockets.adapter.rooms[oldRooms[i]]); 
            console.log(clients)
            console.log(oldRooms)
            if (oldRooms[i].toString().length<=4 && (socket.id in clients)) {
                console.log(oldRooms[i].toString())
                socket.to(oldRooms[i]).emit('gameOver', 'disconnect')
                rooms[oldRooms[i]] = undefined;
                socket.leave(oldRooms[i]);
            }
        }
        console.log("client disconnected");
    });
});

http.listen(process.env.PORT || 80, function() {
    console.log('listening on *:80');
});