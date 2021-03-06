//player animation variables
var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_IDLE_RIGHT = 3;
var ANIM_JUMP_RIGHT = 4;
var ANIM_WALK_RIGHT = 5;
var ANIM_CLIMBING = 6;
var ANIM_SHOOTING_LEFT = 7;
var ANIM_SHOOTING_RIGHT = 8;
var ANIM_MAX = 9;

var LEFT = 0;
var RIGHT = 1;

var climbUp = false;
var climbDown = false;

var Player = function() 
{  
	this.sprite = new Sprite("ChuckNorris.png");
//idling left
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
	[0, 1, 2, 3, 4, 5, 6, 7]);
//jumping left							
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
	[8, 9, 10, 11, 12]);
//walking left	
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
	[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
//idling right
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
	[52, 53, 54, 55, 56, 57, 58, 59]);
//jumping right	
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
	[60, 61, 62, 63, 64]);
//walking right	
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
	[65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]);
//climbing
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
	[41,42,43,44,45,46,47,48,49,50,51]);
//shooting left
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
	[27,28,29,30,31,32,33,34,35,36,37,38,39,40]);
//shooting right
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
	[79,80,81,82,83,84,85,86,87,88,89,90,91,92]);
	
	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, -55, -87);								
	}
	
	this.position = new Vector2();  
	this.position.set( 9*TILE, 0*TILE);
	
	this.velocity = new Vector2();
    
	this.width = 159;  
	this.height = 163; 
     
	this.falling = true;  
	this.jumping = false;
	this.isClimbing = false;
	
	this.direction = RIGHT;
	
	this.shooting = false;
	this.cooldownTimer = 0;
	
}; 		
Player.prototype.RunJumpState = function(deltaTime)
{	
//update sprite
	this.sprite.update(deltaTime);
	
	var left = false;     
	var right = false;     
	var jump = false;
	this.shooting = false;
	
	if (this.cooldownTimer >= 0)
	{ 			
		this.cooldownTimer -= deltaTime;
	}
	
//shoot bullet ,animation 
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
	{
		this.shooting = true;
		
		if (this.direction == LEFT) 
		{
			if (this.sprite.currentAnimation != ANIM_SHOOTING_LEFT)
			this.sprite.setAnimation(ANIM_SHOOTING_LEFT);
			if (this.cooldownTimer <= 0)
			{
				sfxFire.play(); 			
				this.cooldownTimer += 0.5;
				var bullet = new Bullet(player.position.x - 25, player.position.y - 10, false);
				bullets.push(bullet);
			}
		}
		
		if (this.direction == RIGHT)
		{
			if (this.sprite.currentAnimation != ANIM_SHOOTING_RIGHT)
			this.sprite.setAnimation(ANIM_SHOOTING_RIGHT);
			if (this.cooldownTimer <= 0)
			{
				sfxFire.play(); 			
				this.cooldownTimer += 0.5;
				var bullet = new Bullet(player.position.x + 75, player.position.y - 10, true);
				bullets.push(bullet);
			}
		}
	}
	
// move left   
	if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) 
	{
		left = true;
		this.direction = LEFT;
		if (this.shooting == false)
		{
			if (this.sprite.currentAnimation != ANIM_WALK_LEFT &&
			this.jumping == false)
			this.sprite.setAnimation(ANIM_WALK_LEFT);
		}
		
	}
	
//move right
	else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) 
	{
		right = true;
		this.direction = RIGHT;
		if (this.shooting == false)
		{
			if(this.sprite.currentAnimation != ANIM_WALK_RIGHT &&
			this.jumping == false)
			this.sprite.setAnimation(ANIM_WALK_RIGHT);
		}
	} 

//idle	
	else 
	{	
		if(this.jumping == false && this.falling == false && this.shooting == false)
		{
			if(this.direction == LEFT) 
			{
				if(this.sprite.currentAnimation != ANIM_IDLE_LEFT)
					this.sprite.setAnimation(ANIM_IDLE_LEFT);
			}
			else
			{
				if(this.sprite.currentAnimation!= ANIM_IDLE_RIGHT)
					this.sprite.setAnimation(ANIM_IDLE_RIGHT);
			}
		}
	}
	
