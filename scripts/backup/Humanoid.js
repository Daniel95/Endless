function Humanoid (prop, functions) {
	
	prop.health = 100;
	prop.walkspeed = 1;
	
	functions["kill"] = function() {
		
		console.log("dieded");
	}
}