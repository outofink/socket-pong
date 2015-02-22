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
    // if (window.devicePixelRatio > 1) {
    //     ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    //     canvas.width *= window.devicePixelRatio;
    //     canvas.height *= window.devicePixelRatio;
    //     canvas.style.width = W + "px";
    //     canvas.style.height = H + "px";
    // }
}

function setId(val) {
	joinmsg = '';
	if (val == -1) {
		gameid = gameid.slice(0, - 1);
	}
	else if (gameid.length < 4)
		gameid+=val.toString();
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
function points() {
	//clear canvas
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //check
    ctx.fillStyle = 'green';
    ctx.beginPath();
    if (pointsChecked == 3) {
    	ctx.moveTo(275,425);
    	ctx.lineTo(375,425);
    	ctx.lineTo(375,325);
    }
    else if (pointsChecked == 5) {
    	ctx.moveTo(512,425);
    	ctx.lineTo(612,425);
    	ctx.lineTo(612,325);
    }
    else if (pointsChecked == 7) {
    	ctx.moveTo(749,425);
    	ctx.lineTo(849,425);
    	ctx.lineTo(849,325);
    }
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.font = "54px Arial";
    ctx.textAlign = "center";
    if (pointsChecked == 3) {
    	ctx.fillText("✓", 343, 410);
    }
    else if (pointsChecked == 5) {
    	ctx.fillText("✓", 580, 410);
    }
    else if (pointsChecked == 7) {
    	ctx.fillText("✓", 817, 410);
    }
    //"Points to Win"
    ctx.fillStyle = 'black';
    ctx.font = "bold 64px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Points to win:", 512, 175);
    //"3"
    ctx.beginPath();
    ctx.rect(175, 225, 200, 200);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "bold 84px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("3", 275, 355);
    //"5"
    ctx.beginPath();
    ctx.rect(412, 225, 200, 200);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "bold 84px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("5", 512, 355);

    //"7"
    ctx.beginPath();
    ctx.rect(649, 225, 200, 200);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "bold 84px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("7", 749, 355);

    //Create Game
    ctx.beginPath();
    ctx.rect(337, 500, 350, 100);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "bold 48px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Create Game", 512, 565);
    //back
    ctx.beginPath();
    ctx.rect(5, 10, 100, 50);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "bold 24px Coming Soon";
    ctx.textAlign = "left";
    ctx.fillText("◀ BACK", 10, 45);
}

function wait() {
	//clear canvas
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	//"Game ID"
    ctx.fillStyle = 'black';
    ctx.font = "bold 64px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Game ID:", 512, 125);
    //the game id
    ctx.fillStyle = 'black';
    ctx.font = "bold 108px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText(("000"+serverID).slice(-4), 512, 250);
    //"Wating for opponent"
    ctx.fillStyle = 'black';
    ctx.font = "bold 48px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Wating for opponent...", 512, 450);
    //disconnect
    ctx.beginPath();
    ctx.rect(424, 600, 175, 50);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "bold 24px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("DISCONNECT", 512, 635);
}
function joining() {
	//clear canvas
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Dial
    ctx.fillStyle = 'black';
    ctx.font = "bold 64px Coming Soon";
    ctx.textAlign = "center";
    var j = 0;
    for (i=1;i<10;i++) {
    	ctx.fillText(i.toString(), 412+((i-1)%3)*100, 400+j*100);
    	if (i%3==0) j++;
    }
    ctx.fillText("0", 512, 700);
	//"Game ID"
    ctx.fillStyle = 'black';
    ctx.font = "bold 64px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Enter Game ID:", 512, 125);
    //joinmsg
    ctx.fillStyle = 'red';
    ctx.font = "bold 32px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText(joinmsg, 512, 175);
    //back
    if (gameid.length!=0) {
	    ctx.fillStyle = 'black';
	    ctx.font = "bold 64px Coming Soon";
	    ctx.textAlign = "center";
	    ctx.fillText("←", 412, 695);
	}	
    //ok
    if (gameid.length==4) {
	    ctx.beginPath();
	    ctx.arc(612, 675, 30, Math.PI * 2, false);
	    ctx.lineWidth = 5;
	    ctx.strokeStyle = 'black';
	    ctx.stroke();

	    ctx.fillStyle = 'black';
	    ctx.font = "bold 32px Coming Soon";
	    ctx.textAlign = "center";
	    ctx.fillText("OK", 612, 687);
	    gameidfull = true;
	}
	else gameidfull = false;
    //inputs
    ctx.fillStyle = 'black';
    ctx.font = "bold 108px Coming Soon";
    ctx.textAlign = "center";
    String.prototype.repeat = function (n) {
	    var str = '';
	    for(var i = 0; i < n; i++) { str += this; }
	    return str;
	};
    printid = (gameid+"_".repeat((4-gameid.length))).split('').join(' ');
    ctx.fillText(printid, 512, 300);
    //back
    ctx.beginPath();
    ctx.rect(5, 10, 100, 50);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "bold 24px Coming Soon";
    ctx.textAlign = "left";
    ctx.fillText("◀ BACK", 10, 45);
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
    ctx.font = "bold 108px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText(msg, 512, 200);
    //check for forfeit
    if (forceEnd) {
		ctx.fillStyle = 'red';
	    ctx.font = "bold 32px Coming Soon";
	    ctx.textAlign = "center";
	    ctx.fillText("(They forfeited)", 512, 250);
	}
    //your points
    ctx.fillStyle = 'black';
    ctx.font = "bold 64px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("You:", 320, 350);
    //their points
    ctx.fillStyle = 'black';
    ctx.font = "bold 64px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("Other Guy:", 704, 350);
    //your points actually
    ctx.fillStyle = 'black';
    ctx.font = "bold 96px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText(score, 320, 475);
    //their points actually
    ctx.fillStyle = 'black';
    ctx.font = "bold 96px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText(theirScore, 704, 475);
    //go back to Main Menu/dsiconnect
    ctx.beginPath();
    ctx.rect(424, 600, 175, 50);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "bold 24px Coming Soon";
    ctx.textAlign = "center";
    ctx.fillText("MAIN MENU", 512, 635);
}

