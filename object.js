// Vars
var objectNameBase = {}; // String : Element
var objectMovementBase = {}; // String : Vector pair
var objectOnHitPlayerBase = {}; // String : Function
var objectOnHitEnvBase = {}; // String : Function
var objectOnCollidePlayerBase = {} // String : Function

// Registering
function registerObject(name, obj){
    objectNameBase[name] = obj;
}

function registerObjectMovement(name, vector){
    objectMovementBase[name] = vector;
}

function registerObjectOnHitPlayerEvent(name, onHit){
    objectOnHitPlayerBase[name] = onHit;
}

function registerObjectOnHitEnvEvent(name, onHit){
    objectOnHitEnvBase[name] = onHit;
}

function registerObjectOnCollidePlayerEvent(name, onHit){
    objectOnCollidePlayerBase[name] = onHit;
}


function unregisterObject(name){
    delete objectNameBase[name];
    delete objectMovementBase[name];
    delete objectOnHitPlayerBase[name];
    delete objectOnHitEnvBase[name];
    delete objectOnCollidePlayerBase[name];
}

// Functionality
function moveObjects(){
    Object.keys(objectMovementBase).forEach((name, index) => {
        translateObject(objectNameBase[name], objectMovementBase[name][0], objectMovementBase[name][1]);
    })
}

function getObjectRect(obj){
    var xString = obj.style.left;
    var x = parseFloat(xString.substring(0, xString.length -2));

    var yString = obj.style.top;
    var y = parseFloat(yString.substring(0, yString.length -2));

    return new Rectangle(x, y, obj.clientWidth, obj.clientHeight);
}

function checkObjectWindowBoundCollision(){
    Object.keys(objectMovementBase).forEach((name, index) => {
        var objRect = getObjectRect(objectNameBase[name]);
        var windowRect = new Rectangle(0, 0, windowWidth, windowHeight);

        if(!isRectOverlapping(objRect, windowRect)){
            objectOnHitEnvBase[name]();
        }

        Object.keys(objectOnCollidePlayerBase).forEach((name2, index2) => {
            var obj2Rect = getObjectRect(objectNameBase[name2]);
            if(isRectOverlapping(objRect, obj2Rect)){
                objectOnHitEnvBase[name]();
            }
        });
    });
}

function checkPlayerMovementCollision(player1Rect, player2Rect, p1PosVector, p2PosVector){
    var p1Collided = false;
    var p2Collided = false;
    Object.keys(objectOnCollidePlayerBase).forEach((name, index) => {
        var objRect = getObjectRect(objectNameBase[name]);

        var p1NextRect = new Rectangle(player1Rect.x + p1PosVector[0], player1Rect.y + p1PosVector[1], player1Rect.width, player1Rect.height);
        var p2NextRect = new Rectangle(player2Rect.x + p2PosVector[0], player2Rect.y + p2PosVector[1], player2Rect.width, player2Rect.height);
        
        if(isRectOverlapping(p1NextRect, objRect)){
            objectOnCollidePlayerBase[name](1, true);
            p1Collided = true;
        }
        if(isRectOverlapping(p2NextRect, objRect)){
            objectOnCollidePlayerBase[name](2, true);
            p2Collided = true;
        }
    });

    if(!p1Collided && !p2Collided){
        objectOnCollidePlayerBase[name](1, false)
        objectOnCollidePlayerBase[name](2, false)
    }
}

function checkPlayerObjectHit(player1Rect, player2Rect){
    Object.keys(objectOnHitPlayerBase).forEach((name, index) => {
        var objRect = getObjectRect(objectNameBase[name]);

        if(isRectOverlapping(player1Rect, objRect)){
            objectOnHitPlayerBase[name](1);
        }
        else if(isRectOverlapping(player2Rect, objRect)){
            objectOnHitPlayerBase[name](2);
        } 
    })
}


