function EnemyJumper(properties) {
	//Extends:
	GameObject(this, properties);
    EnemyBase(this, properties);
    //this.childs["enemybase"] = new EnemyBase(this);
    this.childs["physics"] = new Physics(this);
	
	var self = this
	
    self.color = "#088A68";
    self.standStill = true;
    
    var sitTime = Math.random() * 50;
    var jumpSpeedRand = Math.random() * 15 + 25;
    var sitTimeRand = Math.random() * 90 + 40;
    var moveRight = false;
	
	this.update.push(function(){	
        
        
        if(self.pushDirection.y == -1){//ON THE GROUND  
            if (sitTime < 0){
                self.velocity.y -= jumpSpeedRand, sitTime = sitTimeRand;
                if(player.cFrame.position.x < self.cFrame.position.x) moveRight = false;
                else moveRight = true;
            } else sitTime--;    
        }else {//IN THE AIR
            if(player.cFrame.position.x - 10 < self.cFrame.position.x && self.cFrame.position.x < player.cFrame.position.x + 10){
                if(self.cFrame.position.y < player.cFrame.position.y) self.velocity.y += self.speed;
                else self.gravity = 0, self.velocity.y -= self.speed;
            }
            else if(moveRight) self.velocity.x += self.speed;
            else self.velocity.x -= self.speed;
        }
	})
}