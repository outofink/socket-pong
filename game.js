var DEBUG = 0;

if (DEBUG == 0) var socket = io.connect("https://socket-pong.herokuapp.com/");
if (DEBUG == 1) var socket = io.connect("http://localhost"); //for testing

var score = 0;
var theirScore = 0;

var onscreen = false;

var paddle = {x:512, y:675, w:250, h:25};
var canvas = document.getElementById("canvas");

var deadball = {x:0, y:0, vx:0, vy:0, radius:0};

var ball = deadball;

var serverID = undefined;

var win = -1;

var activeBall = true;

//socket inputs
socket.on('send ball', function(msg) {
    ball = msg[0];
    onscreen = true;
    if (msg[1]) {
        activeBall = false;
    }
});
socket.on('win', function(msg) {
    win = msg;
    overScreen = setScreen();
});
socket.on('point', function(msg) {
    score += 1;
    if (score == pointsChecked) {
        win = 1;
        overScreen = setScreen();
        socket.emit('win', [serverID, 1]);
    }
});
socket.on('msg', function(msg) {
    console.log(msg);
});
socket.on('checkRoom', function(msg) {
    if (msg != "success") {
        joinmsg = msg;
        gameid = '';
    }
    else {
        serverID = gameid;
        var activeBall = true;
        gameScreen = setScreen();
    }
});
socket.on('getRoom', function(msg) {
    serverID = msg;
});
socket.on('start', function() {
    var activeBall = true;
    gameScreen = setScreen();
});
socket.on('gameOver', function() {
    win = 1;
    forceEnd = true;
    overScreen = setScreen();
    ball = deadball;
    gameid = '';
    serverID = undefined;
});

//Very simple detection, could use distance between two points, or more complex polygonal bounding boxes
function paddleCheck(x1, x2, w) {
    if (Math.abs(x2 - x1) > w / 2) return false;
    return true;
}
function buttonCheck(x1, y1, x2, y2, w, h) {
    if ((Math.abs((x2+w/2) - x1) > w / 2) || (Math.abs((y2+h/2) - y1) > h / 2)) return false;
    return true;
}

function canDraw() {
    //clear canvas
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ball
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(ball.x, ball.y, (ball.radius), Math.PI * 2, false);
    ctx.fill();
    //debug info
    if (DEBUG == 1) {
        if (onscreen == false) {
            ctx.fillStyle = "red";
        }
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "left";
        ctx.fillText(JSON.stringify(ball), 50, canvas.height - 50);
    }
    //paddle
    ctx.fillStyle = 'blue';
    ctx.fillRect(paddle.x - paddle.w / 2, paddle.y - paddle.h / 2, paddle.w, paddle.h);
    //score
    ctx.fillStyle = 'black';
    ctx.font = "bold 72px Arial";
    ctx.textAlign = "left";
    ctx.fillText(score, 25, 75);
    //theirScore
    ctx.font = "bold 32px Arial";
    ctx.textAlign = "left";
    ctx.fillText(theirScore, 75, 50);
    //hudmsg
    if (!activeBall) {
        ctx.fillStyle = 'black';
        ctx.font = "bold 64px Coming Soon";
        ctx.textAlign = "center";
        ctx.fillText("Touch ball to start", 512, 550);
    }
    //disconnect
    ctx.beginPath();
    ctx.rect(910, 5, 100, 25);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "bold 16px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("DISCONNECT", 960, 25);
}

function canUpdate() {
    //standard updating
    ball.x += ball.vx;
    ball.y += ball.vy;

    //bounce off left or right side
    if ((ball.x + ball.radius) > canvas.width) {

        ball.x = canvas.width - ball.radius;
        ball.vx *= -1;
    } 
    else if ((ball.x - ball.radius) < 0) {
        ball.x = ball.radius;
        ball.vx *= -1;
    }
    //hit the bottom
    if ((ball.y + ball.radius) > canvas.height) {

        hudmsg = "You lose!";
        socket.emit('point', serverID);
        theirScore += 1;
        if (theirScore == pointsChecked) {
            win = 0;
            overScreen = setScreen();
            socket.emit('win', [serverID, 0]);
        }
        onscreen = false;
        ball = deadball;

    }
    //hit the top 
    else if ((ball.y < -100) && (ball.vy < 0)) {
        //ball.y = -100;
        console.log("thinga")
        if (onscreen) {
            socket.emit('send ball', [{
                x: canvas.width - ball.x,
                y: ball.y,
                vx: -ball.vx,
                vy: -ball.vy,
                radius: ball.radius
            }, false, serverID]);
            onscreen = false;
        }
        ball = deadball;

    }

    if (
      ((ball.y + ball.radius) - (paddle.y - paddle.h / 2) > 0) && // ball and paddle overlap on y-axis
      (Math.abs(ball.x - paddle.x) <= paddle.w / 2 + 15) && // ball and paddle overlap on x-axis
      ((ball.y + ball.radius) - (paddle.y - paddle.h / 2) < ball.radius) //not too overlapped
    ) { 
        ball.vy *= -1;

        //where all the magic happens
        var ax = (ball.x + ((paddle.x - ball.x) / (paddle.y - ball.y)) * (paddle.h / 2 + ball.radius) - paddle.x);
        var ay = (ball.y + (paddle.h / 2 + ball.radius) - paddle.y);

        var OLDpvx = ball.vx;
        var OLDpvy = ball.vy;

        ball.y = paddle.y - paddle.h/2 - ball.radius;

        ball.vx -= ax;
        ball.vy -= ay;

        var ratio = Math.sqrt(((OLDpvx * OLDpvx) + (OLDpvy * OLDpvy))) / Math.sqrt(((ball.vx * ball.vx) + (ball.vy * ball.vy)));
        ball.vx *= ratio;
        ball.vy *= ratio;

        //speed up the ball (but not too fast...)
        if (Math.sqrt(((ball.vy * ball.vy) + (ball.vx * ball.vx))) < 32) {
            ball.vx *= 1.1;
            ball.vy *= 1.1;
        }
    }
}

canvas.addEventListener('touchmove', function() {
    var touch = event.targetTouches[0];

    if (gameScreen && paddleCheck(paddle.x, touch.pageX, paddle.w)) {
        var buffer = 20;
        if (((touch.pageX - paddle.w / 2 - buffer) > 0) && ((touch.pageX + paddle.w / 2 + buffer) < canvas.width)) {
            paddle.x = touch.pageX;
        } else if ((touch.pageX - paddle.w / 2 - buffer) <= 0) {
            paddle.x = paddle.w / 2 + buffer;
        } else if ((touch.pageX + paddle.w / 2 + buffer) >= canvas.width) {
            paddle.x = canvas.width - paddle.w / 2 - buffer;
        }
    }
    event.preventDefault();
}, false);
