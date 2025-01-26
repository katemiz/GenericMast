



function runSequence() {

    // Draw Tubes Geometry

    console.log("Running function :",arguments.callee.name);



    // Render Modal
    renderModalContent()

    // Calculations
    runCalculations()




    // Render Graph
    drawMDiagram()


    // Set Values

    setValues()
}







function setValues() {

    document.getElementById('zOffset').value= data.sys.zOffset
    document.getElementById('horLoad').value = data.sys.horLoad
}


function updateValues() {

    data.sys.zOffset = document.getElementById('zOffset').value
    data.sys.horLoad = document.getElementById('horLoad').value
}