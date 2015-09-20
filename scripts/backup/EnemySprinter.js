function EnemySprinter(properties) {
	//Extends:
	GameObject(this, properties);
	this.childs["enemybase"] = new EnemyBase(this);
    this.childs["physics"] = new Physics(this);
	
	var self = this
	
    self.color = "#088A4B";
	self.speed * 2; 
    
	this.update.push(function(){	
        self.StandardMovement();
	})
}