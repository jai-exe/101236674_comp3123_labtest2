import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const data = {
  weather: [{ id: 0, main: "", description: "", icon: "" }],
  main: {
    temp: 0,
    feels_like: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    pressure: 0,
  },
  name: "",
};

export default function WeatherData() {
    const changeColor = () => {
        if(celsius(weather.main.temp) <= 0){
            setColor("skyblue");
        }
        else if(celsius(weather.main.temp) > 0 && celsius(weather.main.temp) <= 15){
            setColor("white");
        }
        else if(celsius(weather.main.temp) > 15 && celsius(weather.main.temp) <= 20){
          setColor("yellow");
       }
        else if(celsius(weather.main.temp) > 20){
            setColor("orange");
        }
    }

    const celsius = (temp) => parseFloat(temp - 273.15).toFixed(2);
  
    const API_KEY = "84fd75f41b4a317c9f0198a019b3d19d";
    const [weather, setWeather] = useState(data);
    const [color, setColor] = useState("white")
    useEffect(() => {
        getWeather();
        changeColor();
    }, []);
    const getWeather = () => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${API_KEY}`)
        .then((res) => {
            setWeather(res.data);
            console.log(res.data)
        });
    };

    

    let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]
    
    return (
        <div>  
            <div className="card" style={{flex:1, backgroundColor:color, maxWidth: 400, alignItems:'center', justifyContent:'center', textAlign: 'center', margin:'auto', paddingTop: 30, paddingBottom: 30, border: 'solid'}}>
                <h1 className="title">{weather.name}</h1>
                <h3>{weekday}</h3>
                <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                ></img>
                
                <h2 className="temp">
                {celsius(weather.main.temp)} °C
                </h2>

                <h3> {weather.weather[0].main}</h3>

                <h3>High: {celsius(weather.main.temp_max)} °C</h3>
                <h3>Low: {celsius(weather.main.temp_min)} °C</h3>
                <h3>Pressure: {weather.main.pressure} hPa</h3>
                <h3>Feels like: {celsius(weather.main.feels_like)} °C</h3>
                <h3>Humidity: {weather.main.humidity}%</h3>
                
            </div>
        </div>
    );
}