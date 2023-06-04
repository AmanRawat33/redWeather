import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/style.css";
import Search from "../assets/images/search.png";
import Cloud from "../assets/images/cloud.png";
import Clear from "../assets/images/clear.png";
import Drizzle from "../assets/images/drizzle.png";
import Humid from "../assets/images/humid.png";
import Mist from "../assets/images/mist.png";
import Rain from "../assets/images/rain.png";
import Snow from "../assets/images/snow.png";
import Wind from "../assets/images/wind.png";
const Temp = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    source: Cloud
  });
  const [name, setName] = useState("");
  const handleClick = () => {
    if (name !== "") {
      const apiURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=dbdc423bf220edd585c48383e780c5bd&&units=metric`;
      axios
        .get(apiURL)
        .then((res) => {
          console.log(res);
          let imageSrc = '';
          if (res.data.weather[0].main == "Clouds") {
            imageSrc = Cloud;
          } else if (res.data.weather[0].main == "Clear") {
            imageSrc = Clear;
          } else if (res.data.weather[0].main == "Rain") {
            imageSrc = Rain;
          } else if (res.data.weather[0].main == "Drizzle") {
            imageSrc = Drizzle;
          } else if (res.data.weather[0].main == "Mist") {
            imageSrc = Mist;
          } else if (res.data.weather[0].main == "Snow") {
            imageSrc = Snow;
          } else {
            imageSrc = Cloud;
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            source: imageSrc
          })
        }
        )
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className="Temp">
      <div className="heading-container">
        <h1>The</h1> <br />
        <h1>redWeather</h1>
      </div>
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter city"
            id="search-bar"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            id="btn"
            onClick={handleClick}
            style={{ background: "inherit" }}
          >
            <img
              src={Search}
              alt=""
              style={{ background: "", height: "30px", width: "" }}
            />
          </button>
        </div>
        <div className="weather-info">
          <img src={data.source} alt="" id="icon" />
          <h1>{data.celcius} °C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src={Humid} alt="" className="weather-icon" />
              <div className="humidity">
                <p>{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={Wind} alt="" className="weather-icon" />
              <div className="wind">
                <p>{data.speed} Km/H</p>
                <p>Winds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp;
