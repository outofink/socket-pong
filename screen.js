var mainScreen = false;
var pointsScreen = false;
var waitScreen = false;
var joinScreen = false;
var gameScreen = false;
var loadingScreen = false;
var overScreen = false;

var pointsChecked = 0;
var gameid = '';
var gameidfull = false;

var forceEnd = false;

var joinmsg = '';

function initCanvas() {
    var ctx = canvas.getContext('2d');

    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = W;
    canvas.style.height = H;

    //Will add HD soon!
    if (window.devicePixelRatio > 1) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        canvas.width *= window.devicePixelRatio;
        canvas.height *= window.devicePixelRatio;
        canvas.style.width = W + "px";
        canvas.style.height = H + "px";
    }
}

function setId(val) {
    joinmsg = '';
    if (val == -1) {
        gameid = gameid.slice(0, - 1);
    }
    else if (gameid.length < 4)
        gameid += val.toString();
}

function setScreen() {
    mainScreen = false;
    pointsScreen = false;
    waitScreen = false;
    joinScreen = false;
    gameScreen = false;
    loadingScreen = false;
    overScreen = false;

    return true
}
//scaling functions
function scaleRect(ctx, x, y, w, h) { //.5, .7, .15, .7
    height = canvas.height*(.8)
    width = height*(3/2)
    xNew = x*width + (canvas.width-width)/2
    yNew = y*height + (canvas.height-height)/2
    wNew = w * width
    hNew = h * height
    return ctx.rect(xNew, yNew, wNew, hNew)
}
function scaleText(ctx, text, x, y) {
    height = canvas.height*(.8)
    width = height*(3/2)
    xNew = x*width + (canvas.width-width)/2
    yNew = y*height + (canvas.height-height)/2
    return ctx.fillText(text, xNew, yNew)
}
function scaleFont(ctx, size, other) {
    height = canvas.height*(.8)
    sizeNew = size * height
    return ctx.font = sizeNew + "px " + other
}

function loading() {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Hack to preload fonts    
    ctx.font = "0px Coming Soon";
    ctx.fillText("", 0, 0);
    ctx.font = "0px Josefin Sans";
    ctx.fillText("", 0, 0);
    //Loading screen
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    scaleFont(ctx, .196 ,"Arial")
    ctx.fillText("Loading", canvas.width/2, canvas.height/2);
    setTimeout(function() {
        mainScreen = setScreen();
    }, 1250);

}
function mainMenu() {
    //clear canvas
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = .004 * canvas.height
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';

    //"Start Game"
    ctx.beginPath();
    scaleRect(ctx, .060, .345, .424, .273)
    ctx.stroke();

    ctx.textAlign = "center";
    scaleFont(ctx, .087, "Coming Soon")
    scaleText(ctx, "Start Game", .272, .511)

    //"Join Game"
    ctx.beginPath();
    scaleRect(ctx, .515, .345, .424, .273)
    ctx.stroke();

    scaleFont(ctx, .087, "Coming Soon")
    scaleText(ctx, "Join Game", .727, .511)

    //"???"
    ctx.beginPath();
    scaleRect(ctx, .060, .664, .424, .273)
    ctx.stroke();

    scaleFont(ctx, .087, "Coming Soon")
    scaleText(ctx, "???", .272, .829)

    //"???"
    ctx.beginPath();
    scaleRect(ctx, .515, .664, .424, .273)
    ctx.stroke();

    scaleFont(ctx, .087, "Coming Soon")
    scaleText(ctx, "???", .727, .829)

    //Version;
    ctx.textAlign = "left";
    scaleFont(ctx, .029, "Coming Soon")
    ctx.fillText("v1.1.0", 10, canvas.height-10);

    //About
    ctx.textAlign = "right";
    scaleFont(ctx, .029, "Coming Soon")
    ctx.fillText("by Moshe Krumbein (outofink)", canvas.width-10, canvas.height-10);

    //Title
    ctx.fillStyle = '#7723B8';
    ctx.textAlign = "center";
    scaleFont(ctx, .196 ,"Josefin Sans")
    scaleText(ctx, "Socket Pong", .506, .164)

    // //old bounds
    // height = 550
    // xoff = -40
    // yoff = -50

    // ctx.beginPath();
    // ctx.rect(((1024*2)-(height*2*(3/2)))/2 + xoff, ((768*2)-(height*2))/2 + yoff, height*2*(3/2), height*2);
    // ctx.strokeStyle = 'blue';
    // ctx.stroke();
    // ctx.closePath()

    // //new bounds
    // height = canvas.height*(.8)
    // ctx.beginPath();
    // ctx.rect((canvas.width-height*(3/2))/2, (canvas.height-height)/2, height*(3/2), height);
    // ctx.strokeStyle = 'red';
    // ctx.stroke();
    // ctx.closePath()
}

