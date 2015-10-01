var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;

var PLAYER_DEATHS = 0;
var PLAYER_HISCORE = 0;
var PLAYER_SCORE = 0;

var titleSplashTimer = 6;
var gameOverTimer = 6;
// default launch screen
var gameState = STATE_SPLASH;

//reset the game after death
function gameReset()
{
	gameOverTimer = 6;
	PLAYER_SCORE = 0;
	
	player.position.set( 9*TILE, 0*TILE);
}

//score function
function checkHiScore()
{
	if (PLAYER_SCORE > PLAYER_HISCORE)
	{
		PLAYER_HISCORE = PLAYER_SCORE;
		context.fillText("Congratulations ! Your Have The High Score " ,10, 325);
	}
}

//splash screen text
function splashText()
{
	context.fillStyle = "white";  
	context.font="15px Arial";  
	context.fillText("<Space Bar = Jump>",5, 20);
	context.fillText("<Space Bar = Start>",240, 20);
	context.fillText("<Arrows = Movement>",480, 20);
	 
	context.font="40px Arial";  
	context.fillText("Chuck Norris !",210, 250);
	//context.fillText("IS",225, 300);
	context.fillText("Ass Kicker !",225, 300);
}

//splash screen function
function runSplash(deltaTime)
{
	gameReset();			//reset the game
	
	var background = new Image();	// draw bg
	background.src = "titleSplash.jpg";
	context.drawImage(background, 0, 0);
	
	splashText();			// draw text
	
//enter game
if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true) 
	{         
		gameState = STATE_GAME;
		return;     
	}      
}

function runGame(deltaTime)
{
	context.fillStyle = "#ccc";    
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//var deltaTime = getDeltaTime();
//update player 	
	player.update(deltaTime);
	
//draw the map
	drawMap();
	
//draw player
	player.draw();

/*draw enemy
	enemy.update(deltaTime);
	enemy.draw();
*/
	
 // update the fps   
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

// game over text
function gameOverText()
{
	context.fillStyle = "black";  
	context.font="30px Arial";  
	context.fillText("Game Over !", 240, 100);
// hi scores	
	context.fillText("High Score    " +  PLAYER_HISCORE , 240, 175);
	context.fillText("Your Score   " + PLAYER_SCORE, 240, 250);
//player deaths		
	context.font="20px Arial";
	context.fillText("Deaths   " + PLAYER_DEATHS, 280, 475);
}

// game over splash
function runGameOver(deltaTime)
{
	checkHiScore();			// check an set the hiscore
	
	var background = new Image();			//draw bg
	background.src = "gameOverSplash.jpg";
	context.drawImage(background, 0, 0);
	
	gameOverText();							//draw the text
//=return to title
	gameOverTimer -= deltaTime;	
	if(gameOverTimer <= 0)
	{
		gameState = STATE_SPLASH;
		return;
	}
}

