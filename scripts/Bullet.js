//BaseClass

function Bullet(properties) {
	//Extends:
	GameObject(this, properties);
	this.childs["physics"] = new Physics(this);
	
	var self = this;
	
    if(this.toExplode==undefined) this.toExplode = false;
	this.color = "#55522f";
	this.canCollide = true;
	this.collision = false;
    
    this.color = "#7f0000";
    
	this.update.push(function(){
		
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
        ctx.fillStyle = this.color;
		ctx.fillRect(-self.size.x / 2, -self.size.y / 2, self.size.x, self.size.y);
        
		if (self.cFrame.position.x + self.size.x/2 < 0
		||	self.cFrame.position.y + self.size.y/2 < 0 
        ||  self.cFrame.position.x - self.size.x/2 > canvasWidth
        ||  self.cFrame.position.y - self.size.y/2 > canvasHeight){
			self.destroy();
        }
	})
	
	this.onCollisionEnter = function( obj ) {
        
		if (obj.constructor == EnemyStandard || obj.constructor == EnemyJumper) {
			obj.pushDirection = V2(0,0);
            console.log(this.damage);
			obj.takeHealth( this.damage );
		}
		
		if (obj.constructor != Player)
            if(this.toExplode == true) this.explode();
			this.destroy();
	}
    
    
    
    this.explode = function(){
        for(e = 0; e < 50 + Math.random() * 50; e++)
        {
            var bSize = Math.random() * 15;
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
    }
}