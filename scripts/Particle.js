//BaseClass
function Particle(properties, childs) {
	//Extends:
	GameObject(this, properties, childs);
	this.childs["physics"] = new Physics(this);
    
	var self = this
    
    self.color;
    self.lifeTime;
    self.minSize;
    self.maxSize;
    
	this.update.push(function(){
		if (self.cFrame.position.x + self.size.x/2 < 0
		||	self.cFrame.position.y + self.size.y/2 < 0 
        ||  self.cFrame.position.x - self.size.x/2 > canvasWidth
        ||  self.cFrame.position.y - self.size.y/2 > canvasHeight){
			self.destroy();
        }
		
        //SIZE
        if(self.maxSize != self.minSize || self.Size < self.minSize) self.size.x -= self.size.x/35, self.size.y -= self.size.y/35;
        
        //LifeTime 
        if(self.lifeTime < 0) self.destroy();
        else self.lifeTime--;
        
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
        ctx.fillStyle = self.color;
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
	})
}