function drawCharts(){
  deflectionGraph()
  meiGraph()
}


function deflectionGraph() {

    TESTER = document.getElementById('moment_deflection');

    let zArray =[0]
    let deflectionArray =[0]

    data.tubes.forEach((t) => {
      zArray.push(t.zF)
      deflectionArray.push(t.deflectionTop)
    })

    var sehim = {
        x: zArray,
        y: deflectionArray,
        yaxis: 'y2',

        mode: 'lines+markers',
        name: 'Deflection, mm'
    };
      
    let momentDizin =[-data.sys.mRoot]

    data.tubes.forEach((t) => {
      momentDizin.push(t.mF)
    })

    var moment = {
        x: zArray,
        y: momentDizin,
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

    let zArray =[]
    let meiArray =[]

    data.tubes.forEach((tube) => {
      zArray.push(tube.zBottom)
      zArray.push(tube.zTop)
      meiArray.push(tube.meiBottom)
      meiArray.push(tube.meiTop)

    })

    var mei_data = {
        x: zArray,
        y: meiArray,
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