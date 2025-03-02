

window.onload = function() {

    let orgData = structuredClone(data)

    // Add calculated data to the data object [Area, Inertia, etc.]
    let newData = new DataIntegrityClass(data)

    let clone = structuredClone(newData.data);
    let clone2 = structuredClone(newData.data);

    // Calculate Deflection of All Tubes
    let beamDef = new BeamDeflection(clone)
    beamDef.run()

    // Draw General Figure of All Tubes, Load and Offset
    let figure = new CanvasClass(clone2)
    figure.run()


    // Populate Properties Table
    let tablo = new PropsTable(beamDef.data);
    tablo.renderGeoPropsTable()


    // Draw Chart for M, M/EI and Overall Deflection
    let chart = new ChartClass(beamDef.data);
    chart.deflectionGraph();
    chart.meiGraph();


    // Populate Possible Configurations and Their Properties [Deflection, Weight]
    let clone3 = structuredClone(orgData);

    let configurations = new ConfigurationClass(clone3);
    configurations.getMastConfigurations()




    // console.log("orgData",orgData,clone3)



};








function setValues() {

    document.getElementById('zOffset').value= data.sys.zOffset
    document.getElementById('horLoad').value = data.sys.horLoad
}


function updateValues() {

    data.sys.zOffset = document.getElementById('zOffset').value
    data.sys.horLoad = document.getElementById('horLoad').value
}