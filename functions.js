function runCalculations(tubesData = false,overlapsData = false) {

    setZPositions(tubesData,overlapsData);
    setCrossectionalAreas(tubesData)
    setCrossectionalInertia(tubesData)
    setMassData(tubesData)
    setEiData(tubesData)

    setHeightValues(tubesData)
    setRootMoment()
    setTubeMoments(tubesData)

    setMomentOverEI(tubesData)
    setMomentAreaData(tubesData)
    setXBarData(tubesData)

    setDeflectionData(tubesData)

    // getRootMoment()
    // getTubeMoments();
    // getInertia()
    // getMass()
    // getEI()
    // getM_EI()

    // getMomentGraphData()
    // findMEIArea()
    // getMastConfigurations()

    console.log("TUBES",data.tubes)

}


function setZPositions(tubesData = false,overlapsData = false) {

    if (!tubesData) {
        tubesData = data.tubes
    }


    if (!overlapsData) {
        overlapsData = data.overlaps
    }

    tubesData.forEach((tube, index) => {

        if (index < 1 ) {

            tube.zA = 0;
            tube.zB = 0;
            tube.zC = 0;

            tube.zD = tube.length;
            tube.zE = tube.length;
            tube.zF = tube.length;

        } else {

            // PREVIOUS TUBE
            let overlap = overlapsData[index-1];
            let pTube = tubesData[index-1];

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

        // data.sys.extendedHeight = tube.zF;
    })


    // return tubesData;

    // data.sys.totalHeight = data.sys.extendedHeight+data.sys.zOffset;
}


function setHeightValues(tubesData = false) {

    if (!tubesData) {
        tubesData = data.tubes
    }   

    let lastTube = tubesData[tubesData.length-1]

    data.sys.extendedHeight = lastTube.zF
    data.sys.totalHeight = data.sys.extendedHeight+data.sys.zOffset;
}


function setCrossectionalAreas(tubesData = false) {

    if (!tubesData) {
        tubesData = data.tubes
    }

    tubesData.forEach((tube) => {
        tube.area = Math.PI /4* (Math.pow(tube.od, 2) - Math.pow(tube.od-2*tube.thickness,2)) ; // mm2
        tube.areaM2 = 1E-6*tube.area ; // m2
    })
} 


function setCrossectionalInertia(tubesData = false) {

    if (!tubesData) {
        tubesData = data.tubes
    }

    tubesData.forEach((tube) => {
        tube.inertia = Math.PI /32* (Math.pow(tube.od, 4) - Math.pow(tube.od-2*tube.thickness,4)) ; // mm4
        tube.inertiaM4 = 1E-12*tube.inertia; // m4
    })
} 


function setMassData(tubesData = false) {

    if (!tubesData) {
        tubesData = data.tubes
    }

    tubesData.forEach((tube) => {
        tube.mass = tube.area*tube.length*tube.density/1E9; // kg
    })
} 


function setEiData(tubesData = false) {

    if (!tubesData) {
        tubesData = data.tubes
    }

    tubesData.forEach((tube) => {
        tube.ei = tube.E*tube.inertia; // Nmm2
        tube.eiNm2 = 1E-3*tube.ei; // Nm2
    })
} 


function setRootMoment() {

    data.sys.mRoot = data.sys.horLoad*data.sys.totalHeight; // Nmm
} 


function setTubeMoments(tubesData = false){

    if (!tubesData) {
        tubesData = data.tubes
    }

    tubesData.forEach((tube) => {
        tube.mA = data.sys.mRoot*tube.zA/data.sys.totalHeight-data.sys.mRoot; // Nmm
        tube.mB = data.sys.mRoot*tube.zB/data.sys.totalHeight-data.sys.mRoot; // Nmm
        tube.mC = data.sys.mRoot*tube.zC/data.sys.totalHeight-data.sys.mRoot; // Nmm
        tube.mD = data.sys.mRoot*tube.zD/data.sys.totalHeight-data.sys.mRoot; // Nmm
        tube.mE = data.sys.mRoot*tube.zE/data.sys.totalHeight-data.sys.mRoot; // Nmm
        tube.mF = data.sys.mRoot*tube.zF/data.sys.totalHeight-data.sys.mRoot; // Nmm
    }) 
} 


function setMomentOverEI(tubesData = false){

    if (!tubesData) {
        tubesData = data.tubes
    }

    tubesData.forEach((tube,index) => {

        if (index <1) {
            tube.zBottom = tube.zA
            tube.meiBottom = tube.mA/tube.ei
        } else {    
            tube.zBottom = tube.zC
            tube.meiBottom = tube.mC/tube.ei
        }

        tube.zTop = tube.zF
        tube.meiTop = tube.mF/tube.ei
    })
} 



function setMomentAreaData(tubesData = false){

    if (!tubesData) {
        tubesData = data.tubes
    }

    tubesData.forEach((tube) => {
        tube.momentArea = (tube.zTop-tube.zBottom)*(tube.meiTop+tube.meiBottom)/2;    
    } )
} 


function setXBarData(tubesData = false){

    if (!tubesData) {
        tubesData = data.tubes
    }

    tubesData.forEach((tube) => {

        let width = Math.abs(tube.zTop-tube.zBottom)

        let mB = Math.abs(tube.meiBottom)
        let mT = Math.abs(tube.meiTop)

        let totalArea = (mB+mT)*width/2
        let rectArea = mB > mT ? mT*width : mB*width
        let triArea = Math.abs(mT-mB)*width/2

        let xbar_rectangle = width/2
        let xbar_triangle = mB > mT ? width/3 : 2*width/3

        // console.log("RECTANGLE",rectArea)
        // console.log("TRIANGLE",triArea)
        // console.log("TOTAL",totalArea)
        // console.log("XBAR RECTANGLE",xbar_rectangle)
        // console.log("XBAR TRIANGLE",xbar_triangle)

        let xbar = (rectArea*xbar_rectangle+triArea*xbar_triangle)/totalArea

        console.log("XBAR",xbar)

        tube.zXBar =tube.zBottom+xbar

        console.log("tube.xbar",tube.zXBar)
    } )
}


function setDeflectionData(){

    let tubesData = [...data.tubes]

    let sayac = tubesData.length

    let deflectionTop;

    for (let i = sayac; i >= 1; i--) {

        deflectionTop = CalculateDeflection(tubesData)

        tubesData.pop()

        data.tubes[i-1].deflectionTop = deflectionTop

        console.log("sayac,index, ",sayac,i-1)
    }
}



function CalculateDeflection(dizin) {

    let momentArmLocation = dizin[dizin.length-1].zTop

    let deflection = 0

    dizin.forEach((t) => {
        deflection = deflection+t.momentArea*(momentArmLocation-t.zXBar)
    })

    console.log("DEFLECTON",deflection)

    return deflection



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









