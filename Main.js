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
var obstacle;
var mousePos = V2(0,0);

window.addEventListener(
	"load",
	function () {
        
		//Index
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
		
		
		//Resize event
		(window.onresize = function() {
			//console.log("resize");
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
            this.canvasWidth = canvas.width;
            this.canvasHeight = canvas.height;
		})();
		
		
        canvas.onmousemove = function(evt) {
            mousePos = GetMousePos(canvas, evt);
            //console.log(mousePos);
        }
		
		//Values\\
		enemyTypes = [
			EnemyStandard,
            //EnemyTank,
            //EnemySprinter,
            //EnemyJumper
		];
        
		
		//Het speel veld
		STAGE.push(
			player = new Player(
				{
					cFrame:{position:V2(100, 0), rotation:5},
					size:V2(20,35),
					anchored:false,
				}
			),
            new UI(
				{
					size:V2(0 , 40),
                    cFrame:{position:V2(20 , 0), rotation:5},
					anchored:true
				}
			),
			obstacle = new Obstacle(
				{
					size:V2(500, 100),
                    cFrame:{position:V2(0 , canvas.height/2), rotation:5},
					anchored:true
				}
			)
		)
		platforms.push(obstacle)
		
		var i = 0;

		(function draw() {
			window.requestAnimationFrame(draw);
			
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#000";
			for (index1 in STAGE) {
				
				
				if (STAGE[index1].update) {
					
					for (index2 in STAGE[index1].update) {
						
						STAGE[index1].update[index2]();
					}
				}
			}
			
            Spawner();
            
			INPUT_CLICK = MOUSE_CLICK = {};
		})();
		
		
		//	--{ browser update function }--
		
		/*window.setInterval(
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
				
                INPUT_CLICK = MOUSE_CLICK = {};
			},
			10 //<-- UpdateSpeed:	0 == browser snelheid
		)*/
		
		
		
		
		
		// {{EVENTS}} \\
		window.onkeydown = function(e) {
            if(!INPUT[e.keyCode]) INPUT_CLICK[e.keyCode] = true;
            
			INPUT[e.keyCode] = true;
		}
		window.onkeyup = function(e) {
			INPUT[e.keyCode] = false;
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

//		 V2 ( x value, y value )  2D Array, vergelijkbaar met een AS3 :Point |		sample =	new Vector2 ( 10, 20 );  sample.x == 10		|
function V2 ( X, Y ) {
	
	return { x: X, y: Y };
}

//		 distance( V2(0, 0), V2(10, 18) ) == 20.591260281974	|		distance( player.prop.position, enemy.prop.position ) <= 100
function distance( pos1, pos2 ) {
	
	return Math.sqrt( Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) )
}

function addVar( obj, propertie ) {
	
	console.log(propertie);
}

function getPosFromAngle( angle ) {
	
	return new V2(
		Math.cos( angle * Math.PI / 180 ),
		Math.sin( angle * Math.PI / 180 )
	);
}

function getAngleFromPos( pos1, pos2 ) {
	
	return Math.abs((Math.atan2( pos1.x - pos2.x, pos1.y - pos2.y ) * 180 / Math.PI * -1) + 360)%360;
}

// {End} Game Element Functions }}




function GameObject ( parent, properties ) {
	this.parent = parent;
	
	//Index\\
	parent.update = [];
	parent.childs = {};
	for (i in properties) parent[i] = properties[i];
	
	
	//Values\\
	if (!parent.cFrame) parent.cFrame = {
		position: V2(0, 0),
		rotation: 0,
	};
	
	if (!parent.size) parent.size = V2(0,0);
	
	
	
	
	//Functions\\
	parent.destroy = function() {
		
		STAGE.splice(STAGE.indexOf(this), 1);
    }
	parent.addChild = function( obj ) {
		
		this.childs[obj];
	}
}


function Spawner(){
    while(platforms.length < 5) {
        var platWidthRand = 100 + Math.random() * 1000;//platform width
        var platGapRand = 20 + Math.random() * 130;//gap width
        var platPos = platforms[platforms.length - 1].size.x / 2 + platforms[platforms.length - 1].cFrame.position.x + platGapRand + platWidthRand /2;//platform cFrame.posistion.x
        //var platPos = 0;
        STAGE.push(
            obstacle = new Obstacle(
                {
                    size:V2(platWidthRand, 100),
                    cFrame:{position:V2(platPos, canvasHeight /2 - canvasHeight /8 + canvasHeight /4 * Math.random() ), rotation:5},
                    anchored:true
                }
            )
            
        )
        platforms.push(obstacle);
        
        //Enemies & Pickups Spawn on platforms
        for(i = 0; i < Math.random() * 25; i++){
            console.log("yooy");
            if(Math.random() < 0.5){
                STAGE.push(
                    new enemyTypes[Math.floor(Math.random() * enemyTypes.length)]({
                        cFrame:{position:V2(platPos - platWidthRand / 2 + platWidthRand * Math.random(), 0), rotation:0},
                        size:V2(20, 35),
                        collideWith: false
                    })
                )
            } else {
                STAGE.push(
                    new enemyTypes[Math.floor(Math.random() * enemyTypes.length)]({
                        cFrame:{position:V2(platPos - platWidthRand / 2 + platWidthRand * Math.random(), 0), rotation:0},
                        size:V2(20, 35),
                        collideWith: false
                    })
                )   
            }
        }
    }    
}

function GetMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}