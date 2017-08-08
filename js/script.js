Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};
Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () { 
    return Date.isLeapYear(this.getFullYear()); 
};

Date.prototype.getDaysInMonth = function () { 
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};
function drawChart(chartData){
    groupingUnit = {
        approximation: "open",
        enabled: true,
        forced: true,
        units: [
         [
            'day',
            [1]
        ]]
    };
var seriesData = [{
                name: 'Intel Corp (INTC)',
                type: 'area',
                dataGrouping: groupingUnit,
                id: 'dataSeries',
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
        ];
    for (var i = 0; i < chartData[6].length; i++){
        seriesData.push(
            {
                type: 'flags',
                data: chartData[6][i],
                onSeries: 'dataSeries',
                shape: 'squarepin',
                events: {
                    click: function(event) {
                        var i, index, displayIndex;
                        if(event.point.seq){
                            var i, index = event.point.index;
                            displayIndex = index;
                            for(i = 0; i < groupingArryIndex.length; i++){
                                if(i == 0 && index <= groupingArryIndex[i] || (index > groupingArryIndex[i-1] && index <= groupingArryIndex[i])){
                                    break;
                                }
                            }
                            displayNews(groupingArryIndex[i-1], groupingArryIndex[i], displayIndex);  
                        }
                    }
                },
                showInLegend: false,
                yAxis: 0,
            });
    }
    for (var i = 0; i < chartData[7].length; i++){
        seriesData.push(
            {
                type: 'flags',
                data: chartData[7][i],
                onSeries: 'dataSeries',
                shape: 'squarepin',
                events: {
                    click: function(event) {
                        var i, index, displayIndex;
                        if(event.point.seq){
                            var i, index = event.point.index;
                            displayIndex = index;
                            for(i = 0; i < groupingArryIndex.length; i++){
                                if(i == 0 && index <= groupingArryIndex[i] || (index > groupingArryIndex[i-1] && index <= groupingArryIndex[i])){
                                    break;
                                }
                            }
                            displayNews(groupingArryIndex[i-1], groupingArryIndex[i], displayIndex);  
                        }
                    }
                },
                showInLegend: false,
                yAxis: 0,
                visible: false
            });
    }
    var tmpData = [];
    for(var i = 0; i < chartData[4].length; i++){
        tmpData.push([chartData[4][i][0], chartData[4][i][1]]);
    }
    seriesData.push({
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

                data: tmpData,
                showInLegend: false,
                visible: false
            });
  chart = Highcharts.StockChart({
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
            },
            flags: {
                shape :"squarepin",
                style: {
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    textAlign: 'center'
                },
                events: {
                    mouseOver: function(){
                        this.chart.flagTooltip = true;
                    },
                    mouseOut: function(){
                        this.chart.flagTooltip = false;
                    }
                }
            }
        },
        xAxis: {
            events: {
                 setExtremes: function (e) {
                    if(e.trigger == 'navigator'){
                        var flag = 0;
                        for(var i = 0; i < chartData[5].length; i++){
                            if(e.min >= chartData[5][i][0]){
                                flag ++;
                            }
                            if(e.max <= chartData[5][i][0]){
                                if(flag > 0){
                                    flag ++;   
                                }
                            }
                        }
                        var startInd = -1, endInd = newsData.length-1;
                        for(i = 0; i < chartData[7].length; i++){
                            for(var k = 0; k <chartData[7][i].length; k++){
                                if(chartData[7][i][k].x >= e.min && startInd == -1){
                                    startInd = i*1000+k;
                                }
                                if(chartData[7][i][k].x >= e.max){
                                    endInd = i*1000+k;
                                    break;
                                }
                            }
                            if(k < chartData[7][i].length){
                                break;
                            }
                        }
                        if(flag >= 2){
                            if(intraFlag == 0){
                                $.each(this.series, function (index, obj) {
                                    if(obj.index < 2){
                                        obj.setData(chartData[index+4]);
                                        obj.options.dataGrouping.units[0] = ['minute', [1]];
                                    }
                                });
                                this.series[4].show();
                                this.series[3].hide();   
                            }
                            intraFlag = 1;
                        }else{
                            if(intraFlag == 1){
                                $.each(this.series, function (index, obj) {
                                    if(obj.index < 2){
                                        obj.setData(chartData[index]);
                                    }
                                    if(obj.index < 3){
                                        obj.options.dataGrouping.units[0] = ['day', [1]];
                                    }
                                });
                                this.series[3].show();
                                this.series[4].hide();   
                            }
                            intraFlag = 0;
                        }
                        displayNews(startInd, endInd, -1);
                    }else if (e.rangeSelectorButton != undefined) {
                        if(e.rangeSelectorButton.text == "All" || e.rangeSelectorButton.text == "YTD"){
                            if(intraFlag == 1){
                                $.each(this.series, function (index, obj) {
                                    if(index < 3){
                                        obj.options.dataGrouping.units[0] = ['day', [1]];
                                    }
                                    if(index < 2){
                                        obj.setData(chartData[index]);
                                    }
                                });
                                this.series[3].show();
                                this.series[4].hide();   
                            }
                            intraFlag = 0;
                            if(e.rangeSelectorButton.text == "YTD"){
                                var startInd = getIndex(0, e.rangeSelectorButton.type, e.rangeSelectorButton.text, e.min, chartData);
                                displayNews(startInd, newsData.length-1, -1);
                            }else{
                                displayNews(0, newsData.length-1, -1);
                            }
                        }else{
                            var min = e.min, max = e.max;
                            var unit = 1000*3600;
                            var count = e.rangeSelectorButton.count;
                            var maDate = new Date(maxDate);
                            var miDate = new Date(maxDate);
                            switch(e.rangeSelectorButton.type){
                                case "day":
                                    if(e.rangeSelectorButton.text == "1d") count = 1;
                                    miDate.addDays(-count);
                                    break;
                                case "month":
                                    miDate.addMonths(-count);
                                    break;
                                case "year":
                                    miDate.setYear(maDate.getFullYear()-count);
                                    break;
                                case "ytd":
                                    miDate = new Date(e.min);
                                    break;
                            }
                            var flag = 0;
                            for(var i = 0; i < chartData[5].length; i++){
                                if(e.min >= chartData[5][i][0]){
                                    flag ++;
                                }
                                if(e.max <= chartData[5][i][0]){
                                    if(flag > 0){
                                        flag ++;   
                                    }
                                }
                            }
                            if(flag >= 2){
                                if(intraFlag == 0){
                                    $.each(this.series, function (index, obj) {
                                        if(obj.index < 2){
                                            obj.setData(chartData[index+4]);
                                            obj.options.dataGrouping.units[0] = ['minute', [1]];
                                        }
                                    });
                                    this.series[3].hide();
                                    this.series[4].show();
                                }
                                intraFlag = 1;
                            }else{
                                if(intraFlag == 1){
                                    $.each(this.series, function (index, obj) {
                                        if(obj.index < 2){
                                            obj.setData(chartData[index]);
                                        }
                                        if(obj.index < 3){
                                            obj.options.dataGrouping.units[0] = ['day', [1]];
                                        }
                                    });
                                    this.series[3].show();
                                    this.series[4].hide();
                                }
                                intraFlag = 0;
                            }
                            var startInd = getIndex(count, e.rangeSelectorButton.type, e.rangeSelectorButton.text, e.min, chartData);
                            var c = this;
                            setTimeout(function() {

                                // Set Extremes (redisplay with new data points)
                                c.chart.xAxis[0].setExtremes(miDate.getTime(), maDate.getTime());  

                            }, 1);

                            displayNews(startInd, newsData.length-1, -1);
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
                lineWidth: 2,
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
                lineWidth: 2,
                valueDecimals: 2
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
                    format: '{value:.1f}'



                },
                title: {
                    text: 'Sentiment',

                    style: {
                        color: 'rgb(255, 255, 255)',
                        fontSize: '12px',
                    },
                    valueDecimals: 2

                },
                height: '70%',
                lineWidth: 2,
                valueDecimals: 2
            },
        ],







        series: seriesData,
        flagsGrouping : {
            calculateFillColor : true,
            selectGroupOnClick : true,
            minSelectableDateRange : 14 * 24 * 60 * 60 * 1000, // 2 weeks;
            groupings : [{
                zoomTimeSpan :  2 * 365 * 24 * 60 * 60 * 1000, // when more then 2 years selected
                groupTimeSpan :      60 * 24 * 60 * 60 * 1000  // group flags by 60 days
            },{
                zoomTimeSpan :      365 * 24 * 60 * 60 * 1000, // when from 2 to 1 years selected
                groupTimeSpan :      30 * 24 * 60 * 60 * 1000  // group by 30 days
            }, {
                zoomTimeSpan :      182 * 24 * 60 * 60 * 1000, // when from 1 to half year selected
                groupTimeSpan :      15 * 24 * 60 * 60 * 1000  // group flags by 15 days
            }, {
                zoomTimeSpan :       90 * 24 * 60 * 60 * 1000, // when from half year to 3 month selected
                groupTimeSpan :       5 * 24 * 60 * 60 * 1000  // group by 5 days
            }]
        },

        tooltip : {
            positioner: function (w, h, point) {
                var position = this.getPosition(w, h, point);

                if (this.chart.flagTooltip) {
                    position.y += h/3*2;
                }

                return position;
            },
            useHTML : true,
            followPointer : true,
            formatter : function (tooltip) {
                if (this.point && this.point.initialPoints) {
                    var text = '<b>' + Highcharts.dateFormat('%b %d, %Y', this.point.initialPoints[0].x) + '</b>' +
                        '<span> - </span>' +
                        '<b>' + Highcharts.dateFormat('%b %d, %Y', this.point.initialPoints[this.point.initialPoints.length - 1].x) + '</b><br/>';

                    text += '<span style="font-size: 11px">';
                    for (var i = 0; i < this.point.initialPoints.length; i++) {
                        text += '<p style="width: 400px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">- ' + this.point.initialPoints[i].text + '</p>'
                        if (i === 5) {
                            text += '<p>...</p>';
                            break
                        }
                    }

                    return text + '</span>';
                } else if (this.point) {
                    return '' +
                        '<b>' + Highcharts.dateFormat('%b %d, %Y', this.point.x) + '</b><br/>' +
                        '<span>' + this.point.text + '</span>';

                }
                return tooltip.defaultFormatter.apply(this, [tooltip]);
            }

        },
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

function compareNew(data1, data2){
    var dateArr1 = data1.date.split("/"), dateArr2 = data2.date.split("/");
    if(parseInt(dateArr1[2]) > parseInt(dateArr2[2])) return 1;
    if(parseInt(dateArr1[2]) < parseInt(dateArr2[2])) return -1;
    for(var i = 0; i < dateArr1.length-1; i++){
        if(parseInt(dateArr1[i]) > parseInt(dateArr2[i])) return 1;
        if(parseInt(dateArr1[i]) < parseInt(dateArr2[i])) return -1;
    }
    var timePmArr1 = data1.Time.split(" "), timePmArr2 = data2.Time.split(" ");
    if(timePmArr1[1] == "PM" && timePmArr2[1] == "AM") return 1;
    if(timePmArr1[1] == "AM" && timePmArr2[1] == "PM") return -1;
    var timeArr1 = timePmArr1[0].split(":"), timeArr2 = timePmArr2[0].split(":");
    for(var i = 0; i < timeArr1.length; i++){
        if(parseInt(timeArr1[i]) > parseInt(timeArr2[i])) return 1;
        if(parseInt(timeArr1[i]) < parseInt(timeArr2[i])) return -1;
    }
    return 0;
}

function getChartData(data){
    dateGroupIndex = []
  var valueData = [], volumeData = [], sentimentData = [], 
        flagIntraData = [], flagTmpIntraData = [], valueIntraData = [], volumeIntraData = [], flagData = [],
        flagTmpData = [], baseFlagData = [], baseFlagTmpData = [];
  var year, month, day;
  var prevValue;
  var startInd = data.length, flag = true;
  var intraIndex = 0;
    var k = 0;
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
        if(dateArr.length > 1){
            valueIntraData.push(value);
            volumeIntraData.push(volume); 
        }else{
            valueData.push(value);
            volumeData.push(volume);    
        }
        intraIndex++;
    }else if(data[i].sentiment){
        var sentiment = [dateUTC, parseFloat(data[i].sentiment)];
        sentimentData.push(sentiment);
    }
    maxDate = Math.max(maxDate, dateUTC);
  }
  for(k = 0; k < newsData.length; k++){
    if(newsData[k].headline){
        var dateArr = newsData[k].date.split(" ");
        var ymdArr = dateArr[0].split("/");
        year = ymdArr[2], month = ymdArr[0]-1, day = ymdArr[1];
        var hmsp = newsData[k].Time.split(" ");
        var hms = hmsp[0].split(":");
        if(hmsp[1] == "PM"){
            hms[0] = parseInt(hms[0])+12;
        }
        var dateUTC = Date.UTC(year,month,day,hms[0],hms[1]);
        if(k % 1000 == 0 && k > 0) {
            flagIntraData.push(flagTmpIntraData);
            flagTmpIntraData = [];
            flagData.push(flagTmpData);
            flagTmpData = [];
            baseFlagData.push(baseFlagTmpData);
            baseFlagTmpData = [];
        }
        maxDate = Math.max(maxDate, dateUTC);
        var title = String.fromCharCode(65+k%26)+(parseInt(k/26)+1);
        flagTmpIntraData.push({x:dateUTC, title:title, text:newsData[k].headline, seq:newsData[k].seq, index:k});

        var closedateUTC = Date.UTC(year,month,day);
        flagTmpData.push({x:closedateUTC, title:title, text:newsData[k].headline, seq:newsData[k].seq, index:k});
        baseFlagTmpData.push({x:closedateUTC, title:title, text:newsData[k].headline, seq:newsData[k].seq, index:k});
    }
  }
  // var additionalDate = new Date(maxDate);
  // additionalDate.addDays(1);
  //   valueData.push([additionalDate.getTime(), valueData[valueData.length-1][1]]);
  if(flagTmpIntraData.length > 0){
    flagIntraData.push(flagTmpIntraData);
    flagData.push(flagTmpData);
    baseFlagData.push(baseFlagTmpData);
  }
  return [valueData,volumeData,sentimentData,baseFlagData,valueIntraData,volumeIntraData,flagData,flagIntraData];
}
function displayNews(startInd, endInd, curInd, startFlag){
    if(startInd == -1) return;
    $('#news .content').html('');
    var i;
    for(i = startInd; i <= endInd; i++){
        var className = 'eachContent';
        if(i == curInd){
            className += ' highlight';
        }
        var title = String.fromCharCode(65+i%26)+(parseInt(i/26)+1);
        var flag = "<div class='flag' data-index='"+i+"'>"+title+"</div>";
        var right = "<div class='right' data-index='"+i+"'><div class='rightText'>"+newsData[i].headline+"</div><div class='rightDate'>"+newsData[i].date+" "+newsData[i].Time+"</div></div>";
        var clear = "<div style='clear:both'></div>";
        var html = "<div class='"+className+"''>"+flag+right+clear+"</div>";
        $('#news .content').append(html);
    }
}
function getIndex(count, type,text, minDate, chartData){
    var miDate = new Date(maxDate);
    var dt = minDate;
    switch(type){
        case "day":
            if(text == "1d") count = 1;
            miDate.addDays(-count);
            dt = miDate.getTime();
            break;
        case "month":
            miDate.addMonths(-count);
            dt = miDate.getTime();
            break;
        case "year":
            miDate.setYear(miDate.getFullYear()-count);
            dt = miDate.getTime();
            break;
    }
    var startInd = -1;
    for(i = 0; i < chartData[7].length; i++){
        for(var k = 0; k <chartData[7][i].length; k++){
            if(chartData[7][i][k].x >= dt){
                startInd = i*1000+k;
                break;
            }
        }
        if(k < chartData[7][i].length){
            break;
        }
    }
    return startInd;
}

function getTmpData(data, index){
    var tmpData = [];
    for(var i = 0; i < data[index].length; i++){
        for(var k = 0; k < data[index][i].length; k++){
            var cur = data[index][i][k];
            tmpData.push({x:cur.x, title:cur.title, text:cur.text, seq:cur.seq, index:cur.index});   
        }
    }
    return tmpData;
}