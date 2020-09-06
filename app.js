var W = 600 , H = 600;
var STEP = 0.3; // frecvency of the points rendered in the cube ( used only in initGeometry()...)
var MODEL_MIN_X = -1, MODEL_MAX_X = 1;
var MODEL_MIN_Y = -1, MODEL_MAX_Y = 1;

var canvas= document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var points=[];

// this function is filling the array points[] with the coordinates of a cube.
function initGeometry(){
    for (var x= -1 ; x <= 1; x+=STEP ){
        for (var y= -1 ; y <= 1; y+=STEP ){
            for (var z= -1 ; z <= 1; z+=STEP ){
                points.push([x,y,z]);
            }
        }
    }

} // end function initGeometry()

function perspectiveProjection(point){
    var x=point[0],
        y=point[1],
        z=point[2];

        return [
            x / ( z +2  ),
            y / ( z +2  ) 
        ]
}

// moving the origin of the coordinate system and scaling up. The cube in the model is 2 units width and height, from -1 to +1. Move it to the edge of the cube.
function project(point){
    var perspectivePoint = perspectiveProjection(point);
    var x= perspectivePoint[0],
        y=perspectivePoint[1];
    return [
        W * (x+1) /(MODEL_MAX_X-MODEL_MIN_X),
        H * (1-y) / (MODEL_MAX_Y-MODEL_MIN_Y)
    ];
}

// this function renders on screen a 2D point - send as parameter
function renderPoint(point) {
    var projectedPoint = project(point);
    var x= projectedPoint[0],
        y=projectedPoint[1];
      
    
    ctx.lineWidth =10-(point[2]+0.5)*10;
    //console.log(point[2]);
    ctx.strokeStyle="white";
    ctx.lineCap = "round";


    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+5,y+5);
    ctx.closePath();
    ctx.stroke();

}

function rotateY(point, angle){
    var x=point[0],
        y=point[1],
        z=point[2];

    return [
        Math.cos(angle) * x - Math.sin(angle) * z,
        y,
        Math.sin(angle) * x + Math.cos(angle) * z,
    ]

}

function rotateX(point, angle){
    var x=point[0],
        y=point[1],
        z=point[2];

    return [
        x,
        Math.cos(angle) * y - Math.sin(angle) * z,
        Math.sin(angle) * y + Math.cos(angle) * z,
    ]

}


var angle = 0;
var delta_angle = 0.03;

function render(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,W, H);

    angle += delta_angle ;
    points.forEach((point)=> {
        point = rotateY(point, angle);
        point = rotateX(point, angle/3);
        renderPoint(point);
    });


    requestAnimationFrame(render);
}


initGeometry();
render();