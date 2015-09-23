//BaseClass

function Player(properties) {
	//Extends://Hallo darren.
	GameObject(this, properties);
	this.childs["physics"] = new Physics(this);
	this.childs["humanoid"] = new Humanoid(this);
    this.childs["SpecialEffects"] = new SpecialEffects(this);
	this.childs["tool"] = new Gun(this);
	
	var self = this
	
    this.hJumpTimer = 150;
    
    //this.gunSound = new Audio("sounds/pistol.wav"); // buffers automatically when created
    
    self.childs.tool.selectWeapon( 0 );
	this.update.push(function(){
	
		//console.log(this.constructor.name, "test");
        
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
		ctx.fillStyle = "#000";
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
        
		if (INPUT["65"] || INPUT["37"]) self.velocity.x-= self.speed;
		if (INPUT["68"] || INPUT["39"]) self.velocity.x+= self.speed + UIkills / 500;
		if (INPUT["83"] || INPUT["40"]) self.velocity.y+= self.speed;
        
        if(self.pushDirection.y == -1){
            if(self.hJumpTimer < 350) self.hJumpTimer += 0.4;
            if (INPUT["87"] || INPUT["38"]){
                if(self.hJumpTimer > 8) self.hJumpTimer -= 8;
                self.velocity.y -= 24;//Normal Jump
            }
        } else if((INPUT["87"] || INPUT["38"]) && self.hJumpTimer > 0){
            self.velocity.y -= 1.55, self.hJumpTimer -= 1;//Hover Jump
            if(self.hJumpTimer < 180) var BoosterSize = self.hJumpTimer / 10;
            else BoosterSize = 18;
            self.particles(BoosterSize,3,7.5,true,10,false,BoosterSize + 4,0,40,false,"#ff0000");
            //amount,fireRate,speedX,spreadX,speedY,spreadY,minSize,MaxSize,coll,color
        }
		
		
        self.childs.tool.fireTimer -= 6;
		if (MOUSE["mousedown"] && self.childs.tool != undefined) self.childs.tool.fire();
        
        //stay in screen
        if (self.cFrame.position.x - self.size.x/2 < 0) self.kill();//self.cFrame.position.x = 0 + self.size.x/2; //left
        else if (self.cFrame.position.x + self.size.x/2 > canvasWidth) self.cFrame.position.x = canvasWidth - self.size.x; //right
        else if (self.cFrame.position.y - self.size.y/2 > canvasHeight) self.gravity = 1, self.kill(); //down
        
        self.childs.tool.targetPosition.x = mousePos.x - self.cFrame.position.x;
        self.childs.tool.targetPosition.y = mousePos.y - self.cFrame.position.y;
	})
    
	this.onCollisionEnter = function( obj ) {
        if(obj.isPickup) self.childs.tool.selectWeapon(Math.floor(self.childs.tool.weaponArray.length * Math.random())), obj.destroy();
		
		
		else if (obj.constructor == EnemyBase && self.cFrame.position.y + self.size.y <= obj.cFrame.position.y) {
			obj.takeHealth( 100 ); console.log(obj.health);
			
		}
	}
    
    self.kill = function(){
		STAGE.push(
			new Obstacle({
				cFrame: {
					position: V2(self.cFrame.position.x, parent.cFrame.position.y),
					rotation: 0,
				},
				size: self.size,
				gravity: 0.1,
				collision: false,
				canCollide: false,
				velocity: V2((Math.random()-0.5+self.pushDirection.x*5) * 5, (Math.random()-0.5+self.pushDirection.y*5) * 5),
				friction: 0.001,
                color: "#A9000E"
			})
		)
		
		currentWorld.checkWorldState();
        self.childs.tool.ammo = 0;
        UIammo = 0;
		
        var playerDiesSound = new Audio("sounds/dead/playerdies.wav");
        playerDiesSound.play();
        
		self.destroy();
    }
};