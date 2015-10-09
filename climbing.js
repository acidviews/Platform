def updateRunJumpState
// mostly stays the same, but we add some new logic
// at the end of the function

	if right is false and left is false and falling is false
// player is not moving or falling, but could be 
// jumping (because we use the up key for both
// jumping and climbing)
	
	cell = cell at tile coordinates (tile X, tile Y) on  ladder layer
	cell right = cell at tile coords (tile X + 1, tile Y)on ladder layer
	cell down = cell at tile coords (tile X, tile Y + 1) on ladder layer
	cell diag = cell at tile coords (tile X + 1, tile Y + 1) on ladder layer
	
	cells[LAYER_OBJECT_LADDERS][y][x] = 1;  
	cells[LAYER_OBJECT_LADDERS][y][x+1] = 1;
	cells[LAYER_OBJECT_LADDERS][y - 1][x] = 1;    
	cells[LAYER_OBJECT_LADDERS][y - 1][x+1] = 1;  
	 
	
//check if we are standing at the bottom of a ladder 
	if cell is not empty or cell right is not empty
		if the up key is being pressed
			set the state to the climb state
			set the animation to the climb animation
			return
		end
	end
	
	if(cellAtTileCoord(LAYER_OBJECT_TRIGGERS, tx, ty) == true)
	{
		
	}
	
// check if we are standing at the top of a ladder
	if cell down is not empty or cell diag is not empty
		if the down key is being pressed
			set the state to the climb state
			set the animation to the climb animation
			return
			
			end	
		end
	end
	
	
//-----------------------------------------------------------------------------------------------
def updateClimbState
					climb up = false
					climb down = false

	var climbUp = false;
	var climbDown = false;
	
					if up key is down
						climb up = true 
						update sprite // only update sprite when moving
						end
	
	if(keyboard.isKeyDown(keyboard.KEY_UP) == true)  
	{ 
		climbUp = true;
		this.sprite.setAnimation(ANIM_CLIMBING);
		this.sprite.update(deltaTime)
	}
			
					if down key is down
						climb down = true
						update sprite
						end
		
	if(keyboard.isKeyDown(keyboard.KEY_DOWN) == true)  
	{ 
		climbDown = true;
		this.sprite.setAnimation(ANIM_CLIMBING);
		this.sprite.update(deltaTime)
	}
	
					if velocity Y is greater than 0
						was moving up = true
						end
		
	 if (this.velocity.y > 0)
	{
		var wasup = true;
	}
		
					if velocity Y is less than 0
						was moving down = true
						end
	
	 if (this.velocity.y < 0)
	{
		var wasdown = true;
	}
	
					reset acceleration Y
				
	this.velocity.y = 0;
	
					if climb up is true
						acceleration Y = acceleration Y - ACCEL
					else if was moving up
						reset velocity Y 	
						end
					
	if (climbUp)         
		ddy = ddy - ACCEL;             
	else if (wasleft)         
		ddy = ddy + GRAVITY;
	
					if climb down is true
						acceleration Y = acceleration Y + ACCEL
					else if was moving down
						reset velocity Y 
						end
					
	if (climbDown)         
		ddy = ddy + ACCEL;             
	else if (wasleft)         
		ddy = ddy - GRAVITY;
		
		
	add acceleration Y to velocity Y and clamp to range
	add velocity to position
	
	calculate tile X,Y using player's position
	cell = cell at tile coord(tile X, tile Y) for ladder layer
	cell right = cell at tile coord (tile X + 1, tile Y) for ladder layer
	cell down = cell at tile coord (tile X, tile Y + 1) for ladder layer
	cell diag = cell at tile coord (tile X + 1, tile Y + 1) for ladder layer
	
	if velocity Y is greater than 0 or was moving down
		if cell down and cell are empty or 
		cell diag and cell right are empty
		
	switch to run jump state and return
	end
	
	else if velocity Y is less than 0 or was moving up
		if cell and cell down are empty or cell right and cell diag are empty
		witch to run jump state and return
		end
	end
end