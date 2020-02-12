console.log("Weather Forecasting Started");

async function getWeather(){
    var city = document.getElementById("city").value;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f6c01c6bbd3aa71296165ea2cc13316f`;
    var apiJSON =  await fetch(url);
    var data = await apiJSON.json();
    document.getElementById("weatherDisplay").innerHTML=`${data.main.temp}C`;
}



async function getChart(){
    var city = document.getElementById("city").value;
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=f6c01c6bbd3aa71296165ea2cc13316f`;
    var apiJSON = await fetch(url);
    var data = await apiJSON.json();
    console.log(data);
    
    var temp = new Array();
    var datArr = new Array();
    for(var i = 0,j = 0 ; i < 40 ; i+=8,j++){
        temp[j] = data.list[i].main.temp;
        datArr[j] = data.list[i].dt_txt.slice(0,10);
    }
    console.log(temp +" : "+ datArr);
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
        type: 'bar',

    // The data for our dataset
    data: {
        labels: datArr,
        datasets: [{
            label: `Weather Forecast of ${city}`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: temp
        }]
    },

    // Configuration options go here
    options: {}
});
}