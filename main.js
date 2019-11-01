'use strict';

//Get element by id
var $ = function (foo) {
    return document.getElementById(foo);
};

//Byg rum
var createNewCanvas = $("create");

function createRoom() {
  
let canvas = document.createElement('canvas'); // creates the canvas
let width = $("width").value;
let height = $("height").value;
        
canvas.setAttribute('id', 'myCanvas'); // Canvas id
canvas.setAttribute('width', width); // change varible
canvas.setAttribute('height', height);
$('myCanvas1').appendChild(canvas); // input to myCanvas1
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
    init(cv, x, y, width, height, color, name, pris) {
        this.ctx = cv.context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.name = name;
        this.pris = pris;
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
    shape1.init(mycv2, 240, 40, 40, 60, '#333', 'elem40', 3000); //0
    var shape2 = Object.create(Shape);
    shape2.init(mycv2, 220, 110, 60, 60, '#333', 'elem60', 6000); //1
    var shape3 = Object.create(Shape);
    shape3.init(mycv2, 240, 180, 40, 5, '#333', 'elem1', 0); //2
    var shape4 = Object.create(Shape);
    shape4.init(mycv2, 275, 200, 5, 40, '#333', 'elem2', 0); //3
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

function overlap() {

};


//pris
/*let elementer = [ {
    name: 'elem40',
    pris: 3000,
},
              {
    name: 'elem60',
    pris: 6000,
},
              {
    name: 'elem1',
    pris: 0,
},
              {
    name: 'elem2',
    pris: 0,
},
]; */

//se samlet pris
function total() {
   $('total').innerHTML = 'Total: Her skulle den totale sum af elementer stå';
}

let mycv1;
let mycv2;
let shapes = [];
let othershapes = [];
//let pris = elementer[shapes.name].pris;

window.addEventListener('load', initialize);