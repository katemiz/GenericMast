function runPropsTable() {

    let tableDiv = document.getElementById("propsTable")

    // TABLE
    let t = document.createElement('table')
    t.classList.add('table','is-fullwidth')

    let thead = document.createElement('thead')
    let tr = document.createElement('tr')

    let tbody = document.createElement('tbody')
    tbody.id='tubes'

    let thData = [
        'No',
        'OD<br>mm',
        'Thk<br>mm',
        'Length<br>mm',
        'Area<br>mm<sup>2</sup>',
        'Mass<br>kg',
        'I<br>mm<sup>4</sup>',
        'E<br>MPa',
        'EI<br>Nmm<sup>2</sup>',
        'M<br>Nm',
        'M/EI<br>m<sup>-1</sup>'
    ];

    for (let index = 0; index < thData.length; index++) {
        let th = document.createElement('th')
        th.innerHTML = thData[index]

        tr.appendChild(th)
    }

    thead.appendChild(tr)

    t.appendChild(thead)
    t.appendChild(tbody)

    tableDiv.appendChild(t)

    summary()
}



function summary() {

    let tbody = document.getElementById('tubes');

    data.tubes.forEach( (tube,index) => {

        let no = index+1;

        let rowEl = document.createElement('tr');

        let tubeNo = document.createElement('td');
        tubeNo.innerHTML = no

        let od = document.createElement('td');
        od.innerHTML = tube.od

        let thk = document.createElement('td');
        thk.innerHTML = tube.thickness

        let length = document.createElement('td');

        length.innerHTML = tube.length

        let area = document.createElement('td');
        area.classList.add('text-right')
        area.innerHTML = tube.area.toExponential(3)

        let mass = document.createElement('td');
        mass.classList.add('text-right')
        mass.innerHTML = tube.mass.toFixed(2)

        let inertia = document.createElement('td');
        inertia.classList.add('text-right')
        inertia.innerHTML = tube.inertia.toExponential(3)

        let young = document.createElement('td');
        young.classList.add('text-right')
        young.innerHTML = tube.E.toFixed(2)

        let ei = document.createElement('td');
        ei.classList.add('text-right')
        ei.innerHTML = tube.ei.toExponential(3)

        let mom= document.createElement('td');
        mom.classList.add('text-right')

        mom.innerHTML = tube.mA.toFixed(2)+'<br>'+tube.mF.toFixed(2)


        let mei= document.createElement('td');
        mei.classList.add('text-right')

        mei.innerHTML = tube.mei[0].z.toExponential(3)+'<br>'+tube.mei[0].mei.toExponential(3)

        rowEl.appendChild(tubeNo)
        rowEl.appendChild(od)
        rowEl.appendChild(thk)
        rowEl.appendChild(length)
        rowEl.appendChild(area)
        rowEl.appendChild(mass)

        rowEl.appendChild(inertia)
        rowEl.appendChild(young)
        rowEl.appendChild(ei)
        rowEl.appendChild(mom)
        rowEl.appendChild(mei)

        tbody.appendChild(rowEl)

    })

}