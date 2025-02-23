class DataIntegrityClass {

    constructor(data) {
        this.data = data;

        this.setCommonValues();
    }



    setCommonValues() {

        if (!this.data.tubes) {
            alert("No tubes definition found")
        }
    
        if (!this.data.limits) {
            alert("No data.limits definition found")
        }
    
        let totalExtensions = 0;

        this.data.tubes.forEach((tube, index) => {
  
            if (index < 1 ) {

                tube.zA = 0;
                tube.zB = 0;
                tube.zC = 0;
    
                tube.zD = tube.length;
                tube.zE = tube.length;
                tube.zF = tube.length;

                tube.zAnested = tube.zA;
                tube.zFnested = tube.zF;
    
            } else {

                // PREVIOUS TUBE
                let limit = this.data.limits[index-1];
                let pTube = this.data.tubes[index-1];
    
                pTube.zD = pTube.zF-limit.overlap;
                pTube.zE = pTube.zF-limit.overlap/2;
    
                // CURRENT TUBE
                tube.zA = pTube.zD;
                tube.zB = pTube.zE;
                tube.zC = pTube.zF;
    
                tube.zD = tube.zA+tube.length;
                tube.zE = tube.zA+tube.length;
                tube.zF = tube.zA+tube.length;

                // NESTED TUBES
                tube.zAnested = pTube.zAnested+pTube.length-tube.length+limit.extension;
                tube.zFnested = tube.zAnested+tube.length;

                totalExtensions += limit.extension;
            }

            tube.zBottom = tube.zA
            tube.zTop = tube.zF
        })


        // NESTED HEIGHT
        this.data.sys.nestedHeight = this.data.tubes[0].length+totalExtensions;


        // EXTENDED AND TOTAL HEIGHT
        let lastTube = this.data.tubes[this.data.tubes.length-1]
    
        this.data.sys.extendedHeight = lastTube.zF
        this.data.sys.totalHeight = this.data.sys.extendedHeight+this.data.sys.zOffset;
    }
}