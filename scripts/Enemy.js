function Enemy(properties, childs) {
    
	//Index\\
	this.prop = properties //Prop == properties
	this.childs = childs ? childs : [];
	this.update = [];
	this.functions = {};
	var self = this;
    
	//Functions\\
	this.functions["test"] =  function(){console.log("test3")};
	
	
	//Values\\
	this.childs.push(Entity(this.prop));
	this.childs.push(Physics(this.prop, this.update));
	this.childs.push(Humanoid(this.prop, this.functions));
	
	
	//Events\\
	this.update.push(
		function() {
			
			//console.log("test");
			
			//self.functions.test()
			//self.functions.kill()
			ctx.setTransform(1, 0, 0, 1, self.prop.cFrame.position.x, self.prop.cFrame.position.y);
			ctx.fillRect(0, 0, self.prop.size.x, self.prop.size.y);

			
           // console.log(self.prop.cFrame.position.x);
            
			//console.log(self.prop.velocity);
		}
	);
	
	
}