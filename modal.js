let showModal = false
let noOfSections = 15


function toggleModal () {

    let m = document.getElementById('paramsModal')

    if (showModal) {
        m.classList.remove('is-active')
    } else {
        m.classList.add('is-active')
    }
    showModal = !showModal
}










function renderModalContent(noOfSections) {

    /*
    Modal
    |---- Background
    |---- Card
        |---- Header
        |---- Section
        |---- Footer

    */

    let m = document.getElementById('paramsModal');

    // MODAL BACKGROUND
    let mb = document.createElement('div')
    mb.classList.add('modal-background')
    mb.addEventListener('click',toggleModal)
    m.appendChild(mb)

    // MODAL CARD
    let mc = document.createElement('div')
    mc.classList.add('modal-card')

    // MODAL HEADER
    let mh = document.createElement('header')
    mh.classList.add('modal-card-head')

    let mh_p = document.createElement('p')
    mh_p.classList.add('modal-card-title')
    mh_p.innerHTML = 'Mast Dimensions and Parameters'

    let mh_b = document.createElement('buttom')
    mh_b.classList.add('delete')
    mh_b.innerHTML = 'Mast Dimensions and Parameters'

    mh.appendChild(mh_p)
    mh.appendChild(mh_b)
    mc.appendChild(mh)

    // SECTION
    let ms = document.createElement('section')
    ms.classList.add('modal-card-bod')

    mc.appendChild(ms)

    for (let index = 1; index < noOfSections; index++) {
        let tubeCard = addField(index)
        mc.appendChild(tubeCard)
    }

    // FOOTER
    let mf_b1 = document.createElement('button')
    mf_b1.classList.add('button', 'is-success')
    mf_b1.innerHTML = 'Save Changes'
    mf_b1.addEventListener('click',refreshCalcs)

    let mf_b2 = document.createElement('button')
    mf_b2.classList.add('button', 'is-success')
    mf_b2.innerHTML = 'Cancel'
    mf_b2.addEventListener('click',toggleModal)

    let mf_bs = document.createElement('div')
    mb.classList.add('buttons')

    mf_bs.appendChild(mf_b1)
    mf_bs.appendChild(mf_b2)

    let mf_f = document.createElement('footer')
    mf_f.classList.add('modal-card-foot')

    mf_f.appendChild(mf_bs)

    // MODAL
    m.appendChild(mb)   // Background
    m.appendChild(mc)   // Card -> Header - Section - Footer
}


function addField(index) {


    let p1 = document.createElement('p')
    p1.classList.add('title','is-4')
    p1.innerHTML = 'Section Tube'+index

    let divMc = document.createElement('div')
    divMc.classList.add('media-content')

    let divM = document.createElement('div')
    divM.classList.add('media')

    divMc.appendChild(p1)
    divM.appendChild(divMc)

    let divC = document.createElement('div')
    divC.classList.add('card')

    divC.appendChild(divMc)

    return divC
}







function parametersButton() {

    let horField = document.createElement('div')
    horField.classList.add('field','is-horizontal')

    let fieldLabel = document.createElement('div')
    fieldLabel.classList.add('field-label','is-normal')

    let label = document.createElement('label')
    label.classList.add('label')
    label.innerHTML = 'Number of Sections/Tubes?'

    let fieldBody = document.createElement('div')
    fieldBody.classList.add('field-body')

    let field = document.createElement('div')
    field.classList.add('field')

    let pcontrol = document.createElement('p')
    pcontrol.classList.add('control')

    let selSpan = document.createElement('span')
    selSpan.classList.add('select')

    let selectEL = document.getElementById("select");

    for (let index = 1; index < noOfSections; index++) {

        let option = document.createElement("option");
        option.text = index;
        option.value = index;

        if (noOfSections === index) {
            option.selected = true
        }

        selectEL.appendChild(option)
        selectEL.addEventListener('change',getNoOfSections)
    }
}


function getNoOfSections() {

    noOfSections = document.getElementById('getNoOfSections').value
    console.log(noOfSections)

}

