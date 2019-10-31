'use strict';

//Get element by id
var $ = function (foo) {
    return document.getElementById(foo);
};

//Byg rum
var createNewCanvas = $("create");

function createRoom() {
  
let canvas = document.createElement('canvas'); // creates the table data
let width = $("width").value;
let height = $("height").value;
        
canvas.setAttribute('id', 'myCanvas'); // input table data in to a row
canvas.setAttribute('width', width); // change varible
canvas.setAttribute('height', height);
$('myCanvas1').appendChild(canvas); // input to table in html file
//init myCanvas1
mycv1 = $('myCanvas')
mycv1 = Object.create(Canvas);
mycv1.init('myCanvas', 'transparent');
};

function reset() {
let element = $('myCanvas');
element.parentNode.removeChild(element);
$('dimensions').reset();
};

// Canvas Object
let Canvas = {
    init(canvasId, color) {
        this.canvas = $(canvasId);
        this.context = this.canvas.getContext("2d");
        this.color = color;
        this.prep();
    },
    prep() {
        this.context.fillStyle = this.color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    getContext() {
        return this.context;
    },
    getHeight() {
        return this.canvas.height;
    },
    getWidth() {
        return this.canvas.width;
    }
}

// Shape Object
let Shape = {
    init(cv, x, y, width, height, color) {
        this.ctx = cv.context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    },

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
};

//Create Canvas & Shapes
let initialize = function () {
    // create canvas object
    mycv2 = Object.create(Canvas);
    mycv2.init('myCanvas2', '#D8D8D8');
    mycv2.canvas.addEventListener('click', select);
    // create objects
    // put in array
    let shape1 = Object.create(Shape);
    shape1.init(mycv2, 240, 40, 40, 60, '#333'); //0
    var shape2 = Object.create(Shape);
    shape2.init(mycv2, 220, 110, 60, 60, '#333'); //1
    var shape3 = Object.create(Shape);
    shape3.init(mycv2, 240, 180, 40, 5, '#333'); //2
    var shape4 = Object.create(Shape);
    shape4.init(mycv2, 275, 200, 5, 40, '#333'); //3
    shapes.push(shape1);
    shapes.push(shape2);
    shapes.push(shape3);
    shapes.push(shape4);
    redraw(mycv2, shapes);
}

let redraw = function (cv, arr) {
    cv.clear();
    cv.prep();
    for (var i = 0; i < arr.length; i++) {
        arr[i].draw();
    }
}

let repeater = function (cv, arr) {
    redraw(cv, arr);
}

let select = function (ev) {
    for (let i = 0; i < shapes.length; i++) {
        let cx = shapes[i].ctx;
        cx.beginPath();
        cx.rect(shapes[i].x, shapes[i].y, shapes[i].width, shapes[i].height);
        cx.closePath();
        let bb = this.getBoundingClientRect();    // get canvas as std obj
        // convert mouse coordinates to canvas coordinates
        let x = (ev.clientX - bb.left) * (this.width / bb.width);
        let y = (ev.clientY - bb.top) * (this.height / bb.height);
        if (cx.isPointInPath(x, y)) {
            // we're in a loop, is this array element the 
            // one we clicked? If yes click in other canvas
            mycv1.canvas.addEventListener('click', function placeInRoom(e) {
                    let bb1 = this.getBoundingClientRect();    // yes
                    // other canvas as std object
                    // convert mouse coordinates to canvas coordinates
                    let x1 = (e.clientX - bb1.left) * (this.width / bb1.width);
                    let y1 = (e.clientY - bb1.top) * (this.height / bb1.height);
                    let obj = Object.create(Shape); // create new obj 
                    // with adapted properties
                    obj.init(mycv1, x1, y1, 
                                shapes[i].width, shapes[i].height,
                                shapes[i].color);
                    othershapes.push(obj);
                    mycv2.canvas.removeEventListener('click', select);
                    repeater(mycv1, othershapes);
                    mycv1.canvas.removeEventListener('click', placeInRoom);
                    mycv2.canvas.addEventListener('click', select);
                });
        
        }
    }
}

let mycv1;
let mycv2;
let shapes = [];
let othershapes = [];

window.addEventListener('load', initialize);

//pris
//let elementer = [
//    elem1: {
//        pris: 3000,
//        farve: 'beige'
//    },
//    elem2: {},
//]

//let pris = elementer[shapes[3].name].pris