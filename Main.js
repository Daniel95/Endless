//Index || Handles
var canvas, ctx;

var INPUT = {};
var INPUT_CLICK = {};
var MOUSE = {};
var MOUSE_CLICK = {};
var STAGE = [];

var enemyTypes;

var platforms = [];

var player;

var mousePos = V2(0,0);

window.addEventListener(
	"load",
	function () {
        
		//Index
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		
		
		//sprites
        var bgimg = new Image();
        bgimg.src ="example_image.png";
        
		
		//Resize event
		(window.onresize = function() {
			//console.log("resize");
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		})();
		
        
        canvas.onmousemove = function(evt) {
            mousePos = getMousePos(canvas, evt);
            //console.log(mousePos);
        }
		
		//Values\\
		enemyTypes = [
			EnemyStandard,
            EnemyJumper
		];
        
		//Het speel veld
        player = new Player({
				cFrame:{position:V2(200, 200), rotation:0},
				size:V2(30,50)
        });
        STAGE.push(player);
        
        var ui = new UI({
				cFrame:{position:V2(10, 10), rotation:0},
				size:V2(player.hJumpTimer,80),
        });
        STAGE.push(ui);
        
		STAGE.push(player);
        for(backgrounds = 0; backgrounds * 475 <= canvas.width + 475; backgrounds++) {
            STAGE.push(
                new Background(
                    {
                        cFrame:{position:V2(475 * backgrounds, 0), rotation:0},
                        size:V2(0, 0)
                    }
                )
            )
        }
        
        //ctx.fillStyle = "#FFF";
		//updates = 0;
		//startingTime = Date().getTime();
        
		//console.log(startingTime);
        
		//	--{ browser update function }--
		window.setInterval(
			function () {
				
                
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                //Update STAGE
				for (index1 in STAGE) {
					
					
					if (STAGE[index1].update) {
						
						for (index2 in STAGE[index1].update) {
							
							STAGE[index1].update[index2]();
						}
					}
                    /*
                    if (STAGE[index1].prop.Anchored == false) {
                        var thisEntity = STAGE[index1];
                        for (childIndex in STAGE) {
                            var otherEntity = STAGE[childIndex];
                            if (thisEntity != otherEntity){
                                if (thisEntity.functions.AlreadyColliding(otherEntity) == false && thisEntity.functions.CheckCollision(otherEntity)) thisEntity.functions.onCollisionEnter(otherEntity);
                                else if (thisEntity.functions.CheckCollision(otherEntity)) thisEntity.functions.onCollision(otherEntity);
                                else if (thisEntity.functions.AlreadyColliding(otherEntity)) thisEntity.functions.onCollisionExit(otherEntity);
                            }
                        }
                    }
                    */
				}
                
                if(platforms.length < 4) {
                    if(platforms.length > 0){
                        var platWidthRand = 300 + Math.random() * 1500;//platform width
                        var platGapRand = 100 + Math.random() * 450;//gap width
                        var platPos = platGapRand + platforms[platforms.length - 1].prop.cFrame.position.x + platforms[platforms.length - 1].prop.size.x / 2 + platWidthRand / 2;//platform cFrame.posistion.x
                        var platform = new Platform({
                            size:V2(platWidthRand, 20),
                            cFrame:{position:V2(platPos, canvas.height / 2), rotation:0}
                        });
                        //Enemies Spawn on platforms
                        for(i = 0; i < Math.random() * 25; i++){
                            STAGE.push(
                                new enemyTypes[Math.floor(Math.random() * enemyTypes.length)]
                                (
                                    {
                                        cFrame:{position:V2(platPos - platWidthRand / 2 + Math.random() * platWidthRand,0), rotation:0},
                                        size:V2(40, 40)
                                    }
                                )
                            )
                        }
                    } else {//KAN JE EEN ARRAY AANMAKEN WAAR STANDAARD EEN OBJECT IN ZIT? ZO JA KAN DEZE CODE WEG.
                        var platform = new Platform({
                            size:V2(3500, 20),
                            cFrame:{position:V2(0, canvas.height / 2 ), rotation:0},
                        });
                    }
                    platforms.push(platform);
                    STAGE.push(platform);
                }
                
                
                
                INPUT_CLICK = MOUSE_CLICK = {};
			},
			0 //<-- UpdateSpeed:	0 == browser snelheid
		)
		
		// {{EVENTS}} \\
		
		window.onkeydown = function(e) {
            if(!INPUT[e.keyCode]) INPUT_CLICK[e.keyCode] = true;
            
			INPUT[e.keyCode] = true;
			//console.log(INPUT);
		}
		window.onkeyup = function(e) {
			INPUT[e.keyCode] = false;
			//console.log(INPUT);
		}
        
		
		window.onmousedown = function(e) {
            if(!MOUSE_CLICK[e.type]) MOUSE_CLICK[e.type] = true;
            
			MOUSE[e.type] = true;
			MOUSE["mouseup"] = false;
		}
		window.onmouseup = function(e) {
			MOUSE[e.type] = true;
			MOUSE["mousedown"] = false;
		}
		
		window.onmousewheel = function(e) {
			if (MOUSE["mousewheel"] == undefined)
				MOUSE["mousewheel"] = {delta: V2(e.wheelDeltaX,e.wheelDeltaY)};
			
			else
				MOUSE["mousewheel"].delta = V2(e.wheelDeltaX,e.wheelDeltaY);
		}
	}
)



// {Start} Game Element Functions {{

//		 distance( V2(0, 0), V2(10, 18) ) == 20.591260281974	|		distance( player.prop.position, enemy.prop.position ) <= 100
function distance( pointA, pointB ) {
	return Math.sqrt( Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2) )
}



//		 V2 ( x value, y value )  2D Array, vergelijkbaar met een AS3 :Point |		sample =	new Vector2 ( 10, 20 );  sample.x == 10		|
function V2 ( X, Y ) {
	return { x: X, y: Y };
}




function Entity ( properties ) {
    
	//Index\\
	if (!properties.cFrame)
		properties.cFrame = {
			position: V2(0, 0),
			rotation: 0,
		};
	
	//console.log(properties.size);
	properties["size"] = properties.size ? properties.size : V2(0, 0);
	
	if (!properties.canCollide);
		//properties.size = V2(0, 0);
    
    this.destroy = function(obj) {
        //var index = STAGE.indexOf(obj);
		STAGE.splice(STAGE.indexOf(obj), 1);
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}

// {End} Game Element Functions }}