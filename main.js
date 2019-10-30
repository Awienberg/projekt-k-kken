'use strict';

//Get element by id
var $ = function (foo) {
    return document.getElementById(foo);
}

var createNewCanvas = $("create");
var enterCanvasHeight = $("height");
var enterCanvasWidth = $("width");

//Byg rum
function createRoom() {
    var enterCanvasHeightt = enterCanvasHeight.value;
    var enterCanvasWidthh = enterCanvasWidth.value;
    document.body.innerHTML = enterCanvasHeightt+":"+enterCanvasWidthh;
    
    var newCanvas = $("myCanvas1");
    document.createElement("canvas");
    newCanvas.classList.add("canvasDesign");

    newCanvas.style.height = enterCanvasHeightt + "px";
    newCanvas.style.width = enterCanvasWidthh + "px";


    document.body.appendChild(newCanvas);
}

createNewCanvas.addEventListener('click', createRoom);