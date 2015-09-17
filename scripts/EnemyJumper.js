function EnemyJumper(properties) {
	//Extends:
	GameObject(this, properties);
    this.childs["enemybase"] = new EnemyBase(this);
    this.childs["physics"] = new Physics(this);
	
	var self = this
	
    var sitTime = 0;
    var jumpSpeedRand = Math.random() * 7 + 20;
    var sitTimeRand = Math.random() * 200 + 300;
    var moveRight = false;
	
	this.update.push(function(){	
        if(self.pushDirection.y == -1)
        
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
        ctx.fillStyle = "#088A4B";
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
        
        
        if(self.grounded){//ON THE GROUND
            if (sitTime < 0){
                self.velocity.y -= jumpSpeedRand, sitTime = sitTimeRand;
                if(player.cFrame.position.x < self.cFrame.position.x) moveRight = false;
                else moveRight = true;
            } else sitTime--;    
        }else {//IN THE AIR
            if(player.cFrame.position.x - 10 < self.cFrame.position.x && self.cFrame.position.x < player.cFrame.position.x + 10){
                if(self.cFrame.position.y < player.cFrame.position.y) self.velocity.y += self.speed * 13;
                else self.gravity = 0, self.velocity.y -= self.speed * 20;
            }
            else if(moveRight) self.velocity.x += self.speed;
            else self.velocity.x -= self.speed;
        }
	})
}
/*
function EnemyJumper(properties, childs) {
    
	//Index\\
	this.prop = properties //Prop == properties
	this.childs = childs ? childs : [];
    this.update = [];
	this.functions = {};
	var self = this;
    
    var sitTime = 0;
    var jumpSpeedRand = Math.random() * 7 + 20;
    var sitTimeRand = Math.random() * 200 + 300;
    var moveRight = false;
    
	Entity(this.prop);
	Physics(this.prop, this.update, this.functions);
	Humanoid(this.prop, this.functions);
    
	//Functions\\
	this.functions["test"] =  function(){console.log("test3")};
    
	//Physics(properties, update);
	EnemyBase(properties, childs, this.update);
    
	//Events\\
	this.update.push(
		function() {
            
			ctx.setTransform(1, 0, 0, 1, self.prop.cFrame.position.x, self.prop.cFrame.position.y);
            ctx.fillStyle = "#088A68";
			ctx.fillRect(-self.prop.size.x*.5, -self.prop.size.y*.5, self.prop.size.x, self.prop.size.y);
            
            if(self.prop.grounded){//ON THE GROUND
                if (sitTime < 0){
                    self.prop.velocity.y -= jumpSpeedRand, sitTime = sitTimeRand;
                    if(player.prop.cFrame.position.x < self.prop.cFrame.position.x) moveRight = false;
                    else moveRight = true;
                } else sitTime--; 
                
            }else {//IN THE AIR
                if(player.prop.cFrame.position.x - 10 < self.prop.cFrame.position.x && self.prop.cFrame.position.x < player.prop.cFrame.position.x + 10){
                    if(self.prop.cFrame.position.y < player.prop.cFrame.position.y) self.prop.velocity.y += self.prop.speed * 13;
                    else self.prop.gravity = 0, self.prop.velocity.y -= self.prop.speed * 20;
                }
                else if(moveRight) self.prop.velocity.x += self.prop.speed;
                else self.prop.velocity.x -= self.prop.speed;
            }
            if (self.prop.cFrame.position.x < 0) destroy(self); //left
		}
	);
	
	
}
*/