class DataIntegrityClass {

    constructor(data) {
        this.data = data;

        this.setCommonValues();
    }



    setCommonValues() {

        if (!this.data.tubes) {
            alert("No tubes definition found")
        }
    
        if (!this.data.overlaps) {
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
                let overlap = this.data.overlaps[index-1];
                let pTube = this.data.tubes[index-1];
    
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

        // EXTENDED AND TOTAL HEIGHT
        let lastTube = this.data.tubes[this.data.tubes.length-1]
    
        this.data.sys.extendedHeight = lastTube.zF
        this.data.sys.totalHeight = this.data.sys.extendedHeight+this.data.sys.zOffset;


        console.log('Data after integrity',this.data)
    }



}