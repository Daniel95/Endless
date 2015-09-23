//SubClass
/*
function EnemyStandard(parent) {
    
	//var parent = this
    
    self.color = "#04B431";
    
    parent.jumpSpeed = 0;
    parent.speed += parent.speed * Math.random() - self.speed / 2;
    parent.size.x += parent.speed;
    parent.size.y += parent.speed;
    
    
    console.log("NOTJUMPER");
    
	parent.update.push(function(){
        
        
        console.log("NOTJUMPER");
        /*if(parent.cFrame.position.x - parent.size.x/2 < canvasWidth){
            if(player.cFrame.position.x < parent.cFrame.position.x) parent.velocity.x -= parent.speed / 2;
            else parent.velocity.x += parent.speed / 2;
            if(parent.pushDirection.y == -1) parent.grounded = 1;
            else {
                if(parent.grounded == 1){//jump from platform
                    parent.jumpSpeed = 0;
                    if(player.cFrame.position.y < parent.cFrame.position.y) parent.jumpSpeed = (parent.cFrame.position.y - player.cFrame.position.y) / 13;
                    parent.velocity.y -= parent.speed * 50 + parent.jumpSpeed + Math.random() * 15;
                    if(player.cFrame.position.x < parent.cFrame.position.x) parent.velocity.x -= parent.speed * 10;
                    else parent.velocity.x += parent.speed * 10;
                }
                parent.grounded = 0;
            }
        }*//*
    })
}*/


function EnemyStandard(properties) {
	//Extends:
	GameObject(this, properties);
	this.childs["enemybase"] = new EnemyBase(this);
    this.childs["physics"] = new Physics(this);
	
	var self = this
    
    self.color = "#04B431";
    
    self.speed += self.speed * Math.random() - self.speed / 2;
    self.size.x += self.speed;
    self.size.y += self.speed;
    
	this.update.push(function(){
        self.StandardMovement();
    })
}