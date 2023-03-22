//calling classes/ID
const app =document.querySelector('.App');
const temp =document.querySelector('.temp');
const dateO =document.querySelector('.date');
const timeO =document.querySelector('.time');
const conditionO =document.querySelector('.condition');
const nameO =document.querySelector('.name');
const icon =document.querySelector('.icon');
const cloudyO =document.querySelector('.cloudy');
const windO =document.querySelector('.wind');
const humidO =document.querySelector('.humid');
const find = document.querySelector('.find');
const btn =document.querySelector('.submit');
const city =document.querySelectorAll('.option');
const table=document.getElementById("table");
const form =document.getElementById('locationIn');
//default city OR location
let cityI = "New Delhi";
//click event for cities in list
city.forEach((c)=>{
    c.addEventListener('click',(e)=>{
        cityI = e.target.innerHTML;
        fetchWeather();
        app.style.opacity="0";
    });
})
//submit event for entered city/country name
form.addEventListener('submit',(e)=>{
    if(find.value.length==0){
        alert('Please enter a city name');
    }
    else{
        cityI=find.value;
        fetchWeather();
        find.value="";
        app.style.opacity="0";
    }
    e.preventDefault();
});
//function to get day fron date
function dayOfTheWeek(date){
    const weekday=[
        "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
 ];
 return weekday[new Date(`${date}`).getDay()];
};
//Function to add current and forecast information of the entered city
function fetchWeather(){
    //API data//API KEY=6c5f32c14a4e4696b3962240223011
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=92e300683a124c30b05134708232203&q=${cityI}&days=7&aqi=no&alerts=no`).then(response=>response.json()).then (data=>{
        console.log(data);
        //fetching date,time,day & tempreature 
        temp.innerHTML =data.current.temp_c + "&#176;";
        conditionO.innerHTML=data.current.condition.text;
        const date =data.location.localtime;
        const y= parseInt(date.substr(0,4));                     //year
        const m= parseInt(date.substr(5,2));                     //month
        const d= parseInt(date.substr(8,2));                     //date 
        const t= date.substr(11);                                 //time
        dateO.innerHTML=`${dayOfTheWeek(date)} ${d}/${m}/${y}`;
        timeO.innerHTML=t;
        nameO.innerHTML=data.location.name;
        const iconId= data.current.condition.icon.substr(
            "".length
        );
        //icon of weather
        icon.src=iconId;
        cloudyO.innerHTML=data.current.cloud +"%";
        humidO.innerHTML=data.current.humidity +"%";
        windO.innerHTML=data.current.wind_kph +"km/h";
        //day OR night
        let timeOfDay="day";
        const code=data.current.condition.code;
        if(data.current.is_day!=1){
            timeOfDay="night";
        }
        
        //setting bg images according to weather condition and button color according to day OR night->clear sky
        if(code==1000){
            if(timeOfDay=="day"){
            app.style.backgroundImage='url(https://media.istockphoto.com/id/876671242/photo/blue-and-orange-sky-at-sunset.jpg?s=612x612&w=0&k=20&c=PUjXNUSSKsP27SfNsbP2HR59PhpdIBL5nxcBfOZqEkc=)';
            btn.style.background="#e5ba92";
            }
            if(timeOfDay=="night"){
                app.style.backgroundImage='url(https://images.unsplash.com/photo-1506863250276-e0b65a47fed1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2xlYXIlMjBuaWdodHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60)';
                btn.style.background="#181e27";
            }
        }
        //setting bg images according to weather condition and button color according to day OR night->cloudy
        else if(code==1003 ||code==1006||code==1009||code==1030||code==1069||code==1087||code==1135||code==1273||code==1276||code==1279||code==1282){
            if(timeOfDay=="day"){
                app.style.backgroundImage='url(https://media.istockphoto.com/id/639553712/photo/the-dramatic-sky-with-clouds.jpg?s=612x612&w=0&k=20&c=Zf-45ARsPkiFYCg3q67XVqkzCFsfcb5qN7nATWOoKV8=)';
                btn.style.background="#e5ba92";
                }
                if(timeOfDay=="night"){
                    app.style.backgroundImage='url(https://media.istockphoto.com/id/603174568/photo/the-indigo-blue-sky-over-the-city.jpg?s=612x612&w=0&k=20&c=p6hE6TyDl6hy6Wba3HkzBAuQRArsyOnIUSESaoLpe5g=)';
                    btn.style.background="#181e27";
                }
        }
        //setting bg images according to weather condition and button color according to day OR night->rainy
        else if(code==1063||code==1072||code==1150||code==1153||code==1180||code==1183||code==1186||code==1189||code==1192||code==1195||code==1204||code==1207||code==1243||code==1240||code==1246||code==1249||code==1252){
            if(timeOfDay=="day"){
                app.style.backgroundImage='url(https://media.istockphoto.com/id/1190431907/photo/raining-day-in-the-city.jpg?s=612x612&w=0&k=20&c=_xsrJ9InOd9Ej4v2QFR5Ub7pbmfM5VpcWFWd1aug-hk=)';
                btn.style.background="#e5ba92";
                }
                if(timeOfDay=="night"){
                    app.style.backgroundImage='url(https://media.istockphoto.com/id/902500936/photo/colored-lights-reflected-in-the-wet-asphalt-in-the-rain.jpg?s=612x612&w=0&k=20&c=c17TfZar9gkhIWMz-nyfJ1uEClnJZKP_lNgfyQN_Iho=)';
                    btn.style.background="#181e27";
                }
        }
        //setting bg images according to weather condition and button color according to day OR night->snowy
        else {
            if(timeOfDay=="day"){
                app.style.backgroundImage='url(https://media.istockphoto.com/id/863513024/photo/winter-scene-snowfall-on-the-blurred-background.jpg?s=612x612&w=0&k=20&c=piIhc2R6dExYQ5X_7CnpPhJk8rCB7itK-PQ0pgsCai4=)';
                btn.style.background="#e5ba92";
                }
                if(timeOfDay=="night"){
                    app.style.backgroundImage='url(https://media.istockphoto.com/id/1092725592/photo/traffic-in-winter.jpg?s=612x612&w=0&k=20&c=mUq0msosRB-v6-0W95LNH7-HTXj0ixOEoMoXo_u7xj4=)';
                    btn.style.background="#181e27";
                }
        }
        //adding weather icon for each day in forecast table
        const i1 = document.querySelector('.i1');
        i1.src=data.forecast.forecastday[0].day.condition.icon.substr("".length);
        const i2 = document.querySelector('.i2');
        i2.src=data.forecast.forecastday[1].day.condition.icon.substr("".length);
        const i3 = document.querySelector('.i3');
        i3.src=data.forecast.forecastday[2].day.condition.icon.substr("".length);
        const i4 = document.querySelector('.i4');
        i4.src=data.forecast.forecastday[3].day.condition.icon.substr("".length);
        const i5 = document.querySelector('.i5');
        i5.src=data.forecast.forecastday[4].day.condition.icon.substr("".length);
        const i6 = document.querySelector('.i6');
        i6.src=data.forecast.forecastday[5].day.condition.icon.substr("".length);
        const i7 = document.querySelector('.i7');
        i7.src=data.forecast.forecastday[6].day.condition.icon.substr("".length);
        //adding wind speed for each day in forecast table
        const w1 = document.querySelector('.w1');
        w1.innerHTML=data.forecast.forecastday[0].day.maxwind_kph+" kph";
        const w2 = document.querySelector('.w2');
        w2.innerHTML=data.forecast.forecastday[1].day.maxwind_kph+" kph";
        const w3 = document.querySelector('.w3');
        w3.innerHTML=data.forecast.forecastday[2].day.maxwind_kph+" kph";
        const w4 = document.querySelector('.w4');
        w4.innerHTML=data.forecast.forecastday[3].day.maxwind_kph+" kph";
        const w5 = document.querySelector('.w5');
        w5.innerHTML=data.forecast.forecastday[4].day.maxwind_kph+" kph";
        const w6 = document.querySelector('.w6');
        w6.innerHTML=data.forecast.forecastday[5].day.maxwind_kph+" kph";
        const w7 = document.querySelector('.w7');
        w7.innerHTML=data.forecast.forecastday[6].day.maxwind_kph+" kph";
        //adding humidity for each day in forecast table
        const hu1 = document.querySelector('.hu1');
        hu1.innerHTML=data.forecast.forecastday[0].day.avghumidity+"%";
        const hu2 = document.querySelector('.hu2');
        hu2.innerHTML=data.forecast.forecastday[1].day.avghumidity+"%";
        const hu3 = document.querySelector('.hu3');
        hu3.innerHTML=data.forecast.forecastday[2].day.avghumidity+"%";
        const hu4 = document.querySelector('.hu4');
        hu4.innerHTML=data.forecast.forecastday[3].day.avghumidity+"%";
        const hu5 = document.querySelector('.hu5');
        hu5.innerHTML=data.forecast.forecastday[4].day.avghumidity+"%";
        const hu6 = document.querySelector('.hu6');
        hu6.innerHTML=data.forecast.forecastday[5].day.avghumidity+"%";
        const hu7 = document.querySelector('.hu7');
        hu7.innerHTML=data.forecast.forecastday[6].day.avghumidity+"%";
        //adding minimum & maximum tempreature in forecast table
        for(let k=0;k<7;k++){
            table.rows[k].cells[4].innerHTML=data.forecast.forecastday[k].day.maxtemp_c+"&#176; / "+data.forecast.forecastday[k].day.mintemp_c+"&#176;";
        }
        //adding days in forecast
        for(let i=1;i<7;i++){
        var date1 =data.forecast.forecastday[i].date;
        table.rows[i].cells[0].innerHTML=`${dayOfTheWeek(date1)}`;
        }
        app.style.opacity="1";
    })
    //if city/country name does'nt exist
    .catch(()=>{
        alert("City not found! Please try again");
        app.style.opacity="1"
    });
}
//when page is reloaded
fetchWeather();
app.style.opacity="1";