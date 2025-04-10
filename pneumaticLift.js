
window.onload = function() {

    let d = 100;    // mm
    let pi = 2;     // bar

    document.getElementById('dia').value = d;
    document.getElementById('pi').value = pi;

    Calculate();

    CalculateTubeDims();
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



    document.getElementById('fN').innerHTML = fN.toFixed(1)+'/'+fkg.toFixed(1)




}






function CalculateTubeDims() {

    console.log('*****************')

    let allowable = 200; // MPa
    
    const deltaMoment = 500; // Nm
    
    let outerDia = 48; // mm
    
    let c,innerDia,thickness


    let mci = deltaMoment*32000*outerDia/(allowable*Math.PI)

    innerDia = Math.pow(Math.pow(outerDia,4)-mci,0.25)





    thickness = (outerDia-innerDia)/2

    console.log('thickness',thickness.toFixed(1))
    
    for (let index = 1; index < 18; index++) {
    
        c = outerDia/2;
    
        innerDia = Math.pow(Math.pow(outerDia,4)-index*deltaMoment*1000*c/allowable*64/Math.PI,0.25)

        //console.log('innerDia',innerDia)
        
        thickness = (outerDia-innerDia)/2

        console.log("Boru , OD, ID, thk",index, outerDia.toFixed(1),innerDia.toFixed(1),thickness.toFixed(1))

        
        outerDia = outerDia+14;
    
    }
}