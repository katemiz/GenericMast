class BeamDeflection {

    constructor(data) {
      this.data = data;
      this.tubes = data.tubes
      this.overlaps = data.overlaps
      this.sys = data.sys
    }

    run() {

        console.log('Started to run')

        this.setZPositions();
        this.setGeometricValues();
        // setMassData(tubesData)
        // setEiData(tubesData)
    
        // setHeightValues(tubesData)
        // setRootMoment()
        // setTubeMoments(tubesData)
    
        // setMomentOverEI(tubesData)
        // setMomentAreaData(tubesData)
        // setXBarData(tubesData)
    
        // setDeflectionData(tubesData)


        console.log('CLASS TUBEs',this.tubes)



    }
  

    setZPositions() {

        if (!this.tubes) {
            alert("No tubes definition found")
        }
    
        if (!this.overlaps) {
            alert("No data.overlapsData definition found")
        }
    
        this.tubes.forEach((tube, index) => {
    
            if (index < 1 ) {
    
                tube.zA = 0;
                tube.zB = 0;
                tube.zC = 0;
    
                tube.zD = tube.length;
                tube.zE = tube.length;
                tube.zF = tube.length;
    
            } else {
    
                // PREVIOUS TUBE
                let overlap = this.overlaps[index-1];
                let pTube = this.tubes[index-1];
    
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
        })
    }


    setHeightValues() {

        if (!this.tubes) {
            alert("No tubes definition found")
        }
    
        let lastTube = this.tubes[this.tubes.length-1]
    
        this.sys.extendedHeight = lastTube.zF
        this.sys.totalHeight = this.sys.extendedHeight+this.sys.zOffset;
    }



    setGeometricValues() {

        if (!this.tubes) {
            alert("No tubes definition found")
        }

        let areaObject,inertiaObject,eiObject
    
        this.tubes.forEach((tube) => {

            // AREA
            areaObject = this.calculateArea(tube)

            tube.areaMM2 = areaObject.areaMM2
            tube.areaM2 = areaObject.areaM2

            // INERTIA
            inertiaObject = this.calculateInertia(tube)

            tube.inertiaMM4 = inertiaObject.inertiaMM4
            tube.inertiaM4 = inertiaObject.inertiaM4

            // MASS
            tube.massKG = this.calculateMass(tube)

            // EI
            eiObject = this.calculateEI(tube)

            tube.ei = eiObject.ei
            tube.eiNm2 = eiObject.eiNm2

        })
    }



    calculateArea(tube) {

        let areaMM2 = Math.PI /4* (Math.pow(tube.od, 2) - Math.pow(tube.od-2*tube.thickness,2)) ; // mm2
        let areaM2 = 1E-6*areaMM2 ; // m2

        return {
            "areaMM2":areaMM2,
            "areaM2":areaM2
        }
    } 


    calculateInertia(tube) {

        let inertiaMM4 = Math.PI /32* (Math.pow(tube.od, 4) - Math.pow(tube.od-2*tube.thickness,4)) ; // mm4
        let inertiaM4 = 1E-12*inertiaMM4; // m4

        return {
            "inertiaMM4":inertiaMM4,
            "inertiaM4":inertiaM4
        }
    } 


    calculateMass(tube) {
        return tube.areaMM2*tube.length*tube.density/1E9; // kg
    } 


    calculateEI(tube) {

        if (!tube.inertiaMM4) {
            alert('No inertia data found')
        }
    
        let ei = tube.E*tube.inertiaMM4; // Nmm2
        let eiNm2 = 1E-3*ei; // Nm2

        return {
            "ei":ei,
            "eiNm2":eiNm2
        }
    } 


    
}