canvas.addEventListener('touchstart', function() {
	var touch = event.targetTouches[0];
	if (mainScreen && buttonCheck(touch.pageX, touch.pageY, 122, 359, 350, 150)) {
		pointsChecked = 3;
	    pointsScreen = setScreen();
	}
	if (mainScreen && buttonCheck(touch.pageX, touch.pageY, 552, 359, 350, 150)) {
	    joinScreen = setScreen();
	}
	if (pointsScreen && buttonCheck(touch.pageX, touch.pageY, 175, 225, 200, 200)) {
	    pointsChecked = 3;
	}
	if (pointsScreen && buttonCheck(touch.pageX, touch.pageY, 412, 225, 200, 200)) {
	    pointsChecked = 5;
	}
	if (pointsScreen && buttonCheck(touch.pageX, touch.pageY, 649, 225, 200, 200)) {
	    pointsChecked = 7;
	}
	if (pointsScreen && buttonCheck(touch.pageX, touch.pageY, 5, 10, 100, 50)) {
	    mainScreen = setScreen();
	    pointsChecked = 0;
	}
	if (pointsScreen && buttonCheck(touch.pageX, touch.pageY, 337, 500, 350, 100)) {
	    waitScreen = setScreen();
	    socket.emit('getRoom');
	}
	if (waitScreen && buttonCheck(touch.pageX, touch.pageY, 424, 600, 175, 50)) {
	    mainScreen = setScreen();
	    socket.emit('leaveRoom', true);
	}
	var j = 0;
	for (i=1;i<10;i++) {
		if (joinScreen && buttonCheck(touch.pageX, touch.pageY, 372+((i-1)%3)*100, 338+j*100, 75, 75)) setId(i);
		if (i%3==0) j++;
	}
	if (joinScreen && buttonCheck(touch.pageX, touch.pageY, 372, 638, 75, 75)) {
	    setId(-1);
	}
	if (joinScreen && buttonCheck(touch.pageX, touch.pageY, 472, 638, 75, 75)) {
	    setId(0)
	}
	if (joinScreen && gameidfull && buttonCheck(touch.pageX, touch.pageY, 572, 638, 75, 75)) {
	    socket.emit('checkRoom', gameid);
	}
	if (joinScreen && buttonCheck(touch.pageX, touch.pageY, 5, 10, 100, 50)) {
	    mainScreen = setScreen();
	    joinmsg = '';
	    gameid = '';
	}
	if (gameScreen && buttonCheck(touch.pageX, touch.pageY, 910, 5, 100, 25)) {
	    mainScreen = setScreen();
	    socket.emit('leaveRoom', false);
	    win = -1
	    forceEnd = 0;
	    score = 0;
	    theirScore = 0;
	    gameid = '';
	    serverID = undefined;
	    ball=deadball;
	}
	if (overScreen && buttonCheck(touch.pageX, touch.pageY, 424, 600, 175, 50)) {
	    mainScreen = setScreen();
	    socket.emit('leaveRoom', true);
	    win = -1
	    forceEnd = 0;
	    score = 0;
	    theirScore = 0;
	    gameid = '';
	    serverID = undefined;
	    	    ball=deadball;

	}
	if (gameScreen && buttonCheck(touch.pageX, touch.pageY, 487, 359, 50, 50)) {
	    activeBall = true;
	}
	if (mainScreen) {
	    alert([touch.pageX, touch.pageY]);
	}
    event.preventDefault();
}, false);

var fps = 60;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

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