//Darren

function Physics (properties, update) {
	
	properties.velocity = V2(0, 0);
	properties.frictionDivider = 10;
	
	properties.Anchored = properties.Anchored != undefined ? properties.Anchored : true;
	
	update.push(function() {
		
		//console.log("test2");
		properties.cFrame.position.x += properties.velocity.x;
		properties.cFrame.position.y += properties.velocity.y;
		
		
		properties.velocity.x -= properties.velocity.x / properties.frictionDivider;
		properties.velocity.y -= properties.velocity.y / properties.frictionDivider;
		
		//console.log(properties.Anchored);
		
		if (!properties.Anchored) {
			for (childIndex in STAGE) {
				if (STAGE[childIndex].prop != properties) {
					//console.log ("test", Math.random())


					//console.log(STAGE[childIndex]);
					/*if (
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
						console.log("Near obj");*/
				}
			}
		}
	})
}