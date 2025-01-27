function getZPositions() {

    data.tubes.forEach((tube, index) => {

        if (index < 1 ) {

            tube.zA = 0;
            tube.zB = 0;
            tube.zC = 0;

            tube.zD = tube.length;
            tube.zE = tube.length;
            tube.zF = tube.length;

        } else {

            // PREVIOUS TUBE
            let overlap = data.overlaps[index-1];
            let pTube = data.tubes[index-1];

            pTube.zD = pTube.zF-overlap.length;
            pTube.zE = pTube.zF-overlap.length/2;

            // CURRENT TUBE
            tube.zA = pTube.zD;
            tube.zB = pTube.zE;
            tube.zC = pTube.zF;

            tube.zD = tube.zA+tube.length;
            tube.zE = tube.zA+tube.length;
            tube.zF = tube.zA+tube.length;
        }

        data.sys.extendedHeight = tube.zF;
    })

    data.sys.totalHeight = data.sys.extendedHeight+data.sys.zOffset;
    console.log("QQQQQQQQ",data.tubes)
}









function SILgetZPositions() {

    /*

    A: Tube Lower Face / BOTTOM, Overlap Minus
    B: Tube Lower Face / BOTTOM, Overlap Center
    C: Tube Lower Face / BOTTOM, Overlap Plus


    D: Tube Upper Face / TOP, Overlap Minus
    E: Tube Upper Face / TOP, Overlap Center
    F: Tube Upper Face / TOP, Overlap Plus
    
    */

    getZs();

    return true;

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

    data.sys.extendedHeight = position;
}


function SILgetTubeMasses() {


    data.tubes.forEach((tube) => {

        tube.area = Math.PI /4* (Math.pow(tube.od, 2) - Math.pow(tube.od-tube.thickness,2)) ; // mm2
        tube.inertia = Math.PI /32* (Math.pow(tube.od, 4) - Math.pow(tube.od-tube.thickness,4)) ; // mm4

        tube.mass = tube.area*tube.length*tube.density/1E9;

        tube.ei = tube.E*tube.inertia/1E12;
    }

    );

    console.log("Tubes MASS", data.tubes);
}



function SILgetMoments() {

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


    });


}



