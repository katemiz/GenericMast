let showModal = false
let maxNoOfSections = 15
let noOfSections = maxNoOfSections;

function toggleModal (index = false) {

    let m;

    if ( Number.isInteger(index)) {

        m = document.getElementById('modal'+index)

    } else {

        m = document.getElementById('modal')
    }

    if (showModal) {
        m.classList.remove('is-active')
    } else {
        m.classList.add('is-active')
    }

    showModal = !showModal
}







function renderModalContent() {

    console.log("Running function :",arguments.callee.name);

    /*
        Modal
        |---- Background
        |---- Card
            |---- Header
            |---- Section
            |---- Footer
    */


    // SECTION
    renderAllTubeCards()

}





function textFields(id,labelText,infoText,placeholder) {

    /*
        <div class="field">
        <label class="label">Name</label>
        <div class="control">
            <input class="input" type="text" placeholder="Text input">
        </div>
        <p class="help is-size-7">Info</p>
        </div>
    */


    let p1 = document.createElement('p')
    p1.classList.add('help','is-size-7')
    p1.innerHTML = infoText

    let input = document.createElement('input')
    input.type = 'text'
    input.classList.add('input','is-small')
    input.innerHTML = placeholder

    let control = document.createElement('div')


    let label = document.createElement('label')
    label.innerHTML = labelText

    let field = document.createElement('div')
    field.classList.add('field')

    field.appendChild(label)
    field.appendChild(control)
    control.appendChild(input)
    field.appendChild(p1)

    return field
}



function renderAllTubeCards() {   

    console.log("Running function :",arguments.callee.name);

    for (let index = 1; index <= noOfSections; index++) {
        addOneTubeCard(index)
    }
}






function addOneTubeCard(index) {

    console.log("Running function :",arguments.callee.name);

    /*
    <div class="columns">

        <div class="column is-1 is-size-2 has-text-weight-bold">S1</div>

        <div class="column">
            <div class="columns">
                <div class="column is-4">OD</div>
                <div class="column is-4">THK</div>
                <div class="column is-4">Length</div>
            </div>

            <div class="columns">
                <div class="column is-8">Material</div>
                <div class="column">Overlap</div>
            </div>
        </div>
    </div>
    */

    let divGrid = document.createElement('div')
    divGrid.id = 'tubeGrid'+index
    divGrid.classList.add('grid','my-4','has-background-warning')

    let odCell = document.createElement('div')
    odCell.classList.add('cell')

    let thkCell = document.createElement('div')
    thkCell.classList.add('cell')

    let lenCell = document.createElement('div')
    lenCell.classList.add('cell')

    divGrid.appendChild(odCell)
    divGrid.appendChild(thkCell)
    divGrid.appendChild(lenCell)

    let od = textFields('varOD','OD','Outer Diameter of Tube','mm') 
    odCell.appendChild(od)

    let thk = textFields('varTHK','Thickness','Thickness of Tube','mm') 
    thkCell.appendChild(thk)


    let tlength = textFields('varLength','Length','Length of Tube','mm') 
    lenCell.appendChild(tlength)

    document.getElementById('mst').appendChild(divGrid)


    return true
}







function SILrenderChangeParamsButton() {

    console.log("Running function :",arguments.callee.name);


    /*

    <div class="columns">
        <div class="column is-half">Number of Sections/Tubes?</div>
        <div class="column">fieldDiv</div>
    </div>

    */

    let columnsDiv = document.createElement('div')
    columnsDiv.classList.add('columns')

    let column1 = document.createElement('div')
    column1.classList.add('column','is-half')
    column1.innerHTML = 'Number of Sections/Tubes?'

    let column2 = document.createElement('div')
    column2.classList.add('column')

    columnsDiv.appendChild(column1)
    columnsDiv.appendChild(column2)

    /*

    <div class="field">
        <p class="control">
            <span class="select">
                <select>
                    <option selected>Country</option>
                    <option>Select dropdown</option>
                    <option>With options</option>
                </select>
            </span>
        </p>
    </div>

    */  


    let fieldDiv = document.createElement('div')
    fieldDiv.classList.add('field')

    column2.appendChild(fieldDiv)

    let pControl = document.createElement('p')

    fieldDiv.appendChild(pControl)


    let span = document.createElement('span')
    span.classList.add('select')

    pControl.appendChild(span)

    let select = document.createElement("select");
    select.id = 'getNoOfSections'


    span.appendChild(select)

    for (let index = 1; index <= maxNoOfSections; index++) {

        let option = document.createElement("option");
        option.text = index;
        option.value = index;

        if (noOfSections == index) {
            option.selected = true
        }

        select.appendChild(option)
        select.addEventListener('change',getNoOfSections)
    }

    return columnsDiv
}


function getNoOfSections() {

    console.log("Running function :",arguments.callee.name);


    let tempValue = document.getElementById('getNoOfSections').value



    for (let index = 1; index <= noOfSections; index++) {

        let ndx = 'tubeGrid'+index

        // if(index > noOfSections) {

            document.getElementById(ndx).remove()
        // }


    }

    noOfSections = tempValue





    renderAllTubeCards()




    console.log(noOfSections)




}

