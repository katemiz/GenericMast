
function drawMDiagram(){



    let dsets = [
      {
       label:"Bending Moment",
       data:data.sys.momentData,
       parsing:{
         yAxisKey:'y'
       }
      } 
     ]


    data.tubes.forEach((tube,index) =>{


      dsets.push(
          {
            label:'T'+index,
            data:tube.meiData,
            yAxisId:'y1',
            parsing:{
              yAxisKey:'y'
            },
            fill:true
          } 
      )


    } )


    dsets.push(
      {
        label:'Deflection',
        data:data.sys.deflection,
        yAxisId:'y2',
        parsing:{
          yAxisKey:'y'
        },
        fill:true
      } 
  )


    

    console.log(dsets)
    
    
    new Chart(
        document.getElementById('myChart'),
        {
            type: 'line',
            data: {
                labels: data.sys.zArray,
                datasets:dsets ,
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
                            text: 'M/EI, 1/m [x 1E-9] '
                        },

                        grid:{
                            drawOnChartArea: false,

                        },


                        // suggestedMin: 3, // Adjust as needed
                        // suggestedMax: 10 // Adjust as needed
                      } ,


                      y2:{
                        type:'linear',
                        display:true,
                        position:'right',

                        title: {
                            display: true,
                            text: 'mm'
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



