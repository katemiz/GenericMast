function runSequence() {

    let newData = new DataIntegrityClass(data)

    let clone = structuredClone(newData.data);
    let clone2 = structuredClone(newData.data);

    console.log('newData.data',clone)


    // Calculate Deflection
    let beamDef = new BeamDeflection(clone)
    beamDef.run()


    let figure = new CanvasClass(clone2)
    figure.run()


    let tablo = new PropsTable(beamDef.data);
    tablo.renderGeoPropsTable()


    let chart = new ChartClass(beamDef.data);
    chart.deflectionGraph();
    chart.meiGraph();


    let clone3 = structuredClone(beamDef.data);

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