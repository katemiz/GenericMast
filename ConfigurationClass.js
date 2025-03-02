

class ConfigurationClass {


    constructor(data) {

        // console.log("CLASS data",data)

        // Data
        this.tubes = data.tubes;
        this.sys = data.sys;
        this.limits = data.limits;

        this.data = data;
        
    }


    getMastConfigurations() {
    
        let minMastSectionNo = 2
        let configurations = []

        let tubeNo,mastSectionArray;
    
    
        for (let mastSectionNo = minMastSectionNo; mastSectionNo <= this.tubes.length; mastSectionNo++) {
            

            let selections = []
    
            for (let index = 0; index <= this.tubes.length-mastSectionNo; index++) {

                mastSectionArray = []

                tubeNo = this.tubes[index].no

               //mastSectionArray.push(tubeNo)
    
                //let v = this.tubes.splice(index,i)

                //console.log("tube no",this.tubes[index].no)

                //let j=1;

                for (let k = tubeNo; k<tubeNo+mastSectionNo;k++) {
                    mastSectionArray.push(k)
                    //console.log("k ",k)


                    // console.log("mastSectionNo,index,tubeNo,k",mastSectionNo,index,tubeNo,k)

                }

                // console.log("--------")
                // console.log("v",v)
    
                // if (v.length === i) {
                //     configurations[i].push(this.tubes.splice(index,i))  
                // }

                selections.push(mastSectionArray)
                
            }

            configurations[mastSectionNo] = selections


            // console.log('seelcted dizin',selectedIndex)
        }

        // console.log(configurations)


        // Process Each Configuration

        configurations.forEach((confs,index) => {


            console.log("STARTNG CONFİGUARONS",index)

            confs.forEach((c) => {
                this.ProcessConfiguration(c)
            })


        })





        return true;
    
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




    ProcessConfiguration(tubeNoArray) {

        console.log("tubeNoArray",tubeNoArray)

        let newData = this.GetConfiguredData(tubeNoArray)

        console.log("newData",newData)


    }



    GetConfiguredData(tubeNoArray) {

        // console.log("sys",structuredClone(this.sys))


        let newData = {
            "sys":structuredClone(this.sys),
            "tubes":[],
            "limits":[]
        }


        this.tubes.forEach( (t,i) => {

            if (tubeNoArray.includes(t.no)) {
                newData.tubes.push(t)
            }
        })


        for (let k=tubeNoArray[0];k<tubeNoArray[tubeNoArray.length-1];k++) {
            newData.limits.push(this.limits[k-1])

            //console.log("this.limits[k-1]",this.limits[k-1])

        }

        //console.log("tubeNoArray[0]",tubeNoArray[0])

        // console.log("newData",newData)

        let processedData = new DataIntegrityClass(newData)

        //return newData;
        return processedData.data

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