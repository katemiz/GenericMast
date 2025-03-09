

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

        //console.log("all",configurations)


        // Process Each Configuration

        let table = []



        configurations.forEach((confs,index) => {

            // index shows the number of mast sections
            // confs shows the configurations for that number of mast sections

            console.log("STARTNG CONFIG",index)
            console.log("confs",confs)

            let confDizin = []


            confs.forEach((arrayOfTubeNumbers) => {

                // console.log("arrayOfTubeNumbers",arrayOfTubeNumbers)
                let confApplicableData = this.GetConfiguredData(arrayOfTubeNumbers)

                let tubeDia = []

                arrayOfTubeNumbers.forEach((tubeNo) => {

                    let tube = this.tubes.filter((t) => t.no === tubeNo)[0]
                    tubeDia.push(tube.od)
                })

                // CONFIGURATON DESCRIPTION TEXT
                let configDescriptionText = 'C '+tubeDia.join('-');

                // CONFIGURATION DATA INTEGRITY CHECK : EXTENDED HEIGHT, NESTED HEIGHT
                let confApplicableDataRevised = new DataIntegrityClass(confApplicableData)

                // CONFIGURATION DEFLECTION
                let confDeflection = new BeamDeflection(structuredClone(confApplicableDataRevised.data))
                confDeflection.run()

                let deflectionTop = confDeflection.data.tubes[confDeflection.data.tubes.length-1].deflectionTop

                //console.log("confDeflection",deflectionTop)

                confDizin.push({
                    "configDescriptionText":configDescriptionText,
                    "heightNested":confApplicableDataRevised.data.sys.nestedHeight,
                    "heightExtended":confApplicableDataRevised.data.sys.extendedHeight,
                    "totalMass":confDeflection.data.sys.totalMass,
                    "deflection":deflectionTop,
                    "sayac":index
                })


                console.log('----------------------')
                console.log('confDizin',confDizin)
    


            })


            if (confDizin.length>0) {
                table.push({
                    "noOfConf":confs.length,
                    "confs":confDizin,
                })



            }

            //confs.table.push(table)






        })

        console.log("table",table)


        this.AddConfRow(table)


        //return true;
    
    

    
    }




    SILProcessConfiguration(tubeNoArray) {

        // console.log("tubeNoArray",tubeNoArray)

        let newData = this.GetConfiguredData(tubeNoArray)

        // console.log("newData",newData)


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


    AddConfRow(table) {

        let p = document.getElementById('confBody')
    
        let tr,tdTitle,tdConf,tdHeightNested,tdHeightExtended,tdWeight,tdDeflection
    
        table.forEach((row) => {

            console.log("row",row)


            // row.forEach((r) => {

            //     console.log("r",r)
            // })

            // console.log("row",row)

    
            row.confs.forEach((r,index) => {

                 console.log("index",index)
                 console.log("r",r)

    
                tr = document.createElement('tr')
    
                if (index === 0) {
    
                    tdTitle = document.createElement('td')
                    tdTitle.classList.add('subtitle','has-text-centered','has-text-link')
                    tdTitle.rowSpan =row.noOfConf

                    console.log("row.confs.length",row.noOfConf)

    
                    let pH = document.createElement('p')
                    pH.classList.add('title')
                    pH.innerHTML = r.sayac
                    
                    let pT = document.createElement('p')
                    pT.classList.add('is-size-7','has-text-weight-light')
                    pT.innerHTML = 'No Of Mast Sections'
    
                    tdTitle.appendChild(pH)
                    tdTitle.appendChild(pT)
    
                    tr.appendChild(tdTitle)
                }

    
                tdConf = document.createElement('td')
                tdConf.innerHTML = r.configDescriptionText
    
                tr.appendChild(tdConf)
    
                tdHeightNested = document.createElement('td')
                tdHeightNested.classList.add('has-text-right')
                tdHeightNested.innerHTML = r.heightNested.toFixed(0)+" mm"
    
                tr.appendChild(tdHeightNested)
    
                tdHeightExtended = document.createElement('td')
                tdHeightExtended.classList.add('has-text-right')
                tdHeightExtended.innerHTML = r.heightExtended.toFixed(0)+" mm"
    
                tr.appendChild(tdHeightExtended)
    
                tdWeight = document.createElement('td')
                tdWeight.classList.add('has-text-right')
                tdWeight.innerHTML = r.totalMass.toFixed(1)+" kg"
    
                tr.appendChild(tdWeight)
    
                tdDeflection = document.createElement('td')
                tdDeflection.classList.add('has-text-right')
                tdDeflection.innerHTML = r.deflection.toFixed(1)+" mm"
    
                tr.appendChild(tdDeflection)
                p.appendChild(tr)
    
            })
    

    
    
        })
    
    }






}























