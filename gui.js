function summary() {

    let tbody = document.getElementById('tubes');

    let rows = [];

    data.tubes.forEach( (tube,index) => {

        let no = index+1;

        let rowEl = document.createElement('tr');

        let tubeNo = document.createElement('td');
        tubeNo.innerHTML = no

        let od = document.createElement('td');
        od.innerHTML = tube.od

        let thk = document.createElement('td');
        thk.innerHTML = tube.thk

        let length = document.createElement('td');

        length.innerHTML = tube.length

        let overlap = document.createElement('td');
        overlap.innerHTML = tube.overlap

        rowEl.appendChild(tubeNo)
        rowEl.appendChild(od)
        rowEl.appendChild(thk)
        rowEl.appendChild(length)
        rowEl.appendChild(overlap)

        tbody.appendChild(rowEl)

    })
}