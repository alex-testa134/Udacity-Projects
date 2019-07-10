// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // If enemy has not passed bounadary
    if (this.x < 510){
      this.x += this.speed * dt;
    }

    // If enemy reached boundary, reset it
    else {
      this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
  constructor() {
    this.x = 200;
    this.y = 375;
    this.sprite = 'images/char-boy.png';
    this.lives = 3;
    this.score = 0;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Uses arrow keys as input to move the hero
  handleInput(input) {
    switch(input) {
      case 'left':
        if (this.x > 0) {
          this.x -= 100;
        }
        break;

      case 'right':
        if (this.x < 400) {
          this.x += 100;
        }
        break;

      case 'up':
        if (this.y > 0) {
          this.y -= 80;
        }
        break;

      case 'down':
        if (this.y < 375) {
          this.y += 80;
        }
        break;
    }
  }

  // updates hero if collision between hero and enemy occur
  update() {
    for(let enemy of allEnemies) {
      if(this.y == enemy.y && (enemy.x + 75) > this.x && enemy.x < (this.x + 75)) {
        this.lives--;
        if(this.lives == 0) {
          alert('Game Over! You got ' + this.score + ' points!');
          this.lives = 3;
          this.score = 0;
          this.reset();
        }
        else{
          alert('You Died! You have ' + this.lives + ' lives left!');
          this.reset();
        }
      }
    }

    if(this.y == -25){
      this.score += 100;
      this.victory = true;
      alert('You Won! Current score is ' + this.score + ' points!');
      this.reset();
    }
  }

  // Reset hero upon collision
  reset() {
    this.x = 200;
    this.y = 375;

  }


}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
const bug1 = new Enemy(-100,55,100);
const bug2 = new Enemy(-100,135,200);
const bug3 = new Enemy(-100,215,120);
const player = new Hero();

allEnemies.push(bug1);
allEnemies.push(bug2);
allEnemies.push(bug3);


// This listens for key presses and sends the keys to your
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
