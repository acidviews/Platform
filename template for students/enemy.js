var Enemy = function() 
{ 
	this.image = document.createElement("img"); 
	this.x = canvas.width * .75; 
	this.y = canvas.height * .75; 
	this.width = 159; 
	this.height = 163; 
	this.velocityX = 0; 
	this.velocityY = 0; 
	this.angularVelocity = 0; 
	this.rotation = 0;
	
	this.isDead = false;
	
	this.image.src = "enemy.png";   
};

Enemy.prototype.update = function(deltaTime) 
{    
	if( typeof(this.rotation) == "undefined" )   
		this.rotation = 0;  // hang on, where did this variable come from!  
	
		this.rotation -= deltaTime;  
}  
	
Enemy.prototype.draw = function() 
{ 
	context.save(); context.translate(this.x, this.y); 
	context.rotate(this.rotation); 
	context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore(); 
}
