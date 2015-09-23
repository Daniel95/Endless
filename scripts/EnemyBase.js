//BaseClass
/*
function EnemyBase(properties) {
	//Extends:
    GameObject(this, properties);
    
    this.childs["physics"] = new Physics(this);
	this.childs["humanoid"] = new Humanoid(this);
    
    //this.childs["EnemyJumper"] = new EnemyJumper(this);
    //this.childs["EnemyStandard"] = new EnemyStandard(this);
        
    var self = this;
    
    self.color = "#fff";
    self.standStill = false;
    self.canCollide = false;
    self.size = V2(20, 35);
    
    this.update.push(function() {
        
        ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
        ctx.fillStyle = "#fff";
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
        
		if (self.cFrame.position.x + self.size.x/2 < 0
		||	self.cFrame.position.y + self.size.y/2 < 0 
        ||  self.cFrame.position.x - self.size.x/2 > canvasWidth * 4
        ||  self.cFrame.position.y - self.size.y/2 > canvasHeight){
			self.destroy();
            if(self.isPlatform == true) platforms.splice(platforms.indexOf(self), 1);
        }
        
		self.velocity.x += (player.cFrame.position.x - self.cFrame.position.x) > 0 ? 0.3 : -0.3;
    })
	
	
	
	
	self.onCollisionEnter = function( obj ) {
        
		if (obj.constructor == Player && obj.velocity.y < self.size.y/4) {
			obj.takeHealth( 100 ); console.log(obj.health);
		}
	}
	
	self.onCollisionExit = function( obj ) {
        
		if (obj.constructor == Obstacle)
			self.velocity.y = -25;
	}
}*/


//BaseClass

function EnemyBase(parent) {
	//Extends:
	//GameObject(this, properties);
    //parent.childs["physics"] = new Physics(this);
	parent.childs["humanoid"] = new Humanoid(parent);
    parent.childs["specialeffects"] = new SpecialEffects(parent);
	
    parent.jumpSpeed = 0;
    parent.color;
    parent.canCollide = false;
      
    parent.dieSounds = [
        "sounds/dead/zdead1.wav",
        "sounds/dead/zdead2.wav",
        "sounds/dead/zdead3.wav",
        "sounds/dead/zdead4.wav",
        "sounds/dead/zdead5.wav",
        "sounds/dead/zdead6.wav",
        "sounds/dead/zdead7.wav",
    ]
    
    parent.randomSound = parent.dieSounds[Math.floor(Math.random() * parent.dieSounds.length)];
    
    parent.isEnemy = true;
    
    //this.explosionSound = new Audio("sounds/explosion.wav");
        //this.explosionSound.play();
    
    parent.update.push(function() {
        
        ctx.setTransform(1, 0, 0, 1, parent.cFrame.position.x, parent.cFrame.position.y);
        ctx.fillStyle = parent.color;
		ctx.fillRect(-parent.size.x / 2, -parent.size.y / 2, parent.size.x, parent.size.y);
        
		if (parent.cFrame.position.x + parent.size.x/2 < 0
		||	parent.cFrame.position.y + parent.size.y/2 < 0)
			parent.destroy();
        
    })
    
    parent.StandardMovement = function(){
        if(parent.cFrame.position.x - parent.size.x/2 < canvasWidth){
            if(player.cFrame.position.x < parent.cFrame.position.x) parent.velocity.x -= parent.speed / 2;
            else parent.velocity.x += parent.speed / 2;
            if(parent.pushDirection.y == -1) parent.grounded = 1;
            else {
                if(parent.grounded == 1){//jump from platform
                    parent.jumpSpeed = 0;
                    if(player.cFrame.position.y < parent.cFrame.position.y) parent.jumpSpeed = (parent.cFrame.position.y - player.cFrame.position.y) / 13;
                    if(parent.jumpSpeed > 5) parent.jumpSpeed = 5;
                    parent.velocity.y -= parent.speed * 50 + parent.jumpSpeed + Math.random() * 15;
                    if(player.cFrame.position.x < parent.cFrame.position.x) parent.velocity.x -= parent.speed * 10;
                    else parent.velocity.x += parent.speed * 10;
                }
                parent.grounded = 0;
            }
        }
    }
	
	parent.onCollisionEnter = function( obj ) {
		if (obj.constructor == Player){
            if(obj.velocity.y < parent.size.y/4) obj.takeHealth( 100 ), console.log(obj.health);
			else parent.kill();
		}
	}
    
    parent.oncollisionExit = function( obj ){
        console.log("hey");
    }
}