function Physics (properties, update, functions) {
	
    properties.collidingEntities = [];
    
    properties.speed = 0.1;
    properties.grounded = false;
    properties.gravity = 0;
    properties.gravityValue = 0.001;
    
	properties.velocity = V2(0, 0);
	properties.friction = 0.1;
	
	//properties.Anchored = properties.Anchored != undefined ? properties.Anchored : true;
    //properties.Floating = properties.Floating != undefined ? properties.Floating : true;
    
    properties.Anchored = false;
    properties.Floating = false;
    
    properties.isPlayer = false;
    
	update.push(function() {
		
		//console.log("test2");
		properties.cFrame.position.x += properties.velocity.x;
		properties.cFrame.position.y += properties.velocity.y;
		
		
		properties.velocity.x -= properties.velocity.x * properties.friction;
		properties.velocity.y -= properties.velocity.y * properties.friction;
		
		//console.log(properties.Anchored);
        
        //console.log(properties);
        //console.log(properties.collidingEntities);
        /*
        if (!properties.Anchored) {
			for (childIndex in STAGE) {
				if (STAGE[childIndex].prop != properties) {
                                        
					//console.log ("test", Math.random())


					//console.log(STAGE[childIndex]);
					if (
						distance(
							properties.cFrame.position,
							STAGE[childIndex].cFrame.position ) <
						distance( 
							V2(0,0),
							properties.size ) +
						distance( 
							V2(0,0), 
							V2(50, 50) 
						)
					)
						console.log("Near obj");
				}
			}
		}
        */
        
        //demo code
        if (properties.cFrame.position.y >= 700) {
            properties.cFrame.position.y = 700;
            properties.grounded = true;
            properties.gravity = 0;
        }
        else {
            //properties.gravity += properties.gravityValue;
            if(!properties.Floating) properties.velocity.y += properties.gravity += properties.gravityValue;
            properties.grounded = false;
        } 
        
        properties.velocity.x -= 0.05;
        
        
        
        
        //Collision
		if (!properties.Anchored) {
			for (childIndex in STAGE) {
                var otherEntity = STAGE[childIndex];
				if (otherEntity.prop != properties){
                    
                     //DIT WERKT<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    if(properties.cFrame.position.x + properties.size.x * 0.5 > otherEntity.prop.cFrame.position.x - otherEntity.prop.size.x * 0.5 &&
                        properties.cFrame.position.x - properties.size.x * 0.5 < otherEntity.prop.cFrame.position.x + otherEntity.prop.size.x * 0.5 &&
                        properties.cFrame.position.y + properties.size.y * 0.5 > otherEntity.prop.cFrame.position.y - otherEntity.prop.size.y * 0.5 &&
                        properties.cFrame.position.y - properties.size.y * 0.5 < otherEntity.prop.cFrame.position.y + otherEntity.prop.size.y * 0.5) onCollision(otherEntity);
                        
                    
                    //DIT WERKT NIET, er is constant collision<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    if (CheckCollision(otherEntity)) onCollision(otherEntity);
                    
                    
                    /*
                    if (!AlreadyColliding(otherEntity) && CheckCollision(otherEntity)) onCollisionEnter(otherEntity);
                    else if (CheckCollision(otherEntity)) onCollision(otherEntity);
                    else if (AlreadyColliding(otherEntity)) onCollisionExit(otherEntity);
                    //console.log(properties.AlreadyColliding(otherEntity));
                    */
				}
			}
		}  
	})
    
    
    //OnCollision
    this.onCollisionEnter = function(otherEntity) {
        properties.collidingEntities.push(otherEntity);
        //console.log(otherEntity.constructor.name + " onCollisionEnter")
    }
    
    this.onCollision = function(otherEntity) {
        //console.log(otherEntity.constructor.name + " onCollision");
         //console.log(otherEntity.constructor.name);
        
        
        properties.grounded = true;
        properties.gravity = 0;
        
        if(otherEntity.constructor.name == "Platform") {
            //properties.grounded = true;
            //properties.gravity = 0;
            
            // IVP DE POS VERANDEREN VAN OBJECTEN DIE DE PLATFORM AANRAKEN VERANDERD HIJ DE POS VAN HET PLATFORM ZELF....<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            /*
            if (otherEntity.prop.cFrame.position.y < properties.cFrame.position.y) properties.cFrame.position.y = otherEntity.prop.cFrame.position.y - otherEntity.prop.cFrame.size * 0.5;
            else properties.cFrame.position.y = otherEntity.prop.cFrame.position.y + otherEntity.prop.cFrame.size * 0.5;
            */
        } 
    }
    
    this.onCollisionExit = function(otherEntity) {
        properties.collidingEntities.splice(properties.collidingEntities.indexOf(otherEntity), 1);
        //console.log(otherEntity.constructor.name + " onCollisionExit")
    }
    
    
    //Collision Checks
    this.CheckCollision = function(otherEntity) {
        var result = false;
        if(properties.cFrame.position.x + properties.size.x * 0.5 > otherEntity.prop.cFrame.position.x - otherEntity.prop.size.x * 0.5 &&
            properties.cFrame.position.x - properties.size.x * 0.5 < otherEntity.prop.cFrame.position.x + otherEntity.prop.size.x * 0.5 &&
            properties.cFrame.position.y + properties.size.y * 0.5 > otherEntity.prop.cFrame.position.y - otherEntity.prop.size.y * 0.5 &&
            properties.cFrame.position.y - properties.size.y * 0.5 < otherEntity.prop.cFrame.position.y + otherEntity.prop.size.y * 0.5) result = true; 
        return result;
    }
    
    this.AlreadyColliding = function(otherEntity){
        var result = false;
        //for (i = properties.collidingEntities.length - 1; i >= 0; i--) {
        for (childIndex in properties.collidingEntities) {
            //if (properties.collidingEntities[i] == otherEntity) {
            if (properties.collidingEntities[childIndex] == otherEntity) {
				result = true;
				break;
            }
        }
        return result;
    }
    
}