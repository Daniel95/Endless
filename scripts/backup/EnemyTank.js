function EnemyTank(properties) {
	//Extends:
	GameObject(this, properties);
	this.childs["enemybase"] = new EnemyBase(this);
    this.childs["physics"] = new Physics(this);
	
	var self = this
	
    self.color = "#088A4B";
    self.speed * 0.5;
	
	this.update.push(function(){	
        self.StandardMovement();
	})
}