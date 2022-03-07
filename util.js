
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