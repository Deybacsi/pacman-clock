
/* our main scene definition

   here will be stored the actual background with the walls and dots

   x     - wall
   X     - white wall
   space - dots

   size should be exactly mx+2 and my+2 -> declared in app.js

   extended size (the 1 block wide spaces around the scene) is needed for easing the makewall function
   in this case it's not needed to handle the boundaries of the array ( less than 0, or more than maximum index) at makewall()
   and it's useful at the side teleporting check in moveobj()
*/
function loadstage() {
    c=[];
    c[ 0]='                                ';
    c[ 1]=' xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ';
    c[ 2]=' x                            x ';
    c[ 3]=' x xxxx x xxx xxxx xxx x xxxx x ';
    c[ 4]=' x x    x x          x x    x x ';
    c[ 5]=' x x xxxx x xxxxxxxx x xxxx x x ';
    c[ 6]=' x x    x x          x x    x x ';
    c[ 7]=' x xxxx x x xxxxxxxx x x xxxx x ';
    c[ 8]=' x x                        x x ';
    c[ 9]=' x   x xxx xxx XX xxx xxx x   x ';
    c[10]=' xxxxx x x x x XX x x x x xxxxx ';
    c[11]='       x x x x    x x x x       ';
    c[12]=' xxxxx x x x x XX x x x x xxxxx ';
    c[13]=' x   x xxx xxx XX xxx xxx x   x ';
    c[14]=' x x                        x x ';
    c[15]=' x xxxx x x xxxxxxxx x x xxxx x ';
    c[16]=' x x    x x          x x    x x ';
    c[17]=' x x xxxx x xxxxxxxx x xxxx x x ';
    c[18]=' x x    x x          x x    x x ';
    c[19]=' x xxxx x xxx xxxx xxx x xxxx x ';
    c[20]=' x                            x ';
    c[21]=' xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ';
    c[22]='                                ';
}

/* get current minute of time 
 
   used to check if minute changed (getMins != lastmins)
   when changed, must update the screen (& walls)

*/
function getMins() {
    var date = new Date();
    return (date.getMinutes()<10?'0':'') + date.getMinutes();
}

/* basic wrapper for random numbers between min & max */
function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* making graphical objects from the above x-s

   lame but easy solution
   check all possibilities, and set a picture based on situation

   for eg:

   walls look like:

         1                 1                
        234               23              23
         5                 5               5

   will be converted to a string:

      '12345'           '123 5'         ' 23 5'

   (instead of numers just x and space)

   and all of these strings are associated to a specific image file

   it could be nicer with arrays ;) instead of lots of cases

