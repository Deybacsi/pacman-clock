/*

Pacman clock - 2017 by Dey

Comments added, and uploaded to Github in 2019

Some things are now black holes to me too now, so the moral of the story is as always:

Always comment your code while writing it ;)

*/

App = function()
{

    mx=30; my=21;           // the size of main scene. the real size is +1 block each direction, see scene.js for details 
    cx=7; cy=9;             // clock position x,y 
    s=[];                   // scene objects 
    pm=[];                  // pacman datas 
    bl=[];                  // Blinky 
    pi=[];                  // Pinky 
    ink=[];                 // Inky 
    cl=[];                  // Clyde 
    lastmins=0;             // time's minute at the previous check - if its different than the actual time -> update screen

    this.init = function()
	{
		wade.loadScene('scene1.wsc', true, function()
        {
            // set up default scene
            loadstage();
	        // setup our actor's type. when pacman collides with a ghost, it dies
            pacman=wade.getSceneObject('pacman');
            pacman.type='pacman';
            pacman.alive=true;
            blinky=wade.getSceneObject('blinky');
            blinky.type='ghost';
            pinky=wade.getSceneObject('pinky');
            pinky.type='ghost';
            inky=wade.getSceneObject('inky');
            inky.type='ghost';
            clyde=wade.getSceneObject('clyde');
            clyde.type='ghost';
	        // initial camera setup to center 
            wade.moveCamera({x:mx*8+8,y:my*8+8,z:1}, 10000);
	        // s will be our main scene objects' container 
            for (i=1; i<=mx; i++) {
                for (j=1; j<=my; j++) {
                    s[j]=[];
                }
                
            }

            // draw current time to screen
            updateminute();

            // check the current minute repeatedly, and update screen if needed
            lastmins=getMins();
            setInterval(function(){
                if (getMins() != lastmins) { updateminute(); lastmins=getMins(); }
                //updateminute(); lastmins=getMins();
            },3000); 
            
            // initialize all actor's default positions
            initpositions();
            
	        // collision check for pacman 
            setInterval(function () {
                if (pacman.alive) {
                	var colls=pacman.getOverlappingObjects();   // get all objects
                	for (var i=0; i<colls.length; i++) {
                	    if (colls[i].type=='ghost') {	        // if any of them is 'ghost', then pacman dies (but not for walls, or dots)
                	        pacman.die();
                	    }
                	}
                }
            },100);

            // when Pacman dies
            pacman.die=function() {
                pacman.alive=false;
                var pacpos=pacman.getPosition();
                pacman.onMoveComplete = function() { }
                pacman.setPosition(pacpos.x-1,pacpos.y);	    // what the heck is this? 
                pacman.moveTo(pacpos.x,pacpos.y,10000);
                
                this.playAnimation('A_die','forward');          // play animation, and reinitialize start position
                this.onAnimationEnd = function() {
                    pm['x']=15; pm['y']=11;
                    pm['d']=getRand(1,4);
                    pacman.alive=true;
                    
                    pacman.onMoveComplete = function() { movepacman();  }
                    pacman.setPosition(pm['x']*16,pm['y']*16);
                    movepacman();
                }
            }
        });
	};
};
