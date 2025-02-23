class PropsTable {

    constructor(data) {

        // Data
        this.tubes = data.tubes;
        this.sys = data.sys;
        this.overlaps = data.overlaps;

        this.summaryTable()
    }



    summaryTable() {

        
        let summaryDiv = document.getElementById("summaryTable")

        // TABLE
        let t = document.createElement('table')
        t.classList.add('table','is-fullwidth')
    
        let thead = document.createElement('thead')
        let tr = document.createElement('tr')
    
        let tbody = document.createElement('tbody')
        tbody.id='summary'


        let thData = [
            'Number of Sections',
            'Nested Height <br>mm',
            'Extended Height<br>mm',
            'Total Height with zOffset<br>mm',
        ];
    
        for (let index = 0; index < thData.length; index++) {
            let th = document.createElement('th')
            th.innerHTML = thData[index]
            tr.appendChild(th)
        }

        thead.appendChild(tr)
    
        t.appendChild(thead)
        t.appendChild(tbody)
    
        summaryDiv.appendChild(t)

        let tr2 = document.createElement('tr')

        let td2 = document.createElement('td')
        td2.innerHTML = this.tubes.length

        let td3 = document.createElement('td')
        td3.innerHTML = this.sys.nestedHeight

        let td4 = document.createElement('td')
        td4.innerHTML = this.sys.extendedHeight

        let td5 = document.createElement('td')
        td5.innerHTML = this.sys.totalHeight

        tr2.appendChild(td2)
        tr2.appendChild(td3)
        tr2.appendChild(td4)
        tr2.appendChild(td5)

        tbody.appendChild(tr2)




    }

    renderGeoPropsTable() {     

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
            'OD<br>(mm)',
            'Thk<br>(mm)',
            'Length<br>(mm)',
            // 'Area<br>mm<sup>2</sup>',
            'Mass<br>(kg)',
            // 'I<br>mm<sup>4</sup>',
            'E<br>(MPa)',
            // 'EI<br>Nmm<sup>2</sup>',
            'M<br>(Nmm)',
            // 'M/EI <br>(Bottom)<br>m<sup>-1</sup>',
            // 'M/EI <br>(Top)<br>m<sup>-1</sup>',
            'Movement<br>(mm)',
            'More'
        ];
    
        for (let index = 0; index < thData.length; index++) {
            let th = document.createElement('th')
            th.classList.add('has-text-right')
            th.innerHTML = thData[index]
            tr.appendChild(th)
        }
    
        thead.appendChild(tr)
    
        t.appendChild(thead)
        t.appendChild(tbody)
    
        tableDiv.appendChild(t)
    
        this.addRows()
    }
    


    addRows() {

        let div = document.getElementById('propsTable');


        let tbody = document.getElementById('tubes');
    
        this.tubes.forEach( (tube,index) => {
    
            let no = index+1;
    
            let rowEl = document.createElement('tr');
    
            let tubeNo = document.createElement('td');
            tubeNo.classList.add('has-text-right')
            tubeNo.innerHTML = no
    
            let od = document.createElement('td');
            od.classList.add('has-text-right')
            od.innerHTML = tube.od
    
            let thk = document.createElement('td');
            thk.classList.add('has-text-right')
            thk.innerHTML = tube.thickness
    
            let length = document.createElement('td');
            length.classList.add('has-text-right')
            length.innerHTML = tube.length
    
            // let area = document.createElement('td');
            // area.classList.add('has-text-right')
            // area.innerHTML = tube.areaMM2.toExponential(3)
    
            let mass = document.createElement('td');
            mass.classList.add('has-text-right')
            mass.innerHTML = tube.massKG.toFixed(2)
    
            // let inertia = document.createElement('td');
            // inertia.classList.add('has-text-right')
            // inertia.innerHTML = tube.inertiaMM4.toExponential(3)
    
            let young = document.createElement('td');
            young.classList.add('has-text-right')
            young.innerHTML = tube.E.toFixed(2)
    
            // let ei = document.createElement('td');
            // ei.classList.add('has-text-right')
            // ei.innerHTML = tube.ei.toExponential(3)
    
            let mom= document.createElement('td');
            mom.classList.add('has-text-right')
    
            mom.innerHTML = tube.mA.toFixed(2)+'<br>'+tube.mF.toFixed(2)
    
            // let meiB= document.createElement('td');
            // meiB.classList.add('has-text-right')
            // meiB.innerHTML = tube.meiBottom.toExponential(3)
    
            // let meiT= document.createElement('td');
            // meiT.classList.add('has-text-right')
            // meiT.innerHTML = tube.meiTop.toExponential(3)


            let movement= document.createElement('td');
            movement.classList.add('has-text-right')
            movement.innerHTML = tube.zA-tube.zAnested+'<br>'+tube.zA+'E<br>'+tube.zAnested+'N'


            let moreTD= document.createElement('td');

            let more= document.createElement('a');
            more.classList.add('has-text-link')
            more.setAttribute('index',index)
            more.addEventListener('click', () => toggleModal(index));

            more.innerHTML = 'more ...'

            moreTD.appendChild(more)
    
            rowEl.appendChild(tubeNo)
            rowEl.appendChild(od)
            rowEl.appendChild(thk)
            rowEl.appendChild(length)
            // rowEl.appendChild(area)
            rowEl.appendChild(mass)
    
            // rowEl.appendChild(inertia)
            rowEl.appendChild(young)
            // rowEl.appendChild(ei)
            rowEl.appendChild(mom)
            // rowEl.appendChild(meiB)
            // rowEl.appendChild(meiT)
            rowEl.appendChild(movement)
            rowEl.appendChild(more)

    
            tbody.appendChild(rowEl)


            // MODALS

            div.appendChild(this.addModal(tube,index))




        })
    
    }



    addModal(tube,index) {


        {/* <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <!-- Any other Bulma elements you want -->
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
        </div> */}

        let modal = document.createElement('div')
        modal.classList.add('modal')
        modal.id = 'modal'+index

        let modalBackground = document.createElement('div')
        modalBackground.classList.add('modal-background')
        modalBackground.addEventListener('click', () => toggleModal(index));

        let modalContent = document.createElement('div')
        modalContent.classList.add('modal-content','box')

        let title = document.createElement('h1')
        title.classList.add('title')
        title.innerHTML = 'Tube '+tube.no+' Details'
        modalContent.appendChild(title)

        let t = document.createElement('table')
        t.classList.add('table','is-fullwidth')

        // AREA
        t.appendChild(this.addTR('Area, mm<sup>2</sup>',tube.areaMM2))

        // INERTIA
        t.appendChild(this.addTR('Inertia, mm<sup>4</sup>',tube.inertiaMM4))

        // YOUNG
        t.appendChild(this.addTR('Young Modulus, MPa',tube.E))

        // EI   
        t.appendChild(this.addTR('EI, Nmm<sup>2</sup>',tube.ei))

        // M
        t.appendChild(this.addTR('M, Nm',tube.mA))

        // M/EI
        t.appendChild(this.addTR('M/EI (Bottom), m<sup>-1</sup>',tube.meiBottom))
        t.appendChild(this.addTR('M/EI (Top), m<sup>-1</sup>',tube.meiTop))

        // MOVEMENT
        t.appendChild(this.addTR('Movement, mm',tube.zA-tube.zAnested)) 

        let modalClose = document.createElement('button')
        modalClose.classList.add('modal-close','is-large')
        modalClose.setAttribute('aria-label','close')
        modalClose.addEventListener('click', () => toggleModal(index));

        modal.appendChild(modalBackground)
        modal.appendChild(modalContent)
        modalContent.appendChild(t)
        modal.appendChild(modalClose)

        return modal
    }


    addTR(header,value) {

        let tr = document.createElement('tr')

        let th = document.createElement('th')
        th.innerHTML = header

        let td = document.createElement('td')
        td.classList.add('has-text-right')
        td.innerHTML = value.toExponential(3)+'<br>'+value.toFixed(3)

        tr.appendChild(th)
        tr.appendChild(td)
        
        return tr
    }

}











