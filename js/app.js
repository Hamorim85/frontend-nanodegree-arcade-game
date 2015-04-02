speedArray = [200, 250, 400]

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
}

rowArray = [56, 139, 222]

Enemy.prototype.update = function(dt) {   
    if (this.x > 600) { // bug goes off of canvas
      this.x = -50; // bug comes in off canvas
      var row = rowArray[Math.floor(Math.random() * rowArray.length)]; // this line generates a random row
      this.y = row; // y is set
      this.speed = speedArray[Math.floor(Math.random() * speedArray.length)]; //generates random speed slow, fast and crazy!    
    }
    enemyMove = this.speed * dt;
    this.x = this.x + enemyMove ;
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var player = function() {
    this.sprite = 'images/char-boy.png';
}



player.prototype.update = function() {
    checkCollisions();
}


function checkCollisions(){
  // if collision, player dies
  if ((Math.floor(allEnemies[0].x) < player.x + 34) && (Math.floor(allEnemies[0].x) > player.x  - 34) && Math.floor(allEnemies[0].y) == player.y) {
    playerDies(player);
  }
  if ((Math.floor(allEnemies[1].x) < player.x + 34) && (Math.floor(allEnemies[1].x) > player.x - 34) && Math.floor(allEnemies[1].y) == player.y) {
    playerDies(player);
  }
  if ((Math.floor(allEnemies[2].x) < player.x + 34) && (Math.floor(allEnemies[2].x) > player.x - 34) && Math.floor(allEnemies[2].y) == player.y) {
    playerDies(player); 
  }
  if (player.y <= (56-(-27))/2){
    playerWins(player);
  }
}

player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

player.prototype.handleInput = function(key) {
  switch(key) {
    case 'up':
      if (player.y <= -27 ) {
        player.y = -27;
      } else {
        player.y = player.y - 83;
      }
      break;
    case 'down':
      if (player.y >= 388) {
        player.y = 388;
      } else {
        player.y = player.y + 83;
      }
      break;
    case 'left':
      if (player.x <= 0) {
        player.x = 0;
      } else{ 
      player.x = player.x - 101
      }
      break
    case 'right':
      if (player.x >= 505) {
        player.x = 505;
      } else {
        player.x = player.x + 101;
      }
      break
    }
}


var resetPlayer = function(player) {
  player.x = (101/2)-(101/2);
  player.y = 388;
};

function playerDies(player) {
  alert("You died. Hit ok to reset");
  resetPlayer(player);
}

function playerWins(player) {
    alert("You win");
    resetPlayer(player);
}


// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



// Initiating Enemy outside the window at diffent x values so that they don't come in all at once. 
allEnemies = [];
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

var player = new player();
player.x = (101/2)-(101/2);
player.y = 388;