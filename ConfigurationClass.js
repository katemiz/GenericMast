

class ConfigurationClass {


    constructor(data) {

        // Data
        this.tubes = data.tubes;
        this.sys = data.sys;
        this.limits = data.limits;
        
    }


    getMastConfigurations() {
    
        let noSections = 2
        let configurations = []
    
    
        for (let i = noSections; i <= this.tubes.length; i++) {
            
            configurations[i] = []
    
            for (let index = 0; index <= this.tubes.length-noSections; index++) {
    
                let v = this.tubes.splice(index,i)
    
                if (v.length === i) {
                    configurations[i].push(this.tubes.splice(index,i))  
                }
            }
        }
    
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
                    "deflection":getConfigDeflection(tubeNumbers),
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
    
        //addConfRow(table)
    }











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

    // console.log("nestedHeight",nestedHeight)

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

    // console.log("weigthFoot+weightTube+weightHead",weigthFoot,weightTube,weightHead,sectionWeight)
    // console.log("sectionWeight",sectionWeight)

    return sectionWeight
}



function getConfigDeflection(tubeNumbers) {

    let tubesData = []
    let limitsData = []

    tubeNumbers.forEach((tNo) => {

        let s = data.tubes.filter((tube) => tube.no === tNo)[0]
        let limit = data.limits.filter((ol) => ol.no === s.no)[0]

        console.log("s",s)

        tubesData.push(s)
        limitsData.push(limit)
    })

    data.tubes = tubesData
    data.limits = limitsData
    console.log("tubesData",tubesData)

    //runCalculations()

    let lastTubeNo = data.tubes[data.tubes.length-1];

    return lastTubeNo.deflectionTop
}