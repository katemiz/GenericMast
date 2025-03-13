class ChartClass {

  constructor(data) {

    // Data
    this.tubes = data.tubes;
    this.sys = data.sys;
    this.overlaps = data.overlaps;
  }



  deflectionGraph() {

    let TESTER = document.getElementById('moment_deflection');

    let zArray =[0]
    let deflectionArray =[0]

    this.tubes.forEach((t) => {
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
      
    let momentDizin =[-this.sys.mRootNmm]

    this.tubes.forEach((t) => {
      momentDizin.push(t.mF)
    })

    var moment = {
        x: zArray,
        y: momentDizin,
        fill: 'tozeroy',
        mode: 'lines+markers',
        name: 'Moment, Nmm'
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
            text: 'Moment, Nmm'
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


  meiGraph() {

    let TESTER = document.getElementById('mei');

    let zArray =[]
    let meiArray =[]

    this.tubes.forEach((tube) => {
      zArray.push(tube.zC)
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

    console.log("MEI Data",mei_data)
            
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
          // xanchor: 'right',
          y: 1
        }
    };

    Plotly.newPlot(TESTER, veri, layout);

  }
}
