

function deflectionGraph() {

    TESTER = document.getElementById('moment_deflection');

    let xDizin =[]
    let yDizin =[]

    data.sys.deflection.forEach((p) => {
        xDizin.push(p.x)
        yDizin.push(-p.y)
    })

    console.log('xDizin',xDizin)
    console.log('yDizin',yDizin)


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


    // var trace2 = {

    //     x: [2, 3, 4],
      
    //     y: [4, 5, 6],
      
    //     name: 'yaxis2 data',
      
    //     yaxis: 'y2',
      
    //     type: 'scatter'
      
    //   };


      
    var trace3 = {
        x: [1, 2, 3, 4],
        y: [12, 9, 15, 12],
        mode: 'lines+markers',
        name: 'Scatter and Lines'
    };
      
    var veri = [sehim,moment ];

    var layout = {

        title: {
          text: 'Deflection Graph'
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
              font: {color: 'rgb(148, 103, 189)'}
            },
        
            tickfont: {color: 'rgb(148, 103, 189)'},
            overlaying: 'y',
            side: 'right'
        },






        showlegend: true,

        // legend: {
        //   x: 1,
        //   xanchor: 'right',
        //   y: 1
        // }
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

    console.log('xDizin',xDizin)
    console.log('yDizin',yDizin)

    var mei_data = {
        x: xDizin,
        y: yDizin,
        yaxis: 'y2',
        fill: 'tozeroy',
        mode: 'lines+markers',
        name: 'Deflection, mm'
    };
            
    var veri = [mei_data ];

    var layout = {

        title: {
          text: 'Deflection Graph'
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
              font: {color: 'rgb(148, 103, 189)'}
            },
        
            tickfont: {color: 'rgb(148, 103, 189)'},
            overlaying: 'y',
            side: 'right'
        },






        showlegend: true,

        // legend: {
        //   x: 1,
        //   xanchor: 'right',
        //   y: 1
        // }
    };

    Plotly.newPlot(TESTER, veri, layout);
}