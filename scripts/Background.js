//Daniel

function Background(properties, childs) {
    
	//Index\\
	this.prop = properties //Prop == properties
	this.childs = childs ? childs : [];
    this.update = [];
	this.functions = {};
	var self = this;
    
    
    Entity(this.prop);
	Physics(this.prop, this.update);
    
    //self.prop.
    
	//Functions\\
	this.functions["test"] =  function(){console.log("test3")};
    
	//Events\\
	this.update.push(
		function() {
            
            ctx.resetTransform();
            
            ctx.setTransform(1, 0, 0, 1, self.prop.cFrame.position.x, self.prop.cFrame.position.y);
            var bgimg = new Image();
            bgimg.src ="example_image.png";
            ctx.drawImage(bgimg,0,0);
            
            properties.velocity.x -= 0.05;
            if (self.prop.cFrame.position.x + bgimg.width < 0) destroy(self); //left
		}
	);
	
	
}