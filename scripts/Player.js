//BaseClass

function Player(properties) {
	//Extends:
	GameObject(this, properties);
	this.childs["physics"] = new Physics(this);
	this.childs["tool"] = new Gun(this);
	
	var self = this
	
    this.hJumpTimer = 70;
    
    
    self.childs.tool.selectWeapon( 0 );
	this.update.push(function(){
        
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
		
		if (INPUT["65"]) self.velocity.x-= parent.speed;
		if (INPUT["68"]) self.velocity.x+= parent.speed;
		if (INPUT["83"]) self.velocity.y+= parent.speed;
        
        if(self.pushDirection.y == -1){
            if(self.hJumpTimer < canvasWidth - 100) self.hJumpTimer += 0.36;
            //if (INPUT["87"]) for(f = 0; f < 8; f++) if(self.hJumpTimer > 0) self.velocity.y -= 3, self.hJumpTimer -= 1;//Normal Jump
            if (INPUT["87"]){
                if(self.hJumpTimer > 8) self.hJumpTimer -= 8;
                self.velocity.y -= 24;//Normal Jump
            }
        } else if(INPUT["87"] && self.hJumpTimer > 0) self.velocity.y -= 1.55, self.hJumpTimer -= 0.3;//Hover Jump
		
		
        self.childs.tool.fireTimer -= 6;
		if (MOUSE["mousedown"] && self.childs.tool != undefined) self.childs.tool.fire();
        
        //stay in screen
        if (self.cFrame.position.x - self.size.x/2 < 0) self.cFrame.position.x = 0 + self.size.x/2; //left
        else if (self.cFrame.position.x + self.size.x/2 > canvasWidth) self.cFrame.position.x = canvasWidth - self.size.x; //right
        else if (self.cFrame.position.y - self.size.y/2 > canvasHeight) console.log("dies"), self.gravity = 1, self.cFrame.position.x = 100, self.cFrame.position.y = 0; //down
        
        self.childs.tool.targetPosition.x = mousePos.x - self.cFrame.position.x;
        self.childs.tool.targetPosition.y = mousePos.y - self.cFrame.position.y;
        
        
	})
	
	this.onCollisionEnter = function( obj ) {
        if(obj.isPickup) self.childs.tool.selectWeapon(Math.floor(self.childs.tool.weaponArray.length * Math.random())), obj.destroy();
        else if(obj.constructor == EnemyStandard || obj.constructor == EnemyJumper && self.cFrame.position.y > obj.cFrame.position.y - obj.size.y / 3) self.cFrame.position.x = 100, self.cFrame.position.y = 0;
	}
}