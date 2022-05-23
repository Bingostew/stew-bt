// Vars
var objectNameBase = {}; // String : Element
var objectMovementBase = {}; // String : Vector pair
var objectOnHitPlayerBase = {}; // String : Function

// Registering
function registerObject(name, obj){
    if(objectNameBase[name] == null){
        objectNameBase[name] = obj;
    }
}

function registerObjectMovement(name, vector){
    objectMovementBase[name] = vector;
}

function registerObjectOnHitPlayerEvent(name, onHit){
    objectOnHitPlayerBase[name] = onHit;
}

function unregisterObject(name){
    delete objectNameBase[name];
    delete objectMovementBase[name];
    delete objectOnHitPlayerBase[name];
}

// Functionality
function moveObjects(){
    Object.keys(objectMovementBase).forEach((name, index) => {
        translateObject(objectNameBase[name], objectMovementBase[name][0], objectMovementBase[name][1]);
    })
}

function checkPlayerCollision(player1Rect, player2Rect){
    Object.keys(objectOnHitPlayerBase).forEach((name, index) => {
        var obj = objectNameBase[name];

        var xString = obj.style.left;
        var x = parseFloat(xString.substring(0, xString.length -2));

        var yString = obj.style.top;
        var y = parseFloat(yString.substring(0, yString.length -2));

        var objRect = new Rectangle(x, y, obj.clientWidth, obj.clientHeight);

        if(isRectOverlapping(player1Rect, objRect)){
            objectOnHitPlayerBase[name](1);
        }
        else if(isRectOverlapping(player2Rect, objRect)){
            objectOnHitPlayerBase[name](2);
        }
    })
}


