//BaseClass

function UI(properties) {
	//Extends:
	GameObject(this, properties);
	
    var self = this;
    
    var div = document.getElementById("textDiv");
    
	this.update.push(function(){
		
        ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
		ctx.fillRect(self.size.x, self.size.y, player.hJumpTimer, self.size.y);
        
        //console.log(self.div);
        //self.div.textContent = "my text";
        //var text = div.textContent;
	})
}