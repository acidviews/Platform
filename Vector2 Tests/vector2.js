var Vector2 = function()
{
	function set(x, y)
	{	
		return this.x = x;
		return this.y = y;
	}
		
	function normalize()
	{
		var length = Math.sqrt (x*x + y*y);
	
		var normalX = this.x / length;
		var normalY = this.y / length;
	}
	
	function add(v2)
	{
		this.x = this.x + v2;
		this.y = this.y + v2;
	}

	 function subtract(v2)
	{
		this.x = this.x - v2;
		this.y = this.y - v2;
	}

	 function multiplyScalar(num)
	{
		this.x = this.x * scalar;
		this.y = this.y * scalar;
	}		
}

//set(2,3);

