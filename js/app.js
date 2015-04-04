"use strict";

// these number felt like the right speed for the bugs after much testing.
var speedArray = [200, 250, 400];  

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
};

var rowArray = [56, 139, 222];

Enemy.prototype.update = function(dt) {
    if (this.x > 600) { // bug goes off of canvas
        this.x = -50; // bug comes in off canvas
        var row = rowArray[Math.floor(Math.random() * rowArray.length)]; // this line generates a random row
        this.y = row; // y is set
        this.speed = speedArray[Math.floor(Math.random() * speedArray.length)]; //generates random speed slow, fast and crazy!    
    }
    var enemyMove = this.speed * dt; 
    this.x = this.x + enemyMove;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.level = 1;
    this.life = 3;
};

function renderScoreLine() {
    ctx.font = "20px 'Press Start 2P'";
    ctx.clearRect(0, 0, 606, 100);
    ctx.fillText('Score: ' + Player.score, 20, 40);
    ctx.fillText('Life: ' + Player.life, 450, 40);
}


Player.prototype.update = function() {
    checkCollisions();
    renderScoreLine();
};


function checkCollisions() {
    // if collision, player dies!! If the enemie matched x and y of the player dies, these are the 3 bugs. 
    if ((Math.floor(allEnemies[0].x) < Player.x + 34) && (Math.floor(
            allEnemies[0].x) > Player.x - 34) && Math.floor(allEnemies[0].y) ==
        Player.y) {
        playerDies();
    }
    if ((Math.floor(allEnemies[1].x) < Player.x + 34) && (Math.floor(
            allEnemies[1].x) > Player.x - 34) && Math.floor(allEnemies[1].y) ==
        Player.y) {
        playerDies();
    }
    if ((Math.floor(allEnemies[2].x) < Player.x + 34) && (Math.floor(
            allEnemies[2].x) > Player.x - 34) && Math.floor(allEnemies[2].y) ==
        Player.y) {
        playerDies();
    }
    if (Player.y <= 41.5) {
        playerWins();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (Player.y <= -27) {
                Player.y = -27;
            } else {
                Player.y = Player.y - 83;
            }
            break;
        case 'down':
            if (Player.y >= 388) {
                Player.y = 388;
            } else {
                Player.y = Player.y + 83;
            }
            break;
        case 'left':
            if (Player.x <= 0) {
                Player.x = 0;
            } else {
                Player.x = Player.x - 101;
            }
            break;
        case 'right':
            if (Player.x >= 505) {
                Player.x = 505;
            } else {
                Player.x = Player.x + 101;
            }
            break;
        default:
            break;
    }
};

// these next 3 functions handle the player all the players behaviours
var resetPlayer = function() {
    Player.x = 0;
    Player.y = 388;
}

function playerDies() {
    Player.life = Player.life - 1;

    if (Player.life === -1) {
        alert("Game is Over");
        Player.score = 0;
        Player.life = 3;
    }
    resetPlayer();
}

function playerWins() {
    Player.score += 100;
    resetPlayer();
}


// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    Player.handleInput(allowedKeys[e.keyCode]);
});



// Initiating Enemy outside the window at diffent x values so that they don't come in all at once. 
var allEnemies = [];
var enemy = new Enemy();
allEnemies.push(enemy);
enemy.x = -50;
enemy.y = rowArray[0];
enemy.speed = 200;
var enemy2 = new Enemy();
allEnemies.push(enemy2);
enemy2.x = -250;
enemy2.y = rowArray[1];
enemy2.speed = 200;
var enemy3 = new Enemy();
allEnemies.push(enemy3);
enemy3.x = -150;
enemy3.y = rowArray[2];
enemy3.speed = 200;

var Player = new Player();
Player.x = (101 / 2) - (101 / 2);
Player.y = 388;