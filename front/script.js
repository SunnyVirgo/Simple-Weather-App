const apiKey = "c6b9adce67fe21471045a046edb4ad71"
const url ="https://api.openweathermap.org/data/2.5/weather?units=metric&";

const search = document.querySelector('.city')
const button = document.querySelector('.btn')

async function getWeather(lat,lon,city) {  
    if(city === ""){
    var response = await fetch(url + `lat=${lat}&lon=${lon}` + `&appid=${apiKey}`)
    }else{      
    var response = await fetch(url + `q=${city}` + `&appid=${apiKey}`);
    }
    var data = await response.json();

    document.querySelector('.cityName').innerHTML = data.name
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) +`° C`
    document.querySelector('.desc').innerHTML = data.weather[0].main
    
    document.querySelector('#humidity').innerHTML = data.main.humidity + `%`
    document.querySelector('#speed').innerHTML = Math.round(data.wind.speed) + `5 km/s`
}

button.addEventListener("click", ()=>{
    getWeather("","",search.value);
})
function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(function (position){
        var lat =  position.coords.latitude
        var lon = position.coords.longitude
        getWeather(lat,lon,"");

    })
}

getCurrentLocation();