//jump
	if(keyboard.isKeyDown(keyboard.KEY_UP) == true)  
	{         
		jump = true;
		
		if(left == true) 
		{
			this.sprite.setAnimation(ANIM_JUMP_LEFT);
		}
		if(right == true)
		{
			this.sprite.setAnimation(ANIM_JUMP_RIGHT);
		}
	}	

	var wasleft = this.velocity.x < 0;     
	var wasright = this.velocity.x > 0;     
	var falling = this.falling;      
	var ddx = 1;   		// acceleration     
	var ddy = GRAVITY;
          
	if (left)         
		ddx = ddx - ACCEL;          // player wants to go left     
	else if (wasleft)         
		ddx = ddx + FRICTION;       // player was going left, but not any more
  
    if (right)         
		ddx = ddx + ACCEL;          // player wants to go right     
	else if (wasright)         
		ddx = ddx - FRICTION;       // player was going right, but not any more 
 
    if (jump && !this.jumping && !falling)      
	{         
		ddy = ddy - JUMP;           // apply an instantaneous (large) vertical impulse         
		this.jumping = true;

		if(this.direction == LEFT)
			this.sprite.setAnimation(ANIM_JUMP_LEFT)
		else
			this.sprite.setAnimation(ANIM_JUMP_RIGHT)
	} 
// calculate the new position and velocity:     
	this.position.y = Math.floor(this.position.y  + (deltaTime * this.velocity.y));     
	this.position.x = Math.floor(this.position.x  + (deltaTime * this.velocity.x));     
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);     
	this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY); 

    if ((wasleft  && (this.velocity.x > 0)) ||         
		(wasright && (this.velocity.x < 0)))      
	{   // clamp at zero to prevent friction from making us jiggle side to side         
		this.velocity.x = 0;      
	}
// collision detection 
// Our collision detection logic is greatly simplified by the fact that the  
// player is a rectangle and is exactly the same size as a single tile.
// So we know that the player can only ever occupy 1, 2 or 4 cells.
      
// This means we can short-circuit and avoid building a general purpose  
// collision detection engine by simply looking at the 1 to 4 cells that  
// the player occupies: 
	var tx = pixelToTile(this.position.x);  
	var ty = pixelToTile(this.position.y);  
	var nx = (this.position.x)%TILE;         // true if player overlaps right  
	var ny = (this.position.y)%TILE;         // true if player overlaps below  
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);  
	var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);  
	var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);  
	var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);

// If the player has vertical velocity, then check to see if they have hit a platform      
// below or above, in which case, stop their vertical velocity, and clamp their      
// y position:        
	if (this.velocity.y > 0)  
	{  
		if ((celldown && !cell) || (celldiag && !cellright && nx))  
		{   // clamp the y position to avoid falling into platform below     
			this.position.y = tileToPixel(ty);            
			this.velocity.y = 0;              // stop downward velocity     
			this.falling = false;             // no longer falling     
			this.jumping = false;             // (or jumping)     
			ny = 0;                           // no longer overlaps the cells below  
		}     
	}
	else if (this.velocity.y < 0)  
	{  
		if ((cell && !celldown) || (cellright && !celldiag && nx))  
		{   // clamp the y position to avoid jumping into platform above      
			this.position.y = tileToPixel(ty + 1);          
			this.velocity.y = 0;             // stop upward velocity     
// player is no longer really in that cell, we clamped them to the cell below       
			cell = celldown;                         
			cellright = celldiag;          // (ditto)      
			ny = 0;                        // player no longer overlaps the cells below   
		}         
	}
    
	if (this.velocity.x > 0) 
	{       
		if ((cellright && !cell) || (celldiag  && !celldown && ny))  
		{  // clamp the x position to avoid moving into the platform we just hit      
			this.position.x = tileToPixel(tx);         
			this.velocity.x = 0;      // stop horizontal velocity       
		}  
	} 
	else if (this.velocity.x < 0) 
	{         
		if ((cell && !cellright) || (celldown && !celldiag && ny))  
		{  // clamp the x position to avoid moving into the platform we just hit    
			this.position.x = tileToPixel(tx + 1);         
			this.velocity.x = 0;        // stop horizontal velocity      
		} 
	 }
	 
	this.falling = !(celldown || (nx && celldiag));
	
	if (this.position.y > SCREEN_HEIGHT)
	{
		PLAYER_LIVES -= 1;
		PLAYER_DEATHS += 1;
		player.position.set( 9*TILE, 0*TILE);
	
		if (PLAYER_LIVES < 0)
		{
			gameState = STATE_GAMEOVER;
			return;
		}
	}
	
//bug fix for trigger obj at x0	
	if (this.position.x <= 40) 
	{
		this.position.x += 10;
	}
		
//bug fix for trigger obj at y0	
	if (this.position.y <= 40) 
	{
		this.position.y += 10;
	}		
// end of level sign collision
	if(cellAtTileCoord(LAYER_OBJECT_TRIGGERS, tx, ty) == true)
	{
		gameState = STATE_COMPLETE;
		return;
	}

