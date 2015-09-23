//SubClass

function Physics(parent) {

	if(parent.velocity==undefined) parent.velocity = V2(0, 0);
	if(parent.friction==undefined) parent.friction = 0.1;
	if(parent.canCollide==undefined) parent.canCollide = true;
	if(parent.collision==undefined) parent.collision = true;
	if(parent.gravity==undefined) parent.gravity = 1;
    if(parent.gravityIncrement==undefined) parent.gravityIncrement = 0.007;
    if(parent.grounded==undefined) parent.grounded = false;
    if(parent.speed==undefined) parent.speed = 0.5;
	parent.pushDirection = V2(0, 0);
	
	parent.collidingObject = undefined;
    
    parent.update.unshift(function () {
        parent.cFrame.position.x -= 1.4 + UIkills / 45;
        if (!parent.anchored) {
			
			parent.cFrame.position.x += parent.velocity.x;
			parent.cFrame.position.y += parent.velocity.y;
			
			
			parent.velocity.x -= parent.velocity.x * parent.friction;
			parent.velocity.y -= parent.velocity.y * parent.friction;
			
			if (Math.abs(parent.velocity.x) < 0.05) parent.velocity.x = 0;
			if (Math.abs(parent.velocity.y) < 0.05) parent.velocity.y = 0;
			
			//console.log(parent.velocity);
			
			parent.velocity.y += parent.gravity;
            parent.gravity += parent.gravityIncrement;
			
			if (parent.collidingObject != undefined && !parent.checkCollision( parent.collidingObject, false )) {
				if (parent.onCollisionExit != undefined) parent.onCollisionExit( parent.collidingObject );
				parent.collidingObject = undefined;
			}
            
			if (!(FRAMECOUNT % FRAMESKIP)) {
				parent.pushDirection = V2(0, 0);
				if (parent.collision) {
					for (childIndex in STAGE) {
						if (STAGE[childIndex] != parent) {

							if (distance(parent.cFrame.position, STAGE[childIndex].cFrame.position));
							parent.checkCollision( STAGE[childIndex], true );
						}
					}
				}
			} else if (parent.collidingObject != undefined)
				parent.collideWith( parent.collidingObject );
        }
    })
	
	parent.collideWith = function( obj ) {
		if (obj.canCollide && !parent.anchored) {
            
			var direction = getAngleFromPos( this.cFrame.position, obj.cFrame.position );
			
			var corners = [
				getAngleFromPos( V2(0,0), V2( obj.size.x, -obj.size.y) ), //0 Top		right
				getAngleFromPos( V2(0,0), V2( obj.size.x,  obj.size.y) ), //1 bottom	right
				getAngleFromPos( V2(0,0), V2(-obj.size.x,  obj.size.y) ), //2 bottom	left
				getAngleFromPos( V2(0,0), V2(-obj.size.x, -obj.size.y) ), //3 top		left
			]
			
			if (!(FRAMECOUNT % FRAMESKIP)) {
				if ( direction >= corners[0] && direction <= corners[1] )
					parent.pushDirection = V2(-1, 0);//Right
				else if ( direction >= corners[1] && direction <= corners[2] )
					parent.pushDirection = V2(0, -1);//Down
				else if ( direction >= corners[2] && direction <= corners[3] )
					parent.pushDirection = V2(1, 0);//Left
				else
					parent.pushDirection = V2( 0, 1);//Top
                    parent.gravity = 1;
			}
			
			if (parent.pushDirection.x!=0) {
				parent.velocity.x = parent.velocity.x * parent.friction;//parent.gravity;//(parent.velocity.x + parent.gravity) * parent.friction;
				parent.cFrame.position.x = obj.cFrame.position.x + (obj.size.x/2 + parent.size.x/2) * parent.pushDirection.x;
			}
			if (parent.pushDirection.y!=0) {
				parent.velocity.y = parent.gravity;//parent.velocity.x * parent.friction;//parent.gravity;//(parent.velocity.y + parent.gravity) * parent.friction;
				parent.cFrame.position.y = obj.cFrame.position.y + (obj.size.y/2 + parent.size.y/2) * parent.pushDirection.y;
			}
			
			parent.collidingObject = obj;
			
			return parent.pushDirection;
		}
	}
	
	parent.checkCollision = function( obj, updateCollision ) {
		if((!obj.childs.physics || !obj.canCollide) || (parent.ignoreObjects && parent.ignoreObjects.indexOf( obj.constructor ) != -1)) return false;
		
		if (parent.cFrame.position.x + parent.size.x/2 > obj.cFrame.position.x - obj.size.x/2
		&&	parent.cFrame.position.x - parent.size.x/2 < obj.cFrame.position.x + obj.size.x/2
		&&	parent.cFrame.position.y + parent.size.y/2 > obj.cFrame.position.y - obj.size.y/2
		&&	parent.cFrame.position.y - parent.size.y/2 < obj.cFrame.position.y + obj.size.y/2) {
			
			if (updateCollision) {
				if (obj.collision)
					obj.collideWith( parent );
				parent.collideWith( obj );

				if (obj.onCollisionEnter != undefined && !(obj.ignoreObjects != undefined && obj.ignoreObjects.indexOf( parent.constructor ) != -1))
					obj.onCollisionEnter( parent );
				if (parent.onCollisionEnter != undefined) //&& !(obj.ignoreObjects != undefined && obj.ignoreObjects.indexOf( parent.constructor ) != -1))
					parent.onCollisionEnter( obj );
			}
            
			return true;
		}// else parent.pushDirection = V2(0,0);
		
		return false;
	}
}