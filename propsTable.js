function runInputTable() {

    let tableDiv = document.getElementById("propsTable")

    // TABLE
    let t = document.createElement('table')
    let thead = document.createElement('thead')
    let tr = document.createElement('tr')

    let tbody = document.createElement('tbody')
    tbody.id='tubes'

    let thData = [
        'No',
        'OD<br>mm',
        'Thk<br>mm',
        'Length<br>mm',
        'Area<br>mm<sup>2</sup>',
        'Mass<br>kg',
        'I<br>mm<sup>4</sup>',
        'E<br>MPa',
        'EI<br>Nmm<sup>2</sup>',
        'M<br>Nm',
        'M/EI<br>m<sup>-1</sup>'
    ];

    for (let index = 0; index < thData.length; index++) {
        let th = document.createElement('th')
        th.innerHTML = thData[index]

        tr.appendChild(th)
    }

    thead.appendChild(tr)

    t.appendChild(thead)
    t.appendChild(tbody)

    tableDiv.appendChild(t)
}