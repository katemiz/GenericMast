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

    let areaTotal = (v1+v2)*xdist/2

    // Total area under M/EI diagram
    tube.areaMEI = areaTotal        // unitless

    let minV = v1 > v2 ? v2 : v1

    let areaSq = minV*xdist
    let areaTri = 0.5*xdist*Math.abs(vdifference)

    let xbar

    if (vdifference > 0) {
        xbar = (areaSq*xdist*0.5+areaTri*xdist/3)/areaTotal
    } else {
        xbar = (areaSq*xdist*0.5+2*areaTri*xdist/3)/areaTotal
    } 

    return xbar;
} 




function getMastConfigurations() {

    let noSections = 2

    let configurations = []


    const originalData = [ ...data.tubes];

    for (let i = noSections; i <= noOfSections; i++) {
        
        configurations[i] = []

        for (let index = 0; index <= originalData.length-noSections; index++) {

            let v = [ ...originalData].splice(index,i)

            if (v.length === i) {
                configurations[i].push([ ...originalData].splice(index,i))  
            }
        }
    }

    // console.log(configurations)

    let table = []

    configurations.forEach((c) => {

        let confDizin = []


        c.forEach((d) => {

            let tubeNumbers = []


            let satir = false
            let sayac = 0

            d.forEach((gg) => {
                if (satir) {
                    satir += '-'+gg.od
                } else {
                    satir = gg.od
                }
                sayac++

                tubeNumbers.push(gg.no)
            })

            confDizin.push({
                "text":satir,
                "heightNested":getConfigNestedHeight(tubeNumbers),
                "heightExtended":getConfigExtendedHeight(tubeNumbers),
                "weight":getConfigWeight(tubeNumbers),
                "deflection":"deflection",
                "sayac":sayac
            })


            console.log("SATIR",satir)
            console.log("tube numbers",tubeNumbers)

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

        row.confs.forEach((r,index) => {

            tr = document.createElement('tr')

            if (index < 1) {

                tdTitle = document.createElement('td')
                tdTitle.classList.add('subtitle','has-text-centered','has-text-link')
                tdTitle.rowSpan =row.noOfConf

                let pH = document.createElement('p')
                pH.classList.add('title')
                pH.innerHTML = r.sayac
                
                let pT = document.createElement('p')
                pT.classList.add('is-size-7','has-text-weight-light')
                pT.innerHTML = 'No Of MastSections'

                tdTitle.appendChild(pH)
                tdTitle.appendChild(pT)

                tr.appendChild(tdTitle)
            }

            tdConf = document.createElement('td')
            tdConf.innerHTML = r.text

            tr.appendChild(tdConf)

            tdHeightNested = document.createElement('td')
            tdHeightNested.innerHTML = r.heightNested.toFixed(2)

            tr.appendChild(tdHeightNested)

            tdHeightExtended = document.createElement('td')
            tdHeightExtended.innerHTML = r.heightExtended.toFixed(2)

            tr.appendChild(tdHeightExtended)

            tdWeight = document.createElement('td')
            tdWeight.innerHTML = r.weight.toFixed(1)

            tr.appendChild(tdWeight)

            tdDeflection = document.createElement('td')
            tdDeflection.innerHTML = r.deflection

            tr.appendChild(tdDeflection)
            p.appendChild(tr)

        })




    })











}



function getConfigWeight(tubeNumbers) {


    let firstTubeNo = tubeNumbers[0];
    let lastTubeNo = tubeNumbers[tubeNumbers.length-1];

    let sectionWeight,weigthFoot,weightHead,weightTube

    tubeNumbers.forEach((tNo) => {

        let s = data.tubes.filter((tube) => tube.no === tNo)[0]

        if (s.no === firstTubeNo) {

            // First tube
            weigthFoot = s.wFootRollerAdapter
            weightTube = s.mass
            weightHead = s.wHeadRollerAdapter

        } else if (s.no === lastTubeNo) {

            // Last tube
            weigthFoot = s.wFootFixedAdapter
            weightTube = s.mass
            weightHead = s.wPayloadAdapter

        } else {

            weigthFoot = s.wFootFixedAdapter
            weightTube = s.mass
            weightHead = s.wHeadRollerAdapter
        }
    })

    sectionWeight = weigthFoot+weightTube+weightHead

    console.log("weigthFoot+weightTube+weightHead",weigthFoot,weightTube,weightHead,sectionWeight)
    console.log("sectionWeight",sectionWeight)

    return sectionWeight
}




function getConfigNestedHeight(tubeNumbers) {

    let firstTubeNo = tubeNumbers[0];
    let lastTubeNo = tubeNumbers[tubeNumbers.length-1];
    let nestedHeight = 0;

    tubeNumbers.forEach((tNo) => {

        let s = data.tubes.filter((tube) => tube.no === tNo)[0]

        if (s.no === firstTubeNo) {

            nestedHeight += s.length + s.hHead

        } else if (s.no === lastTubeNo) {

            nestedHeight += s.pAdapterHeadHeight

        } else {
            nestedHeight += s.hHead
        }
    })

    console.log("nestedHeight",nestedHeight)

    return nestedHeight/1000    // m
}





function getConfigExtendedHeight(tubeNumbers) {

    let firstTubeNo = tubeNumbers[0];
    let lastTubeNo = tubeNumbers[tubeNumbers.length-1];
    let extendedHeight = 0;

    let filteredTubes = data.tubes.filter((e) => e.no >= firstTubeNo && e.no <=lastTubeNo)

    filteredTubes.forEach((t) => {

        if (t.no === lastTubeNo) {
            extendedHeight += t.length
            extendedHeight += t.pAdapterHeadHeight
        } else {
            extendedHeight = t.zD - t.zA;
        }
    })

    return extendedHeight/1000
}
