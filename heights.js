
window.onload = function() {

    let n = 6;
    let H = 200;
    let L = 3000;
    let ol = 800;


    document.getElementById('n').value = n;
    document.getElementById('H').value = H;
    document.getElementById('L').value = L;
    document.getElementById('ol').value = ol;



    Calculate()





}



function Calculate() {

    n  = parseFloat(document.getElementById('n').value);
    H = parseFloat(document.getElementById('H').value);
    L = parseFloat(document.getElementById('L').value);
    ol = parseFloat(document.getElementById('ol').value);

    console.log(n,H,L,ol)



    let eh = n*L-(n-1)*ol
    let nh = L+(n-1)*H

    console.log(eh,nh)


    document.getElementById('eh').innerHTML = eh
    document.getElementById('nh').innerHTML = nh


    ZCoordinates(n,H,L,ol)

}

function ZCoordinates(n,H,L,ol) {

    let z = 0;

    let zTopExtended, zBottomExtended,zTopNested,zBottomNested;

    let dizin = []

    for (let index = 1; index <=n; index++) {

        zTopExtended = z+L,

        zBottomExtended = zTopExtended-ol



        // z = index*L-(index-1)*ol

        z= zBottomExtended

        console.log("z, bottom, top",z,zBottomExtended,zTopExtended)

        // zTopExtended = index*L-(index-1)*ol,
        // zBottomExtended = zTopExtended-ol




        zTopNested = L+ (index-1)*H
        zBottomNested = zTopNested -L




        dizin.push({

            "no":index,
            "zTopExtended":zTopExtended,
            "zBottomExtended":zBottomExtended,
            "zTopNested":zTopNested,
            "zBottomNested":zBottomNested,
            "travel":zBottomExtended-zBottomNested,

            




        })

        
        
    }



    dizin.forEach(t => {


        let dl = document.createElement('dl')
        dl.classList.add('card','p-4')
        let dt = document.createElement('dl')
        dt.innerHTML = "Tube"+t.no
        dt.classList.add('is-size-3')

    
        let dd1 = document.createElement('dd')
        dd1.innerHTML = "Top Z (Extended) : "+t.zTopExtended

        let dd2 = document.createElement('dd')
        dd2.innerHTML = "Bottom Z (Extended) : "+t.zBottomExtended

        let dd3 = document.createElement('dd')
        dd3.innerHTML = "Top Z (Nested) : "+t.zTopNested

        let dd4 = document.createElement('dd')
        dd4.innerHTML = "Bottom Z (Nested) : "+t.zBottomNested

        dl.appendChild(dt)
        dl.appendChild(dd1)
        dl.appendChild(dd2)
        dl.appendChild(dd3)
        dl.appendChild(dd4)

        document.getElementById('values').appendChild(dl)
        
    });






    console.log(dizin)


}