function points() {
    //clear canvas
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //check
    ctx.fillStyle = 'lime';
    ctx.beginPath();
    if (pointsChecked == 3) {
        ctx.moveTo(529,823);
        ctx.lineTo(729,823);
        ctx.lineTo(729,623);
    }
    else if (pointsChecked == 5) {
        ctx.moveTo(995,823);
        ctx.lineTo(1195,823);
        ctx.lineTo(1195,623);
    }
    else if (pointsChecked == 7) {
        ctx.moveTo(1453,823);
        ctx.lineTo(1653,823);
        ctx.lineTo(1653,623);
    }
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.font = "108px Arial";
    ctx.textAlign = "center";
    if (pointsChecked == 3) {
        ctx.fillText("✓", 662, 790);
    }
    else if (pointsChecked == 5) {
        ctx.fillText("✓", 1119, 790);
    }
    else if (pointsChecked == 7) {
        ctx.fillText("✓", 1577, 790);
    }
    //"Points to Win"
    ctx.fillStyle = 'black';
    ctx.font = "128px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Points to win:", 988, 329);
    //"3"
    ctx.beginPath();
    ctx.rect(329, 423, 400, 400);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "168px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("3", 531, 688);
    //"5"
    ctx.beginPath();
    ctx.rect(795, 423, 400, 400);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "168px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("5", 988, 688);

    //"7"
    ctx.beginPath();
    ctx.rect(1253, 423, 400, 400);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "168px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("7", 1446, 688);

    //Create Game
    ctx.beginPath();
    ctx.rect(638, 962, 700, 200);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "96px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Start Game", 988, 1100);
    //back
    ctx.beginPath();
    ctx.rect(10, 19, 225, 100);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "48px Coming Soon";
    ctx.textAlign = "left";
    ctx.fillText("◀ BACK", 19, 85);
}

function wait() {
    //clear canvas
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //"Game ID"
    ctx.fillStyle = 'black';
    ctx.font = "128px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Game ID:", 988, 236);
    //the game id
    ctx.fillStyle = 'black';
    ctx.font = "216px Coming Soon";
    ctx.textAlign = "center";
    var printID;
    if (serverID != '') {
        printID = ("000"+serverID).slice(-4)
    }
    else {
        printID = serverID;
    }
    ctx.fillText(printID, 988, 470);
    //"Waiting for opponent"
    ctx.fillStyle = 'black';
    ctx.font = "96px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Waiting for opponent...", 988, 846);
    //disconnect
    ctx.beginPath();
    ctx.rect(813, 1128, 350, 100);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "48px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("DISCONNECT", 988, 1194);
}
function joining() {
    //clear canvas
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Dial
    ctx.fillStyle = 'black';
    ctx.font = "128px Coming Soon";
    ctx.textAlign = "center";
    var j = 0;
    for (i=1;i<10;i++) {
        ctx.fillText(i.toString(), 788+((i-1)%3)*200, 752+j*200);
        if (i%3==0) j++;
    }
    ctx.fillText("0", 988, 1352);
    //"Game ID"
    ctx.fillStyle = 'black';
    ctx.font = "128px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Enter Game ID:", 988, 235);
    //joinmsg
    ctx.fillStyle = 'red';
    ctx.font = "64px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText(joinmsg, 988, 329);
    //back
    if (gameid.length!=0) {
        ctx.fillStyle = 'black';
        ctx.font = "128px Coming Soon";
        ctx.textAlign = "center";
        ctx.fillText("←", 788, 1343);
    }   
    //ok
    if (gameid.length==4) {
        ctx.beginPath();
        ctx.arc(1188, 1305, 60, Math.PI * 2, false);
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        ctx.fillStyle = 'black';
        ctx.font = "64px Coming Soon";
        ctx.textAlign = "center";
        ctx.fillText("OK", 1188, 1328);
        gameidfull = true;
    }
    else gameidfull = false;
    //inputs
    ctx.fillStyle = 'black';
    ctx.font = "216px Coming Soon";
    ctx.textAlign = "center";
    String.prototype.repeat = function (n) {
        var str = '';
        for(var i = 0; i < n; i++) { str += this; }
        return str;
    };
    printid = (gameid+"_".repeat((4-gameid.length))).split('').join(' ');
    ctx.fillText(printid, 988, 564);
    //back
    ctx.beginPath();
    ctx.rect(10, 19, 225, 100);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "48px Coming Soon";
    ctx.textAlign = "left";
    ctx.fillText("◀ BACK", 19, 85);
}
function over() {
    //clear canvas
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //You Win/Lose/Tie
    var msg = '';
    if (win==1) msg = "You Win!";
    else if (win==0) msg = "You Lose!";

    ctx.fillStyle = 'black';
    ctx.font = "216px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText(msg, 988, 376);
    //check for forfeit
    if (forceEnd) {
        ctx.fillStyle = 'red';
        ctx.font = "64px Coming Soon";
        ctx.textAlign = "center";
        ctx.fillText("(They forfeited)", 988, 470);
    }
    //your points
    ctx.fillStyle = 'black';
    ctx.font = "128px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("You:", 604, 658);
    //their points
    ctx.fillStyle = 'black';
    ctx.font = "128px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Other Guy:", 1372, 658);
    //your points actually
    ctx.fillStyle = 'black';
    ctx.font = "192px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText(score, 604, 917);
    //their points actually
    ctx.fillStyle = 'black';
    ctx.font = "192px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText(theirScore, 1372, 917);
    //go back to Main Menu/disconnect
    ctx.beginPath();
    ctx.rect(863, 1203, 250, 75);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "32px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("MAIN MENU", 988, 1252);

    // Coming Soon!
    // //Play again
    // ctx.beginPath();
    // ctx.rect(688, 1028, 600, 150);
    // ctx.lineWidth = 6;
    // ctx.strokeStyle = 'black';
    // ctx.stroke();

    // ctx.fillStyle = 'black';
    // ctx.font = "96px Coming Soon";
    // ctx.textAlign = "center";
    // ctx.fillText("Play Again", 988, 1127);
}

