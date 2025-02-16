function runSequence() {

    console.log("Running function :",arguments.callee.name);


    // Calculations : functions.js
    // runCalculations()



    // Geometry-Properties Summary Table : propsTable.js
    //renderGeoPropsTable()

    // Render Charts : plotly.js
    //drawCharts()


    // Configurations : confs.js
    //getConfOptions()


    let newData = new DataIntegrityClass(data)

    data = newData.data



    let clone = structuredClone(data);
    let clone2 = structuredClone(data);


    let mainBeam = new BeamDeflection(clone)
    mainBeam.run()


    let figure = new CanvasClass(clone2)
    figure.run()


    let tablo = new PropsTable(mainBeam.data);
    tablo.renderGeoPropsTable()


    let chart = new ChartClass(mainBeam.data);
    chart.deflectionGraph();
    chart.meiGraph();


    let clone3 = structuredClone(mainBeam.data);

    let configurations = new ConfigurationClass(clone3);
    configurations.getMastConfigurations()



}







function setValues() {

    document.getElementById('zOffset').value= data.sys.zOffset
    document.getElementById('horLoad').value = data.sys.horLoad
}


function updateValues() {

    data.sys.zOffset = document.getElementById('zOffset').value
    data.sys.horLoad = document.getElementById('horLoad').value
}