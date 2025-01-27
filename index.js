function runSequence() {

    console.log("Running function :",arguments.callee.name);


    // Draw Tubes Geometry



    // Render Modal
    renderModalContent()

    // Calculations
    runCalculations()




    // Render Graph
    // drawMDiagram()

    // drawMeiChart()
    // drawDeflectionChart()

    deflectionGraph()
    meiGraph()


    // Set Values

    setValues()

    runPropsTable()

}







function setValues() {

    document.getElementById('zOffset').value= data.sys.zOffset
    document.getElementById('horLoad').value = data.sys.horLoad
}


function updateValues() {

    data.sys.zOffset = document.getElementById('zOffset').value
    data.sys.horLoad = document.getElementById('horLoad').value
}