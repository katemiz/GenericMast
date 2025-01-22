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
        area.innerHTML = tube.area.toFixed(2)

        let mass = document.createElement('td');
        mass.classList.add('text-right')
        mass.innerHTML = tube.mass.toFixed(2)

        let inertia = document.createElement('td');
        inertia.classList.add('text-right')
        inertia.innerHTML = tube.inertia.toFixed(2)

        let young = document.createElement('td');
        young.classList.add('text-right')
        young.innerHTML = tube.E/1E9.toFixed(2)

        let ei = document.createElement('td');
        ei.classList.add('text-right')
        ei.innerHTML = tube.ei.toFixed(2)

        let mom= document.createElement('td');
        mom.classList.add('text-right')

        let kkk = tube.mCritical ? tube.mCritical :tube.mBottom
        mom.innerHTML = 'Bottom :' +tube.mBottom.toFixed(2)+'<br>Critical :'+kkk.toFixed(2)+'<br>Top :'+tube.mTop.toFixed(2)


        let mei= document.createElement('td');
        mei.classList.add('text-right')

        let bbb = 1E6*tube.mBottom/tube.ei
        let ttt = 1E6*tube.mTop/tube.ei
        let ccc = tube.mCritical ? 1E6*tube.mCritical/tube.ei :1E6*tube.mBottom/tube.ei

        mei.innerHTML = 'Bottom :' +bbb.toFixed(2)+'<br>Critical :'+ccc.toFixed(2)+'<br>Top :'+ttt.toFixed(2)

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