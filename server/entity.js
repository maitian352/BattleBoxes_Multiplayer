// Copyright (C) 2021 Radioactive64

PLAYER_LIST = {};
BULLET_LIST = {};
var COLORS = ["#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#9900FF", "#FF00FF", "#000000", "#AA0000", "#996600", "#EECC33", "#00AA00", "#0088CC", "#8877CC", "#CC77AA"];

// entity
Entity = function() {
    var self = {x:0, y:0, xspeed:0, yspeed:0, halfsize:null, colliding:{bottom:false, top:false, left:false, right:false}, id:"", color:"#000000", debug:false};

    self.update = function() {
        self.collide();
        self.updatePos();
    }
    self.collide = function() {
        self.colliding.bottom = false;
        self.colliding.left = false;
        self.colliding.right = false;
        self.colliding.top = false;
        var px = Math.floor(self.x/40);
        var py = Math.floor(self.y/40);
        // bottomleft
        tempx = px-1;
        tempy = py+1;
        if (tempx > -1 && tempx < (MAPS[CURRENT_MAP].width+1) && tempy > -1 && tempy < (MAPS[CURRENT_MAP].height+1)) {
            if (MAPS[CURRENT_MAP][tempy][tempx] == 1) {
                if (((tempx*40)+39) > (self.x-self.halfsize) && (tempy*40) < (self.y+self.halfsize)) {
                    self.y += (tempy*40) - (self.y+self.halfsize);
                    self.yspeed = 0;
                    self.colliding.bottom = true;
                }
            }
        }
        // bottom
        tempx = px;
        tempy = py+1;
        if (tempx > -1 && tempx < (MAPS[CURRENT_MAP].width+1) && tempy > -1 && tempy < (MAPS[CURRENT_MAP].height+1)) {
            if (MAPS[CURRENT_MAP][tempy][tempx] == 1) {
                if ((tempx*40) < (self.x+self.halfsize) && ((tempx*40)+40) > (self.x-self.halfsize) && (tempy*40) < (self.y+self.halfsize)) {
                    self.y += (tempy*40) - (self.y+self.halfsize);
                    self.yspeed = 0;
                    self.colliding.bottom = true;
                }
            }
        }
        // bottomright
        tempx = px+1;
        tempy = py+1;
        if (tempx > -1 && tempx < (MAPS[CURRENT_MAP].width+1) && tempy > -1 && tempy < (MAPS[CURRENT_MAP].height+1)) {
            if (MAPS[CURRENT_MAP][tempy][tempx] == 1) {
                if (((tempx*40)+1) < (self.x-self.halfsize) && (tempy*40) < (self.y+self.halfsize)) {
                    self.y += (tempy*40) - (self.y+self.halfsize);
                    self.yspeed = 0;
                    self.colliding.bottom = true;
                }
            }
        }
        // left
        tempx = px-1;
        tempy = py;
        if (tempx > -1 && tempx < (MAPS[CURRENT_MAP].width+1) && tempy > -1 && tempy < (MAPS[CURRENT_MAP].height+1)) {
            if (MAPS[CURRENT_MAP][tempy][tempx] == 1) {
                if (((tempx*40)+40) > (self.x-self.halfsize)) {
                    self.x += ((tempx*40)+40) - (self.x-self.halfsize);
                    self.xspeed = 0;
                    self.colliding.left = true;
                }
            }
        }
        // right
        tempx = px+1;
        tempy = py;
        if (tempx > -1 && tempx < (MAPS[CURRENT_MAP].width+1) && tempy > -1 && tempy < (MAPS[CURRENT_MAP].height+1)) {
            if (MAPS[CURRENT_MAP][tempy][tempx] == 1) {
                if ((tempx*40) < (self.x+self.halfsize)) {
                    self.x += (tempx*40) - (self.x+self.halfsize);
                    self.xspeed = 0;
                    self.colliding.right = true;
                }
            }
        }
        // topleft
        var tempx = px-1;
        var tempy = py-1;
        if (tempx > -1 && tempx < (MAPS[CURRENT_MAP].width+1) && tempy > -1 && tempy < (MAPS[CURRENT_MAP].height+1)) {
            if (MAPS[CURRENT_MAP][tempy][tempx] == 1) {
                if (((tempx*40)+39) > (self.x-self.halfsize) && ((tempy*40)+40) > (self.y-self.halfsize)) {
                    self.y += ((tempy*40)+40) - (self.y-self.halfsize);
                    self.yspeed *= -0.5;
                    self.colliding.top = true;
                }
            }
        }
        // top
        tempx = px;
        tempy = py-1;
        if (tempx > -1 && tempx < (MAPS[CURRENT_MAP].width+1) && tempy > -1 && tempy < (MAPS[CURRENT_MAP].height+1)) {
            if (MAPS[CURRENT_MAP][tempy][tempx] == 1) {
                if ((tempx*40) < (self.x+self.halfsize) && ((tempx*40)+40) > (self.x-self.halfsize) && ((tempy*40)+40) > (self.y-self.halfsize)) {
                    self.y += ((tempy*40)+40) - (self.y-self.halfsize);
                    self.yspeed *= -0.5;
                    self.colliding.top = true;
                }
            }
        }
        // topright
        tempx = px+1;
        tempy = py-1;
        if (tempx > -1 && tempx < (MAPS[CURRENT_MAP].width+1) && tempy > -1 && tempy < (MAPS[CURRENT_MAP].height+1)) {
            if (MAPS[CURRENT_MAP][tempy][tempx] == 1) {
                if (((tempx*40)+1) < (self.x+self.halfsize) && ((tempy*40) > self.y-self.halfsize)) {
                    self.y += ((tempy*40)+40) - (self.y-self.halfsize);
                    self.yspeed *= -0.5;
                    self.colliding.top = true;
                }
            }
        }
    }
    self.updatePos = function() {
        self.x += self.xspeed;
        self.y += self.yspeed;
    }

    return self;
}

