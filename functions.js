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


    getMastConfigurations()


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

        if (index === 0){
            tube.mei.push({"z":tube.zA,"mei":meiA } )    
            tube.mei.push({"z":tube.zF,"mei":meiF } )  
            
            minMax.push(meiA,meiF)

        } else {

            tube.mei.push({"z":tube.zC,"mei":meiC } )    
            tube.mei.push({"z":tube.zF,"mei":meiF } )  

            minMax.push(meiC,meiF)
        } 

    } )

    data.sys.meiMin = Math.min(...minMax)
    data.sys.meiMax =  Math.max(...minMax)



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


        xbar_rh = data.sys.extendedHeight-(tube.zC+xbar_lh)
        z = tube.zF

        deflection = deflection+tube.areaMEI*xbar_rh*1000;   // mm

        data.sys.deflection.push({
            "x":z,
            "y":deflection
        } )

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




function getMastConfigurations() {

    // let sayac;
    let noSections = 2

    let configurations = []


    const originalData = [ ...data.tubes];

    console.log("OriginalData",originalData)
    console.log("OriginalData Length",originalData.length)



    for (let i = noSections; i <= noOfSections; i++) {

        // sayac = 'M'+i+'SECTION'

        
        configurations[i] = []

        for (let index = 0; index <= originalData.length-noSections; index++) {

            // const newData = [ ...originalData];

            // console.log("Original array length",originalData.length)


            // let v = newData.splice(index,noSections)

            // console.log("replaced array length",v.length)

            // console.log("index,noSe")

            let v = [ ...originalData].splice(index,i)

            // console.log()

            if (v.length === i) {
                configurations[i].push([ ...originalData].splice(index,i))  
            }

            
            
        }

    }

    console.log(configurations)

    let table = []

    configurations.forEach((c) => {

        let confDizin = []

        c.forEach((d) => {

            let satir = false
            let sayac = 0

            d.forEach((gg) => {
                if (satir) {
                    satir += '-'+gg.od
                } else {
                    satir = gg.od
                }
                sayac++
            })

            confDizin.push({
                "text":satir,
                "height":"height",
                "weight":"weight",
                "deflection":"deflection",
                "sayac":sayac
            })


            console.log("SATIR",satir)
        })

        console.log('----------------------')

        if (confDizin.length>0) {
            table.push({
                "noOfConf":c.length,
                "confs":confDizin,
            })
        }
    })

    // console.log(table)

    addConfRow(table)

    
}










function addConfRow(table) {

    let p = document.getElementById('confBody')

    let tr,tdTitle,tdConf,tdHeight,tdWeight,tdDeflection

    table.forEach((row) => {

        // console.log("ROW",row.noOfConf)

        row.confs.forEach((r,index) => {

            // console.log("R",r,index)

            tr = document.createElement('tr')

            if (index < 1) {

                tdTitle = document.createElement('td')
                tdTitle.classList.add('subtitle','has-text-centered','has-text-link')
                tdTitle.rowSpan =row.noOfConf
                tdTitle.innerHTML = r.sayac+'-Section <br>Mast<br> Alternatives'
                tr.appendChild(tdTitle)

                // console.log("Rrrrrr",r,index)
            }

            tdConf = document.createElement('td')
            tdConf.innerHTML = r.text

            tr.appendChild(tdConf)



            tdHeight = document.createElement('td')
            tdHeight.innerHTML = r.height

            tr.appendChild(tdHeight)





            tdWeight = document.createElement('td')
            tdWeight.innerHTML = r.weight

            tr.appendChild(tdWeight)

            tdDeflection = document.createElement('td')
            tdDeflection.innerHTML = r.deflection

            tr.appendChild(tdDeflection)
            p.appendChild(tr)

        })




    })











}