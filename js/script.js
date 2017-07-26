function drawChart(){
  Highcharts.StockChart({
        chart: {
            renderTo: 'container',
            backgroundColor: {
                linearGradient: [0, 0, 0, 400],
                stops: [
                    [0, 'rgb(46,48,53)'],
                    [1, 'rgb(46,48,53']
                ]
            }
        },
        title: {
            text: ''
        },

        legend: {
            enabled: true,
            align: 'left',
            verticalAlign: 'top',
            layout: 'vertical',
            title: {
                text: 'Latest Price',

                style: {
                    fontWeight: 'bold',
                    fontSize: '12px',
                    color: '#ffffff',

                }
            },
            floating: true,
            x: 60,
            y: 40,
            itemStyle: {
                fontSize: '14px',

                color: '#ffffff'
            },
            backgroundColor: 'rgba(0, 0, 0, .3)',
            labelFormatter: function() {
                if (this.name == 'Intel Corp (INTC)') {
                    return this.name + ': $35.71';
                } else {
                    return this.name + ': 76.9 (Good)';
                }
            },


        },

        rangeSelector: {

            buttons: [{
                type: 'day',
                count: 1,
                text: '1d'
            }, {
                type: 'day',
                count: 5,
                text: '5d'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }, {
                type: 'ytd',
                text: 'YTD'
            }, {
                type: 'year',
                count: 1,
                text: '1y'
            }, {
                type: 'all',
                text: 'All'
            }],


            buttonTheme: { // styles for the buttons
                fill: 'none',
                stroke: 'none',
                'stroke-width': 0,
                r: 8,
                style: {
                    color: '#7a8498',
                    fontSize: '14px',
                    //fontWeight: 'bold'
                },
                states: {
                    hover: {},
                    select: {
                        //fill: '#039',
                        style: {
                            color: '#438DDD'
                        }
                    }
                    // disabled: { ... }
                }
            },
            inputBoxBorderColor: 'gray',
            inputBoxWidth: 120,
            inputBoxHeight: 18,
            inputStyle: {
                color: '#7a8498',
                fontWeight: 'bold',




            },
            labelStyle: {
                color: 'silver',
                fontWeight: 'bold'
            },
            selected: 2
        },

        plotOptions: {
            area: {



                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                threshold: null
            },

            spline: {

                states: {
                    hover: {
                        lineWidth: 5
                    }
                },


            }
        },
        xAxis: {
            //ordinal: true,
            type: 'datetime',
            dateTimeLabelFormats: {
                second: '%Y-%m-%d<br/>%H:%M:%S',
                minute: '%Y-%m-%d<br/>%H:%M',
                hour: '%Y-%m-%d<br/>%H:%M',
                day: '%Y<br/>%m-%d',
                week: '%Y<br/>%m-%d',
                month: '%Y-%m',
                year: '%Y'
            },
            tickWidth: 0,
            lineWidth: 0.2,
            gridLineWidth: 1,
            gridLineDashStyle: 'shortdash',
            gridLineColor: 'rgba(230, 230, 230, 0.2)',


            labels: {
                style: {
                    color: '#7a8498',
                    fontSize: '12px',
                }
            },

        },


        yAxis: [{
                // max: 40,
                //  min: 25,
                //gridLineColor: 'transparent',
                lineWidth: 0.2,
                lineWidth: 0.5,
                lineColor: 'rgba(230, 230, 230, 0.1)',
                gridLineDashStyle: 'shortdash',
                gridLineColor: 'rgba(230, 230, 230, 0.2)',

                labels: {
                    align: 'right',
                    x: -3,

                    style: {
                        color: 'rgb(255, 255, 255)',
                        fontSize: '12px',
                    },



                },
                title: {
                    text: 'Stock Price',

                    style: {
                        color: 'rgb(255, 255, 255)',
                        fontSize: '12px',
                    },

                },
                height: '70%',
                lineWidth: 2
            },



            {
                lineWidth: 0.5,
                lineColor: 'rgba(230, 230, 230, 0.1)',
                minPadding: 0.1,
                maxPadding: 0.1,
                //gridLineColor: 'transparent',
                gridLineWidth: 0.1,
                labels: {
                    align: 'right',
                    x: -3,

                    style: {
                        color: 'rgb(255, 255, 255)',
                        fontSize: '12px',
                    },
                },
                title: {
                    text: 'Volume (mm)',

                    style: {
                        color: 'rgb(255, 255, 255)',
                        fontSize: '12px',
                    },

                },
                top: '75%',
                height: '25%',
                offset: 0,
                lineWidth: 2
            }, {
                // max: 40,
                //  min: 25,
                //gridLineColor: 'transparent',
                opposite: false,
                lineWidth: 0.5,
                lineColor: 'rgba(230, 230, 230, 0.1)',
                gridLineWidth: 1,
                gridLineDashStyle: 'shortdash',
                gridLineColor: 'rgba(230, 230, 230, 0.2)',

                labels: {
                    align: 'right',
                    x: -3,

                    style: {
                        color: 'rgb(255, 255, 255)',
                        fontSize: '12px',
                    },



                },
                title: {
                    text: 'Sentiment',

                    style: {
                        color: 'rgb(255, 255, 255)',
                        fontSize: '12px',
                    },

                },
                height: '70%',
                lineWidth: 2
            },




        ],







        series: [{
                name: 'Intel Corp (INTC)',
                type: 'area',
                //compare: 'percent',
                fillOpacity: 0.1,
                threshold: null,
                tooltip: {
                    valueDecimals: 2
                },

                color: 'rgb(0, 180, 255)',

                //fillColor : {
                //  linearGradient : [0, 0, 0, 300],
                //  stops : [

                //    [0.2, 'rgb(0, 180, 255)'],

                // [0.6, 'rgba(2,0,0,0)']
                //   ]
                //  },


                data: chartData1
            },

            {
                name: 'Intel Corp (INTC) Volume',
                type: 'column',
                showInLegend: false,
                //threshold: null,
                tooltip: {
                    valueDecimals: 2
                },
                color: 'rgb(122, 132, 152)',
                data: chartData2,
                yAxis: 1,
            },

            {
                name: 'SENTIMENT',
                type: 'spline',
                lineWidth: 1,
                //threshold: null,
                tooltip: {
                    valueDecimals: 2
                },
                //compare: 'percent',

                color: 'rgb(106,251,25)',
                data: chartData3,
                yAxis: 2,

            }

        ]
    });
}

