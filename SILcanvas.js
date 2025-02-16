
let canvas,g;
let x0,y0,sx,sy;
let smy;

let addx = 60;
let addy = 40;

let payloadCircleDia = 10


window.addEventListener('resize',() => {

    clearCanvas();
    drawContent();
})


function drawGeometry() {

    prepareCanvas();
    drawContent();
}


function prepareCanvas() {

    canvas = document.getElementById("graph");

    g = canvas.getContext("2d");
    
    canvas.width = document.getElementById('graphDiv').offsetWidth*0.95;
    canvas.height = 0.3*canvas.width;

    console.log('canvas Dims',canvas.width,canvas.height)


    sx = canvas.width/(data.sys.extendedHeight+data.sys.zOffset+2*addx+payloadCircleDia*5);
    sy = canvas.height/(data.tubes[0].od+2*addy);    
}


function drawContent() {

    drawTubes();
    drawAuxGeometry();
    drawPayloadArrow(g, (addx+data.sys.totalHeight)*sx, 40, (addx+data.sys.totalHeight)*sx, canvas.height/2-15, 10, 'blue');
}


function clearCanvas() {    

}


function drawTubes() {

    // TUBES DIA-LENGTH
    data.tubes.forEach((tube) => {
        drawTube(tube);
    });

    // TUBES Z-OFFSET
    g.beginPath();
    g.lineWidth = 6;

    g.moveTo(sx*(addx+data.sys.extendedHeight),canvas.height/2);
    g.lineTo(sx*(addx+data.sys.totalHeight),canvas.height/2);
    g.stroke();

    g.setTransform(1, 0, 0, 1, 0, 0);
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

    g.fillStyle = "Red";

    g.fillText(tube.zA,(addx+tube.zA)*sx,canvas.height-10);
    g.fillText(tube.zF,(addx+tube.zF)*sx,canvas.height-10);
}


function drawAuxGeometry() {

        // TUBES CENTERLINE
        g.beginPath();
        g.lineWidth = 0.2;
        g.moveTo(addx*sx,canvas.height/2);
        g.lineTo((canvas.width-addx*sx),canvas.height/2);
        g.stroke();
    
        // TUBES COORDINATE AXIS CIRCLE
        g.beginPath();
        g.fillStyle = "Red";
        g.arc(addx*sx, (addy+data.tubes[0].od/2)*sy, 5, 0, 2 * Math.PI);
        g.fill();
        g.stroke();


}


function drawPayloadCircle() {

    g.beginPath();
    g.fillStyle = "Red";
    g.arc((addx+data.sys.totalHeight)*sx, r1Height/2, payloadCircleDia, 0, 2 * Math.PI);
    g.fill();
    g.stroke();
}


function drawPayloadArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color){
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);

    ctx.fillText(data.sys.horLoad+'N',fromx-10,fromy-10);
    ctx.fillText(data.sys.totalHeight,(addx+data.sys.totalHeight)*sx,canvas.height-10);

    ctx.save();
    ctx.strokeStyle = color;
 
    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();
 
    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
               toy-headlen*Math.sin(angle+Math.PI/7));
 
    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //draws the paths created above
    ctx.stroke();
    ctx.restore();
}