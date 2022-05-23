// Vars
var p1KeyState = {};
var p1KeyToggle = {
    "p" : false
};
var p1PosVector = [0, 0]; // delta pos

var p2KeyState = {};
var p2KeyToggle = {};
var p2PosVector = [0, 0]; // delta pos

var playerDefaultMaxSpeed = 2;
var playerMaxHealth = [100, 100]
var playerHealth = [playerMaxHealth[0],playerMaxHealth[1]];

// Functionality
function movePlayer(player, dx, dy, maxSpeed){
    var posVector = getNormalizeVector([dx, dy], maxSpeed);
    translateObject(player, posVector[0], posVector[1]);
}

function takeDamage(playerNum, damage, healthBarDepletionEvent){
    playerHealth[playerNum - 1] -= damage;
    if(playerHealth[playerNum - 1] < 0){
        playerHealth[playerNum - 1] = 0;
    }
    let healthScale = playerHealth[playerNum - 1] / playerMaxHealth[playerNum - 1];

    healthBarDepletionEvent(playerNum, healthScale);
}

