function Shooter (prop, update, functions) {
	
	prop.ammo = Infinity;
    prop.fireTimer = prop.fireRate = 0;//fireTimer as value //fireRate as decrement
    
    prop.targetPosition = V2(0,0);
    
    prop.spray = 15;
    
    prop.shots = 7;
    
	this.shoot = function() {
        
        var dx = prop.targetPosition.x;
        var dy = prop.targetPosition.y;		
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        if(prop.fireTimer < 0 && prop.ammo > 0) {
            prop.fireTimer = prop.fireRate;
            prop.ammo--;
            for(b = 0; b < prop.shots; b++){
                console.log("hey");
                STAGE.push(
                    new Bullet(
                        {
                            cFrame:{position:V2(prop.cFrame.position.x, prop.cFrame.position.y), rotation:angle + prop.spray * Math.random() - prop.spray * 0.5},
                            size:V2(5, 5)
                        }
                    )
                )
            }
        }prop.fireTimer--;
    }
    /*
    this.update.push(
		function() {
            
			prop.fireTimer--;
		}
	);
    */
    this.pistol = function(){
        prop.fireRate = 140;
        prop.spray = 3;
        prop.shots = 1;
    }
    
    this.rifle = function(){
        prop.fireRate = 5;
        prop.spray = 10;
        prop.shots = 1;
    }
    
    this.shotgun = function(){
        prop.fireRate = 300;
        prop.spray = 20;
        prop.shots = 9;
    }
}