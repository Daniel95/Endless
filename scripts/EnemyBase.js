//BaseClass

function EnemyBase(properties) {
	//Extends:
	GameObject(this, properties);
    this.childs["physics"] = new Physics(this);
	
	var self = this
    
    this.grounded = false;
	/*
	this.update.push(function(){
        if(self.pushDirection.y == -1){
            if(player.cFrame.position.x < self.cFrame.position.x) self.velocity -= parent.speed;
            else self.velocity += parent.speed;
            grounded = true;
        } else grounded = false;
        
		if (self.cFrame.position.x + self.size.x/2 < 0
		||	self.cFrame.position.y + self.size.y/2 < 0)
			self.destroy();
	})
    */
}