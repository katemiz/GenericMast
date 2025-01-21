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
        young.innerHTML = tube.E.toFixed(2)

        let ei = document.createElement('td');
        ei.classList.add('text-right')
        ei.innerHTML = tube.ei.toFixed(2)

        rowEl.appendChild(tubeNo)
        rowEl.appendChild(od)
        rowEl.appendChild(thk)
        rowEl.appendChild(length)
        rowEl.appendChild(area)
        rowEl.appendChild(mass)

        rowEl.appendChild(inertia)
        rowEl.appendChild(young)
        rowEl.appendChild(ei)



        tbody.appendChild(rowEl)

    })







    let p = document.getElementById('nodes');


    data.tubes.forEach( (tube,index) => {


        let rowEl = document.createElement('tr');


        let no = document.createElement('td');
        no.innerHTML = index+1

        let nodes = document.createElement('td');

        let t = document.createElement('table');

        nodes.appendChild(t)



        tube.nodes.forEach((node) =>{


            let tr = document.createElement('tr');

            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3= document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td');
            let td6 = document.createElement('td');

            





        } )

        let position = document.createElement('td');
        position.innerHTML = node.z

        let m = document.createElement('td');
        m.innerHTML = node.moment




        rowEl.appendChild(no)
        rowEl.appendChild(position)
        rowEl.appendChild(m)



        p.appendChild(rowEl)

    })


















    let parent = document.getElementById('moments');


    data.moments.forEach( (moment,index) => {


        let rowEl = document.createElement('tr');


        let no = document.createElement('td');
        no.innerHTML = index+1

        let position = document.createElement('td');
        position.innerHTML = moment.h

        let m = document.createElement('td');
        m.innerHTML = moment.moment




        rowEl.appendChild(no)
        rowEl.appendChild(position)
        rowEl.appendChild(m)



        parent.appendChild(rowEl)

    })














}