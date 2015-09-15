function EnemyStandard(properties, childs) {
    
	//Index\\
	this.prop = properties //Prop == properties
	this.childs = childs ? childs : [];
    this.update = [];
	this.functions = {};
	var self = this;
    
	Entity(this.prop);
	Physics(this.prop, this.update, this.functions);
	Humanoid(this.prop, this.functions);
    
    
	//Functions\\
	this.functions["test"] =  function(){console.log("test3")};
    
	//Physics(properties, update);
	EnemyBase(properties, childs, this.update);
    
	//Events\\
	this.update.push(
		function() {
			
			ctx.setTransform(1, 0, 0, 1, self.prop.cFrame.position.x, self.prop.cFrame.position.y);
            ctx.fillStyle = "#01DF74";
			ctx.fillRect(0, 0, self.prop.size.x, self.prop.size.y);
            
            if(player.prop.cFrame.position.x < self.prop.cFrame.position.x) self.prop.velocity.x -= self.prop.speed;
            else self.prop.velocity.x += self.prop.speed;
            
            if (self.prop.cFrame.position.x < 0) destroy(self); //left
            
		}
	);
	
	
}