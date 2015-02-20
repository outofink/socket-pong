var mainScreen = false;
var pointsScreen = false;
var waitScreen = false;
var joinScreen = false;
var gameScreen = false;
var loadingScreen = false;

function setScreen() {
    mainScreen = false;
    pointsScreen = false;
    waitScreen = false;
    joinScreen = false;
    gameScreen = false;
    loadingScreen = false;

    return true
}

function loading() {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Hack to preload fonts    
    ctx.font = "0px Coming Soon";
    ctx.fillText("", 0, 0);
    ctx.font = "0px Poiret One";
    ctx.fillText("", 0, 0);
    //Loading screen
    ctx.fillStyle = 'black';
    ctx.font = "108px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Loading", 512, 424);
    setTimeout(function() {
        mainScreen = setScreen();
    }, 750);

}
function mainMenu() {
    //clear canvas
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //"Create Game"
    ctx.beginPath();
    ctx.rect(122, 359, 350, 150);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "bold 48px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Create Game", 297, 450);
    //"Join Game"
    ctx.beginPath();
    ctx.rect(552, 359, 350, 150);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.font = "bold 48px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Join Game", 727, 450);

    //Version
    ctx.font = "bold 16px Coming Soon";
    ctx.textAlign = "left";
    ctx.fillText("v1.0.0", 5, 763);

    //About
    ctx.font = "bold 16px Coming Soon";
    ctx.textAlign = "right";
    ctx.fillText("by Moshe Krumbein (outofink)", 1019, 763);

    //Title
    ctx.fillStyle = '#7723B8';
    ctx.font = "bold 108px Poiret One";
    ctx.textAlign = "center";
    ctx.fillText("Socket Pong", 512, 200);
}

canvas.addEventListener('touchstart', function() {
  var touch = event.targetTouches[0];
  if (mainScreen && buttonCheck(touch.pageX, touch.pageY, 122, 359, 350, 150)) {
      console.log("Create Game!");
  }
  if (mainScreen && buttonCheck(touch.pageX, touch.pageY, 552, 359, 350, 150)) {
      console.log("Join Game!");
  }
  event.preventDefault();
}, false);

var fps = 60;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

initCanvas()

//loadingScreen = setScreen();
gameScreen = setScreen();

function gameLoop() {
    requestAnimationFrame(gameLoop);

    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);
        if (gameScreen) {
            canUpdate();
            canDraw();
        }
        if (mainScreen) {
            mainMenu();
        }
        if (loadingScreen) {
            loading();
        }
    }
};

gameLoop();