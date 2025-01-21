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

    data.tubes.forEach((tube, index) => {
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

    getZPositions();
    getTubeMasses();
    getMoments();
    getShearLoads();

    getMEI();

    // runCanvas();
    summary();

    drawMDiagram();
}