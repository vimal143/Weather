import React, { useState } from 'react';
import './Css/style.css';

const api = {
    key: "4c0f1bf4c5256440bb7925e317d9f5d0",
    base: "https://api.openweathermap.org/data/2.5/"
}


const Weather = () => {
    const [city, setCity] = useState("Delhi");
    const [weather, setWeather] = useState({});


    window.onload = (e) => {
        console.log(e.target.value);
        fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result)
                setCity('');
            });
    }

    const search = (event) => {

        if (event.key === 'Enter') {
            fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result)
                    setCity('');
                });


        }
    }






    const datemaker = (d) => {
        let month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let months = month[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${months} ${year}`;
    }
    return (
        <>
            <div className={(typeof weather.main != "undefined") ? ((new Date().getHours()) >= 5 && (new Date().getHours() <= 17) ? 'weather' : 'weather-night') : 'weather'}>
                <main>
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Seach City"
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            onKeyPress={search}

                        />

                    </div>
                    {(typeof weather.main != "undefined") ? (
                        <div>
                            <div className="location-container">
                                <div className="location">
                                    <h4>{weather.name}, {weather.sys.country}</h4>

                                </div>
                                <div className="Date">
                                    {datemaker(new Date())}
                                </div>


                            </div>
                            <div className="weather-box">
                                <div className="temperature">
                                    {weather.main.temp}&deg; C
                   </div>
                                <div className="weather-description">
                                    {weather.weather[0].main}
                                </div>
                            </div>
                            <div className="row">
                                <div className=" column wind-speed">
                                    Wind Speed<br></br>
                                    <span className="speed">{weather.wind.speed} km/hr</span>

                                </div>
                                <div className=" column humidity">
                                    Humidity<br></br>
                                    <span className="humid">{weather.main.humidity} %</span>
                                </div>
                            </div>





                        </div>
                    ) : (' ')}

                </main>
                

            </div>
        </>
    );
}

export default Weather;