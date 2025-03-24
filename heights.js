
window.onload = function() {



    Calculate()





}



function Calculate() {

    let n  = parseFloat(document.getElementById('n').value);
    let H = parseFloat(document.getElementById('H').value);
    let L = parseFloat(document.getElementById('L').value);
    let ol = parseFloat(document.getElementById('ol').value);

    console.log(n,H,L,ol)



    let eh = n*L-(n-1)*ol
    let nh = L+(n-1)*H

    console.log(eh,nh)


    document.getElementById('eh').innerHTML = eh
    document.getElementById('nh').innerHTML = nh

}