*/
function makewall () {
    var x=0; var y=0;

    for (y=1; y<=my; y++) {                             // iterate through all the scene
        for (x=1; x<=mx; x++) {
            var fn='p1.gif';                            // default image filename 

            // create the string from the scene array 
            mask=            c[y-1][x  ]            +
                 c[y  ][x-1]+c[y  ][x  ]+c[y  ][x+1]+
                             c[y+1][x  ]            ;
            mask=mask.replace(/X/g, 'x');               // replace all X to x - needed because clock digits which use X (x is for simple walls)

            // define image filename based on wall placement 
            switch (mask) {
                case "x x x": 
                    fn='12-2.gif';
                    break;
                case " xxx ": 
                    fn='11-9.gif';
                    break;    
                case "x xx ": 
                    fn='11-4.gif';
                    break;  
                case "xxx  ": 
                    fn='11-3.gif';
                    break;             
                case "  xxx": 
                    fn='11-11.gif';
                    break;
                case " xx x": 
                    fn='11-2.gif';
                    break; 
                case "x xxx": 
                    fn='a1.gif';
                    break; 
                case " xxxx": 
                    fn='a2.gif';
                    break; 
                case "xxx x": 
                    fn='a3.gif';
                    break; 
                case "xxxx ": 
                    fn='a4.gif';
                    break; 
                case "xxxxx": 
                    fn='a5.gif';
                    break; 
                case " xx  ": 
                    fn='5-5.gif';
                    break; 
                case "  xx ": 
                    fn='5-8.gif';
                    break; 
                case "x x  ": 
                    fn='b1.gif';
                    break; 
                case "  x x": 
                    fn='b2.gif';
                    break; 
                case "  x  ": 
                    fn='a6.gif';
                    break; 
            }

            // remove the current object from Wade scene 
            wade.removeSceneObject(s[y][x]);   

            // if current [x,y] character is an X then put the 'new' string before the filename -> white walls
            if (c[y][x]=='X') {
                s[y][x]=new SceneObject(new Sprite('pics/new'+fn,5));
            } else {
                s[y][x]=new SceneObject(new Sprite('pics/'+fn,5));      // image file for simple walls 
            }
            s[y][x].setPosition(mx*8+4,my*8+4);                         // set it's position
            
            wade.addSceneObject(s[y][x]);                               // and add back to the scene 
            //s[y][x].moveTo(x*16,y*16, 500);                             // move the new wall object to it's place from the center slowly

        } 
    }
    let startX=getRandomInt(0,mx)*16;                   // the end where walls collapse if time has changed
    let startY=getRandomInt(0,my)*16;
    let redrawType=getRandomInt(0,9); 
    let radian=Math.PI/180;
    for (y=1; y<=my; y++) {                             // iterate through all the scene
        for (x=1; x<=mx; x++) {
            switch (redrawType) {
                case 0:
                    s[y][x].setPosition(startX,startY); 
                    s[y][x].moveTo(x*16,y*16, getRandomInt(300,500));                             // move the new wall object to it's place
                    break;
                case 1: 
                    s[y][x].setPosition(getRandomInt(-1000,1000),getRandomInt(-1000,1000)); 
                    s[y][x].moveTo(x*16,y*16, 700);                             
                    break;
                case 2: 
                    s[y][x].setPosition(x*16,0); 
                    s[y][x].moveTo(x*16,y*16, 300);                             
                    break;
                case 3: 
                    s[y][x].setPosition(0,y*16); 
                    s[y][x].moveTo(x*16,y*16, 400);                             
                    break;
                
                case 4: 
                    s[y][x].setPosition((x-(mx-2)/2)*160,(y-(my-2)/2)*160); 
                    s[y][x].moveTo(x*16,y*16, 1000);                             
                break;
                case 5: 
                    s[y][x].setPosition(x*16,my*16); 
                    s[y][x].moveTo(x*16,y*16, 200+(my-y)*3-getRandomInt(0,150));                             
                break;
                case 6: 
                    s[y][x].setPosition((mx-x)*16,startY); 
                    s[y][x].moveTo(x*16,y*16, 300);                             
                break;
                case 7: 
                    s[y][x].setPosition((mx-x)*16,(my-y)*16); 
                    s[y][x].moveTo(x*16,y*16, 300);                             
                break;
                case 8: 
                    s[y][x].setPosition(x*16,(Math.sin(x)+Math.cos(x))*my*16); 
                    s[y][x].moveTo(x*16,y*16, 400);                             
                break;
                case 9: 
                    s[y][x].setPosition(mx*16+x*2*16,y*16); 
                    s[y][x].moveTo(x*16,y*16, 400);                             
                break;
            }
        }
    }
            

    
}

/* put an actual digit of time to the scene array ( c[] ) to x,y coordinates
   digits are declared in digits2.js
*/
function putdigit (x,y,dig) {
    for (i=1; i<=5; i++) {
        var myc=c[y+i-1];
        var myd=d[(dig*10+i)];
        myd=myd.replace(/-/g, ' ');
        myc=myc.substr(0,x) + myd + myc.substr(x+3);
        c[y+i-1]=myc;
    }    
}

/* update the whole timer (hh:mm) and put all digits to the c[] scene array */
function updatewall (x,y) {
    var date = new Date();
    var mins = getMins() ;
    var hours= (date.getHours()<10?'0':'') + date.getHours() ;
    putdigit (x,y,hours[0]);
    putdigit (x+4,y,hours[1]);
    putdigit (x+11,y,mins[0]);
    putdigit (x+15,y,mins[1]);

}

/* when the minute changed -> update the scene, and make the new walls */
function updateminute() {
    updatewall(cx,cy);
    makewall();
}

