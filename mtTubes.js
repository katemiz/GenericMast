
window.onload = function() {

    PrepareModals();
    MasttechProfiles();
}


const fos = 2.0; // Factor of Safety
const L = 3000; // mm
const E = 210000; // MPa for Aluminum
const allowable = 170; // MPa
const pi = 2; // Bars




function PrepareModals() {


    // Axial Load Calculation

    document.getElementById('m1').innerHTML = `
    <ul>
    <li>Axial Load Calculation</li>

    <li>Tubes materials are aluminium with `+allowable+` MPa Yield Strength</li>

    <li>Modulus of Elasticity for Aluminum `+E+` MPa</li>
    <li>Length for axial load calculation is aken as `+length+` mm</li>

    <ul>`







}






function CalculateTubeDims() {

    console.log('*****************')

    
    const deltaMoment = 500; // Nm
    
    let outerDia = 48; // mm
    
    let c,innerDia,thickness,boru


    let mci = deltaMoment*32000*outerDia/(allowable*Math.PI)

    innerDia = Math.pow(Math.pow(outerDia,4)-mci,0.25)





    thickness = (outerDia-innerDia)/2

    // console.log('thickness ilk',thickness.toFixed(2))
    console.log("Boru 1: OD %s ID %s THK %s", outerDia.toFixed(1),innerDia.toFixed(1),thickness.toFixed(2))

    
    for (let index = 2; index < 20; index = index+1) {
    
        c = outerDia/2;

        innerDia = innerDia+2*thickness+14

        boru = SolveIteration(parseFloat(thickness),index*deltaMoment,innerDia,allowable)


    
        // innerDia = Math.pow(Math.pow(outerDia,4)-index*deltaMoment*1000*c/allowable*64/Math.PI,0.25)

        //console.log('innerDia',innerDia)
        
        // thickness = (outerDia-innerDia)/2

        // console.log("Boru , OD, ID, thk",index, outerDia.toFixed(1),innerDia.toFixed(1),thickness)

        
        // outerDia = outerDia+14;


        console.log("Boru %d : OD %s ID %s THK %s STRESS %s MOMENT %s", index,boru.od.toFixed(1),boru.id.toFixed(1),boru.thk.toFixed(2),boru.stress.toFixed(2),boru.M.toFixed(0))
    
    }
}





function SolveIteration(thickness,M,id,allowable) {


    let od,stress

    let count=1

    // console.log('thickness iteration içinde1',thickness)



    // console.log('thickness iteration içinde2',thickness)




    while (count < 300) {



        od = id+2*thickness

        // console.log(id,od,thickness)

        stress = 64*1000*M*od/(2*Math.PI*(Math.pow(od,4)-Math.pow(id,4)))
        
        



        // console.log('allowable,stress',lowerLimit.toFixed(1),upperLimit.toFixed(1),stress.toFixed(1),thickness.toFixed(2))


        // console.log("allowables [%s-%s] Stress : %s", lowerLimit.toFixed(1), upperLimit.toFixed(1),stress.toFixed(1))

        if (parseFloat(0.99*allowable) <= stress  && stress <= parseFloat(1.00*allowable)) {
            // console.log('returning t', thickness)





            return {"od":od,"id":id,"thk":thickness,"stress":stress,"M":M}
        }



        if (stress > allowable) {

            thickness = 1.01*thickness
        } else {
            thickness = 0.99*thickness

        }



        count++
    }

    console.log('olmadi')

    return false
}





function MasttechProfiles() {


    let tNo,id,od,t,moment,mass,liftCapacity;
    let tr,tdOd,tdId,tdThk,tdMoment,tdMass,tdLift1,tdLift2;

    
    
    id = 44; // mm
    t = 2.0; //
    od = id+2*t;






    for (let index = 0; index < 16; index++) {





        moment = CalculateMomentCapability(od,id)
        mass = CalculateMass(od,id)
        liftCapacity = CalculateLiftCapacity(od)




        tNo = document.createElement("th");


        tdOd = document.createElement("td");
        tdOd.classList.add("has-text-right");
        tdId = document.createElement("td");
        tdId.classList.add("has-text-right");
        tdThk = document.createElement("td");
        tdThk.classList.add("has-text-right");
        tdMass = document.createElement("td");
        tdMass.classList.add("has-text-right");
        tdMoment = document.createElement("td");
        tdMoment.classList.add("has-text-right");
        tdLift1 = document.createElement("td");
        tdLift1.classList.add("has-text-right");

        tdLift2 = document.createElement("td");
        tdLift2.classList.add("has-text-right");

        tr = document.createElement("tr");
        tr.appendChild(tNo);
        tr.appendChild(tdOd);
        tr.appendChild(tdId);
        tr.appendChild(tdThk);
        tr.appendChild(tdMass);
        tr.appendChild(tdMoment);
        tr.appendChild(tdLift1);
        tr.appendChild(tdLift2);

        document.getElementById("tableBody").appendChild(tr);

        tNo.innerHTML = index+1;
        tdOd.innerHTML = od.toFixed(2)+' mm';
        tdId.innerHTML = id.toFixed(2)+' mm';
        tdThk.innerHTML = t.toFixed(2)+' mm';
        tdMoment.innerHTML = moment.toFixed(0)+' Nm';
        tdMass.innerHTML = mass.toFixed(1)+' kg';
        tdLift1.innerHTML = liftCapacity.fN.toFixed(0)+' N';
        tdLift2.innerHTML = liftCapacity.fkg.toFixed(0)+' kg';

        tdCriticalLoad = document.createElement("td");
        tdCriticalLoad.classList.add("has-text-right");
        tdCriticalLoad.innerHTML = ProfileLoadCapacity(od,id).toFixed(0)+' N';
        tr.appendChild(tdCriticalLoad);



        id = od+14;
        t = t+0.2;
        od = id+2*t;
        
    }







    function CalculateMomentCapability(od,id) {
        let moment = allowable*Math.PI*(Math.pow(od,4)-Math.pow(id,4))/(32*od*1000)
        return moment
    }

    function CalculateMass(od,id) {
        let mass = 2.7*(Math.pow(od,2)- Math.pow(id,2))*Math.PI/4000
        return mass
    }



    function CalculateLiftCapacity(od) {

        // Circular Area
        let a = Math.PI/4*Math.pow(od,2);
    
        let pi_mpa = pi*0.1;


        return {
            "fN": pi_mpa*a,
            "fkg": pi_mpa*a/9.81
        }
    }








    function ProfileLoadCapacity(od,id) {

        
        // Euler Column Critical Load Formula is used
        
        // Pcr = π^2EI/L^2
        // E = Young's Modulus
        // I = Moment of Inertia
        // L = Length of the column
        // Pcr = Critical Load

        return Math.PI*E*HollowTubeInertia(od,id)/(Math.pow(L,2)*fos)
    }


    function HollowTubeInertia(od,id) {

        // Moment of Inertia for a hollow tube
        // I = π/64*(od^4-id^4)
        // od = outer diameter
        // id = inner diameter


        return Math.PI/64*(Math.pow(od,4)-Math.pow(id,4))

    }

}