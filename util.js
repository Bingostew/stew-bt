// Classes
class Rectangle{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}

//Utils
function getNormalizeVector(vector, magnitude){
    var vectorMagnitude = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    return [vector[0] / vectorMagnitude * magnitude, vector[1] / vectorMagnitude * magnitude];
}

function translateObject(element, dx, dy){
    var xString = element.style.left;
    var currentX = parseFloat(xString.substring(0, xString.length -2));
    element.style.left = currentX + dx + "px";

    var yString = element.style.top;
    var currentY = parseFloat(yString.substring(0, yString.length -2));
    element.style.top = currentY + dy + "px";
}

var nameRegistry = [];
function generateName(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   if(nameRegistry.includes(result)){
       generateName();
   }
   else{
       nameRegistry.push(result);
     return result;
   }
}

function isBetween(min, max, val){
    return val > min && val < max; 
}

function isRectOverlapping(rect1, rect2){
 
    return (isBetween(rect1.x, rect1.x + rect1.width, rect2.x) 
    || isBetween(rect1.x, rect1.x + rect1.width, rect2.x + rect2.width)) 
    && (isBetween(rect1.y, rect1.y + rect1.height, rect2.y) 
    || isBetween(rect1.y, rect1.y + rect1.height, rect2.y + rect2.height)); 
}