/* initialize starting positions, speed, and movement directions for each actor */
function initpositions() {

    /* Pacman */
    pm['x']=15; pm['y']=11;    // x, y coords
    pm['d']=getRand(1,4);      // direction 1..4
    pm['s']=40;                // speed

    /* Blinky */
    bl['x']=2; bl['y']=8;
    bl['d']=getRand(1,4);
    bl['s']=40;

    /* Pinky */
    pi['x']=mx-1; pi['y']=2;
    pi['d']=getRand(1,4);
    pi['s']=40;

    /* Inky */
    ink['x']=2; ink['y']=my-1;
    ink['d']=getRand(1,4);
    ink['s']=40;

    /* Clyde */
    cl['x']=mx-1; cl['y']=my-1;
    cl['d']=getRand(1,4);
    cl['s']=40;

    /* move them to their positions
       and define the action to do when they successfully moved one square
    */    
    pacman.moveTo(pm['x']*16,pm['y']*16,10000);
    pacman.onMoveComplete = function() { movepacman();  }

    blinky.moveTo(bl['x']*16,bl['y']*16,10000);
    blinky.onMoveComplete = function() { bl=moveobj(blinky, bl); }
    
    pinky.moveTo(pi['x']*16,pi['y']*16,10000);
    pinky.onMoveComplete = function() { pi=moveobj(pinky, pi); }   

    inky.moveTo(ink['x']*16,ink['y']*16,10000);
    inky.onMoveComplete = function() { ink=moveobj(inky, ink); }     
    
    clyde.moveTo(cl['x']*16,cl['y']*16,10000);
    clyde.onMoveComplete = function() { cl=moveobj(clyde, cl); }       
}

/* move Pacman just as another actor*/
function movepacman() {
    pm=moveobj(pacman, pm);
    s[pm['oy']][pm['ox']].setVisible(false);    // and then change the dot in it's previous position invisible -> eating :D 
}


/* move an actor to a random direction

*/
function moveobj(oobj,obj) {
    var px=obj['x']; var py=obj['y'];           // current coords 
    var npx=obj['x']; var npy=obj['y'];         // new coords will be here, where the actor WANTS to go in the future
    var ndir=getRand(1,4);

    /* generate a new direction, and set the animation for it (a) */
    function getdir() {
        npx=obj['x']; npy=obj['y'];             // new coords 
        ndir=getRand(1,4);                      // generate a random direction 

        /*
            if you would like to change the random movement to some controlled game-like thing
            then you should specify here the new direction based on a keypress, or something :)

        */

        /* specify the new coordinates (npx, npy) according to direction */
        switch (ndir) {
            case 1:
                npy--; a='A_up';
                break;
            case 2:
                npx++; a='A_right';
                break;
            case 3:
                npy++; a='A_down';
                break;
            case 4:
                npx--; a='A_left';
                break;
        }            
    }
    oktogo=false;                                   // is it OK to go? (no wall is in the new coords? 
    while (!oktogo) {
        getdir();                                   // generate a random direction 
        if (c[npy][npx]==" ") oktogo=true;          // if there is a space, then we can go by default

        /* but we need additional checks */

        /* generate the same mask as in makewalls() */
        var mywalls=c[py-1][px]+c[py][px-1]+c[py][px+1]+c[py+1][px];
        mywalls=mywalls.replace(/X/g, 'x');

        /* go back only if it's a dead end */
        if (npx==obj['ox'] && npy==obj['oy']) {     /* if our NEW coordinates are the same where we WAS in the previous step
                                                       then its a step backwards
                                                       we would like to always go in the same direction as long as possible
                                                    */
            oktogo=false;                           // then say NOT OK to go there
            if ((mywalls.match(/x/g) || []).length==3) { oktogo=true; }  /* except if the number of surrounding walls is 3 -> it's a dead end, with only one exit
                                                                            so the only direction is backwards
                                                                         */

        } 

        /* if there are 4 surrounding walls -> we are trapped -> go to start position
           it could happen when time changes, and an actor stucks inside in a 6, 8 or 9 digit
        */
        if ((mywalls.match(/x/g) || []).length==4) { oktogo=true; npx=15; npy=11;   // puts actor to the center of the screen
            oobj.setPosition(npx*16-1,npy*16-1);
            break; }
    }
    if (npx==mx+1) { npx=1; oobj.setPosition((npx-1)*16,npy*16); }      // if NEW x > mx , then we are moving out at the right side of scene -> teleport to left side
    if (npx==0) { npx=mx; oobj.setPosition((npx+1)*16,npy*16); }        // same for left side

    /* move our scene object to the NEW position, and play its animation */
    oobj.moveTo(npx*16,npy*16,obj['s']);
    oobj.playAnimation(a,'ping-pong');

    /* store the curerent coordinates as OLD ones, to compare them at the next movement */
    obj['ox']=obj['x'];
    obj['oy']=obj['y'];

    /* store our NEW coords as actual values */
    obj['x']=npx;
    obj['y']=npy;

    return obj;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

