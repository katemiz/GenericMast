
function drawMDiagram(){



    let dsets = [
      {
        label:"Bending Moment",
        data:data.sys.mData,
        parsing:{
          yAxisKey:'y'
        }
      } 
    ]


    // data.tubes.forEach((tube,index) =>{
    //   dsets.push(
    //     {
    //       label:'T'+index,
    //       data:tube.mei,
    //       yAxisId:'y1',
    //       parsing:{
    //         xAxisKey:'z',

    //         yAxisKey:'mei'
    //       },
    //       fill:true
    //     } 
    //   )
    // })


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


    

    console.log("DSETS",dsets)
    
    
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

                      // y1:{
                      //   type:'logarithmic',
                      //   display:true,
                      //   position:'right',

                      //   title: {
                      //       display: true,
                      //       text: 'M/EI, 1/m [x 1E-9] '
                      //   },

                      //   grid:{
                      //       drawOnChartArea: false,
                      //   },


                      //   min: data.sys.meiMin, // Adjust as needed
                      //   max: data.sys.meiMax // Adjust as needed
                      // } ,


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


                        // min: 0, 
                        // max: 1 
                      } 




                }
              },

        }
    
    
    );
    


} 





function drawMeiChart(){



  let dsets = []


  data.tubes.forEach((tube,index) =>{
    dsets.push(
      {
        label:'T'+index,
        data:tube.mei,
        yAxisId:'y',
        parsing:{
          xAxisKey:'z',
          yAxisKey:'mei'
        },
        fill:true
      } 
    )
  })




  

  console.log("DSETS",dsets)
  
  
  new Chart(
      document.getElementById('meiChart'),
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
                      type:'logarithmic',
                      display: true,
                      title: {
                        display: true,
                        text: 'M/EI, 1/m'
                      },
                      min: data.sys.meiMin, // Adjust as needed
                      max: data.sys.meiMax // Adjust as needed
                    },







              }
            },

      }
  
  
  );
  


} 


function drawDeflectionChart(){


let dsets = [
  {
    label:'Deflection',
    data:data.sys.deflection,
    // yAxisId:'y',
    parsing:{
      xAxisKey:'x',
      yAxisKey:'y'
    },
    fill:false
  } 
]




  
  
  new Chart(
      document.getElementById('deflectionChart'),
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
                        text: 'Deflection, mm'
                      },
                      min: -0.2, 
                      max: data.sys.maxDeflection*1.04
                    },
              }
            },

      }
  
  
  );
  


} 
