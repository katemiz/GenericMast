function getZPositions() {

    /*

    A: Tube Lower Face / BOTTOM, Overlap Minus
    B: Tube Lower Face / BOTTOM, Overlap Center
    C: Tube Lower Face / BOTTOM, Overlap Plus


    D: Tube Upper Face / TOP, Overlap Minus
    E: Tube Upper Face / TOP, Overlap Center
    F: Tube Upper Face / TOP, Overlap Plus
    
    */

    let position = 0;
    let bottomIncrement = 0;
    let topIncrement = 0;

    data.tubes.forEach((tube, index) => {

        tube.nodes = [];

        tube.nodes.push(
            {
                "name": "A",
                "explanation": "BOTTOM, Overlap Minus",
                "z":position,
            },
            {
                "name": "B",
                "explanation": "BOTTOM, Overlap Center",
                "z":position+bottomIncrement,
            },
            {
                "name": "C",
                "explanation": "BOTTOM, Overlap Plus",
                "z":position+2*bottomIncrement,
            }
        );

        tube.x0 = position;

        position += tube.length;

        // console.log("pos",position)

        if (index < data.tubes.length-1) {
            topIncrement = data.overlaps[index].length/2;
        }

        if (index === data.tubes.length-1) {
            topIncrement = 0;
        }


        tube.nodes.push(
            {
                "name": "D",
                "explanation": "TOP, Overlap Minus",
                "z":position-2*topIncrement,
            },
            {
                "name": "E",
                "explanation": "TOP, Overlap Center",
                "z":position-topIncrement,
            },
            {
                "name": "F",
                "explanation": "TOP, Overlap Plus",
                "z":position,
            }
        );


        if (index < data.tubes.length-1) {
            data.overlaps[index].z = position-topIncrement

            data.overlaps[index].zMinus = data.overlaps[index].z-data.overlaps[index].length/2;
            data.overlaps[index].zPlus = data.overlaps[index].z+data.overlaps[index].length/2;
        }


        bottomIncrement = topIncrement;
        position -= 2*topIncrement;

    });

    data.mast.extendedHeight = position;
}


function getTubeMasses() {


    data.tubes.forEach((tube) => {

        tube.area = Math.PI /4* (Math.pow(tube.od, 2) - Math.pow(tube.od-tube.thickness,2)) ; // mm2
        tube.inertia = Math.PI /32* (Math.pow(tube.od, 4) - Math.pow(tube.od-tube.thickness,4)) ; // mm4

        tube.mass = tube.area*tube.length*tube.density/1E9;

        tube.ei = tube.E*tube.inertia/1E12;
    }

    );

    console.log("Tubes MASS", data.tubes);
}



function getMoments() {

    data.mast.rootMoment = data.mast.horizontalLoad*(data.mast.extendedHeight+data.mast.zOffset)/1000  ;   // Nm

    data.tubes.forEach((tube) => {

        tube.nodes.forEach((node) => {
            node.moment = data.mast.rootMoment*(data.mast.extendedHeight+data.mast.zOffset-node.z)/(data.mast.extendedHeight+data.mast.zOffset)

            data.overlaps.forEach((overlap) => {

                if (overlap.z == node.z) {
                    overlap.moment = node.moment
                    overlap.loadDueToMoment =1000*overlap.moment/overlap.length
                }
            });

            let hasNode = false;

            data.moments.forEach((m) =>{

                if (m.h === node.z){
                    hasNode = true;
                } 
            } )


            if (!hasNode){

                data.moments.push({"h":node.z,"moment":-node.moment}) 
            } 

            
        })


    },


    );


}



function getShearLoads() {

    data.mast.rootShear = data.mast.horizontalLoad;   // N






    data.tubes.forEach((tube) => {
        tube.nodes.forEach((node) => {

            node.shear = data.mast.rootShear;

            data.overlaps.forEach((overlap) => {


                if (overlap.zMinus == node.z) {
                    node.shear = overlap.loadDueToMoment
                }

                if (overlap.zPlus == node.z) {
                    node.shear = data.mast.rootShear+overlap.loadDueToMoment
                }

            });

        })
    });
}


function getMEI(){

    data.tubes.forEach((tube) => {
        tube.mei =[] 
    } ) 


    data.tubes.forEach((tube, index) => {


        if (index === 0){

            tube.nodes.forEach((point) =>{
                if (point.name === 'A'|| point.name === 'F'){
                    tube.mei.push({"h":point.z,"mei":-point.moment/(tube.E*tube.inertia) } )
                    console.log('larger z',point.z)
                } 
            } )

        } else {


            tube.nodes.forEach((point) =>{
                if (point.name === 'C'|| point.name === 'F'){
                    tube.mei.push({"h":point.z,"mei":-point.moment/(tube.E*tube.inertia) } )
                    console.log('larger z',point.z)
                } 
            } )

        } 

        console.log("MEI",tube.mei)

    } )

} 



function run() {

    // getZPositions();
    // getTubeMasses();
    // getMoments();
    // getShearLoads();

    // getMEI();

    // runCanvas();
    // summary();

    // drawMDiagram();

    getTubeProps();
}



