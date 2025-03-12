class MastClass {
    constructor(data = false) {

        if (data) {

            this.data = data

        } else {

            this.data = this.getInitialData()

        }
        
        
    }












    doCalculations() {

        // HEOGHTS AND Z COORDINATES
        this.calculateHeights()

        // ROOT MOMENT
        this.calculateRootMoment();

        this.data.tubes.forEach((tube,index) => {

            // AREA
            this.calculateArea(tube)

            // INERTIA
            this.calculateInertia(tube)

            // MASS
            this.calculateMass(tube)

            // EI
            this.calculateEI(tube)

            // SECTION TOP MOMENTS
            this.calculateMoments(tube);

            // // TUBE M/EI VALUES
            this.calculateM_EI(index);

            // // TUBE MOMENT - AREA
            // this.calculateMomentArea(tube);

            // // TUBE x bar VALUE
            // this.calculateTubeXBar(tube);
        })


        console.log("NEW this.data",this.data)


    }

    calculateHeights() {

        let zBottom = 0
        let zTop = 0
        let nestedHeight = this.data.tubes[0].length

        this.data.tubes.forEach((tube,index) => {

            zTop += tube.length-tube.overlap
            zBottom += zTop-tube.length

            nestedHeight += tube.headExtension

            tube.zTop = zTop
            tube.zBottom = zBottom
        })

        this.data.extendedHeight = zTop
        this.data.nestedHeight = nestedHeight
        this.data.totalHeight = zTop+this.data.zOffset
    }


    calculateArea(tube) {

        let areaMM2 = Math.PI /4* (Math.pow(tube.od, 2) - Math.pow(tube.od-2*tube.thickness,2)) ; // mm2
        let areaM2 = 1E-6*areaMM2 ; // m2

        tube.areaMM2 = areaMM2;
        tube.areaM2 = areaM2;
    } 


    calculateInertia(tube) {

        let inertiaMM4 = Math.PI /32* (Math.pow(tube.od, 4) - Math.pow(tube.od-2*tube.thickness,4)) ; // mm4
        let inertiaM4 = 1E-12*inertiaMM4; // m4

        tube.inertiaMM4 = inertiaMM4;
        tube.inertiaM4 = inertiaM4;
    } 


    calculateMass(tube) {
        tube.massKG = tube.areaMM2*tube.length*tube.density/1E9; // kg
    } 


    calculateEI(tube) {

        let ei = tube.E*tube.inertiaMM4; // Nmm2
        let eiNm2 = 1E-3*ei; // Nm2

        tube.ei = ei
        tube.eiNm2 = eiNm2
    } 


    calculateRootMoment() {
        this.data.mRootNmm = this.data.horLoad*this.data.totalHeight; // Nmm
        this.data.mRootNm = this.data.mRootNmm/1000; // Nm
        this.data.graph = [{tubeNo:1,z:0,m:-this.data.mRootNmm}]
    } 


    calculateMoments(tube){

        tube.mTop = this.data.mRootNmm*tube.zTop/this.data.totalHeight-this.data.mRootNmm; // Nmm

        this.data.graph.push({
            tubeNo:tube.no,z:tube.zTop,m:tube.mTop
        })
    } 




    calculateM_EI(index){

        // if (index <1) {
        //     tube.meiBottom = tube.mA/tube.ei
        // } else {    
        //     tube.meiBottom = tube.mC/tube.ei
        // }

        // tube.moment = tube.mF/tube.ei
    } 




    getInitialData() {

        return {

            "horLoad":1000,
            "zOffset": 200,
        
            "tubes": [
                {
                    "no":1,
                    "length": 2250,
                    "od": 300,
                    "thickness": 5,
                    "density": 2710,
                    'E':70E3,
                    'wPayloadAdapter':1.2,
                    'wFootFixedAdapter':1.2,
                    'wFootRollerAdapter':1.5,
                    'wHeadRollerAdapter':1.6,
                    'hHead':70,
                    'pAdapterHeadHeight':60,
                    "overlap": 0,
                    "headExtension":0,
                },
                {
                    "no":2,
                    "length": 2250,
                    "od": 280,
                    "thickness": 4,
                    "density": 2710,
                    'E':70E3,
                    'wPayloadAdapter':1.2,
                    'wFootFixedAdapter':1.2,
                    'wFootRollerAdapter':1.5,
                    'wHeadRollerAdapter':1.6,
                    'hHead':70,
                    'pAdapterHeadHeight':60,
                    "overlap": 500,
                    "headExtension":250,
                },
                {
                    "no":3,
                    "length": 2250,
                    "od": 220,
                    "thickness": 3,
                    "density": 2710,
                    'E':70E3,
                    'wPayloadAdapter':1.2,
                    'wFootFixedAdapter':1.2,
                    'wFootRollerAdapter':1.5,
                    'wHeadRollerAdapter':1.6,
                    'hHead':70,
                    'pAdapterHeadHeight':60,
                    "overlap": 500,
                    "headExtension":250,
                },
                {
                    "no":4,
                    "length": 2250,
                    "od": 180,
                    "thickness": 2,
                    "density": 2710,
                    'E':70E3,
                    'wPayloadAdapter':1.2,
                    'wFootFixedAdapter':1.2,
                    'wFootRollerAdapter':1.5,
                    'wHeadRollerAdapter':1.6,
                    'hHead':70,
                    'pAdapterHeadHeight':60,
                    "overlap": 500,
                    "headExtension":250,
                },
                {
                    "no":5,
                    "length": 2250,
                    "od": 170,
                    "thickness": 2,
                    "density": 2710,
                    'E':70E3,
                    'wPayloadAdapter':1.2,
                    'wFootFixedAdapter':1.2,
                    'wFootRollerAdapter':1.5,
                    'wHeadRollerAdapter':1.6,
                    'hHead':70,
                    'pAdapterHeadHeight':60,
                    "overlap": 500,
                    "headExtension":250,
                },
                {
                    "no":6,
                    "length": 2250,
                    "od": 160,
                    "thickness": 2,
                    "density": 2710,
                    'E':70E3,
                    'wPayloadAdapter':1.2,
                    'wFootFixedAdapter':1.2,
                    'wFootRollerAdapter':1.5,
                    'wHeadRollerAdapter':1.6,
                    'hHead':70,
                    'pAdapterHeadHeight':60,
                    "overlap": 500,
                    "headExtension":250,
                },
        
                {
                    "no":7,
                    "length": 2250,
                    "od": 160,
                    "thickness": 2,
                    "density": 2710,
                    'E':70E3,
                    'wPayloadAdapter':1.2,
                    'wFootFixedAdapter':1.2,
                    'wFootRollerAdapter':1.5,
                    'wHeadRollerAdapter':1.6,
                    'hHead':70,
                    'pAdapterHeadHeight':60,
                    "overlap": 500,
                    "headExtension":250,
                },
        
                {
                    "no":8,
                    "length": 2250,
                    "od": 160,
                    "thickness": 2,
                    "density": 2710,
                    'E':70E3,
                    'wPayloadAdapter':1.2,
                    'wFootFixedAdapter':1.2,
                    'wFootRollerAdapter':1.5,
                    'wHeadRollerAdapter':1.6,
                    'hHead':70,
                    'pAdapterHeadHeight':60,
                    "overlap": 500,
                    "headExtension":0,
                },        
            ],
        }
    }

















}