App = function()
{

    mx=30; my=21;
    cx=7; cy=9; /* clock x,y */
    s=[]; /* scene objects */
    pm=[]; /* pacman datas */
    bl=[]; /* Blinky */
    pi=[]; /* Pinky */
    ink=[]; /* Inky */
    cl=[]; /* Clyde */
    lastmins=0;
    blocksonscreen=0; /* used for screen update - destroywalls */
	this.init = function()
	{
		wade.loadScene('scene1.wsc', true, function()
        {
            loadstage();
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
            wade.moveCamera({x:mx*8+8,y:my*8+8,z:1}, 10000);
            for (i=1; i<=mx; i++) {
                for (j=1; j<=my; j++) {
                    s[j]=[];
                }
                
            }

            updateminute();
            lastmins=getMins();
            setInterval(function(){
                if (getMins() != lastmins) { updateminute(); lastmins=getMins(); }
            },3000); /* fákin jávaszkript */
            
            initpositions();
            
            setInterval(function () {
                if (pacman.alive) {
                	var colls=pacman.getOverlappingObjects();
                	for (var i=0; i<colls.length; i++) {
                	    if (colls[i].type=='ghost') {
                	        pacman.die();
                	    }
                	}
                }
            },100);
            pacman.die=function() {
                pacman.alive=false;
                var pacpos=pacman.getPosition();
                pacman.onMoveComplete = function() { }
                pacman.setPosition(pacpos.x-1,pacpos.y);
                pacman.moveTo(pacpos.x,pacpos.y,10000);
                
                this.playAnimation('A_die','forward');
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
