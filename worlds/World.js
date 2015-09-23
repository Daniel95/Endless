var enemyTypes, platforms, player, obstacle;

function World(){

	enemyTypes = [
        EnemyStandard,
        EnemyJumper
    ];
	platforms = [];
	player;
	obstacle;
	
	this.worldSpeed = 10;
    
	var self = this;
    
    startGame();
    
    this.update = function(){
        SpawnWorld1();
        spawnEnemiesRight();
		
		self.worldSpeed = 1.4 + (UIkills/10 >= 3 ? 3 : UIkills/10);
    }
    
    
    function spawnEnemiesRight(){
        var randomObj= Math.random();
        
        if(randomObj< 0.0175){
            STAGE.push(//spawn enemy
                new enemyTypes[Math.floor(Math.random() * enemyTypes.length)]({
                    cFrame:{position:V2(canvasWidth+100, canvasHeight/2), rotation:0},
                    size:V2(20, 35),
                })
            )   
        }
        else if(randomObj< 0.0215) SpawnBackground(canvasWidth);
        else if(randomObj< 0.023){
            STAGE.push(
                new Bullet(//spawn meteorite
                {
                    size:V2(30, 30),
                    cFrame:{position:V2(canvasWidth/2 * Math.random() + canvasWidth/2, 0 ), rotation:5, color:"#800517"},
                    velocity:V2((Math.random()-.5)*10,(Math.random()-.5)*10),
                    friction: 0.005,
                    gravity: 0,
                    canCollide: true,
                    collision: true,
                    color: "#A9000E",
                    damage: 150
                })
            )
        }
    }
    
    
    function SpawnWorld1(){
        platformWidth -= currentWorld.worldSpeed;

        while(platformWidth <= canvas.width) {//platforms.length < 6) {
            var platWidthRand = 100 + Math.random() * 1000;//platform width
            var platGapRand = 25 + Math.random() * 130;//gap width
            var platPosX = platforms[platforms.length - 1].size.x / 2 + platforms[platforms.length - 1].cFrame.position.x + platGapRand + platWidthRand /2;
            var platPosY = canvasHeight - (Math.random()-.5) * canvasHeight /10;

            platformWidth += platWidthRand + platGapRand;

            STAGE.push(
                obstacle = new Obstacle(
                    {
                        size:V2(platWidthRand, 600),
                        cFrame:{position:V2(platPosX, platPosY), rotation:5},
                        anchored:true,
                        isPlatform: true,
                        collision: true,
                        canCollide: true,
                        color: "#313131",
                    }
                )
            )
            platforms.push(obstacle);
            //Enemies & Pickups Spawn on platforms
            var randomAmount = Math.random() * 13;
            for(a = 0; a < randomAmount; a++){
                
                var randomSpawn = Math.random();
                if(randomSpawn < 0.45){
                    STAGE.push(//spawn enemy
                        new enemyTypes[Math.floor(Math.random() * enemyTypes.length)]({
                            cFrame:{position:V2(platPosX - platWidthRand / 2 + platWidthRand * Math.random(), platPosY - 350), rotation:0},
                            size:V2(20, 35),
                        })
                    )
                } else {//spawn pickup

                    STAGE.push(
                        new Obstacle(
                        {
                            cFrame:{position:V2(platPosX + (Math.random()-.5) * platWidthRand, platPosY - 350), rotation:0},
                            size:V2(25, 15),
                            canCollide: false,
                            collision: true,
                            isPickup:true
                        })
                    ) 
                }
            }
        }  
    }
    
    
    function SpawnBackground(posX){
        var randomParallax = Math.floor(Math.random() + 1.5);
            
        var bgSizeX = 500 - 100 * randomParallax + Math.random() * 100;
        var bgSizeY = Math.random() * 1000 + 300 + (200 * randomParallax);
            
        var color;
        if(randomParallax == 1) color = "rgba(173, 173, 173, 1)";
        else color = "rgba(204, 204, 204, 0.7)";
        
        STAGE.push(
            obstacle = new Obstacle(
                {
                    size:V2(bgSizeX, Math.random() * 1000 + 700),
                    cFrame:{position:V2(posX + bgSizeX/2, canvasHeight), rotation:5},
                    color: color,
                    zIndex: 3 - randomParallax,
                    collision:false,
                    canCollide:false,
                    friction: 0,
                    gravity : 0,
                    gravityIncrement : 0,
                    velocity:V2(randomParallax/ 2,0)
                }
            )

        )
    }

    function playerDies() {
        UIlives--;
        console.log("player died. lives = " + UIlives);
        for (index1 in STAGE) {
            if (STAGE[index1].isEnemy) {
                STAGE[index1].destroy();
            }
        }
            player = new Player(
                {
                    cFrame:{position:V2(500, 0), rotation:5},
                    size:V2(20,35),
                    anchored:false,
                }
            )
        
        STAGE.push(player
        )
    }


    function startGame(){
        UIlives = 3;
        platforms.length = 0;
        platformWidth = 0;
		player = new Player(
                {
                    cFrame:{position:V2(500, 0), rotation:5},
                    size:V2(20,35),
                    anchored:false,
                }
            )

        for (index1 in STAGE) {
            STAGE[index1].destroy();
        }


        STAGE.push(
            player,	
            new UI(
                {
                    size:V2(40 , 25),
                    cFrame:{position:V2(30 , 50), rotation:5},
                    anchored:true
                }
            ),
            obstacle = new Obstacle(
                {
                    size:V2(1100, 900),
                    cFrame:{position:V2(300 , canvasHeight), rotation:5},
                    anchored:true,
                    color: "#313131",
                }
            )
        )
        platforms.push(obstacle);
        
        for(b = 0; b < Math.random() * 10; b++) SpawnBackground(canvasWidth * Math.random());
        
        UIkills = 0;
        UIlives = 3;
        UIammo = 120;
        UIkills = 0;
        
        
        this.gameOverSound = new Audio("sounds/dead/gameover.wav");
        this.gameOverSound.play();
    }
    
    this.checkWorldState = function(){
        if(UIlives <= 1) startGame();
        else playerDies();
    }
}

