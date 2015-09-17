//BaseClass

function Player(properties) {
	//Extends:
	GameObject(this, properties);
	this.childs["physics"] = new Physics(this);
	this.childs["tool"] = new Gun(this);
	
	var self = this
	
    this.hJumpTimer = 70;
    
	//console.log(properties);
	
	//addVar( this, test = 3 );
	
	//Index
	
    self.childs.tool.smg();
    
	this.update.push(function(){
		
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
		
		if (INPUT["65"]) self.velocity.x-= parent.speed;
		if (INPUT["68"]) self.velocity.x+= parent.speed;
		if (INPUT["83"]) self.velocity.y+= parent.speed;
        
        if(self.pushDirection.y == -1){
            if(self.hJumpTimer < 350) self.hJumpTimer += 0.4;
            if (INPUT["87"]) for(f = 0; f < 8; f++) if(self.hJumpTimer > 0) self.velocity.y -= 3.5, self.hJumpTimer -= 1;//Normal Jump
        } else if(INPUT["87"] && self.hJumpTimer > 0) self.velocity.y -= 0.93, self.hJumpTimer -= 0.2;//Hover Jump
		
		
        self.childs.tool.fireTimer -= 6;
		if (MOUSE["mousedown"] && self.childs.tool != undefined) self.childs.tool.fire();
        
        //stay in screen
        if (self.cFrame.position.x - self.size.x/2 < 0) self.cFrame.position.x = 0 + self.size.x/2; //left
        else if (self.cFrame.position.x + self.size.x/2 > canvasWidth) self.cFrame.position.x = canvasWidth - self.size.x; //right
        else if (self.cFrame.position.y - self.size.y/2 > canvasHeight) console.log("dies"), self.cFrame.position.x = 100, self.cFrame.position.y = 0; //down
        
        self.childs.tool.targetPosition.x = mousePos.x - self.cFrame.position.x;
        self.childs.tool.targetPosition.y = mousePos.y - self.cFrame.position.y;
        
        
	})
}