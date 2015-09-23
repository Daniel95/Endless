//Index || Handles
var canvas, ctx;

var INPUT = {};
var INPUT_CLICK = {};
var MOUSE = {};
var MOUSE_CLICK = {};
var STAGE = [];

var mousePos = V2(0,0);
var FRAMECOUNT = 0;
var FRAMESKIP = 0;
var FPS = 0;

var currentWorld;

var gameRunning = false;

var UIkills = UIlives = UIammo = canvasWidth = platformWidth = canvasHeight = 0;
var UIweaponName = "";

var screenShake = V2(0,0);

var canvasWidth = platformWidth = canvasHeight = 0;

var screenShakeTime = screenShakeStrength = 0;

window.addEventListener(
	"load",
	function () {
        
		//Index
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        
        
		//Resize event
		(window.onresize = function() {
			console.log("resize");
            
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		})();
        
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
        
        window.onmousemove = function(e) {
            var rect = canvas.getBoundingClientRect();
            
            mousePos.x =  e.clientX - rect.left;
            mousePos.y = e.clientY - rect.top;
        }
        
		//Het speel veld
        currentWorld = new World();
		
		var i = 0;
		var startingtime = new Date().getTime();
        (function draw() { 
            window.requestAnimationFrame(draw);

            if (new Date().getTime() - startingtime >= 1000) {
                FPS = i;
                i = 0;
                startingtime = new Date().getTime();
            }
            i++;
            
            if(gameRunning || FRAMECOUNT == 0){
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.fillStyle = "rgba(200, 220, 255, 0.5)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#000";
                
                
                if(currentWorld != undefined && currentWorld.update != undefined) currentWorld.update();
            }
            for (index1 in STAGE) {

                if (STAGE[index1].update) {

                    for (index2 in STAGE[index1].update) {

                        while (STAGE[index1] != undefined && STAGE[index1].zIndex != undefined && index1 > 0 && STAGE[index1].zIndex < STAGE[index1-1].zIndex) {

                            var upperObj = STAGE[index1];
                            var lowwerObj = STAGE[index1-1];
                            STAGE[index1-1] = upperObj;
                            STAGE[index1] =  lowwerObj;
                            index1--;
                        }

                        if ((STAGE[index1] != undefined && STAGE[index1].constructor == UI || gameRunning) && STAGE[index1] != undefined && STAGE[index1].update[index2])
                                STAGE[index1].update[index2]();
                    }
                }
            }
            
            
            if (INPUT_CLICK["32"]) {
                if(gameRunning) gameRunning = false, PauzeScreen();
                else gameRunning = true;
            }
            
            if(screenShakeTime > 0 ) {
                screenShake.x = (Math.random()-.5) * screenShakeStrength;
                screenShake.y = (Math.random()-.5) * screenShakeStrength;
                screenShakeStrength--;
                screenShakeTime--;
            }
            
            INPUT_CLICK = MOUSE_CLICK = {};

            FRAMECOUNT++;
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

function GameObject ( parent, properties, childs ) {
	this.parent = parent;
	
	//Index\\
	parent.update = [];
	parent.childs = {};
	parent.zIndex = 5;
	for (i in properties) parent[i] = properties[i];
	//if (childs != undefined) for (i in childs) parent.childs[i] = new childs[i](this.parent);
	
	self = this
	
	//Values\\
	if (!parent.cFrame) parent.cFrame = {
		position: V2(0, 0),
		rotation: 0,
	};
	
	if (!parent.size) parent.size = V2(0,0);
	
	
	
	
	//Functions\\
	parent.destroy = function() {
		parent.update.unshift(function() {
			STAGE.splice(STAGE.indexOf(parent), 1);
		})
    }
}

function CauseScreenShake(length, strength) {
    screenShakeTime = length;
    screenShakeStrength = strength;
}