// player
Player = function(id, name) {
    var self = Entity();
    self.id = id;
    self.name = name;
    self.x = MAPS[CURRENT_MAP].spawnx;
    self.y = MAPS[CURRENT_MAP].spawny;
    self.halfsize = 16;
    self.ingame = false;
    Wpressed = false;
    Apressed = false;
    Dpressed = false;
    Clicked = false;
    self.hp = 5;
    self.score = 0;
    var j = 0;
    for (i in PLAYER_LIST) {
        j++;
    }
    self.color = COLORS[j];
    PLAYER_LIST[self.id] = self;

    self.updatePos = function() {
        if (self.Dpressed) {
            self.xspeed += 1;
        }
        if (self.Apressed) {
            self.xspeed -= 1;
        }
        if (self.Wpressed && self.colliding.bottom && !self.colliding.left && !self.colliding.right) {
            self.yspeed = 15;
        }
        if (self.Wpressed && self.colliding.left) {
            self.yspeed = 15;
            self.xspeed = 15;
        }
        if (self.Wpressed && self.colliding.right) {
            self.yspeed = 15;
            self.xspeed = -15;
        }
        self.yspeed -= 0.75;
        self.xspeed *= 0.9;
        if (self.yspeed < -30) {
            self.yspeed = -30;
        }
        if (self.x < 16) {
            self.x = 16;
            self.xspeed = 0;
        }
        if (self.x+16 > MAPS[CURRENT_MAP].width*40) {
            self.x = MAPS[CURRENT_MAP].width*40-16;
            self.xspeed = 0;
        }
        if (self.y+16 > MAPS[CURRENT_MAP].height*40) {
            self.respawn(MAPS[CURRENT_MAP].spawnx, MAPS[CURRENT_MAP].spawny);
        }
        self.collide();
        self.x += self.xspeed;
        self.y -= self.yspeed;
    }
    self.respawn = function(x, y) {
        self.xspeed = 0;
        self.yspeed = 0;
        self.x = x;
        self.y = y;
    }

    return self;
}
Player.update = function() {
    var pack = [];
    for (var i in PLAYER_LIST) {
        var localplayer = PLAYER_LIST[i];
        if (localplayer.ingame) {
            localplayer.update();
            pack.push({id:localplayer.id, x:localplayer.x, y:localplayer.y, hp:localplayer.hp, score:localplayer.score});
        }
    }
    return pack;
}

// bullets
Bullet = function(mousex, mousey, x, y, parent, color) {
    var self = Entity();
    self.id = Math.random();
    self.x = x;
    self.y = y;
    self.angle = Math.atan2(-(self.y-mousey-16), -(self.x-mousex-16));
    self.xspeed = Math.cos(self.angle)*10;
    self.yspeed = Math.sin(self.angle)*10;
    self.halfsize = 2;
    self.parent = parent;
    self.color = color;
    BULLET_LIST[self.id] = self;

    return self;
}
Bullet.update = function() {
    var pack = [];
    for (var i in BULLET_LIST) {
        var localbullet = BULLET_LIST[i];
        localbullet.update();
        if (localbullet.colliding.top || localbullet.colliding.left || localbullet.colliding.right || localbullet.colliding.bottom || localbullet.x < -100 || localbullet.x > ((MAPS[CURRENT_MAP].width*40)+100) || localbullet.y < -100 || localbullet.y > ((MAPS[CURRENT_MAP].height*40)+100)) {
            delete BULLET_LIST[i];
            io.emit('deletebullet', localbullet.id);
        }
    }
    return pack;
}