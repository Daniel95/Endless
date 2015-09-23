//BaseClass

function Bullet(properties) {
    
    this.ignoreObjects = [];
    
	//Extends:
	GameObject(this, properties);
	this.childs["physics"] = new Physics(this);
    this.childs["SpecialEffects"] = new SpecialEffects(this);
	
	var self = this;
    
    
	this.canCollide = true;
	this.collision = true;
    
    this.color = "#7f0000";
    
	this.update.push(function(){
		
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
        ctx.fillStyle = "#7f0000";
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
        
		if (self.cFrame.position.x + self.size.x/2 < 0
		||	self.cFrame.position.y + self.size.y/2 < -canvasHeight * 2 
        ||  self.cFrame.position.x - self.size.x/2 > canvasWidth
        ||  self.cFrame.position.y - self.size.y/2 > canvasHeight){
			self.destroy();
        }
	})
	
	this.onCollisionEnter = function( obj ) {
        
		if (obj.isEnemy || obj.constructor == Player) {
			obj.pushDirection = V2(0,0);
			obj.takeHealth( this.damage );
		}
        
        if(this.damage > 100) self.explode(this.damage - 100);
        self.destroy();
	}
    
    /*
    this.explode = function(){
        var bSize = 8;
        for(e = 0; e < this.damage - 100; e++)
        {
            STAGE.push(
                new Bullet({
                    cFrame:{position:V2(self.cFrame.position.x,self.cFrame.position.y - 10),rotation:0},
                    size:V2(bSize,bSize),
                    gravity:0.1,
                    velocity:V2((Math.random()-.5)*15,(Math.random()-.5)*15),
                    friction:0.001,
                    damage: 100
                })
            )
        }
    }*/
}