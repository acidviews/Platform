var bullets = []
var Bullet = function(x, y, moveRight) 
{
	this.sprite = new Sprite("bullet.png");
	this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
	this.sprite.setAnimationOffset(0, 0, 0);
	this.sprite.setLoop(0, false);
	
	this.position = new Vector2();
	this.position.set(x, y);
	
	this.velocity = new Vector2();
	
	this.moveRight = moveRight;
	
	if(this.moveRight == true)
		this.velocity.set(MAXDX *2, 0);
		else
		this.velocity.set(-MAXDX *2, 0);
}

var hit=false;

for(var i=0; i<bullets.length; i++)
{
	bullets[i].update(deltaTime);
	
	if( bullets[i].position.x -worldOffsetX < 0 ||
	bullets[i].position.x - worldOffsetX > SCREEN_WIDTH)
	{
		hit = true;
	}
//enemy collision	
	for(var j=0; j<enemies.length; j++)
	{
		if(intersects( bullets[i].position.x, bullets[i].position.y, TILE, TILE,
		enemies[j].position.x, enemies[j].position.y, TILE, TILE) == true)
		{
// kill both the bullet and the enemy
			enemies.splice(j, 1);
			hit = true;
// increment the player score
			PLAYER_SCORE += 10;
			break;
		}
	}
	
	if (hit == true) 
	{
		bullets.splice(i, 1);
		break;
	}
}

Bullet.prototype.update = function(dt) 
{
	this.sprite.update(dt);
	this.position.x = Math.floor(this.position.x  + (dt * this.velocity.x));
}

Bullet.prototype.draw = function() 
{
	var screenX = this.position.x - worldOffsetX;
	this.sprite.draw(context, screenX, this.position.y);
}

