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

function getMins() {
    var date = new Date();
    return (date.getMinutes()<10?'0':'') + date.getMinutes();
}

function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makewall () {
    var x=0; var y=0;
    for (y=1; y<=my; y++) {
        for (x=1; x<=mx; x++) {
            var fn='p1.gif';
            mask=            c[y-1][x  ]            +
                 c[y  ][x-1]+c[y  ][x  ]+c[y  ][x+1]+
                             c[y+1][x  ]            ;
            mask=mask.replace(/X/g, 'x');
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
            wade.removeSceneObject(s[y][x]);
            if (c[y][x]=='X') {
                s[y][x]=new SceneObject(new Sprite('pics/new'+fn,5));
            } else {
                s[y][x]=new SceneObject(new Sprite('pics/'+fn,5));
            }
            s[y][x].setPosition(mx*8+4,my*8+4);
            
            wade.addSceneObject(s[y][x]);
            s[y][x].moveTo(x*16,y*16, 500);
            blocksonscreen++;
        }
        
    }

}

function putdigit (x,y,dig) {
    for (i=1; i<=5; i++) {
        var myc=c[y+i-1];
        var myd=d[(dig*10+i)];
        myd=myd.replace(/-/g, ' ');
        myc=myc.substr(0,x) + myd + myc.substr(x+3);
        c[y+i-1]=myc;
    }    
}

function updatewall (x,y) {
    var date = new Date();
    var mins = getMins() ;
    var hours= (date.getHours()<10?'0':'') + date.getHours() ;
    putdigit (x,y,hours[0]);
    putdigit (x+4,y,hours[1]);
    putdigit (x+11,y,mins[0]);
    putdigit (x+15,y,mins[1]);

}

function updateminute() {
    updatewall(cx,cy);
    makewall();
}

function initpositions() {
    /* pacman.setPosition(pm['x']*16,pm['y']*16); */
    pm['x']=15; pm['y']=11;
    pm['d']=getRand(1,4);
    pm['s']=40;

    bl['x']=2; bl['y']=8;
    bl['d']=getRand(1,4);
    bl['s']=40;

    pi['x']=mx-1; pi['y']=2;
    pi['d']=getRand(1,4);
    pi['s']=40;

    ink['x']=2; ink['y']=my-1;
    ink['d']=getRand(1,4);
    ink['s']=40;

    cl['x']=mx-1; cl['y']=my-1;
    cl['d']=getRand(1,4);
    cl['s']=40;
    
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

function movepacman() {
    pm=moveobj(pacman, pm);
    s[pm['oy']][pm['ox']].setVisible(false);
}

function moveobj(oobj,obj) {
    var px=obj['x']; var py=obj['y'];
    var npx=obj['x']; var npy=obj['y']; /* new coords */
    var ndir=getRand(1,4);
    function getdir() {
        npx=obj['x']; npy=obj['y']; /* new coords */
        ndir=getRand(1,4);
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
    oktogo=false;
    while (!oktogo) {
        getdir();
        if (c[npy][npx]==" ") oktogo=true;
        var mywalls=c[py-1][px]+c[py][px-1]+c[py][px+1]+c[py+1][px];
        mywalls=mywalls.replace(/X/g, 'x');
        /* go back only if it's a dead end */
        if (npx==obj['ox'] && npy==obj['oy']) {
            oktogo=false;
            if ((mywalls.match(/x/g) || []).length==3) { oktogo=true; }
        } 
        /* if 4 surrounding walls -> go to start position */
        if ((mywalls.match(/x/g) || []).length==4) { oktogo=true; npx=15; npy=11;
            pacman.setPosition(npx*16-1,npy*16-1);
            break; }
    }
    if (npx==mx+1) { npx=1; oobj.setPosition((npx-1)*16,npy*16); }
    if (npx==0) { npx=mx; oobj.setPosition((npx+1)*16,npy*16); } 
    oobj.moveTo(npx*16,npy*16,obj['s']);
    oobj.playAnimation(a,'ping-pong');
    obj['ox']=obj['x']; obj['oy']=obj['y'];
    obj['x']=npx; obj['y']=npy;

    return obj;
}




