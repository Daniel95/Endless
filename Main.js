//Daniel

//Index || Handles
var canvas, ctx;

var INPUT = {};
var INPUT_CLICK = {};
var MOUSE = {};
var MOUSE_CLICK = {};
var STAGE = [];

var enemyTypes;

var backgrounds = 0;

window.addEventListener(
	"load",
	function () {
        
		//Index
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		
		
		//sprites
        var bgimg = new Image();
        bgimg.src ="example_image.png";
        //ctx.drawImage(bgimg,10,10);
        
        /*
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        var img=document.getElementById("scream");
        ctx.drawImage(img,10,10);
        */
		
		//Resize event
		(window.onresize = function() {
			//console.log("resize");
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		})();
		
		
		//Values\\
		enemyTypes = [
			EnemyStandard,
            EnemyJumper
			
		];
		
		//Het speel veld
		STAGE.push(
			new Player(
				{
					cFrame:{position:V2(200, 200), rotation:5},
					size:V2(20,20),
					Anchored:false
				}
			)
		)
        
        
        //ctx.fillStyle = "#FFF";
		//updates = 0;
		//startingTime = Date().getTime();
        
		//console.log(startingTime);
        
		//	--{ browser update function }--
		window.setInterval(
			function () {
				
                
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				
				for (index1 in STAGE) {
					
					
					if (STAGE[index1].update) {
						
						for (index2 in STAGE[index1].update) {
							
							STAGE[index1].update[index2]();
						}
					}
				}
                //Spawning\\
                if(STAGE.length < 10){
                    STAGE.push(
                        new enemyTypes[Math.floor(Math.random() * enemyTypes.length)]
                        (
                            {
                                cFrame:{position:V2(Math.random() * canvas.width + canvas.width, Math.random() * canvas.height), rotation:0},
                                size:V2(10, 10)
                            }
                        )
                    )
                }
                if(backgrounds * bgimg.width <= 2400){
                    STAGE.push(
                        new Background(
                            {
                                cFrame:{position:V2(bgimg.width * backgrounds, 0), rotation:0},
                                size:V2(10, 10)
                            }
                        )
                    )
                    backgrounds++;
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
        var index = STAGE.indexOf(obj);
		STAGE.splice(index, 1);
        
        if(obj.constructor == Background) backgrounds--;
    }
}


// {End} Game Element Functions }}