function EnemyStandard(properties) {
	//Extends:
	GameObject(this, properties);
	this.childs["enemybase"] = new EnemyBase(this);
    this.childs["physics"] = new Physics(this);
	
	var self = this
    
    self.color = "#04B431";
    
    self.speed += self.speed * Math.random() - self.speed / 2;
    self.size.x += self.speed;
    self.size.y += self.speed;
    
	this.update.push(function(){
        self.StandardMovement();
    })
}