function IsCompare(date1Str, date2Str){
  var date1Arr = date1Str.split(","), date2Arr = date2Str.split(",");
  for(var i = 0; i < date1Arr.length; i++){
    if(i > date2Arr.length) return 1;
    if(parseInt(date1Arr[i]) > parseInt(date2Arr[i])) return 1;
    if(parseInt(date1Arr[i]) < parseInt(date2Arr[i])) return -1;
  }
  if(date1Arr.length == date2Arr.length) return 0;
  return -1;
}

function Compare(datum1, datum2){
  var date1Str = datum1.date, date2Str = datum2.date;
  return IsCompare(date1Str, date2Str);
}

function setMinMax(data){
  for(var i = 0; i < data.length;i++){
    if(IsCompare(minDate, data[i].date) == 1){
      minDate = data[i].date;
    }
    if(IsCompare(maxDate, data[i].date) == -1){
      maxDate = data[i].date;
    }
  }
}

function getChartData(data){
  var chartData = [];
  for(var i = 0; i < data.length; i++){
    var dateArr = data[i].date.split(",");
    var dateUTC;
    if(dateArr.length == 3){
      dateUTC = Date.UTC(dateArr[0],dateArr[1],dateArr[2]);
    }else{
      dateUTC = Date.UTC(dateArr[0],dateArr[1],dateArr[2],dateArr[3],dateArr[4],dateArr[5]);
    }
    chartData.push([dateUTC, parseInt(data[i].value)]);
  }
  return chartData;
}