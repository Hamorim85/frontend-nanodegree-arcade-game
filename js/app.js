var minSpeed = 0.3; 
var maxSpeed = 0.9;

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
}

rowArray = [56, 139, 222]

Enemy.prototype.update = function(dt) {
    this.x += 230 * this.speed * dt;
    if (this.x > 600) { // bug goes off of canvas
      this.x = 0
      var row = rowArray[Math.floor(Math.random() * rowArray.length)];
      this.y = row
      this.speed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
      console.log(this.x, this.y);
    }
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var player = function() {
    this.sprite = 'images/char-boy.png';
}


player.prototype.update = function(dt) {
  // if collision, player dies
  if ((Math.floor(allEnemies[0].x) < this.x + 34) && (Math.floor(allEnemies[0].x) > this.x - 34) && Math.floor(allEnemies[0].y) == this.y) {
    playerDies(player);
  }
  if ((Math.floor(allEnemies[1].x) < this.x + 34) && (Math.floor(allEnemies[1].x) > this.x - 34) && Math.floor(allEnemies[1].y) == this.y) {
    playerDies(player);
  }
  if ((Math.floor(allEnemies[2].x) < this.x + 34) && (Math.floor(allEnemies[2].x) > this.x - 34) && Math.floor(allEnemies[2].y) == this.y) {
    playerDies(player);
  }
  if (this.y <= 50){
    playerWins(player);
  }
}

player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

player.prototype.handleInput = function(key) {
  switch(key) {
    case 'up':
      if (player.y <= -22) {
        player.y = -27;
      } else {
        player.y -= 83;
      }
      break;
    case 'down':
      if (player.y >= 388) {
        player.y = 388;
      } else {
        player.y += 83;
      }
      break;
    case 'left':
      if (player.x <= 0) {
        player.x = 0;
      } else {
        player.x -= 101;
      }
      break
    case 'right':
      if (player.x >= 500) {
        player.x = 504;
      } else {
        player.x += 101;
      }
      break
    }
}


var resetPlayer = function(player) {
  player.x = 50 - (101/2);
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


allEnemies = [];
var enemy = new Enemy();
allEnemies.push(enemy);
enemy.x = -50;
enemy.y = rowArray[0];
enemy.speed = 1;
var enemy2 = new Enemy();
allEnemies.push(enemy2);
enemy2.x = 250;
enemy2.y = rowArray[1];
enemy2.speed = 1;
var enemy3 = new Enemy();
allEnemies.push(enemy3);
enemy3.x = -150;
enemy3.y = rowArray[2];
enemy3.speed = 1;

var player = new player();
player.x = 50 -(101/2);
player.y = 388;