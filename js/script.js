function drawChart(chartData){
    groupingUnit = {
        approximation: "close",
        enabled: true,
        forced: true,
        units: [
         [
            'day',
            [1]
        ]]
    };
  var chart = Highcharts.StockChart({
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
            }
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
            events: {
                 setExtremes: function (e) {
                    if(e.trigger == 'navigator'){
                        var flag = 0;
                        for(var i = 0; i < dateGroupIndex.length; i++){
                            if(e.min >= chartData[0][dateGroupIndex[i][0]][0]){
                                flag ++;
                            }
                            if(e.max <= chartData[0][dateGroupIndex[i][1]][0]){
                                if(flag > 0){
                                    flag ++;   
                                }
                            }
                        }
                        if(flag >= 2){
                            $.each(this.series, function (index, obj) {
                                if(obj.index < 2){
                                    obj.options.dataGrouping.units[0] = ['minute', [1]];
                                }
                            });
                        }else{
                            $.each(this.series, function (index, obj) {
                                obj.options.dataGrouping.units[0] = ['day', [1]];
                            });
                        }
                    }else if (e.rangeSelectorButton != undefined) {
                        var flag = 0;
                        for(var i = 0; i < dateGroupIndex.length; i++){
                            if(e.min >= chartData[0][dateGroupIndex[i][0]][0]){
                                flag ++;
                            }
                            if(e.max <= chartData[0][dateGroupIndex[i][1]][0]){
                                if(flag > 0){
                                    flag ++;   
                                }
                            }
                        }
                        if(flag >= 2){
                            $.each(this.series, function (index, obj) {
                                if(obj.index < 2){
                                    obj.options.dataGrouping.units[0] = ['minute', [1]];
                                }
                            });
                        }else{
                            $.each(this.series, function (index, obj) {
                                obj.options.dataGrouping.units[0] = ['day', [1]];
                            });
                        }
                    }
                 }
             },
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
                dataGrouping: groupingUnit,
                //compare: 'percent',
                fillOpacity: 0.1,
                threshold: null,
                tooltip: {
                    valueDecimals: 2
                },

                color: 'rgb(0, 180, 255)',

                data: chartData[0]
            },

            {
                name: 'Intel Corp (INTC) Volume',
                type: 'column',
                dataGrouping: groupingUnit,
                showInLegend: false,
                //threshold: null,
                tooltip: {
                    valueDecimals: 2
                },
                color: 'rgb(122, 132, 152)',
                data: chartData[1],
                yAxis: 1,
            },

            {
                name: 'SENTIMENT',
                type: 'spline',
                dataGrouping: groupingUnit,
                lineWidth: 1,
                //threshold: null,
                tooltip: {
                    valueDecimals: 2
                },
                //compare: 'percent',

                color: 'rgb(106,251,25)',
                data: chartData[2],
                yAxis: 2,

            }
        ]
    });
}

function compare(data1, data2){
    var datetimearr1 = data1.date.split(" "), datetimearr2 = data2.date.split(" ");
    var dateArr1 = datetimearr1[0].split("/"), dateArr2 = datetimearr2[0].split("/");
    if(parseInt(dateArr1[2]) > parseInt(dateArr2[2])) return 1;
    if(parseInt(dateArr1[2]) < parseInt(dateArr2[2])) return -1;
    for(var i = 0; i < dateArr1.length-1; i++){
        if(parseInt(dateArr1[i]) > parseInt(dateArr2[i])) return 1;
        if(parseInt(dateArr1[i]) < parseInt(dateArr2[i])) return -1;
    }
    if(datetimearr1.length == 1) return -1;
    if(datetimearr2.length == 1) return 1;
    var timeArr1 = datetimearr1[1].split(":"), timeArr2 = datetimearr2[1].split(":");
    for(var i = 0; i < timeArr1.length; i++){
        if(parseInt(timeArr1[i]) > parseInt(timeArr2[i])) return 1;
        if(parseInt(timeArr1[i]) < parseInt(timeArr2[i])) return -1;
    }
    return 0;
}

function getChartData(data){
    dateGroupIndex = []
  var valueData = [], volumeData = [], sentimentData = [];
  var year, month, day;
  var prevValue;
  var startInd = data.length, flag = true;
  var intraIndex = 0;
  for(var i = 0; i < data.length; i++){
    var dateArr = data[i].date.split(" ");
    var ymdArr = dateArr[0].split("/");
    year = ymdArr[2], month = ymdArr[0]-1, day = ymdArr[1];
    var timeArr;
    volumeVal = parseFloat(data[i].volume);
    if(dateArr.length > 1){
        timeArr = dateArr[1].split(":");
        dateUTC = Date.UTC(year,month,day,timeArr[0],timeArr[1]);
        volumeVal /= 1000000;
        if(flag == true){
            startInd = intraIndex;   
            flag = false;
        }else{
            if(i < data.length-1){
                var dateFutureArr = data[i+1].date.split(" ");
                if(dateFutureArr.length == 1){
                    dateGroupIndex.push([startInd, intraIndex]);
                }
            }else
                dateGroupIndex.push([startInd, intraIndex]);{
            }
        }
    }else{
        flag = true;
        dateUTC = Date.UTC(year,month,day);
    }
    if(data[i].close){
        var value = [dateUTC, parseFloat(data[i].close)];
        var volume = [dateUTC, volumeVal];
        valueData.push(value);
        volumeData.push(volume); 
        intraIndex++;
    }else if(data[i].sentiment){
        var sentiment = [dateUTC, parseFloat(data[i].sentiment)];
        sentimentData.push(sentiment);
    }
  }
  return [valueData,volumeData,sentimentData];
}