function EnemyTank(properties, childs) {
    
	//Index\\
	this.prop = properties //Prop == properties
	this.childs = childs ? childs : [];
    this.update = [];
	this.functions = {};
	var self = this;
    
    var sitTime = 0;
    var jumpSpeedRand = Math.random() * 7 + 20;
    var sitTimeRand = Math.random() * 250 + 500;
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
            ctx.fillStyle = "#01DF74";
			ctx.fillRect(0, 0, self.prop.size.x, self.prop.size.y);
            
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