let canvas,g;
let x0,y0,sx,sy;
let smy;

let r1Width,r2Width;
let r1Height;

let addx = 60;
let addy = 40;


window.addEventListener('resize',() => {

    canvas.width = window.innerWidth*0.9;
    canvas.height = window.innerWidth*0.25;

})


// window.addEventListener('load',() => {

//     canvas = document.getElementById("graph");

//     g = canvas.getContext("2d");
    
//     canvas.width = window.innerWidth*0.95;
//     canvas.height = window.innerWidth*0.25;

//     console.log("w",canvas.width);
//     console.log("h",canvas.height);

//     r1Width = canvas.width
//     r2Width = canvas.width

//     r1Height = canvas.height
//     // r2Height = canvas.height*0.7

//     sx = r1Width/(data.mast.extendedHeight+data.mast.zOffset+2*addx);
//     sy = r1Height/(data.tubes[0].od+2*addy);

//     // smy = (r2Height-addy)/data.mast.rootMoment


//     // x0 = r1Width*0.05;
//     // y0 = r1Height*0.5;



//     // console.log(data.mast.extendedHeight);
//     // console.log("x0",x0);
//     // console.log("y0",y0);
//     console.log("sx",sx);
//     console.log("sy",sy);

//     drawBaseRectangles();
// });
























function drawBaseRectangles() {

    g.beginPath();
    g.fillStyle = "LightBlue";
    g.rect(0,0,r1Width,r1Height);
    g.fill();
    g.closePath();

    // g.beginPath();
    // g.fillStyle = "LightGreen";
    // g.rect(0,r1Height,r2Width,r2Height);
    // g.fill();
    // g.closePath();

    drawTubes();
}





function drawTubes() {

    // TUBES DIA-LENGTH
    data.tubes.forEach((tube) => {
        drawTube(tube);
    });

    // TUBES Z-OFFSET
    g.beginPath();
    g.lineWidth = 6;

    g.moveTo(sx*(addx+data.mast.extendedHeight),r1Height/2);
    g.lineTo(sx*(addx+data.mast.extendedHeight+data.mast.zOffset),r1Height/2);
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


    // EXTENDED END VERTICAL LINE
    g.strokeStyle = "Black";

    g.beginPath();
        g.lineWidth = 0.5;
        g.moveTo((addx+data.mast.extendedHeight)*sx,r1Height+addy);
        g.lineTo((addx+data.mast.extendedHeight)*sx,canvas.height-addy);
        g.stroke();
    g.closePath();

    // PAYLOAD END VERTICAL LINE
    g.beginPath();
        g.lineWidth = 0.5;
        g.moveTo((addx+data.mast.extendedHeight+data.mast.zOffset)*sx,r1Height+addy);
        g.lineTo((addx+data.mast.extendedHeight+data.mast.zOffset)*sx,canvas.height-addy);
        g.stroke();
    g.closePath();


}






function drawTube(tube) {

    g.beginPath();
        g.fillStyle = "White";
        g.strokeStyle = "Black";
        g.translate((addx+tube.x0)*sx,sy*(addy+(data.tubes[0].od-tube.od)/2));
        g.scale(sx,sy)
        g.rect(0,0,tube.length,tube.od);
        g.stroke();
        g.fill();
    g.closePath();

    g.setTransform(1, 0, 0, 1, 0, 0);


    // VERTICAL LINES
    // tube.nodes.forEach((node) =>{

    //     if (node.name === 'D'|| node.name === 'F' ){

    //         g.beginPath();
    //             g.lineWidth = 0.5;
    //             g.moveTo((addx+node.z)*sx,r1Height+addy);
    //             g.lineTo((addx+node.z)*sx,canvas.height-addy);
    //             g.stroke();
    //         g.closePath();

    //         g.beginPath();
    //             g.fillStyle = "Red";
    //             g.arc((addx+node.z)*sx, r1Height+addy+node.moment*smy, 5, 0, 2 * Math.PI);
    //             g.fill();
    //         g.closePath();

    //     } 

    // } );

    //drawMomentDiagram();
}


function drawMomentDiagram() {

    // HOR LINE
    g.beginPath();
    g.lineWidth = 0.5;
    g.strokeStyle = "Red";
    g.moveTo(addx*sx,r1Height+addy);
    g.lineTo(r1Width-addx*sx,r1Height+addy);
    g.stroke();

    // VER LINE
    g.beginPath();
    g.lineWidth = 0.5;
    g.strokeStyle = "Red";
    g.moveTo(addx*sx,r1Height+addy);
    g.lineTo(addx*sx,canvas.height-addy);
    g.stroke();

    // LINEAR MOMENT LINE

    g.beginPath();
    g.lineWidth = 4;
    g.strokeStyle = "Blue";
    g.moveTo(addx*sx,r1Height+data.mast.rootMoment*smy);
    g.lineTo(r1Width-addx*sx,r1Height+addy);
    g.stroke();
}


function drawM_EIDiagram() {

    let m_ei;

    tube.nodes.forEach((node) =>{


        m_ei = node.moment/node.ei;
        
        if (node.name === 'D'|| node.name === 'F' ){

            g.beginPath();
                g.lineWidth = 0.5;
                g.moveTo((addx+node.z)*sx,r1Height+addy);
                g.lineTo((addx+node.z)*sx,canvas.height-addy);
                g.stroke();
            g.closePath();

            g.beginPath();
                g.fillStyle = "Red";
                g.arc((addx+node.z)*sx, r1Height+addy+node.moment*smy, 5, 0, 2 * Math.PI);
                g.fill();
            g.closePath();

        } 

    } );

}