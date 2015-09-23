//SubClass
function SpecialEffects (parent) {
    
    var allParticles = [];
    
    
    parent.particles = function(amount,fireRate,speedX,spreadX,speedY,spreadY,maxSize,minSize,lifeTime,coll,color){
        if( !(FRAMECOUNT % fireRate) ) {
            var i = 0;
            for (i = 0; i++ < amount;){
                if(spreadX) speedX = (Math.random()-.5)*speedX;
                if(spreadY) speedY = (Math.random()-.5)*speedY;
                allParticles.push(
                    new Particle({
                        cFrame: {
                            position: V2(parent.cFrame.position.x, parent.cFrame.position.y + parent.size.y/2),
                            rotation: 0,
                        },
                        size: V2(maxSize,maxSize),
                        gravity: 0.00001,
                        collision: coll,
                        canCollide: false,
                        velocity: V2(speedX, speedY),
                        friction: 0.001,
                        color: color,
                        minSize: minSize,
                        maxSize: maxSize,
                        lifeTime: lifeTime
                    })
                )
            }
        }
    }
    
    
    parent.blood = function(amount){
        for(b = 0; b < amount; b++){
			STAGE.push(
				new Obstacle({
					cFrame: {
						position: V2(parent.cFrame.position.x, parent.cFrame.position.y),
						rotation: 0,
					},
					size: V2(5,5),
					gravity: 0.1,
					collision: true,
					canCollide: false,
					velocity: V2((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10),
					friction: 0.001,
					color: "#A9000E",
				})
            )
        }
    }
    
    
    parent.explode = function(amount){
        parent.particles(amount,0,15,true,15,true,20,1,100,false,"#ff0000");
        for (index1 in STAGE) {
            if (STAGE[index1].isEnemy) {
                //STAGE[index1].destroy();
                var dist = distance(parent.cFrame.position,STAGE[index1].cFrame.position);
                if(dist <= amount * 2) STAGE[index1].kill();
           }
        }
        
        CauseScreenShake(amount,amount);
        
        var explosionSound = new Audio("sounds/explosion.wav");
        explosionSound.play();
        /*
        var bSize = 8;
        for(e = 0; e < amount; e++)
        {
            STAGE.push(
                new Bullet({
                    cFrame:{position:V2(parent.cFrame.position.x,parent.cFrame.position.y - 10),rotation:0},
                    size:V2(bSize,bSize),
                    gravity:0.1,
                    velocity:V2((Math.random()-.5)*15,(Math.random()-.5)*15),
                    friction:0.001,
                    damage: 100
                })
            )
        }
        */
    }
	
}