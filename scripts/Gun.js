//SubClass

function Gun(parent, thiserties) {
	
	//Extends:
	GameObject(this, thiserties);
	
    this.targetPosition = V2(0,0);
    
    this.ammo = Infinity;
    this.fireTimer = this.fireRate = this.spray = this.shots = this.bSize = 5;
    
    
	this.fire = function() {
		
		//dit is een test line, het spawnt een doosje
		//STAGE.push(new Obstacle({cFrame:{position:V2(canvas.width/2,200),rotation:0},size:V2(4,4),gravity:0.1,collision:false,canCollide:false,velocity:V2((Math.random()-.5)*10,(Math.random()-.5)*10),friction:0.001}));
        
        var dx = this.targetPosition.x;
        var dy = this.targetPosition.y;		
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        if(this.fireTimer < 0 && this.ammo > 0) {
            this.fireTimer = this.fireRate;
            this.ammo--;
            for(b = 0; b < this.shots; b++){
                /*
                STAGE.push(
                    new Obstacle({
						cFrame: {
							position: V2(player.cFrame.position.x, player.cFrame.position.y),
							rotation: angle + this.spray * Math.random() - this.spray * 0.5
						},
						size: V2(this.bSize, this.bSize),
						gravity: 0.1,
						collision: false,
						canCollide: false,
						velocity: V2((Math.random() - .5) * 10, (Math.random() - .5) * 10),
						friction: 0.001
					})
                )
                */
                STAGE.push(
                    new Bullet(
                        {
                            cFrame:{position:V2(player.cFrame.position.x, player.cFrame.position.y), rotation:angle + this.spray * Math.random() - this.spray * 0.5},
                            size:V2(this.bSize, this.bSize),
                            gravity:0.01,
                            collision:false,
                            canCollide:false
                        }
                    )
                )
            }
        }
	}
    
    this.pistol = function(){
        this.fireRate = 140;
        this.spray = 2;
        this.shots = 1;
        this.bSize = 9;
    }
    
    this.smg = function(){
        this.fireRate = 25;
        this.spray = 20;
        this.shots = 1;
        this.bSize = 6;
    }
    
    this.assaultRifle = function(){
        this.fireRate = 60;
        this.spray = 3;
        this.shots = 1;
        this.bSize = 8;
    }
    
    this.shotgun = function(){
        this.fireRate = 300;
        this.spray = 15;
        this.shots = 6;
        this.bSize = 7;
    }
    
    this.assaultShotgun = function(){
        this.fireRate = 120;
        this.spray = 45;
        this.shots = 3;
        this.bSize = 8;
    }
    
    this.bazooka = function(){
        this.fireRate = 500;
        this.spray = 15;
        this.shots = 1;
        this.bSize = 40;
    }
    
    this.explosion = function(){
        this.fireRate = 240;
        this.spray = 360;
        this.shots = 12;
        this.bSize = 8;
    }
        
    this.blaster = function(){
        this.fireRate = 200;
        this.spray = 90;
        this.shots = 20;
        this.bSize = 60;
    }
    
}

