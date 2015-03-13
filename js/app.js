//Enemies our player must avoid
var minSpeed = 0.3; 
var maxSpeed = 0.9;

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

rowArray = [56, 139, 222]

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += 230 * this.speed * dt;
    if (this.x > 500) { // bug goes off of canvas
      this.x = 0
      //credit: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
      var row = rowArray[Math.floor(Math.random() * rowArray.length)];
      this.y = row
      // Choose a random speed between a min and max each time the bug starts at the left of the screen
      this.speed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
      // credit: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies





// Place the player object in a variable called player
var player = function() {
    this.sprite = 'images/char-boy.png';
}


player.prototype.update = function(dt) {
  // if collision, player dies
  if ((Math.floor(allEnemies[0].x) < this.x + 35) && (Math.floor(allEnemies[0].x) > this.x - 35) && Math.floor(allEnemies[0].y) == this.y) {
    playerDies(player);
  }
  if ((Math.floor(allEnemies[1].x) < this.x + 35) && (Math.floor(allEnemies[1].x) > this.x - 35) && Math.floor(allEnemies[1].y) == this.y) {
    playerDies(player);
  }
  if ((Math.floor(allEnemies[2].x) < this.x + 35) && (Math.floor(allEnemies[2].x) > this.x - 35) && Math.floor(allEnemies[2].y) == this.y) {
    playerDies(player);
  }
  if (this.y <= 50){
    playerWins(player);
  }
}

player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



// This listens for key presses and sends the keys to your

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
      if (player.x >= 400) {
        player.x = 404;
      } else {
        player.x += 101;
      }
      break
    }
}


var resetPlayer = function(player) {
  player.x = (ctx.canvas.width / 2) - (101/2);
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

/* Instantiate player objects */
var player = new player();
player.x = (505/2)-(101/2);//(player.sprite.width);//(505/2)-(101/2)
// player.y = (ctx.canvas.height - 83);
// I wanted to not make these locations hard coded, but was difficult
// because of the transpart parts of the graphic images
player.y = 388;