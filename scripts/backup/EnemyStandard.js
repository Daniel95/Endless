function EnemyStandard(properties) {
	//Extends:
	GameObject(this, properties);
	this.childs["enemybase"] = new EnemyBase(this);
    this.childs["physics"] = new Physics(this);
	
	var self = this
    
    self.color = "#04B431";
    
	this.update.push(function(){
        self.StandardMovement();
    })
}