function EnemyStandard(properties) {
	//Extends:
	GameObject(this, properties);
	//this.childs["enemybase"] = new EnemyBase(this);
    this.childs["physics"] = new Physics(this);
	
	var self = this
    
	this.update.push(function(){	
        
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
        ctx.fillStyle = "#088A4B";
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
	})
}