//----------------  climbing state switch	-------------------
	if (right == false && left == false && this.falling == false)
	{
// player is not moving or falling, but could be 
// jumping (because we use the up key for both
// jumping and climbing) 
		
		var tx = pixelToTile(this.position.x);  
		var ty = pixelToTile(this.position.y);  
		var nx = (this.position.x)%TILE;           
		var ny = (this.position.y)%TILE;
		
		var cell = cellAtTileCoord(LAYER_LADDERS, tx, ty);  
		var cellright = cellAtTileCoord(LAYER_LADDERS, tx + 1, ty);  
		var celldown = cellAtTileCoord(LAYER_LADDERS, tx, ty + 1);  
		var celldiag = cellAtTileCoord(LAYER_LADDERS, tx + 1, ty + 1); 
	
//check if we are standing at the bottom of a ladder 
	
		if (( cell != 0 || cellright != 0 ))
		{
			if(keyboard.isKeyDown(keyboard.KEY_UP) == true)
			{
				this.sprite.setAnimation(ANIM_CLIMBING);
				this.isClimbing = true;
			}
		}
	
// check if we are standing at the top of a ladder
		if (( celldown != 0 || celldiag != 0 ))
		{
			if(keyboard.isKeyDown(keyboard.KEY_DOWN) == true)
			{
				this.sprite.setAnimation(ANIM_CLIMBING);
				this.isClimbing = true;
			}
		}
	}
}

Player.prototype.climbState = function(deltaTime)
{
	var climbUp = false;
	var climbDown = false;
	var climbspeed = 250;
	
	var ddy = 1; // climbing acceleration
	
	this.sprite.update(deltaTime);
	
//if up key is down climb up = true 
	if(keyboard.isKeyDown(keyboard.KEY_UP) == true)  
	{ 
		climbUp = true;
		if (this.sprite.currentAnimation != ANIM_CLIMBING)
			this.sprite.setAnimation(ANIM_CLIMBING);
	}
	
//if down key is down climb down = true	
	if(keyboard.isKeyDown(keyboard.KEY_DOWN) == true)  
	{ 
		climbDown = true;
		if (this.sprite.currentAnimation != ANIM_CLIMBING)
			this.sprite.setAnimation(ANIM_CLIMBING);
	}
	
//was moving up = true
	 if (this.velocity.y < 0)
	{
		var wasup = true;
	}
				
//was moving down = true
	 if (this.velocity.y > 0)
	{
		var wasdown = true;
	}
	
//reset acceleration Y
	if (wasup || (wasdown ))
	{
		this.velocity.y = 0;
	}
	
//if climb up is true move up		
	if (climbUp == true)
	{
		ddy = ddy -= climbspeed;	
	}		             
	else if (wasup)
	{
		ddy = 0;
	}		
		
//if climb down is true climb down				
	if (climbDown == true)
	{
		ddy = ddy += climbspeed;
	}		             
	else if (wasdown)
	{
		ddy = 0;
	}		
		
//add acceleration Y to velocity Y and clamp to range
//add velocity to position ddy;
	this.velocity.y = ddy;//this.velocity.y + deltaTime * ddy; bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);
	this.position.y = Math.floor(this.position.y  + (deltaTime * this.velocity.y));
	
//calculate tile X,Y using player's position		
	cellAtPixelCoord(LAYER_LADDERS, this.position.x,this.position.y)

	var tx = pixelToTile(this.position.x);  
	var ty = pixelToTile(this.position.y);  
	var nx = (this.position.x)%TILE;           
	var ny = (this.position.y)%TILE;
	
	var cell = cellAtTileCoord(LAYER_LADDERS, tx, ty);  
	var cellright = cellAtTileCoord(LAYER_LADDERS, tx + 1, ty);  
	var celldown = cellAtTileCoord(LAYER_LADDERS, tx, ty + 1);  
	var celldiag = cellAtTileCoord(LAYER_LADDERS, tx + 1, ty + 1);
	
	var platdown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);  
	var platdiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);  
	
	if (cell == 0 && celldown == 0 && cellright == 0 && celldiag == 0) 
	{
		this.isClimbing = false;
	}
	
//if was moving down and cell are empty 			
	if (this.velocity.y > 0 || wasdown)
	{
		if (platdown != 0  && platdiag != 0)
		{
			this.isClimbing = false;
		}
	}
	
//if was moving up and cell are empty 					
	else if (this.velocity.y < 0 || wasup)
	{
		if(cell == 0 && celldown == 0 || 
		celldiag == 0 && cellright == 0)
		{
			this.isClimbing = false;
		}
	}
}
	
Player.prototype.update = function(deltaTime) 
{
	if (this.isClimbing) 
	{
		this.climbState(deltaTime)
	} 
	else 
	{
		this.RunJumpState(deltaTime)	
	}
}

Player.prototype.draw = function() 
{ 
	context.save();
//draw player	
	this.sprite.draw(context, this.position.x - worldOffsetX, 
											this.position.y);											
	context.restore(); 
}