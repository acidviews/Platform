//enemy animation variables
var E_ANIM_WALK_DOWN = 0;
var E_ANIM_WALK_RIGHT = 1;
var E_ANIM_WALK_LEFT = 2;
var E_ANIM_WALK_UP = 3;
var E_ANIM_BITE_DOWN = 4;
var E_ANIM_BITE_RIGHT = 5;
var E_ANIM_BITE_LEFT = 6
var E_ANIM_BITE_UP = 7;
var E_ANIM_DEATH = 8;

var E_ANIM_MAX = 9;

var Enemy = function(x, y) 
{  
	this.sprite = new Sprite("zombieEnemy.png");
//walk down
	this.sprite.buildAnimation(7, 8, 64, 64, 0.05,
	[0,1,2,3,4,5,6]);
//walk right
	this.sprite.buildAnimation(7, 8, 64, 64, 0.05,
	[7,8,9,10,11,12,13]);
//walk left
	this.sprite.buildAnimation(7, 8, 64, 64, 0.05,
	[14,15,16,17,18,19,20]);
//walk up
	this.sprite.buildAnimation(7, 8, 64, 64, 0.05,
	[21,22,23,24,25,26,27]);
//bite down
	this.sprite.buildAnimation(7, 8, 64, 64, 0.05,
	[28,29,30,31]);
//bite right
	this.sprite.buildAnimation(7, 8, 64, 64, 0.05,
	[32,33,34,35]);
//bite left
	this.sprite.buildAnimation(7, 8, 64, 64, 0.05,
	[36,37,38,39]);
//bite up
	this.sprite.buildAnimation(7, 8, 64, 64, 0.05,
	[40,41,42,43]);
//death
	this.sprite.buildAnimation(7, 8, 64, 64, 0.05,
	[44,,45,46,47,48,49,50,51,52]);
	
	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, -10, -20);								
	}
	
	this.position = new Vector2();
	this.position.set(x,y);
	
	this.velocity = new Vector2();
	
	this.moveRight = true;
	this.pause = 0;
}

Enemy.prototype.update = function(dt) 
{
	this.sprite.update(dt);
	
	if(this.pause > 0)
	{
		this.pause -= dt;
	}
	
	else
	{
		var ddx = 0;	// acceleration
		
		var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		var nx = (this.position.x)%TILE;        // true if enemy overlaps right
		var ny = (this.position.y)%TILE;         // true if enemy overlaps below
		var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
		var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
		
		if(this.moveRight)
		{
			if(celldiag && !cellright) 
			{
				if (this.sprite.currentAnimation != E_ANIM_WALK_RIGHT)
				{
					this.sprite.setAnimation(E_ANIM_WALK_RIGHT);
				}
				ddx = ddx + ENEMY_ACCEL;    // enemy wants to go right
			}
			
			else 
			{
				this.velocity.x = 0;
				this.moveRight = false;
				this.pause = 0.5;
			}
		}
		
		if(!this.moveRight)
		{
			if(celldown && !cell) 
			{
				if (this.sprite.currentAnimation != E_ANIM_WALK_LEFT)
				{
					this.sprite.setAnimation(E_ANIM_WALK_LEFT);
				}
				ddx = ddx -ENEMY_ACCEL;   // enemy wants to go left
			}
			else 
			{
				this.velocity.x = 0;
				this.moveRight = true;
				this.pause = 0.5;
			}
		}
		
	this.position.x = Math.floor(this.position.x  + (dt * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (dt * ddx), - ENEMY_MAXDX, ENEMY_MAXDX);
	}
}

Enemy.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, 
											this.position.y);
}
