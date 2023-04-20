const apikey="0b1ed674e2561619155b2c50064d38a7";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const apiurl1="http://api.openweathermap.org/data/2.5/air_pollution?";
const apiurl1 = `https://api.openweathermap.org/data/2.5/air_pollution?appid=${apikey}`;
const apiurl2="https://timeapi.io/api/Time/current/coordinate?";
const searchBox= document.querySelector(".search input");
const searchBtn= document.querySelector(".search button");
const weatherIcon= document.querySelector(".weathericon"); 
async function checkWeather(city)
{
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    let data = await response.json();
    console.log(data);
    let lat=data.coord.lat;
    let lon=data.coord.lon;
    const response1 = await fetch(apiurl1 + `&lat=${lat}` + `&lon=${lon}` + `&appid=${apikey}`);
    let data1 = await response1.json();
    console.log(data1);
    document.querySelector(".city").innerHTML= data.name;
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp)+"°c";
    document.querySelector(".feels").innerHTML= Math.round(data.main.feels_like)+"°c";
    document.querySelector(".maxtemp").innerHTML= Math.round(data.main.temp_max)+"°c";
    document.querySelector(".mintemp").innerHTML= Math.round(data.main.temp_min)+"°c";
    document.querySelector(".humidity").innerHTML= data.main.humidity+"%";
    document.querySelector(".wind").innerHTML= data.wind.speed+"km/h";
    document.querySelector(".airquality").innerHTML= data1.list[0].main.aqi;

    if(data.weather[0].main=="Clear"){
        weatherIcon.src="images/clear.png";
        document.querySelector(".status").innerHTML="Clear";
    }else if(data.weather[0].main=="Clouds")
    {
        weatherIcon.src="images/clouds.png";
        document.querySelector(".status").innerHTML="Clouds";
    }
    else if(data.weather[0].main=="Drizzle")
    {
        weatherIcon.src="images/drizzle.png";
        document.querySelector(".status").innerHTML="Drizzle";
    }
    else if(data.weather[0].main=="Mist")
    {
        weatherIcon.src="images/mist.png";
        document.querySelector(".status").innerHTML="Mist";
    }
    else if(data.weather[0].main=="Rain")
    {
        weatherIcon.src="images/rain.png";
        document.querySelector(".status").innerHTML="Rain";
    }
    else if(data.weather[0].main=="Snow")
    {
        weatherIcon.src="images/snow.png";
        document.querySelector(".status").innerHTML="Snow";
    }
    else if(data.weather[0].main=="Haze")
    {
        weatherIcon.src="images/haze.png";
        document.querySelector(".status").innerHTML="Haze";
    }

    if(data1.list[0].main.aqi==5){
        document.querySelector(".aqistatus").innerHTML="(Very poor)";
    }else if(data1.list[0].main.aqi==4){
        document.querySelector(".aqistatus").innerHTML="(Poor)";
    }else if(data1.list[0].main.aqi==3){
        document.querySelector(".aqistatus").innerHTML="(Moderate)";
    }else if(data1.list[0].main.aqi==2){
        document.querySelector(".aqistatus").innerHTML="(Fair)";
    }else if(data1.list[0].main.aqi==1){
        document.querySelector(".aqistatus").innerHTML="(Good)";
    }
}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