function SILgetShearLoads() {

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





function runCalculations() {

    console.log("Running function :",arguments.callee.name);


    getZPositions();
    getArea()
    getRootMoment()
    getTubeMoments();
    getInertia()
    getMass()
    getEI()
    getM_EI()


    getMomentGraphData()

    findMEIArea()

    //getMoments();
    // getShearLoads();

    // getMEI();

    // runCanvas();
    // summary();

    // drawMDiagram();

    // renderModalContent(15)

    // getTubeProps();
}







function SILrunInputTable() {


    let noOfSections = document.getElementById('noOfSections').value;
    console.log("noOfSections",noOfSections)

    renderModalContent(noOfSections)


}





function getArea() {
    data.tubes.forEach((tube) => {
        tube.area = Math.PI /4* (Math.pow(tube.od, 2) - Math.pow(tube.od-2*tube.thickness,2)) ; // mm2
        tube.areaM2 = 1E-6*tube.area ; // m2
    })
} 

function getInertia() {
    data.tubes.forEach((tube) => {
        tube.inertia = Math.PI /32* (Math.pow(tube.od, 4) - Math.pow(tube.od-2*tube.thickness,4)) ; // mm4
        tube.inertiaM4 = 1E-12*tube.inertia; // m4
    })
} 


function getMass() {
    data.tubes.forEach((tube) => {
        tube.mass = tube.area*tube.length*tube.density/1E9; // kg
    })
} 



function getEI() {
    data.tubes.forEach((tube) => {
        tube.ei = tube.E*tube.inertia; // Nmm2
        tube.eiNm2 = 1E-3*tube.ei; // Nm2
    })
} 




function getM_EI(){

    let minMax = [];

    let meiA,meiC,meiF;

    data.tubes.forEach((tube, index) => {

        // Tube moments are in Nm

        if(!tube.mei) {
            tube.mei = []
        }

        meiA = -tube.mA/tube.eiNm2; // 1/m
        meiC = -tube.mC/tube.eiNm2; // 1/m
        meiF = -tube.mF/tube.eiNm2; // 1/m

        console.log("mei A C F",meiA,meiC,meiF,index)

        if (index === 0){
            tube.mei.push({"z":tube.zA,"mei":meiA } )    
            tube.mei.push({"z":tube.zF,"mei":meiF } )  
            
            minMax.push(meiA,meiF)

        } else {

            tube.mei.push({"z":tube.zC,"mei":meiC } )    
            tube.mei.push({"z":tube.zF,"mei":meiF } )  

            minMax.push(meiC,meiF)
        } 

        console.log("MEI 1/m",tube.mei)
    } )

    data.sys.meiMin = Math.min(...minMax)
    data.sys.meiMax =  Math.max(...minMax)

    // let k = 0.75*data.sys.mRoot/data.sys.meiMin

    // console.log("k",k)

    // data.tubes.forEach((tube) => {

    //     tube.mei.forEach((m) => {
    //         m.mei = k*m.mei
    //     })

    // })


    console.log("Min of ",Math.min(...minMax))
    console.log("Maxf ",Math.max(...minMax))

} 









function getRootMoment() {

    console.log("Running function :",arguments.callee.name);

    data.sys.mRoot = data.sys.horLoad*data.sys.totalHeight/1E3; // Nm
} 


function getTubeMoments(){

    console.log("Running function :",arguments.callee.name);

    data.tubes.forEach((tube) => {
        tube.mA = data.sys.mRoot*tube.zA/data.sys.totalHeight-data.sys.mRoot; // Nm
        tube.mB = data.sys.mRoot*tube.zB/data.sys.totalHeight-data.sys.mRoot; // Nm
        tube.mC = data.sys.mRoot*tube.zC/data.sys.totalHeight-data.sys.mRoot; // Nm
        tube.mD = data.sys.mRoot*tube.zD/data.sys.totalHeight-data.sys.mRoot; // Nm
        tube.mE = data.sys.mRoot*tube.zE/data.sys.totalHeight-data.sys.mRoot; // Nm
        tube.mF = data.sys.mRoot*tube.zF/data.sys.totalHeight-data.sys.mRoot; // Nm
    }) 
} 



function  getMomentGraphData() {

    data.sys.mData = [{"x":0,"y":-data.sys.mRoot}]

    data.tubes.forEach((tube) => {
        data.sys.mData.push({"x":tube.zF,"y":tube.mF})
    })

    data.sys.mData.push({"x":data.sys.totalHeight,"y":0})
}


// function  getMeiGraphData() {

//     data.sys.mData = [{"x":0,"y":-data.sys.mRoot}]

//     data.tubes.forEach((tube,index) => {

//         if (index < 1) {
//             data.sys.mData.push({"x":tube.zF,"y":tube.mF})
//         }
//     })

//     data.sys.mData.push({"x":data.sys.totalHeight,"y":0})
// }









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

        // if (index < 1){
        //     xbar_rh = data.sys.extendedHeight-xbar_lh
        //     z = tube.zF
        // } else {
            xbar_rh = data.sys.extendedHeight-(tube.zC+xbar_lh)
            z = tube.zF
        // } 

        deflection = deflection+tube.areaMEI*xbar_rh*1000;   // mm

        data.sys.deflection.push({
            "x":z,
            "y":deflection
        } )

        console.log("xbar",xbar_lh)

        console.log("xbar_right",xbar_rh)
        console.log("deflection",data.sys.deflection)
    } )

    data.sys.maxDeflection = deflection












} 





function findTrapezoidAreaAndCentroid(tube) {

    let x1,x2;
    let v1,v2;

    if (tube.zA === 0) {
        x1 = tube.zA
    } else {
        x1 = tube.zC
    }

    x2 = tube.zF

    v1 = tube.mei[0].mei    // 1/m
    v2 = tube.mei[1].mei    // 1/m





    x1 = Math.abs(x1)
    x2 = Math.abs(x2)
    v1 = Math.abs(v1)
    v2 = Math.abs(v2)

    let xdist = Math.abs(x1-x2)/1000; // m
    let vdifference = v1-v2           // 1/m

    // console.log('v1',v1)
    // console.log('v2',v2)


    // console.log('x1',x1)
    // console.log('x2',x2)

    let areaTotal = (v1+v2)*xdist/2

    // Total area under M/EI diagram
    tube.areaMEI = areaTotal        // unitless

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