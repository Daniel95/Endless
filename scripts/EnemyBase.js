//BaseClass

function EnemyBase(parent) {
	//Extends:
	//GameObject(this, properties);
    //parent.childs["physics"] = new Physics(this);
	parent.childs["humanoid"] = new Humanoid(parent);
	
    parent.jumpSpeed = 0;
    parent.color = "";
    parent.standStill = false;
    parent.canCollide = false;
    
    parent.isEnemy = true;
    
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
            if(player.cFrame.position.x < parent.cFrame.position.x) parent.velocity.x -= parent.speed / (parent.grounded + 1) ;
            else parent.velocity.x += parent.speed / (parent.grounded + 1);
            if(parent.pushDirection.y == -1) parent.grounded = 0;
            else {
                if(parent.grounded == 0){//jump from platform
                    parent.jumpSpeed = 0;
                    if(player.cFrame.position.y < parent.cFrame.position.y) parent.jumpSpeed = (parent.cFrame.position.y - player.cFrame.position.y) / 13;
                    parent.velocity.y -= parent.speed * 50 + parent.jumpSpeed + Math.random() * 15;
                }
                parent.grounded = 1;
            }
        }
    }
	
	parent.onCollisionEnter = function( obj ) {
        if(obj.constructor == Obstacle)
            ;//console.log(obj.doesDmg);
		if (obj.constructor == Player)
			parent.kill();
	}
}