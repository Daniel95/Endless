function EnemyJumper(properties, childs) {
    
	//Index\\
	this.prop = properties //Prop == properties
	this.childs = childs ? childs : [];
    this.update = [];
	this.functions = {};
	var self = this;
    
    
    	this.childs.push(Entity(this.prop));
	this.childs.push(Physics(this.prop, this.update));
	this.childs.push(Humanoid(this.prop, this.functions));
    
    
	//Functions\\
	this.functions["test"] =  function(){console.log("test3")};
    
	//Physics(properties, update);
	EnemyBase(properties, childs, this.update);
    
	//Events\\
	this.update.push(
		function() {
			
			ctx.setTransform(1, 0, 0, 1, self.prop.cFrame.position.x, self.prop.cFrame.position.y);
			ctx.fillRect(0, 0, self.prop.size.x, self.prop.size.y);
            
            
            
            if (self.prop.cFrame.position.x < 0) destroy(self); //left
		}
	);
	
	
}