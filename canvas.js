let canvas,g;
let x0,y0,sx,sy;

let r1Width,r2Width;
let r1Height,r2Height;


window.addEventListener('resize',() => {

    canvas.width = window.innerWidth*0.9;
    canvas.height = window.innerWidth*0.4;

})


window.addEventListener('load',() => {

    canvas = document.getElementById("graph");

    g = canvas.getContext("2d");
    
    canvas.width = window.innerWidth*0.95;
    canvas.height = window.innerWidth*0.4;

    r1Width = canvas.width
    r2Width = canvas.width

    r1Height = canvas.height*0.3
    r2Height = canvas.height*0.7

    sx = r1Width*0.9/(data.mast.extendedHeight+data.mast.zOffset);
    sy = r1Height*0.8/data.tubes[0].od;

    x0 = r1Width*0.05;
    y0 = r1Height*0.5;



    // console.log(data.mast.extendedHeight);
    // console.log("x0",x0);
    // console.log("y0",y0);
    // console.log("sx",sx);
    // console.log("sy",sy);

    //drawBaseRectangles();
});
























function drawBaseRectangles() {



    g.beginPath();
    g.fillStyle = "LightBlue";
    g.rect(0,0,r1Width,r1Height);
    g.fill();
    g.closePath();

    g.beginPath();
    g.fillStyle = "LightGreen";
    g.rect(0,r1Height,r2Width,r2Height);
    g.fill();
    g.closePath();

    drawTubes();
}





function drawTubes() {

    // g.translate(x0,y0);
    // g.scale(sx,sy)

    data.tubes.forEach((tube) => {
        // console.log(tube);
        drawTube(tube);
    });


    // g.setTransform(1, 0, 0, 1, 0, 0);



    // TUBES Z-OFFSET
    //g.translate(x0+data.mast.extendedHeight,r1Height/2);
    //g.scale(sx,sy)

    g.beginPath();
    g.lineWidth = 6;

    g.moveTo(sx*(x0+data.mast.extendedHeight),r1Height/2);
    g.lineTo(sx*(x0+data.mast.extendedHeight+data.mast.zOffset),r1Height/2);
    g.stroke();


    // drawTube(data.tubes[0]);

    g.setTransform(1, 0, 0, 1, 0, 0);

    // TUBES CENTERLINE
    g.beginPath();
    g.lineWidth = 0.2;
    g.moveTo(r1Width*0.03,r1Height/2);
    g.lineTo(r1Width*0.97,r1Height/2);
    g.stroke();


    g.beginPath();
    g.arc(x0, y0, 5, 0, 2 * Math.PI);
g.stroke();





}






function drawTube(tube) {



    let tx = x0+sx*(tube.x0-x0);
    let ty = y0+sy*(data.tubes[0].od-tube.od)/2;

    console.log("tx",tx);
    console.log("ty",ty);

    let rx0 = tube.x0;
    let ry0 = y0-tube.od/2;



    g.beginPath();
    g.fillStyle = "White";
    g.strokeStyle = "Black";
    //g.translate(tx,ty);
    // g.scale(sx,sy)
    g.rect(rx0,ry0,tube.length,tube.od);
    g.stroke();
    g.fill();
    g.closePath();

    // g.setTransform(1, 0, 0, 1, 0, 0);







    // drawMomentDiagram();


}


function drawMomentDiagram() {

    let dx = canvas.width*0.05;
    let dy = canvas.height*0.3833;

    g.beginPath();
    g.moveTo(dx,dy);
    g.lineTo(dx,canvas.height*0.95);
    g.stroke();


    g.beginPath();
    g.moveTo(dx,dy);
    g.lineTo(canvas.width*0.95,dy);
    g.stroke();


    let smy = canvas.height*0.55/data.mast.rootMoment 

    let msx = dx;
    let msy = canvas.height*0.93;
    let mex,mey;


    data.tubes.forEach((tube) => {

        tube.nodes.forEach((node) => {

            if (node.name === 'F') {
                mex= dy+node.z*sy;
                mey = dy+node.moment*smy;
            }
        });

        g.beginPath();
        g.moveTo(msx,msy);
        g.lineTo(mex,mey);
        g.stroke();

        msx = mex;
        msy = mey;

    });




}