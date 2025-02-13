function runSequence() {

    console.log("Running function :",arguments.callee.name);


    // Calculations : functions.js
    runCalculations()

    // DrawCanvas : canvas.js
    drawGeometry()

    // Geometry-Properties Summary Table : propsTable.js
    renderGeoPropsTable()

    // Render Charts : plotly.js
    drawCharts()


    // Configurations : confs.js
    //getConfOptions()

}







function setValues() {

    document.getElementById('zOffset').value= data.sys.zOffset
    document.getElementById('horLoad').value = data.sys.horLoad
}


function updateValues() {

    data.sys.zOffset = document.getElementById('zOffset').value
    data.sys.horLoad = document.getElementById('horLoad').value
}