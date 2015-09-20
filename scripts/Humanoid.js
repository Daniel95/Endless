function Humanoid (parent) {
	
	if(parent.health==undefined) parent.health = 100;
	if(parent.walkspeed==undefined) parent.walkspeed = 16;
	
	parent.kill = function() {
		
		STAGE.push(
			new Obstacle({
				cFrame: {
					position: V2(parent.cFrame.position.x, parent.cFrame.position.y),
					rotation: 0,
				},
				size: parent.size,
				gravity: 0.1,
				collision: false,
				canCollide: false,
				velocity: V2((Math.random()-0.5+parent.pushDirection.x*5) * 5, (Math.random()-0.5+parent.pushDirection.y*5) * 5),
				friction: 0.001,
                color: "#A9000E"
			})
		)
		var i = 0;
		for (i = 0; i++ <= 5;)
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
		this.destroy();
	}
	
	parent.takeHealth = function( amount ) {
		
		if (parent.health > 0) {
			parent.health -= amount;
			
			if (parent.health <= 0)
				parent.kill();
			
		}
	}
	
	
}