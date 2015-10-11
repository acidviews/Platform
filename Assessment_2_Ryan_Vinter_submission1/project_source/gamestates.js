var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var STATE_COMPLETE = 3;

var PLAYER_LIVES = 3;
var PLAYER_DEATHS = 0;
var PLAYER_HISCORE = 0;
var PLAYER_SCORE = 0;

var titleSplashTimer = 6;
var gameOverTimer = 6;
var gameCompleteTimer = 6;

// default launch screen
var gameState = STATE_SPLASH;

//reset the game after death
function gameReset()
{
	gameOverTimer = 6;
	gameCompleteTimer = 6;
	PLAYER_SCORE = 0;
	PLAYER_LIVES = 3;
	
	player.position.set( 9*TILE, 0*TILE);
}

//score function
function checkHiScore()
{
	if (PLAYER_SCORE >= PLAYER_HISCORE)
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
	context.fillText("Chuck Norris",210, 250);
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
	context.fillStyle = "DodgerBlue";    
	context.fillRect(0, 0, canvas.width, canvas.height);
	
//update player 	
	player.update(deltaTime);
	
//draw the map
	drawMap();
	
//update draw enemy
	for(var i=0; i<enemies.length; i++)
	{
		enemies[i].update(deltaTime);
		enemies[i].draw(deltaTime);
	}
	
//draw player
	player.draw();
	
//update draw bullets
	for(var i=0; i<bullets.length; i++)
	{
		var hit=false;
		
		bullets[i].update(deltaTime);
		bullets[i].draw(deltaTime);
		if( bullets[i].position.x - worldOffsetX < 0 ||
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
	
//enemy collsion player	
	for(var i=0; i<enemies.length; i++)
	{
		if(intersects(enemies[i].position.x, enemies[i].position.y, TILE, TILE,
			player.position.x, player.position.y, TILE, TILE) == true)
		{
// kill the player
			PLAYER_LIVES -= 1;
			PLAYER_DEATHS += 1;
			player.position.set( 9*TILE, 0*TILE);
	
			if (PLAYER_LIVES < 0)
			{
				gameState = STATE_GAMEOVER;
				return;
			}
		}
	}
	
 // update the fps   
	fpsTime += deltaTime;  
	fpsCount++;  
	if(fpsTime >= 1)  
	{   
		fpsTime -= 1;   
		fps = fpsCount;   
		fpsCount = 0;  
	} 

//hud
// draw the FPS  
	context.fillStyle = "#f00";  
	context.font="14px Arial";  
	context.fillText("FPS: " + fps, 5, 20, 100);
	
// draw score
	context.fillStyle = "white";
	context.font="26px Arial";
	var scoreText = "Score:  " + PLAYER_SCORE;
	context.fillText(scoreText,10, SCREEN_HEIGHT - 10);
	
//draw lives
	for(var i=0; i<PLAYER_LIVES; i++)
	{
		var heart = document.createElement("img");
		heart.src = "heartbeats.png";
				
		context.drawImage(heart, SCREEN_WIDTH - 50 - (( heart.width + 2 ) *i ), SCREEN_HEIGHT - 50);
	}
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
	//context.fillText("Deaths   " + PLAYER_DEATHS, 280, 475);
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
		enemies.splice(j, enemies.length);
		initialize();
		return;
	}
}

// game over text
function gameCompleteText()
{
	context.fillStyle = "black";  
	context.font="30px Arial";  
	context.fillText(":) Congradulations ! :)", 20, 100);
// hi scores	
	context.fillText("You have completed the game "  , 20, 175);
	context.fillText("Your Score   " + PLAYER_SCORE, 20, 250);
	context.fillText("High Score   " +  PLAYER_HISCORE , 20, 325);
	context.fillText("Chuck Norris's Score   110 ", 20, 400);
//player deaths		
	context.font="20px Arial";
	//context.fillText("Deaths   " + PLAYER_DEATHS, 280, 475);
}

// game over splash
function runGameComplete(deltaTime)
{
	checkHiScore();			// check an set the hiscore
	
	var background = new Image();			//draw bg
	background.src = "gameComplete.png";
	context.drawImage(background, 0, 0);
	
	gameCompleteText();							//draw the text
//=return to title
	gameCompleteTimer -= deltaTime;	
	if(gameCompleteTimer <= 0)
	{
		gameState = STATE_SPLASH;
		enemies.splice(j, enemies.length);
		initialize();
		return;
	}
}
