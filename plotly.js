function deflectionGraph() {

    TESTER = document.getElementById('moment_deflection');

    let xDizin =[]
    let yDizin =[]

    data.sys.deflection.forEach((p) => {
        xDizin.push(p.x)
        yDizin.push(-p.y)
    })

    var sehim = {
        x: xDizin,
        y: yDizin,
        yaxis: 'y2',

        mode: 'lines+markers',
        name: 'Deflection, mm'
    };
      
    let xMoment =[]
    let yMoment =[]

    data.sys.mData.forEach((p) => {
        xMoment.push(p.x)
        yMoment.push(p.y)
    })

    var moment = {
        x: xMoment,
        y: yMoment,
        fill: 'tozeroy',
        mode: 'lines+markers',
        name: 'Moment, Nm'
    };

    var veri = [sehim,moment];

    var layout = {
        title: {
          text: 'Bending Moment and Deflection Graph'
        },
      
        xaxis: {
          title: {
            text: 'Height, mm'
          }
        },
      
        yaxis: {
          title: {
            text: 'Moment, Nm'
          }
        },

        yaxis2: {
            title: {
              text: 'Deflection, mm',
              font: {color: 'rgb(18, 9, 110)'}
            },
        
            tickfont: {color: 'rgb(248, 11, 11)'},
            overlaying: 'y',
            side: 'right'
        },

        showlegend: true,
    };

    Plotly.newPlot(TESTER, veri, layout);
}


function meiGraph() {

    TESTER = document.getElementById('mei');

    let xDizin =[]
    let yDizin =[]

    data.tubes.forEach((tube) => {
        tube.mei.forEach((p) => {
            xDizin.push(p.z)
            yDizin.push(-p.mei)
        })
    })

    var mei_data = {
        x: xDizin,
        y: yDizin,
        fill: 'tozeroy',
        mode: 'lines+markers',
        name: 'M/EI, 1/mm'
    };
            
    var veri = [mei_data];

    var layout = {

        title: {
          text: 'M/EI Graph'
        },
      
        xaxis: {
          title: {
            text: 'Height, mm'
          }
        },
      
        yaxis: {
          title: {
            text: 'M/EI, 1/mm'
          }
        },

        showlegend: true,

        legend: {
          x: 1,
          xanchor: 'right',
          y: 1
        }
    };

    Plotly.newPlot(TESTER, veri, layout);
}