class BeamDeflection {

    constructor(data) {
      this.data = data;
    }

    run() {

        setZPositions(tubesData,overlapsData);
        // setCrossectionalAreas(tubesData)
        // setCrossectionalInertia(tubesData)
        // setMassData(tubesData)
        // setEiData(tubesData)
    
        // setHeightValues(tubesData)
        // setRootMoment()
        // setTubeMoments(tubesData)
    
        // setMomentOverEI(tubesData)
        // setMomentAreaData(tubesData)
        // setXBarData(tubesData)
    
        // setDeflectionData(tubesData)




    }
  

    setZPositions() {

        if (!this.data) {
            alert("No data definition found")
        }
    
        if (!this.data.overlapsData) {
            alert("No data.overlapsData definition found")
        }
    
        this.data.tubes.forEach((tube, index) => {
    
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
        })
    }


    setHeightValues() {

        if (!this.data) {
            alert("No data definition found")
        }
    
        let lastTube = tubesData[tubesData.length-1]
    
        this.data.sys.extendedHeight = lastTube.zF
        this.data.sys.totalHeight = this.data.sys.extendedHeight+data.sys.zOffset;
    }
    
}