var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//-------------------- Don't modify anything above here

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;


// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

// load an image to draw
var chuckNorris = document.createElement("img");
chuckNorris.src = "hero.png";

var enemy = new Enemy();
var player = new Player(); 
var keyboard = new Keyboard(); 
 
//collision checking function
function intersects(x1, y1, w1, h1, x2, y2, w2, h2) 
{  
	if (y2 + h2 < y1 ||   
		x2 + w2 < x1 ||   
		x2 > x1 + w1 ||   
		y2 > y1 + h1)  
	{ 
		return false;	
	}  
	return true; 
}

function run() 
{  
	context.fillStyle = "#ccc";    
	context.fillRect(0, 0, canvas.width, canvas.height);    
	var deltaTime = getDeltaTime(); 

//draw enemy
	if (enemy.isDead == false)
	{
		enemy.update(deltaTime);
		enemy.draw();
	}
	
//draw player	
	player.update(deltaTime);  
	player.draw(); 

	if(keyboard.isKeyDown(keyboard.KEY_A) == true)  
	{   
		playerShoot();  
	}  
	
// update all the bullets
	for(var i=0; i<bullets.length; i++)
	{
		bullets[i].x += bullets[i].velocityX * deltaTime;
		bullets[i].y += bullets[i].velocityY * deltaTime;
	}
		
// check if the bullet has gone out of the screen and kill it
	for(var i=0; i<bullets.length; i++)
	{
		if(bullets[i].x < -bullets[i].width ||
		bullets[i].x > SCREEN_WIDTH ||
		bullets[i].y < -bullets[i].height ||
		bullets[i].y > SCREEN_HEIGHT)
		{
			bullets.splice(i, 1);
			break;   //remove it from the array
		}
	}
		
// draw all the bullets
	for(var i=0; i<bullets.length; i++)
	{
		context.drawImage(bullets[i].image,
		bullets[i].x - bullets[i].width/2,
		bullets[i].y - bullets[i].height/2);
	}
   
// collision with enemy   
	for(var j=0; j<bullets.length; j++)
			{
				if(intersects(
				bullets[j].x, bullets[j].y,
				bullets[j].width, bullets[j].height,
				enemy.x, enemy.y,
				enemy.width, enemy.height) == true)
				{
					enemy.isDead = true;
					bullets.splice(j, 1);
					break;
				}
			}
	
 // update the frame counter   
	fpsTime += deltaTime;  
	fpsCount++;  
	if(fpsTime >= 1)  
	{   
		fpsTime -= 1;   
		fps = fpsCount;   
		fpsCount = 0;  
	}       

// draw the FPS  
	context.fillStyle = "#f00";  
	context.font="14px Arial";  
	context.fillText("FPS: " + fps, 5, 20, 100); 
} 
		


//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() 
{
  var onEachFrame;
  if (window.requestAnimationFrame) 
  {
    onEachFrame = function(cb) 
	{	
      var _cb = function() 
	  { 
		cb(); 
		window.requestAnimationFrame(_cb); 
	  }
      _cb();
    };
  } 
  else if (window.mozRequestAnimationFrame) 
  {
    onEachFrame = function(cb) 
	{
      var _cb = function() 
	  { 
	  cb(); 
	  window.mozRequestAnimationFrame(_cb); 
	  }
      _cb();
    };
  } 
  else 
  {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
