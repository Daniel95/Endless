//BaseClass

function UI(properties) {
	//Extends:
	GameObject(this, properties);
	
    var self = this;
    
	this.update.push(function(){
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
        ctx.font = 'italic 30pt Calibri';
        ctx.fillStyle = "#000";
		ctx.fillRect(-self.size.x/2, -self.size.y/2 + 10, player.hJumpTimer, self.size.y);
		ctx.fillText("Lives: " + UIlives + "  Weapon: " + UIweaponName + "  Ammo: " + UIammo + "  Kills: " + UIkills, -self.size.x / 2, -self.size.y/2);
        ctx.fillText("FPS: " + FPS, canvasWidth - 160, -self.size.y/2);
        
        
        if(!gameRunning) PauzeScreen();
	})
}

function PauzeScreen() {
    ctx.setTransform(1, 0, 0, 1, canvasWidth/2 - 290, canvasHeight/2 - 80);
    ctx.fillStyle = "#000";
    ctx.fillText("PRESS SPACE TO START", 0, 0);
    ctx.fillText("WASD or Arrow Keys: Movement", 0, 30);
    ctx.fillText("MOUSE: Shooting", 0, 60);
    ctx.fillText("SPACE: Pauze", 0, 90);
    FPS = 0;
}