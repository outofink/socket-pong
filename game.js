var DEBUG = 0;

if (DEBUG == 0) var socket = io.connect("https://socket-pong.herokuapp.com/");
if (DEBUG == 1) var socket = io.connect("http://localhost"); //for testing

var hudmsg = "";

var score = 0;
var theirScore = 0;

var onscreen = false;

var paddle = {x:512, y:675, w:250, h:25};
var canvas = document.getElementById("canvas");

var gameActive = true;

var deadball = {x:0, y:0, vx:0, vy:0, radius:0};

var ball = deadball;

//socket inputs
socket.on('send ball', function(msg) {
    ball = msg;
    onscreen = true;
});
socket.on('win', function(msg) {
    hudmsg = "You win!";
    score += 1;
    setTimeout(function() {
        hudmsg = "";
    }, 1500);
});

function initCanvas() {
    var W = window.innerWidth;
    var H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;
    canvas.style.width = W;
    canvas.style.height = H;
}

//Very simple detection, could use distance between two points, or more complex polygonal bounding boxes
function detectHit(x1, y1, x2, y2, w, h) {
    if (Math.abs(x2 - x1) > w / 2) return false;
    return true;
}

function canDraw() {
    //clear canvas
    canvas = document.getElementById("canvas");
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
    //hud message
    ctx.font = "bold 108px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = 'black';
    ctx.fillText(hudmsg, canvas.width / 2, canvas.height / 2);
    //score
    ctx.font = "bold 72px Arial";
    ctx.textAlign = "left";
    ctx.fillText(score, 25, 75);
    //theirScore
    ctx.font = "bold 32px Arial";
    ctx.textAlign = "left";
    ctx.fillText(theirScore, 75, 50);
}

function canUpdate() {
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
        socket.emit('you win');
        theirScore += 1;
        setTimeout(function() {
            hudmsg = "";
        }, 1500);
        onscreen = false;
        ball = deadball;

    }
    //hit the top 
    else if ((ball.y < -100) && (ball.vy < 0)) {
        //ball.y = -100;
        if (onscreen) {
            socket.emit('send ball', {
                x: canvas.width - ball.x,
                y: ball.y,
                vx: -ball.vx,
                vy: -ball.vy,
                radius: ball.radius
            });
            onscreen = false;
        }
        ball = deadball;

    }
    // hit the paddle (a bit experimental...)
    if (
      ((ball.y + ball.radius) - (paddle.y - paddle.h / 2) > 0) && // ball and paddle overlap on y-axis
      (Math.abs(ball.x - paddle.x) <= paddle.w / 2 + 15) && // ball and paddle overlap on x-axis
      ((ball.y + ball.radius) - (paddle.y - paddle.h / 2) < ball.radius) && //not too overlapped
      (ball.vy > 0) // going down
    ) { 
        ball.vy *= -1;
        dist = paddle.y - ball.y;
        minDist = paddle.h / 2 + ball.radius;
        var dx = paddle.x - ball.x;
        var dy = paddle.y - ball.y;

        var tx = ball.x + ((dx / dist) * minDist);
        var ty = ball.y + ((dy / dist) * minDist);

        var ax = (tx - paddle.x);
        var ay = (ty - paddle.y);

        var OLDpvx = ball.vx;
        var OLDpvy = ball.vy;

        ball.x -= ax;
        ball.y -= ay;


        ball.vx -= ax;
        ball.vy -= ay;

        var ratio = Math.sqrt(((OLDpvx * OLDpvx) + (OLDpvy * OLDpvy))) / Math.sqrt(((ball.vx * ball.vx) + (ball.vy * ball.vy)));
        ball.vx *= ratio;
        ball.vy *= ratio;

        //speed up the ball (but not too fast...)
        if (Math.sqrt(((ball.vy * ball.vy) + (ball.vx * ball.vx))) < 30) {
            ball.vx *= 1.05;
            ball.vy *= 1.05;
        }
    }
    //standard updating
    ball.x += ball.vx;
    ball.y += ball.vy;

}
var fps = 60;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

initCanvas()

function gameLoop() {
    requestAnimationFrame(gameLoop);

    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);
        if (gameActive) {
            canUpdate();
            canDraw();
        }
    }
};

canvas.addEventListener('touchmove', function() {
    var touch = event.targetTouches[0];

    if (detectHit(paddle.x, paddle.y, touch.pageX, touch.pageY, paddle.w, paddle.h)) {
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

gameLoop();
