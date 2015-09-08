function Player(properties, childs) {
    
	//Index\\
	this.prop = properties //Prop == properties
	this.childs = childs ? childs : [];
	this.update = []
	this.functions = {}
	var self = this
    
    var speed = 5;
    var grounded = false;
    
    
	//Functions\\
	this.functions["test"] =  function(){console.log("test3")};
	
	
    //console.log(Collision)
    
	//Values\\
	Entity(this.prop);
	Physics(this.prop, this.update);
	Humanoid(this.prop, this.functions);
	
	
	//Events\\
	this.update.push(
		function() {
			
			ctx.setTransform(1, 0, 0, 1, self.prop.cFrame.position.x, self.prop.cFrame.position.y);
			ctx.fillRect(-self.prop.size.x*.5, -self.prop.size.y*.5, self.prop.size.x, self.prop.size.y);
			
			if (INPUT["83"]) self.prop.velocity.y += 1;
			if (INPUT["68"]) self.prop.velocity.x += 1;
			if (INPUT["87"]) self.prop.velocity.y -= 1;
			if (INPUT["65"]) self.prop.velocity.x -= 1;
            //console.log(MOUSE_CLICK["mousedown"]);
            
             //stay in screen
            if (self.prop.cFrame.position.x < 0) self.prop.cFrame.position.x = 0; //left
            else if (self.prop.cFrame.position.x > canvas.width) self.prop.cFrame.position.x = canvas.width; //right
            if (self.prop.cFrame.position.y < 0) self.prop.cFrame.position.y = 0; //up
            else if (self.prop.cFrame.position.y > canvas.height) self.prop.cFrame.position.y = canvas.height;//down
		}
	);
	
	
}