import React, { useState } from "react";
import axios from "axios";
import img from "./images/city.jpg";
import cloud from "./images/forecast.png";
import "./index.css";

const Home = () => {

    const [name, setName] = useState("");
    const [data, setData] = useState({
    temp: "32",
    weather: "Clouds",
    name: "Bhopal",
    humidity: 80,
    speed: 2,
    image: img,
    sunrise: "",
    sunset: "",
    pressure: "10",
    visibility: "1000",
    min: "",
    max: "",
    country: "IN",
    icon: cloud,
  });

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };


  const search = () => {
    if (name !== "") {
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID={your id }&units=metric`;
      axios
        .get(API)
        .then((res) => {
          console.log(res)
          let imagePath = "";
          let iconPath = "";
          if (res.data.weather[0].main == "Clouds") {
            imagePath =
              "https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
            iconPath = "https://openweathermap.org/img/wn/02d.png";
          } else if (res.data.weather[0].main === "Clear") {
            imagePath =
              "https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
            iconPath = "https://openweathermap.org/img/wn/01d.png";
          } else if (res.data.weather[0].main === "Thunderstorm") {
            imagePath =
              "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg";
            iconPath = "https://openweathermap.org/img/wn/11n.png";
          } else if (res.data.weather[0].main == "Rain") {
            imagePath =
              "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=600";
            iconPath = "https://openweathermap.org/img/wn/10d.png";
          } else if (res.data.weather[0].main == "Mist") {
            iconPath = "https://openweathermap.org/img/wn/50n.png";
            imagePath =
              "https://images.pexels.com/photos/163323/fog-dawn-landscape-morgenstimmung-163323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
          }else if (res.data.weather[0].main == "Snow") {
            iconPath = "https://openweathermap.org/img/wn/13d.png ";
            imagePath =
              "https://images.pexels.com/photos/12803096/pexels-photo-12803096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
          } else {
            iconPath = "https://openweathermap.org/img/wn/01d.png";
            imagePath =
              "https://images.pexels.com/photos/3584430/pexels-photo-3584430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
          }

          setData({
            ...data,
            temp: res.data.main.temp,
            name: res.data.name,
            country: res.data.sys.country,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
            icon: iconPath,
            sunrise: res.data.sys.sunrise,
            sunset: res.data.sys.sunset,
            pressure: res.data.main.pressure,
            min: res.data.main.temp_min,
            max: res.data.main.temp_max,
            visibility: res.data.visibility,
            weather: res.data.weather[0].main,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleClick = () => {
    search();
  };

  return (
    <>
      <div className="container">
        <div className="city" style={{ backgroundImage: `url(${data.image})` }}>
          <div className="title">
            <h2>{data.name}</h2>
            <h3>{data.country}</h3>
          </div>

          <div className="temperature">
            <p>
              {Math.round(data.temp)}°<span>C</span>
            </p>
          </div>

          <div className="date-time">
            <div className="dmy">
              <div className="current-date">{dateBuilder(new Date())}</div>
            </div>
          </div>
        </div>

        {/* 2 div */}

        <div className="forecast">
          <div>
            <img src={`${data.icon}`} className="icon" />
          </div>
          <div className="today-weather">
            <h3>{data.weather}</h3>
            <div className="search-box">
              <input
                type="text"
                className="search-bar"
                placeholder="Enter City Name"
                onChange={(e) => setName(e.target.value)}
              />
              <div className="img-box">
                {" "}
                <img
                  src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                  onClick={handleClick}
                />
              </div>
            </div>
            <ul>
              <div>
                {" "}
                <li className="cityHead">
                  <p>
                    {data.name}, {data.country}
                  </p>
                </li>
                <li>
                  Temperature{" "}
                  <span className="temp">{Math.round(data.temp)}°c</span>
                </li>
                <li>
                  Humidity <span className="temp">{data.humidity}%</span>
                </li>
                <li>
                  Visibility <span className="temp">{data.visibility} mi</span>
                </li>
                <li>
                  Wind Speed <span className="temp">{data.speed} Km/h</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
