//SubClass

function Gun(parent, thiserties) {
	
	//Extends:
	GameObject(this, thiserties);
	
	parent.ignoreObjects = [Bullet]
	
    this.targetPosition = V2(0,0);
    
    this.ammo = Infinity;
    this.fireTimer = this.fireRate = this.spray = this.shots = this.bSize = this.damage = 0;
    
    this.weaponArray = [];
    
	this.fire = function() {
		
		//dit is een test line, het spawnt een doosje
		//STAGE.push(new Obstacle({cFrame:{position:V2(canvas.width/2,200),rotation:0},size:V2(4,4),gravity:0.1,collision:false,canCollide:false,velocity:V2((Math.random()-.5)*10,(Math.random()-.5)*10),friction:0.001}));
        
        if(this.fireTimer < 0 && this.ammo > 0) {
            this.fireTimer = this.fireRate;
            this.ammo--;
            
            var dx = this.targetPosition.x;
            var dy = this.targetPosition.y;		
            var angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            this.movePos = V2(0,0);
            
            var explodes = false;
            if(this.damage > 100) explodes = true;
            
            if(angle < -90 || angle > 90) var recoil = this.spray;
            else var recoil = -this.spray;
            
            for(b = 0; b < this.shots; b++){
                var rotation = angle + recoil * Math.random() - recoil / 4;
                var radian = rotation * Math.PI / 180;
                this.movePos.x = Math.cos(radian);
                this.movePos.y = Math.sin(radian);
            
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
                            cFrame:{position:V2(parent.cFrame.position.x + (20 * this.movePos.x), parent.cFrame.position.y + (20 * this.movePos.y)), rotation:0},
                            size:V2(this.bSize, this.bSize),
                            gravity:0.001,
                            gravityIncrement: 0,
                            collision:true,
                            canCollide:false,
                            friction: 0,
                            velocity:V2(this.movePos.x * 10,this.movePos.y * 10),
							damage: this.damage,
                            toExplode: explodes
						}
                    )
                )
            }
        }
	}
	
	this.weaponArray = [
		{//pistol 0
			fireRate: 140,
			spray: 20,
			shots: 1,
			bSize: 9,
			ammo: 120,
			damage: 100,
		},
        {//smg 1
            fireRate: 25,
            spray: 20,
            shots: 1,
            bSize: 6,
			ammo: 60,
			damage: 35,
        },
        {//assaultRife 2
            fireRate: 60,
            spray: 3,
            shots: 1,
            bSize: 8,
            ammo: 125,
            damage: 65,
        },
		{//shotgun 3
			fireRate: 300,
			spray: 15,
			shots: 6,
			bSize: 7,
			ammo: 37,
			damage: 100,
		},
        {//assaultShotgun 4
			fireRate: 120,
            spray: 45,
            shots: 3,
            bSize: 8,
            ammo: 25,
            damage: 60,
		},
        {//OP gun 5
			fireRate: 5,
            spray: 360,
            shots: 50,
            bSize: 8,
			ammo: 3,
			damage: 100,
		},
        {//Rocket Launcher 6
            fireRate: 400,
            spray: 15,
            shots: 1,
            bSize: 30,
            ammo: 16,
            damage: 150,
        }
	];
	
	this.selectWeapon = function( gunIndex ) {
		
		if (this.weaponArray[ gunIndex ] != undefined) {
			
			for (index in this.weaponArray[ gunIndex ])
				this[index] = this.weaponArray[ gunIndex ][ index ];
		}
	}
	
	this.selectWeapon( 0 );
	//this.selectWeapon( "pistol" );
}

