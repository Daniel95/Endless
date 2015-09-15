function Player(properties, childs) {
    
	//Index\\
	this.prop = properties //Prop == properties
	this.childs = childs ? childs : [];
	this.update = []
	this.functions = {}
	var self = this
    
    this.hJumpTimer = 0;
    
	//Functions\\
	this.functions["test"] =  function(){console.log("test3")};
	
	
    //console.log(Collision)
    
	//Values\\
	Entity(this.prop);
	Physics(this.prop, this.update, this.functions);
    Shooter(this.prop, this.update, this.functions);
	Humanoid(this.prop, this.functions);
    
	//Events\\
	this.update.push(
		function() {
            
			ctx.setTransform(1, 0, 0, 1, self.prop.cFrame.position.x, self.prop.cFrame.position.y);
            ctx.fillStyle = "#0000FF";
			ctx.fillRect(-self.prop.size.x*.5, -self.prop.size.y*.5, self.prop.size.x, self.prop.size.y);
            
            //input mouse
            if (MOUSE["mousedown"]) shoot(), shotgun();//down
            
            //inputs X and down
            if (INPUT["68"]) self.prop.velocity.x += self.prop.speed;//right
            if (INPUT["65"]) self.prop.velocity.x -= self.prop.speed;//left
            if (INPUT["83"]) self.prop.velocity.y += self.prop.speed;//down
            
            //jumping
            if(self.prop.grounded){
                if(self.hJumpTimer < 400) self.hJumpTimer += 0.25;
                if (INPUT_CLICK["87"]) for(f = 0; f < 8; f++) if(self.hJumpTimer > 0) self.prop.velocity.y -= self.prop.speed * 20, self.hJumpTimer -= 2;//Normal Jump
            } else if(INPUT["87"] && self.hJumpTimer > 0) self.prop.velocity.y -= self.prop.speed * 3.3, self.hJumpTimer -= 0.2;//Hover Jump
            
             //stay in screen
            if (self.prop.cFrame.position.x < 0) self.prop.cFrame.position.x = 0; //left
            else if (self.prop.cFrame.position.x > canvas.width) self.prop.cFrame.position.x = canvas.width; //right
            
            self.prop.targetPosition.x = mousePos.x - self.prop.cFrame.position.x;
            self.prop.targetPosition.y = mousePos.y - self.prop.cFrame.position.y;
            
            
            self.prop.velocity.x += 0.05;
		}
	);
	
	
}