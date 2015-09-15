function Bullet(properties, childs) {
    
	//Index\\
	this.prop = properties //Prop == properties
	this.childs = childs ? childs : [];
	this.update = []
	this.functions = {}
	var self = this
    
    this.movePos = V2(0,0);
    
	//Functions\\
	this.functions["test"] =  function(){console.log("test3")};
	
	
    //console.log(Collision)
    
	//Values\\
	Entity(this.prop);
	Physics(this.prop, this.update);
	Humanoid(this.prop, this.functions);
    	
    this.radian = self.prop.cFrame.rotation * Math.PI / 180;
    self.movePos.x = Math.cos(self.radian);
    self.movePos.y = Math.sin(self.radian);
			
    self.prop.cFrame.position.x += (35 * self.movePos.x);
    self.prop.cFrame.position.y += (35 * self.movePos.y);
    
    
	//Events\\
	this.update.push(
		function() {
			
			ctx.setTransform(1, 0, 0, 1, self.prop.cFrame.position.x, self.prop.cFrame.position.y);
			ctx.fillRect(-self.prop.size.x*.5, -self.prop.size.y*.5, self.prop.size.x, self.prop.size.y);
            
            self.prop.velocity.x += self.movePos.x;
			self.prop.velocity.y += self.movePos.y;
            
            if (self.prop.cFrame.position.x < 0 || self.prop.cFrame.position.x > canvas.width || self.prop.cFrame.position.y < 0 || self.prop.cFrame.position.y > canvas.height) destroy(self); //left
		}
	);
	
	
}
