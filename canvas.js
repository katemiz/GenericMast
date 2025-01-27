let canvas,g;
let x0,y0,sx,sy;
let smy;

let r1Width;
let r1Height;

let addx = 60;
let addy = 40;


window.addEventListener('resize',() => {

    canvas.width = window.innerWidth*0.9;
    canvas.height = window.innerWidth*0.25;
})


window.addEventListener('load',() => {

    canvas = document.getElementById("graph");

    g = canvas.getContext("2d");
    
    canvas.width = document.getElementById('graphDiv').offsetWidth*0.95;
    canvas.height = 0.3*canvas.width;

    r1Width = canvas.width
    r1Height = canvas.height

    sx = r1Width/(data.sys.extendedHeight+data.sys.zOffset+2*addx);
    sy = r1Height/(data.tubes[0].od+2*addy);
    
    drawBaseRectangles();
});



function drawBaseRectangles() {

    g.beginPath();
    g.fillStyle = "White";
    g.rect(0,0,r1Width,r1Height);
    g.fill();
    g.closePath();

    drawTubes();

    drawPayload();
}


function drawTubes() {

    // TUBES DIA-LENGTH
    data.tubes.forEach((tube) => {
        drawTube(tube);
    });

    // TUBES Z-OFFSET
    g.beginPath();
    g.lineWidth = 6;

    g.moveTo(sx*(addx+data.sys.extendedHeight),r1Height/2);
    g.lineTo(sx*(addx+data.sys.extendedHeight+data.sys.zOffset),r1Height/2);
    g.stroke();

    g.setTransform(1, 0, 0, 1, 0, 0);

    // TUBES CENTERLINE
    g.beginPath();
    g.lineWidth = 0.2;
    g.moveTo(addx*sx,r1Height/2);
    g.lineTo((r1Width-addx*sx),r1Height/2);
    g.stroke();

    // TUBES COORDINATE AXIS CIRCLE
    g.beginPath();
    g.fillStyle = "Red";
    g.arc(addx*sx, (addy+data.tubes[0].od/2)*sy, 5, 0, 2 * Math.PI);
    g.fill();
    g.stroke();
}


function drawTube(tube) {

    g.beginPath();
        g.fillStyle = "LightGray";
        g.strokeStyle = "Black";
        g.translate((addx+tube.zA)*sx,sy*(addy+(data.tubes[0].od-tube.od)/2));
        g.scale(sx,sy)
        g.rect(0,0,tube.length,tube.od);
        g.stroke();
        g.fill();
    g.closePath();

    g.setTransform(1, 0, 0, 1, 0, 0);
}

function drawPayload() {

    g.beginPath();
    g.fillStyle = "Red";
    g.arc(data.sys.totalHeight*sx, r1Height/2, 20, 0, 2 * Math.PI);
    g.fill();
    g.stroke();
}