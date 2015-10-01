	//animation variables
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

var Enemy = function() 
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
		this.sprite.setAnimationOffset(i, -55, -87);
										
	}
	
	this.position = new Vector2();  
	this.position.set( 15*TILE, 4*TILE);
    
	this.width = 64;  
	this.height = 64; 
     
 	this.velocity = new Vector2(); 
   
	this.falling = false;  
	this.jumping = false; 

//timer, direction
	this.moveTimer = 4;
	this.Left = 0;
	this.Right = 1;
      
};
//move timer
Enemy.prototype.moveTimerReset = function()
{
	this.moveTimer = 4;
}
//enemy change direction
Enemy.prototype.changeDirection = function()
{
	if (this.Left == 1)
	{
		this.Right = 1;
		this.Left = 0;
	}
	
	if (this.Right == 1)
	{
		this.Left = 1;
		this.Right = 0;
	}
}

Enemy.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	
	this.moveTimer -= deltaTime;
	if (this.moveTimer <= 0)
	{
		this.changeDirection();
		this.moveTimerReset();
	}
	
	if (this.Left == 1)
	{
		this.sprite.setAnimation(E_ANIM_WALK_LEFT);
	}
	
	if (this.Right == 1)
	{
		this.sprite.setAnimation(E_ANIM_WALK_RIGHT);
	}
}

Enemy.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
} 
