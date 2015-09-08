function Platform(properties, childs) {
    
	//Index\\
	this.prop = properties //Prop == properties
	this.childs = childs ? childs : [];
	this.update = []
	this.functions = {}
	var self = this
    
    
	//Functions\\
	this.functions["test"] =  function(){console.log("test3")};
	
	
    //console.log(Collision)
    
	//Values\\
	this.childs.push(Entity(this.prop));
	this.childs.push(Physics(this.prop, this.update));
	//this.childs.push(Humanoid(this.prop, this.functions));
	
	
	//Events\\
	this.update.push(
		function() {
			
			ctx.setTransform(1, 0, 0, 1, self.prop.cFrame.position.x, self.prop.cFrame.position.y);
			ctx.fillRect(-self.prop.size.x*.5, -self.prop.size.y*.5, self.prop.size.x, self.prop.size.y);
			
		}
	);
	
	
}