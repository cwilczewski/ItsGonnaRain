var ctxOne = document.getElementById("tempChart");
var ctxTwo = document.getElementById("pressChart");
var ctxThree = document.getElementById("humChart");
var tempData = [];
var pressData = [];
var humData = [];
navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
        lat: position.coords.latitude
        , lng: position.coords.longitude
    };
    $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.lat + ',' + pos.lng + '&key=AIzaSyACj8qLXq15sDQudvgFFYcoSZ7NKDd5teI', function (mapData) {
        var city = mapData.results[3].address_components[1].long_name;
        var state = mapData.results[3].address_components[3].short_name;
        $('#location').text(city + ', ' + state);
        //                console.log(mapData.results[3].address_components);
    });
});
var socket = io('http://localhost:3000');
socket.on('data', function (data) {
    console.log(data.temp);
        $('#temp').text(Math.round(data.temp));
        $('#pressure').text(Math.round(data.press * 10) / 10 + " kPa");
        $('#humidity').text(Math.round(data.hum) + " %");
});
socket.on('newestData', function (newestData) {
    $.each(newestData, function (index, data) {
//        console.log(newestData);
        tempData.push(Math.round(data.temp));
        pressData.push(Math.round(Math.round(data.press * 10) / 10));
        humData.push(Math.round(data.hum));
    });
    var myChart = new Chart(ctxOne, {
        type: 'line'
        , data: {
            labels: ["150", "120", "90", "60", "30"]
            , datasets: [
                {
                    fill: false
                    , lineTension: 0.1
                    , backgroundColor: "transparent"
                    , borderColor: "#fafafa"
                    , borderCapStyle: 'butt'
                    , borderDash: []
                    , borderDashOffset: 0.0
                    , borderJoinStyle: 'miter'
                    , pointBorderColor: "#fafafa"
                    , pointBackgroundColor: "#fff"
                    , pointBorderWidth: 1
                    , pointHoverRadius: 5
                    , pointHoverBackgroundColor: "rgba(75,192,192,1)"
                    , pointHoverBorderColor: "rgba(220,220,220,1)"
                    , pointHoverBorderWidth: 2
                    , pointRadius: 1
                    , pointHitRadius: 10
                    , data: tempData
                    , spanGaps: false
                , }
    ]
        }
        , options: {
            animation: {
                duration: 0
            }
            , segmentStrokeColor: '#fafafa'
            , scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true
                        , labelString: 'Degrees C'
                        , fontColor: '#fafafa',
                        fontStyle: 'bold',
                        fontSize: '20'
                    }
                    , ticks: {
                        beginAtZero: true
                        , fontColor: '#fafafa'
                    }
                    , gridLines: {
                        color: 'rgba(250,250,250,.3)'
                        , zeroLineColor: '#fafafa'
                    , }
            }]
                , xAxes: [{
                    scaleLabel: {
                        display: true
                        , labelString: 'Minutes Ago'
                        , fontColor: '#fafafa',
                        fontStyle: 'bold',
                        fontSize: '20'
                    }
                    , gridLines: {
                        color: 'rgba(250,250,250,.3)'
                        , zeroLineColor: '#fafafa'
                    }
                    , ticks: {
                        fontColor: '#fafafa'
                    }
            }]}
            , legend: {
                display: false
            , }
        }
    });
    var myChart = new Chart(ctxTwo, {
        type: 'line'
        , data: {
            labels: ["150", "120", "90", "60", "30"]
            , datasets: [
                {
                    fill: false
                    , lineTension: 0.1
                    , backgroundColor: "transparent"
                    , borderColor: "#fafafa"
                    , borderCapStyle: 'butt'
                    , borderDash: []
                    , borderDashOffset: 0.0
                    , borderJoinStyle: 'miter'
                    , pointBorderColor: "#fafafa"
                    , pointBackgroundColor: "#fff"
                    , pointBorderWidth: 1
                    , pointHoverRadius: 5
                    , pointHoverBackgroundColor: "rgba(75,192,192,1)"
                    , pointHoverBorderColor: "rgba(220,220,220,1)"
                    , pointHoverBorderWidth: 2
                    , pointRadius: 1
                    , pointHitRadius: 10
                    , data: pressData
                    , spanGaps: false
                , }
    ]
        }
        , options: {
            animation: {
                duration: 0
            }
            , segmentStrokeColor: '#fafafa'
            , scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true
                        , labelString: 'Pressure kPa'
                        , fontColor: '#fafafa',
                        fontStyle: 'bold',
                        fontSize: '20'
                    }
                    , ticks: {
                        beginAtZero: true
                        , fontColor: '#fafafa'
                    }
                    , gridLines: {
                        color: 'rgba(250,250,250,.3)'
                        , zeroLineColor: '#fafafa'
                    , }
            }]
                , xAxes: [{
                    scaleLabel: {
                        display: true
                        , labelString: 'Minutes Ago'
                        , fontColor: '#fafafa',
                        fontStyle: 'bold',
                        fontSize: '20'
                    }
                    , gridLines: {
                        color: 'rgba(250,250,250,.3)'
                        , zeroLineColor: '#fafafa'
                    }
                    , ticks: {
                        fontColor: '#fafafa'
                    }
            }]}
            , legend: {
                display: false
            , }
        }
    });
    var myChart = new Chart(ctxThree, {
        type: 'line'
        , data: {
            labels: ["150", "120", "90", "60", "30"]
            , datasets: [
                {
                    fill: false
                    , lineTension: 0.1
                    , backgroundColor: "transparent"
                    , borderColor: "#fafafa"
                    , borderCapStyle: 'butt'
                    , borderDash: []
                    , borderDashOffset: 0.0
                    , borderJoinStyle: 'miter'
                    , pointBorderColor: "#fafafa"
                    , pointBackgroundColor: "#fff"
                    , pointBorderWidth: 1
                    , pointHoverRadius: 5
                    , pointHoverBackgroundColor: "rgba(75,192,192,1)"
                    , pointHoverBorderColor: "rgba(220,220,220,1)"
                    , pointHoverBorderWidth: 2
                    , pointRadius: 1
                    , pointHitRadius: 10
                    , data: humData
                    , spanGaps: false
                , }
    ]
        }
        , options: {
            animation: {
                duration: 0
            }
            , segmentStrokeColor: '#fafafa'
            , scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true
                        , labelString: 'Humidity %'
                        , fontColor: '#fafafa',
                        fontStyle: 'bold',
                        fontSize: '20'
                    }
                    , ticks: {
                        beginAtZero: true
                        , fontColor: '#fafafa'
                    }
                    , gridLines: {
                        color: 'rgba(250,250,250,.3)'
                        , zeroLineColor: '#fafafa'
                    , }
            }]
                , xAxes: [{
                    scaleLabel: {
                        display: true
                        , labelString: 'Minutes Ago'
                        , fontColor: '#fafafa',
                        fontStyle: 'bold',
                        fontSize: '20'
                    }
                    , gridLines: {
                        color: 'rgba(250,250,250,.3)'
                        , zeroLineColor: '#fafafa'
                    }
                    , ticks: {
                        fontColor: '#fafafa'
                    }
            }]}
            , legend: {
                display: false
            , }
        }
    });
});

$('.header').click(function() {
    console.log('clicked')
    $('.chart-box').css('background-image', 'linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)');
    $('.chart-box').addClass('chart-open');
    $('#tempChart').toggle();
});

$('#pressure-container').click(function() {
    console.log('clicked')
    $('.chart-box').css('background-image', 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)');
    $('.chart-box').addClass('chart-open');
    $('#pressChart').toggle();
});

$('#humidity-container').click(function() {
    console.log('clicked')
    $('.chart-box').css('background-image', 'linear-gradient(to top, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%');
    $('.chart-box').addClass('chart-open');
    $('#humChart').toggle();
});

$('#back').click(function() {
    console.log('closeing')
    $('.chart-box').removeClass('chart-open');
    setTimeout(function() {
        $('.chart-global').hide();
    }, 600)
    
});