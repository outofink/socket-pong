var socket = io.connect("http://localhost");
//var socket = io();
var DEBUG = 1;
var onscreen = false;

var paddle;
var canvas;
var deadball = {
  x:0,
  y:0,
  vx:0,
  vy:0,
  radius:0
}
var ball=deadball;
socket.on('send ball', function(msg){
  ball = msg;
  onscreen = true;
});
initCanvas()
function initCanvas() {

  //Initialise array
  paddle = {x:400, y:600, w:300, h:30};
  canvas = document.getElementById("canvas");

  var W = window.innerWidth;
  var H = window.innerHeight;

  canvas.width= W;
  canvas.height= H;
  canvas.style.width = W;
  canvas.style.height = H;

  //Add eventlistener to canvas
  gameLoop();
  canvas.addEventListener('touchmove', function() {
    var touch = event.targetTouches[0];

    if(detectHit(paddle.x, paddle.y, touch.pageX, touch.pageY, paddle.w, paddle.h)) {
      var buffer = 20;
      if (((touch.pageX-paddle.w/2 - buffer) > 0) && ((touch.pageX+paddle.w/2 + buffer) < canvas.width)) {
        paddle.x = touch.pageX;
      }
      else if ((touch.pageX-paddle.w/2 - buffer) <= 0) {
        paddle.x = paddle.w/2 + buffer;
      }
      else if ((touch.pageX+paddle.w/2 + buffer) >= canvas.width) {
        paddle.x = canvas.width - paddle.w/2 - buffer;
      }

      //canDraw();
    }
    event.preventDefault();
  }, false);

  //canDraw();
}

function detectHit(x1,y1,x2,y2,w,h) {

  //Very simple detection here, could use distance between two pts e.g., or more complex polygonal bounding boxes
  if(Math.abs(x2-x1)>w/2) return false;
  return true;
}

function canDraw() {
  //clear canvas
  canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  p=ball;

  if ((p.x + p.radius) > canvas.width) {

      p.x = canvas.width - p.radius;
      p.vx *= -1;
  }
  else if ((p.x - p.radius) < 0) {
      p.x = p.radius;
      p.vx *= -1;
  }

  if ((p.y + p.radius) > canvas.height) {
      p.y = canvas.height - p.radius;
      p.vy *= -1;
  }

  else if ((p.y < -100) && (p.vy < 0)) {
      //p.y = -100;
      if (onscreen) {
        socket.emit('send ball', {x:canvas.width-p.x, y:p.y, vx:-p.vx, vy:-p.vy, radius:p.radius});
        onscreen = false;
      }
      ball=deadball;

  }
//   (     ball and paddle overlap on y-axis     )    (  ball and paddle overlap on x-axis   )   (going down)   (                 not too overlapped                 )
  if (((p.y+p.radius) - (paddle.y-paddle.h/2) > 0) && (Math.abs(p.x - paddle.x) <= paddle.w/2) && (p.vy > 0) && ((p.y+p.radius) - (paddle.y-paddle.h/2) < paddle.h/2))  {
    p.vy *= -1;
  }
  p.x += p.vx;
  p.y += p.vy;

  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.arc(p.x, p.y, (p.radius), Math.PI*2, false);
  ctx.fill();
  if (DEBUG == 1) {
    if (onscreen == false) {ctx.fillStyle="red";}
    ctx.font = "bold 16px Arial";
    ctx.fillText(JSON.stringify(ball), 50, canvas.height-50);
  }
  ctx.fillStyle = 'blue';
  ctx.fillRect(paddle.x - paddle.w/2, paddle.y- paddle.h/2, paddle.w, paddle.h);
} 

var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

function gameLoop() {
  requestAnimationFrame(gameLoop);
     
    now = Date.now();
    delta = now - then;
     
    if (delta > interval) {
      then = now - (delta % interval);

      canDraw();

  }
};
