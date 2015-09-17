function Bullet(properties) {
	//Extends:
	GameObject(this, properties);
	this.childs["physics"] = new Physics(this);
	
	var self = this
    
    var color = '#'+Math.random().toString(16).substr(-6);
    
    this.movePos = V2(0,0);
    
    this.radian = self.cFrame.rotation * Math.PI / 180;
    self.movePos.x = Math.cos(self.radian);
    self.movePos.y = Math.sin(self.radian);
			
    self.cFrame.position.x += (15 * self.movePos.x);
    self.cFrame.position.y += (15 * self.movePos.y);
	
	this.update.push(function(){
		if (self.cFrame.position.x - self.size.x/2 > canvasWidth
		||	self.cFrame.position.y - self.size.y/2 > canvasHeight
		||	self.cFrame.position.x + self.size.x/2 < 0
		||	self.cFrame.position.y + self.size.y/2 < 0)
			self.destroy();
		
        self.velocity.x += self.movePos.x;
        self.velocity.y += self.movePos.y;
        
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
        /*
        ctx.beginPath();
        ctx.strokeStyle = color;
		ctx.lineWidth = 50;
		ctx.fillStyle = color;
		ctx.arc(self.cFrame.position.x,self.cFrame.position.y,50,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
        */
	})
}