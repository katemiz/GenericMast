
function drawMDiagram(){


    let veri = data.moments

    console.log(veri)
    
    console.log(veri.map(row => row.h))
    console.log(veri.map(row => row.moment))

    let dsets = [
        {
            label: 'M',
            data: veri.map(row => row.moment),
            yAxisID: 'y',

        },
    ] 


    data.tubes.forEach((tube,index) =>{


        dsets.push(
           {
                label:'T'+index,
                data:tube.mei,
                yAxisId:'y1'
           } 
        )
    } )
    

    console.log(dsets)
    
    
    new Chart(
        document.getElementById('myChart'),
        {
            type: 'line',
            data: {
                labels: veri.map(row => row.h),
                datasets: dsets,
            },

            options: {
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'DIAGRAM'
                  },
                },
                interaction: {
                  intersect: false,
                },
                scales: {
                    x: {
                        type:'linear',
                        display: true,
                        title: {
                          display: true,
                          text:'Height, mm'
                        }
                      },
                      y: {
                        type:'linear',
                        display: true,
                        title: {
                          display: true,
                          text: 'Moment, Nm'
                        },

                      },

                      y1:{
                        type:'linear',
                        display:true,
                        position:'right',

                        title: {
                            display: true,
                            text: 'M/EI, 1/m 10E-5'
                        },

                        grid:{
                            drawOnChartArea: false,

                        },

                        // suggestedMin: 3, // Adjust as needed
                        // suggestedMax: 10 // Adjust as needed



                      } 
                }
              },

        }
    
    
    );
    


} 



