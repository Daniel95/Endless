//SubClass

function Gun(parent, thiserties) {
	
	//Extends:
	GameObject(this, thiserties);
	
    this.targetPosition = V2(0,0);
    
    this.fireTimer = this.fireRate = this.spray = this.shots = this.bSize = this.damage = this.gravity = this.ammo = this.startDist = 0;
    
    this.ignoreObjects = [Obstacle, Bullet];
    
    this.weaponArray = [];
    
    this.weaponNames = [];
    
	this.fire = function() {
        
        if(this.fireTimer < 0 && this.ammo > 0) {
            this.fireTimer = this.fireRate;
            this.ammo--;
            
            var dx = this.targetPosition.x;
            var dy = this.targetPosition.y;		
            var angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            this.movePos = V2(0,0);
            
            //if(angle < -90 || angle > 90) var recoil = this.spray;
           // else var recoil = -this.spray;
            
            for(b = 0; b < this.shots; b++){
                var randomSpeed = Math.random() * 6 + 10;
                var rotation = angle + (Math.random()-.5) * this.spray;
                var radian = rotation * Math.PI / 180;
                this.movePos.x = Math.cos(radian);
                this.movePos.y = Math.sin(radian);
            
                STAGE.push(
                    new Bullet(
                        {
                            cFrame:{position:V2(parent.cFrame.position.x + (this.startDist * this.movePos.x), parent.cFrame.position.y + (this.startDist * this.movePos.y)), rotation:0},
                            size:V2(this.bSize, this.bSize),
                            gravity: this.gravity,
                            gravityIncrement: 0,
                            collision:true,
                            canCollide:false,
                            friction: 0,
                            velocity:V2(this.movePos.x * randomSpeed,this.movePos.y * randomSpeed),
							damage: this.damage,
                            ignoreObjects: this.ignoreObjects,
						}
                    )
                )
            }
        }
        UIammo = this.ammo;
	}
	
	this.weaponArray = [
		{//pistol 0
			fireRate: 160,
			spray: 8,
			shots: 1,
			bSize: 9,
			ammo: 120,
			damage: 100,
            gravity: 0,
            startDist: 33,
            ignoreObjects: [Obstacle, Bullet, Player],
		},
        {//smg 1
            fireRate: 25,
            spray: 20,
            shots: 1,
            bSize: 6,
			ammo: 60,
			damage: 35,
            gravity: 0.01,
            startDist: 33,
            ignoreObjects: [Obstacle, Bullet, Player],
        },
        {//assaultRife 2
            fireRate: 75,
            spray: 3,
            shots: 1,
            bSize: 8,
            ammo: 125,
            damage: 65,
            gravity: 0,
            startDist: 33,
            ignoreObjects: [Obstacle, Bullet, Player],
        },
		{//shotgun 3
			fireRate: 300,
			spray: 15,
			shots: 6,
			bSize: 7,
			ammo: 37,
			damage: 100,
            gravity: 0.02,
            startDist: 33,
            ignoreObjects: [Obstacle, Bullet, Player],
		},
        {//assaultShotgun 4
			fireRate: 120,
            spray: 45,
            shots: 3,
            bSize: 8,
            ammo: 25,
            damage: 60,
            gravity: 0.03,
            startDist: 33,
            ignoreObjects: [Obstacle, Bullet, Player],
		},
        {//OP gun 5
			fireRate: 45,
            spray: 360,
            shots: 5,
            bSize: 10,
			ammo: 25,
			damage: 100,
            gravity: 1,
            startDist: 33,
            ignoreObjects: [Obstacle, Bullet, Player],
		},
        {//Rocket Launcher 6
            fireRate: 330,
            spray: 15,
            shots: 1,
            bSize: 25,
            ammo: 18,
            damage: 180,
            gravity: 0.08,
            startDist: 44,
            ignoreObjects: [Bullet, Player],
        },
        {//Grenade Launcher 7
            fireRate: 110,
            spray: 30,
            shots: 1,
            bSize: 15,
            ammo: 28,
            damage: 140,
            gravity: 0.06,
            startDist: 44,
            ignoreObjects: [Bullet, Player],
        }
	];
    
    this.weaponNames = [
        "Pistol",
        "Smg",
        "Assault Rifle",
        "Shotgun",
        "Automatic Shotgun",
        "Blast",
        "Rocket Launcher",
        "Grenade Launcher"
    ];
	
	this.selectWeapon = function( gunIndex ) {
		
		if (this.weaponArray[ gunIndex ] != undefined) {
			
			for (index in this.weaponArray[ gunIndex ])
				this[index] = this.weaponArray[ gunIndex ][ index ];
            
            UIweaponName = this.weaponNames[gunIndex];
		}
	}
}

