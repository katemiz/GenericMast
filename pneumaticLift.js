
window.onload = function() {

    let d = 100;    // mm
    let pi = 2;     // bar

    document.getElementById('dia').value = d;
    document.getElementById('pi').value = pi;

    Calculate()
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


