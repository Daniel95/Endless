//BaseClass

function Obstacle(properties, childs) {
	//Extends:
	GameObject(this, properties, childs);
	this.childs["physics"] = new Physics(this);
	
	var self = this
    
    if(self.isPickup==undefined) self.isPickup = false;
    if(self.color==undefined)  self.color = '#'+Math.random().toString(16).substr(-6);

   // console.log("spawned Obstacle doesDmg = " + self.doesDmg);
    
	this.update.push(function(){
		if (self.cFrame.position.x + self.size.x/2 < 0
		||	self.cFrame.position.y + self.size.y/2 < 0 
        ||  self.cFrame.position.x - self.size.x/2 > canvasWidth * 4
        ||  self.cFrame.position.y - self.size.y/2 > canvasHeight){
			self.destroy();
            if(self.isPlatform == true) platforms.splice(platforms.indexOf(self), 1);
        }
		
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
        ctx.fillStyle = self.color;
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
	})
}