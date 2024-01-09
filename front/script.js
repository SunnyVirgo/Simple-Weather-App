const apiKey = "c6b9adce67fe21471045a046edb4ad71"
const url ="https://api.openweathermap.org/data/2.5/weather?units=metric&";

const search = document.querySelector('.city')
const button = document.querySelector('.btn')
const icon = document.querySelector('.icon')

async function getWeather(lat,lon,city) {  
    if(city === ""){
    var response = await fetch(url + `lat=${lat}&lon=${lon}` + `&appid=${apiKey}`)
    }else{      
    var response = await fetch(url + `q=${city}` + `&appid=${apiKey}`);
    }

    if(response.status===404){
        icon.src="../assets/sad.png"
        document.querySelector('.temp').innerHTML = "Invalid location!"
        document.querySelector('.cityName').innerHTML = ""
        document.querySelector('.desc').innerHTML = ""
        document.querySelector('#humidity').innerHTML = "0.00"
        document.querySelector('#speed').innerHTML = "0.00"
    }else{
        var data = await response.json();

        if(data.weather[0].main === "Clouds"){
            icon.src="../assets/cloudy.png"
        }else if(data.weather[0].main === "Clear"){
            icon.src="../assets/sun.png"
        }else if(data.weather[0].main === "Fog"){
            icon.src="../assets/fog.png"
        }else if(data.weather[0].main === "Snow"){
            icon.src="../assets/snow.png"
        }else if(data.weather[0].main === "Rain"){
            icon.src="../assets/raining.png"
        }else if(data.weather[0].main === "Storm"){
            icon.src="../assets/storm.png"
        }
    
        document.querySelector('.cityName').innerHTML = data.name
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) +`° C`
        document.querySelector('.desc').innerHTML = data.weather[0].main
        
        document.querySelector('#humidity').innerHTML = data.main.humidity + `%`
        document.querySelector('#speed').innerHTML = Math.round(data.wind.speed) + `5 km/s`
    }
   
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