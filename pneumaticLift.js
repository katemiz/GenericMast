
window.onload = function() {

    let d = 100;    // mm
    let pi = 2;     // bar

    document.getElementById('dia').value = d;
    document.getElementById('pi').value = pi;

    Calculate();

    CalculateTubeDims();

    GetMomentCapability();
}



function Calculate() {

    d  = parseFloat(document.getElementById('dia').value);
    pi = parseFloat(document.getElementById('pi').value);


    // Circular Area

    let a = Math.PI/4*Math.pow(d,2);

    let pi_mpa = pi*0.1;
    let pi_psi = 14.5038*pi;




    let fN = pi_mpa*a
    let fkg = fN/9.81

    console.log("a",a)
    console.log("pi_mpa",pi_mpa)



    console.log("fN",fN)

    document.getElementById('a').innerHTML = a.toFixed(2)
    document.getElementById('pi_mpa').innerHTML = pi_mpa.toFixed(2)
    document.getElementById('pi_psi').innerHTML = pi_psi.toFixed(1)



    document.getElementById('fN').innerHTML = fN.toFixed(0)+' / '+fkg.toFixed(0)




}






function CalculateTubeDims() {

    console.log('*****************')

    let allowable = 170; // MPa
    
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





function GetMomentCapability() {


    console.log("----------------------------")

    let allowable = 170; // MPa

    let weight;
    
    
    let id = 44; // mm
    let t = 2.0; //
    
    let od = id+2*t;


    let moment = allowable*Math.PI*(Math.pow(od,4)-Math.pow(id,4))/(32*od*1000)

    console.log("OD %s, ID %s, THK %s, MOMENT %s",od.toFixed(2),id.toFixed(2),t.toFixed(2),moment.toFixed(0))



    for (let index = 0; index < 17; index++) {


        id = od+14;
        t = t+0.2;

        od = id+2*t;


        moment = allowable*Math.PI*(Math.pow(od,4)-Math.pow(id,4))/(32*od*1000)


        weight = 2.7*(Math.pow(od,2)- Math.pow(id,2))*Math.PI/4

        console.log("OD %s, ID %s, THK %s, MOMENT %s WEIGHT %s",od.toFixed(2),id.toFixed(2),t.toFixed(2),moment.toFixed(0), weight.toFixed(1))

        
    }











}