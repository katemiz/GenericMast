class MastClass {
    constructor(data = false) {

        if (data) {
            this.data = data
        } else {
            this.data = defaultData // from data.js
        }


        this.data.horAxisZData = [0]    // z, in mm
        this.data.verAxisMomentData = []
        this.data.verAxisDeflectionData = [0]
        this.data.verAxisDeflectionData2 = [0]



    }


    doCalculations() {

        let totalMass = 0;

        // HEOGHTS AND Z COORDINATES
        this.calculateHeights()

        // ROOT MOMENT
        this.calculateRootMoment();

        this.data.tubes.forEach((tube) => {

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
            this.calculateM_EI(tube);

            // TUBE MOMENT - AREA
            this.calculateMomentArea(tube);

            // TUBE x bar VALUE OF MOMENT AREA
            this.calculateMomentAreaXBar(tube);

            // Mass summation
            totalMass += tube.massKG
        })

        this.calculateDeflection()
        this.data.totalMass = totalMass

        // PREPARE GRAPH DATA : BENDING MOMENT, DEFLECTION
        this.PrepareGraphData()

        // DRAW GRAPHS
        this.DrawBendingMomentDeflectionChart()

        console.log("NEW this.data",this.data)
    }


    calculateHeights() {

        let z = 0;

        let nestedHeight = this.data.tubes[0].length

        this.data.tubes.forEach((tube,index) => {

            z = z-tube.overlap

            tube.zKink = z
            tube.zBottom = z;

            z = z+tube.length;

            tube.zTop = z;

            nestedHeight += tube.headExtension

            tube.no = index+1
        })

        this.data.extendedHeight = z
        this.data.nestedHeight = nestedHeight
        this.data.totalHeight = z+this.data.zOffset
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
    } 


    calculateMoments(tube){

        tube.mTop = this.data.mRootNmm*tube.zTop/this.data.totalHeight-this.data.mRootNmm; // Nmm
        tube.mKink = this.data.mRootNmm*tube.zKink/this.data.totalHeight-this.data.mRootNmm; // Nmm
        tube.mBottom = this.data.mRootNmm*tube.zBottom/this.data.totalHeight-this.data.mRootNmm; // Nmm
    } 


    calculateM_EI(tube){

        tube.meiTop = tube.mTop/tube.ei;
        tube.meiKink = tube.mKink/tube.ei;
    } 


    calculateMomentArea(tube){
        tube.momentArea = (tube.zTop-tube.zBottom)*(tube.meiTop+tube.meiKink)/2;    
    } 


    calculateMomentAreaXBar(tube){
    
        let width = Math.abs(tube.zTop-tube.zKink)

        let mK = Math.abs(tube.meiKink)
        let mT = Math.abs(tube.meiTop)

        let totalArea = (mK+mT)*width/2
        let rectArea = mK > mT ? mT*width : mK*width
        let triArea = Math.abs(mT-mK)*width/2

        let xbar_rectangle = width/2
        let xbar_triangle = mK > mT ? width/3 : 2*width/3

        let xbar = (rectArea*xbar_rectangle+triArea*xbar_triangle)/totalArea

        tube.zXBar =tube.zBottom+xbar
    }


    calculateDeflection(){

        let tubesCloned = structuredClone(this.data.tubes);
        let sayac = tubesCloned.length
        let deflectionTop;
    
        for (let i = sayac; i >= 1; i--) {
    
            deflectionTop = this.CalculateSubSystemDeflection(tubesCloned)
            tubesCloned.pop()
    
            this.data.tubes[i-1].deflectionTop = deflectionTop
        }
    }    


    CalculateSubSystemDeflection(subTubesArray) {

        let momentArmLocation = subTubesArray[subTubesArray.length-1].zTop
    
        let deflection = 0
    
        subTubesArray.forEach((t) => {
            deflection = deflection+t.momentArea*(momentArmLocation-t.zXBar)
        })
        
        return deflection
    }




    PrepareGraphData() {



        this.data.verAxisMomentData.push(-this.data.mRootNmm)



        this.data.tubes.forEach((tube) => {



            this.data.horAxisZData.push(tube.zTop)
            this.data.verAxisMomentData.push(tube.mTop)
            this.data.verAxisDeflectionData.push(tube.deflectionTop)
            this.data.verAxisDeflectionData2.push(tube.deflectionTop-200)






            // this.data.meiData.push([
            //     {
            //         z:tube.zKink,
            //         mei:tube.meiKink
            //     },

            //     {
            //         z:tube.zTop,
            //         mei:tube.meiTop
            //     },
            // ])



        })






        console.log('bending moment data',this.data.horAxisZData,this.data.verAxisMomentData,this.data.verAxisDeflectionData)


    }


    DrawBendingMomentDeflectionChart() {

        let TESTER = document.getElementById('bm_deflection');

        let bendingMoment = {
            x: this.data.horAxisZData,
            y: this.data.verAxisMomentData,
            yaxis: 'y',
            mode: 'lines+markers',
            name: 'Moment, Nmm'
        };
          
        var TipDeflection = {
            x: this.data.horAxisZData,
            y: this.data.verAxisDeflectionData,
            yaxis:'y2',
            // fill: 'tozeroy',
            mode: 'lines+markers',
            name: 'Deflection, mm',
            line: {shape: 'spline'},
        };


        var TipDeflection2 = {
            x: this.data.horAxisZData,
            y: this.data.verAxisDeflectionData2,
            yaxis:'y3',
            // fill: 'tozeroy',
            mode: 'lines+markers',
            name: 'Deflection, mm',
            line: {shape: 'spline'},
        };

        var veri = [bendingMoment,TipDeflection,TipDeflection2];

        var layout = {

            title: {
              text: 'Bending Moment and Deflection Graph'
            },
          
            xaxis: {
              title: {
                text: 'z, Height, mm'
              }
            },
          
            yaxis: {
              title: {
                text: 'Moment, Nmm'
              }
            },
    
            yaxis2: {
                title: {
                  text: 'Deflection, mm',
                  font: {color: 'rgb(18, 9, 110)'}
                },
            
                tickfont: {color: 'rgb(248, 11, 11)'},
                overlaying: 'y',
                side: 'right'
            },


            yaxis3: {
                title: {
                  text: 'Deflection, mm',
                  font: {color: 'rgb(139, 137, 165)'}
                },
            
                tickfont: {color: 'rgb(11, 19, 248)'},
                overlaying: 'y',
                side: 'right'
            },
    
            showlegend: true,
        };
    
        Plotly.newPlot(TESTER, veri, layout);
    }

}