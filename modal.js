let showModal = false
const maxNoOfSections = 15
//let noOfSections = maxNoOfSections;

let currentSectionsNo = data.tubes.length


function toggleModal (index = false) {

    let m;

    if ( Number.isInteger(index)) {

        m = document.getElementById('modal'+index)

    } else {

        m = document.getElementById('modal')
        renderModalContent()
    }

    if (showModal) {
        m.classList.remove('is-active')
    } else {
        m.classList.add('is-active')
    }

    showModal = !showModal
}







function renderModalContent() {


    /*
        Modal
        |---- Background
        |---- Card
            |---- Header
            |---- Section
            |---- Footer
    */


    // SECTIONS NO BUTTON
    noOfSectionsButton()

    // SECTION
    renderAllTubeCards()

}





function textFields(id,labelText,helpText=false,placeholder,width='is-4') {

    /*

    <div class="column width field">
        <label class="label">labelText</label>
        <div class="control">
        <input class="input" type="text" placeholder="placeholder" id="inp+id">
        </div>
        <p class="help is-size-7">helpText</p>
    </div>

    */


    let d = document.createElement('div')
    d.classList.add('column','field',width)

    let label = document.createElement('label')
    label.classList.add('label')
    label.innerHTML = labelText

    let control = document.createElement('div')
    control.classList.add('control')

    let input = document.createElement('input')
    input.classList.add('input')
    input.type = 'text'
    input.placeholder = placeholder
    input.id = 'inp'+id

    if (helpText) {
        let p = document.createElement('p')
        p.classList.add('help','is-size-7')
        p.innerHTML = helpText
        d.appendChild(p)
    }

    d.appendChild(label)
    d.appendChild(control)
    control.appendChild(input)

    return d
}



function renderAllTubeCards() {   


    for (let index = 1; index <= currentSectionsNo; index++) {
        addOneTubeCard(index)
    }
}








function noOfSectionsButton() {







    let select = document.getElementById('getNoOfSections')
    select.id = 'getNoOfSections'


    for (let index = 1; index <= maxNoOfSections; index++) {
        
        let option = document.createElement("option");
        option.text = index;
        option.value = index;

        if (currentSectionsNo == index) {
            option.selected = true
        }

        select.appendChild(option)
    }


    // Z-Offset value
    let zOffset = document.getElementById('zOffset')
    zOffset.value = data.sys.zOffset

    // Horizontal Load value
    let horLoad = document.getElementById('horLoad')
    horLoad.value = data.sys.horLoad





}











function addOneTubeCard(index) {

    console.log("Running function :",arguments.callee.name);

    /*
    <div class="columns">

        <div class="column is-1 is-size-2 has-text-weight-bold">S1</div>

        <div class="column">
            <div class="columns">

                <div class="column is-4 field">
                    <label class="label">Outer Diameter</label>
                    <div class="control">
                    <input class="input" type="text" placeholder="N" id="horLoad">
                    </div>
                    <p class="help">Horizontal load acting on payload (N)</p>
                </div>

                <div class="column is-4 field">
                    <label class="label">Thickness</label>
                    <div class="control">
                    <input class="input" type="text" placeholder="N" id="horLoad">
                    </div>
                    <p class="help">Horizontal load acting on payload (N)</p>
                </div>


                <div class="column is-4 field">
                    <label class="label">Length</label>
                    <div class="control">
                    <input class="input" type="text" placeholder="N" id="horLoad">
                    </div>
                    <p class="help">Horizontal load acting on payload (N)</p>
                </div>

            </div>

            <div class="columns">

                <div class="column is-4 field">
                    <label class="label">Material</label>
                    <div class="control">
                    <input class="input" type="text" placeholder="N" id="horLoad">
                    </div>
                    <p class="help">Horizontal load acting on payload (N)</p>
                </div>


                <div class="column is-4 field">
                    <label class="label">Overlap</label>
                    <div class="control">
                    <input class="input" type="text" placeholder="N" id="horLoad">
                    </div>
                    <p class="help">Horizontal load acting on payload (N)</p>
                </div>

                <div class="column is-4 field">
                    <label class="label">Heading</label>
                    <div class="control">
                    <input class="input" type="text" placeholder="N" id="horLoad">
                    </div>
                    <p class="help">Horizontal load acting on payload (N)</p>
                </div>




            </div>
        </div>
    </div>
    */


    let card = document.createElement('div')
    card.classList.add('columns')

    let cardTitle = document.createElement('div')
    cardTitle.classList.add('column','is-1','is-size-2','has-text-weight-bold')
    cardTitle.innerHTML = 'S'+index

    let cardBody = document.createElement('div')
    cardBody.classList.add('column')

    card.appendChild(cardTitle)
    card.appendChild(cardBody)

    let cardBodyRow1 = document.createElement('div')
    cardBodyRow1.classList.add('columns')   

    let cardBodyRow2 = document.createElement('div')
    cardBodyRow2.classList.add('columns')

    cardBody.appendChild(cardBodyRow1)
    cardBody.appendChild(cardBodyRow2)





    let odField = textFields('varOD','OD','Outer Diameter of Tube','mm')
    let thkField = textFields('varTHK','Thickness','Thickness of Tube','mm')
    let lenField = textFields('varLength','Length','Length of Tube','mm')

    cardBodyRow1.appendChild(odField)
    cardBodyRow1.appendChild(thkField)
    cardBodyRow1.appendChild(lenField)



    let materialField = textFields('varMaterial','Material','Material of Tube','')
    let overlapField = textFields('varOverlap','Overlap','Overlap of Tube','')
    let headingField = textFields('varHeading','Heading','Heading of Tube','')


    cardBodyRow2.appendChild(materialField)
    cardBodyRow2.appendChild(overlapField)
    cardBodyRow2.appendChild(headingField)






    document.getElementById('mst').appendChild(card)








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