function getTubeProps() {


    let z = 0;


    data.tubes.forEach((tube, index) => {

        tube.zBottom = z;

        z = z + tube.length;

        tube.zTop = z;

        if (data.overlaps[index]){
            z = z - data.overlaps[index].length 
        } 

        getArea(tube)
        getInertia(tube)
        getMass(tube)
        getEI(tube)
    }); 





    data.tubes.forEach((tube,index) => {

        if (index < 1){
            tube.zCritical = false
        } else {
            tube.zCritical = data.tubes[index-1].zTop 

            console.log(tube.zCritical)
        } 
    } )




    data.sys.extendedHeight = z;
    data.sys.totalHeight = z+data.sys.zOffset;


    getRootMoment();
    getTubeMoments();

    orderHeightValues();

    drawMDiagram();

    findMEIArea();



    console.log(data.tubes)
    // console.log(data.sys)

    summary();



} 


function getArea(tube) {

    tube.area = Math.PI /4* (Math.pow(tube.od, 2) - Math.pow(tube.od-2*tube.thickness,2)) ; // mm2

} 

function getInertia(tube) {
    tube.inertia = Math.PI /32* (Math.pow(tube.od, 4) - Math.pow(tube.od-2*tube.thickness,4)) ; // mm4
} 


function getMass(tube) {
    tube.mass = tube.area*tube.length*tube.density/1E9; // k
} 



function getEI(tube) {
    tube.ei = tube.E*tube.inertia; // Nmm2
} 

function getRootMoment() {
    data.sys.mRoot = data.sys.horLoad*data.sys.totalHeight/1000; // Nm
} 


function getTubeMoments(){

    data.tubes.forEach((tube,index) => {

        tube.mBottom = data.sys.mRoot*tube.zBottom/data.sys.totalHeight-data.sys.mRoot;
        tube.mTop = data.sys.mRoot*tube.zTop/data.sys.totalHeight-data.sys.mRoot;

        tube.meiBottom = 1000*tube.mBottom/tube.ei;
        tube.meiTop = 1000*tube.mTop/tube.ei;

        if (index > 0){
            tube.mCritical = data.sys.mRoot*tube.zCritical/data.sys.totalHeight-data.sys.mRoot;
            tube.meiCritical = 1000*tube.mCritical/tube.ei;

        } else{
            tube.mCritical = false;
            tube.meiCritical = false;
        } 

        // console.log("tube.meiBottom",tube.meiBottom)
        // console.log("tube.meiTop",tube.meiTop)

    }) 
} 



function orderHeightValues(){

    data.sys.momentData =[
       {
        "x":0,
        "y":-data.sys.mRoot
       } 
    ] 

    data.tubes.forEach((tube) => {

        tube.meiData =[] 

        data.sys.momentData.push(

           {
            "x":tube.zTop,
            "y":tube.mTop
           } 
        )


        let bottom_mei = tube.meiCritical ? tube.meiCritical : tube.meiBottom;

        console.log("BOTTOM MEI",bottom_mei)

        tube.meiData.push(
           {
            "x":tube.zCritical ? tube.zCritical:tube.zBottom,
            "y":1E9*bottom_mei
           },

           {
            "x":tube.zTop,
            "y":1E9*tube.meiTop
           },
        )

        console.log("MEI", tube.meiData)
    }) 
} 




function findMEIArea(){


    let deflection = 0
    let xbar_rh;
    let z;

    data.sys.deflection = [{"x":0,"y":0} ] 


    data.tubes.forEach((tube,index) => {


        // xbar is centroid from L/H side
        let xbar_lh = findTrapezoidAreaAndCentroid(tube)

        if (index < 1){

            xbar_rh = data.sys.extendedHeight-xbar_lh

            z = tube.zTop

        } else {
            xbar_rh = data.sys.extendedHeight-(tube.zCritical+xbar_lh)

            z = tube.zCritical


        } 




        deflection = deflection+tube.areaMEI*xbar_rh

        data.sys.deflection.push({
            "x":z,
            "y":deflection
        } )

        console.log("xbar",xbar_lh)

        console.log("xbar_right",xbar_rh)
        console.log("deflection",deflection)







    } )












} 





function findTrapezoidAreaAndCentroid(tube) {

    let x1 = tube.zCritical ? tube.zCritical : tube.zBottom
    let x2 = tube.zTop

    let v1 = tube.meiCritical ? tube.meiCritical : tube.meiBottom
    let v2 = tube.meiTop

    x1 = Math.abs(x1)
    x2 = Math.abs(x2)
    v1 = Math.abs(v1)
    v2 = Math.abs(v2)

    let xdist = Math.abs(x1-x2)
    let vdifference = v1-v2

    // console.log('v1',v1)
    // console.log('v2',v2)


    // console.log('x1',x1)
    // console.log('x2',x2)

    let areaTotal = (v1+v2)*xdist/2

    // Total area under M/EI diagram
    tube.areaMEI = areaTotal

    let minV = v1 > v2 ? v2 : v1

    // console.log('minV',minV)


    let areaSq = minV*xdist
    let areaTri = 0.5*xdist*Math.abs(vdifference)

    // console.log('areaSq',areaSq)
    // console.log('areaTri',areaTri)

    // x bar calculation
    let xbar

    if (vdifference > 0) {

        // console.log('aaaa')
        xbar = (areaSq*xdist*0.5+areaTri*xdist/3)/areaTotal
    } else {
        // console.log('bbbb')

        xbar = (areaSq*xdist*0.5+2*areaTri*xdist/3)/areaTotal
    } 

    return xbar;
} 