canvas.addEventListener('touchstart', function(event) {
    var touch = event.targetTouches[0];

    var j = 0;
    for (i=1;i<10;i++) {
        if (joinScreen && buttonCheck(touch.pageX, touch.pageY, 356+((i-1)%3)*100, 337+j*100, 75, 75)) setId(i);
        if (i%3==0) j++;
    }

    if (mainScreen && buttonCheckN(touch.pageX, touch.pageY, .060, .345, .424, .273)) {
        pointsChecked = 3;
        pointsScreen = setScreen();
    }
    else if (mainScreen && buttonCheckN(touch.pageX, touch.pageY, .515, .345, .424, .273)) {
        joinScreen = setScreen();
    }
    else if (pointsScreen && buttonCheck(touch.pageX, touch.pageY, 165, 212, 200, 200)) {
        pointsChecked = 3;
    }
    else if (pointsScreen && buttonCheck(touch.pageX, touch.pageY, 398, 212, 200, 200)) {
        pointsChecked = 5;
    }
    else if (pointsScreen && buttonCheck(touch.pageX, touch.pageY, 627, 212, 200, 200)) {
        pointsChecked = 7;
    }
    else if (pointsScreen && buttonCheck(touch.pageX, touch.pageY, 5, 10, 113, 50)) {
        mainScreen = setScreen();
        pointsChecked = 0;
    }
    else if (pointsScreen && buttonCheck(touch.pageX, touch.pageY, 337, 500, 350, 100)) {
        serverID = ''
        waitScreen = setScreen();
        socket.emit('getRoom', pointsChecked);
    }
    else if (waitScreen && buttonCheck(touch.pageX, touch.pageY, 406, 564, 175, 50)) {
        mainScreen = setScreen();
        socket.emit('leaveRoom', true);
    }
    
    else if (joinScreen && buttonCheck(touch.pageX, touch.pageY, 356, 637, 75, 75)) {
        setId(-1);
    }
    else if (joinScreen && buttonCheck(touch.pageX, touch.pageY, 456, 637, 75, 75)) {
        setId(0)
    }
    else if (joinScreen && gameidfull && buttonCheck(touch.pageX, touch.pageY, 556, 637, 75, 75)) {
        socket.emit('checkRoom', gameid);
    }
    else if (joinScreen && buttonCheck(touch.pageX, touch.pageY, 5, 10, 113, 50)) {
        mainScreen = setScreen();
        joinmsg = '';
        gameid = '';
    }
    else if (gameScreen && buttonCheck(touch.pageX, touch.pageY, 875, 10, 100, 25)) {
        mainScreen = setScreen();
        socket.emit('leaveRoom', false);
        win = -1
        forceEnd = 0;
        score = 0;
        theirScore = 0;
        gameid = '';
        serverID = undefined;
        ball = deadball;
    }
    else if (overScreen && buttonCheck(touch.pageX, touch.pageY, 432, 602, 125, 38)) {
        mainScreen = setScreen();
        socket.emit('leaveRoom', true);
        win = -1
        forceEnd = 0;
        score = 0;
        theirScore = 0;
        gameid = '';
        serverID = undefined;
        ball = deadball;

    }
    else if (gameScreen && buttonCheck(touch.pageX, touch.pageY, 449, 316, 90, 90)) {
        activeBall = true;
    }
    event.preventDefault();
}, false);

initCanvas()

loadingScreen = setScreen();
//pointsScreen = setScreen();

function gameLoop() {
    requestAnimationFrame(gameLoop);
    if (gameScreen) {
        if (activeBall) {
            canUpdate();
        }
        canDraw();
    }
    if (mainScreen) {
        mainMenu();
    }
    if (loadingScreen) {
        loading();
    }
    if (pointsScreen) {
        points();
    }
    if (waitScreen) {
        wait();
    }
    if (joinScreen) {
        joining();
    }
    if (overScreen) {
        over();
    }
};

gameLoop();
