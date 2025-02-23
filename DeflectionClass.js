class BeamDeflection {

    constructor(data) {
      this.data = data;
      this.tubes = data.tubes
      this.sys = data.sys
    }

    run() {

        this.setGeometricValues();
        this.calculateDeflection();
    }
  




    setGeometricValues() {

        if (!this.tubes) {
            alert("No tubes definition found")
        }

        let areaObject,inertiaObject,eiObject
    
        this.tubes.forEach((tube,index) => {

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

            // TUBE MOMENTS
            this.calculateRootMoment();
            this.calculateTubeMoments(tube);

            // TUBE M/EI VALUES
            this.calculateTubeM_EI(tube,index);

            // TUBE MOMENT - AREA
            this.calculateMomentArea(tube);

            // TUBE x bar VALUE
            this.calculateTubeXBar(tube);
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


    calculateRootMoment() {
        this.sys.mRootNmm = this.sys.horLoad*this.sys.totalHeight; // Nmm
        this.sys.mRootNm = this.sys.mRootNmm/1000; // Nm
    } 


    calculateTubeMoments(tube){
    
        tube.mA = this.sys.mRootNmm*tube.zA/this.sys.totalHeight-this.sys.mRootNmm; // Nmm
        tube.mB = this.sys.mRootNmm*tube.zB/this.sys.totalHeight-this.sys.mRootNmm; // Nmm
        tube.mC = this.sys.mRootNmm*tube.zC/this.sys.totalHeight-this.sys.mRootNmm; // Nmm
        tube.mD = this.sys.mRootNmm*tube.zD/this.sys.totalHeight-this.sys.mRootNmm; // Nmm
        tube.mE = this.sys.mRootNmm*tube.zE/this.sys.totalHeight-this.sys.mRootNmm; // Nmm
        tube.mF = this.sys.mRootNmm*tube.zF/this.sys.totalHeight-this.sys.mRootNmm; // Nmm
    } 
    

    calculateTubeM_EI(tube,index){

        if (index <1) {
            tube.meiBottom = tube.mA/tube.ei
        } else {    
            tube.meiBottom = tube.mC/tube.ei
        }

        tube.meiTop = tube.mF/tube.ei
    } 

    calculateMomentArea(tube){
        tube.momentArea = (tube.zTop-tube.zBottom)*(tube.meiTop+tube.meiBottom)/2;    
    } 
    

    calculateTubeXBar(tube){
    
        let width = Math.abs(tube.zTop-tube.zBottom)

        let mB = Math.abs(tube.meiBottom)
        let mT = Math.abs(tube.meiTop)

        let totalArea = (mB+mT)*width/2
        let rectArea = mB > mT ? mT*width : mB*width
        let triArea = Math.abs(mT-mB)*width/2

        let xbar_rectangle = width/2
        let xbar_triangle = mB > mT ? width/3 : 2*width/3

        let xbar = (rectArea*xbar_rectangle+triArea*xbar_triangle)/totalArea

        tube.zXBar =tube.zBottom+xbar
    }
    

    CalculateSubSystemDeflection(subTubesArray) {

        let momentArmLocation = subTubesArray[subTubesArray.length-1].zTop
    
        let deflection = 0
    
        subTubesArray.forEach((t) => {
            deflection = deflection+t.momentArea*(momentArmLocation-t.zXBar)
        })
        
        return deflection
    }


    calculateDeflection(){

        let tubesCloned = structuredClone(this.tubes);
        let sayac = tubesCloned.length
        let deflectionTop;
    
        for (let i = sayac; i >= 1; i--) {
    
            deflectionTop = this.CalculateSubSystemDeflection(tubesCloned)
            tubesCloned.pop()
    
            this.tubes[i-1].deflectionTop = deflectionTop
        }
    }    
}