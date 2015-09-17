//BaseClass

function UI(properties) {
	//Extends:
	GameObject(this, properties);
	
    var self = this;
    
	this.update.push(function(){
		
        ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
		ctx.fillRect(self.size.x, self.size.y, player.hJumpTimer, self.size.y);
        
	})
}

/*
function UI(properties, childs) {
    
	//Index\\
	this.prop = properties //Prop == properties
	this.childs = childs ? childs : [];
	this.update = []
	this.functions = {}
	var self = this
    
    this.hJumpTimer = -0;
    
    
	//Functions\\
	this.functions["test"] =  function(){console.log("test3")};
	
	
    //console.log(Collision)
    
	
	
	//Events\\
	this.update.push(
		function() {
            
			ctx.setTransform(1, 0, 0, 1, self.prop.cFrame.position.x, self.prop.cFrame.position.y);
			ctx.fillRect(-self.prop.size.x*.5, -self.prop.size.y*.5, player.hJumpTimer, self.prop.size.y);
		}
	);
	
	
}
*/