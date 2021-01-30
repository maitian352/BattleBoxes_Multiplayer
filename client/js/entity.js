var game = document.getElementById('gameCanvas').getContext('2d');
var ingame = false;

socket.on('game-joined', function(data) {
    document.getElementById('gameCanvas').height = '500';
    document.getElementById('gameCanvas').width = '1000';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'inline-block';
    ingame = true;
});

socket.on('pkg', function(pkg) {
    game.clearRect(0,0,1000,1000);
    for (var i = 0; i < pkg.length; i++) {
        game.fillText(pkg[i].name, pkg[i].x, pkg[i].y);
    }
});

// input sending
document.onkeydown = function(event) {
    if (ingame) {
        if (event.key == 'w') {
            socket.emit('keyPress', {key:'W', state:true});
        }
        if (event.key == 'a') {
            socket.emit('keyPress', {key:'A', state:true});
        }
        if (event.key == 'd') {
            socket.emit('keyPress', {key:'D', state:true});
        }
    }
}
document.onkeyup = function(event) {
    if (ingame) {
        if (event.key == 'w') {
            socket.emit('keyPress', {key:'W', state:false});
        }
        if (event.key == 'a') {
            socket.emit('keyPress', {key:'A', state:false});
        }
        if (event.key == 'd') {
            socket.emit('keyPress', {key:'D', state:false});
        }
    }
}