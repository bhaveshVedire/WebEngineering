console.log("Weather Forecasting Started");

var firebaseConfig = {
    apiKey: "AIzaSyCdPM3ITcROm_0I4c6d48dZ_URffCAxuVs",
    authDomain: "weatherforecast-2e957.firebaseapp.com",
    databaseURL: "https://weatherforecast-2e957.firebaseio.com",
    projectId: "weatherforecast-2e957",
    storageBucket: "weatherforecast-2e957.appspot.com",
    messagingSenderId: "818806796628",
    appId: "1:818806796628:web:4e84347008539f2f1658c1",
    measurementId: "G-E2FLPYEBQW"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

async function getWeather(){
    var city = document.getElementById("city").value;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f6c01c6bbd3aa71296165ea2cc13316f`;
    var apiJSON =  await fetch(url);
    var data = await apiJSON.json();
    //console.log(data);
    document.getElementById("weatherDisplay").innerHTML=`${data.main.temp}C`;
    addToDB(city, data.main.temp+" C");
}

function addToDB(city, temp){
    var database = firebase.database().ref().child(`/Cities`);
    database.child(`/${city}`).set({
        City : city,
        Temp : temp
    });
}

function getFromDB(){
    document.getElementById('myChart').style = "visibility : hidden";
    document.getElementById('table1').style = " visibility : visible";
    var database = firebase.database().ref().child(`/Cities`);
    document.getElementById('tbody').innerHTML = "";
    database.on("child_added", (snapshot)=>{
        document.getElementById('tbody').innerHTML += `<tr><td>${snapshot.val().City}</td><td>${snapshot.val().Temp}</td></tr>`
    })
}
async function getChart(){
    document.getElementById('table1').style = " visibility : hidden";
    document.getElementById('myChart').style = "visibility : visible";
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