//BaseClass

function Obstacle(properties) {
	//Extends:
	GameObject(this, properties);
	this.childs["physics"] = new Physics(this);
	
	var self = this
    
    var color = '#'+Math.random().toString(16).substr(-6);
    
	this.update.push(function(){
		if (self.cFrame.position.x + self.size.x/2 < 0
		||	self.cFrame.position.y + self.size.y/2 < 0)
			self.destroy(), platforms.splice(platforms.indexOf(self), 1);;
		
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
        ctx.fillStyle = color;
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
	})
}