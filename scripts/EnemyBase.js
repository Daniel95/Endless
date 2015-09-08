function EnemyBase(properties, childs, update) {
	
	
	//Events\\
    update.push(
		function() {
            
            properties.velocity.x -= 0.2;
		}
	);
	
	
}