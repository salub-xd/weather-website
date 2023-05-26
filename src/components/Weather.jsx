import React, { useState } from "react";
import "./weather.css";
import imgClear from "../image/Weather-clear.svg.png";
import imgCloud from "../image/cloud.png";
import imgHaze from "../image/haze.svg";
import imgRain from "../image/rain2.png";
import imgSnow from "../image/snow.png";
import imgStorm from "../image/storm.jpeg";

const findCityWeatherImageToBeDisplayed = (weather) => {

  if (
    (weather !== {} || weather !== undefined || weather !== null) &&
    Array.isArray(weather.weather)
  ) {
    let id = weather.weather[0].id;
    // console.log(id)

    if (
    //   weather.id &&
    //   weather.weather.map((elm) => {
    //     return <p key={toString(weather.id)}>{elm.main} </p>;
    //   })
    id < 200
    ) {
      return imgClear;
    } else if (id >= 200 && id <= 232) {
    //   wIcon.src = "icons/storm.svg";
      return imgStorm
    } else if (id >= 600 && id <= 622) {
    //   wIcon.src = "icons/snow.svg";
      return imgSnow
    } else if (id >= 701 && id <= 781) {
    //   wIcon.src = "icons/haze.svg";
      return imgHaze
    } else if (id >= 801 && id <= 804) {
    //   wIcon.src = "icons/cloud.svg";
      return imgCloud
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    //   wIcon.src = "icons/rain.svg";
      return imgRain
    }
  }

//   return image;
};

const Weather = (props) => {
  let apiKey = "4b96705e571b78ad4daf946fa3c7842e";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const [myFormValue, setMyFormValue] = useState("");
  const [myValue, SetMyValue] = useState({});
  const [myEffect, setMyEffect] = useState(false);
  const onChange = (event) => {
    // console.log(event.target.value);
    setMyFormValue(event.target.value);
  };
  const submitClick = async (e) => {
    e.preventDefault();
    // if(myFormValue. == 0){

    // }
    const response = await fetch(apiUrl + myFormValue + `&appid=${apiKey}`);
    const resData = await response.json();
    if (resData.cod == 404) {
      setMyEffect(false);
      SetMyValue(resData);
    } else {
      SetMyValue(resData);
      console.log(resData.cod);
      setMyEffect(true);
      // console.log(myValue.weather);
      // console.log(myValue);
      setMyFormValue("");
    }
  };

  return (
    <div>
      <div className="contactForm">
        <form id="contacts" className="form">
          <h2>Search Here</h2>
          <p type="City">
            <input
              type="text"
              id="value"
              name="value"
              placeholder="Write Your City.."
              value={myFormValue}
              onChange={onChange}
            ></input>
          </p>
          <button
            onClick={submitClick}
            type="submit"
            id="submit"
            className="submitBtn"
          >
            Submit
          </button>
        </form>
      </div>

      {/* {myValue && <h1> City =  {myValue.name} </h1>}
            {myValue.main && <h1> Temp =  {myValue.main.temp} </h1>}
            {myValue.main && <h1> Humidity =  {myValue.main.humidity} </h1>} */}

      {/* {myValue.weather && <img src={`${myValue.main}`}> </img> } */}
      <div className="error">
        <h2 style={myEffect ? { display: "none" } : { display: "block" }}>
          {myValue.message}
        </h2>
      </div>
      <div
        style={myEffect ? { display: "flex" } : { display: "none" }}
        className="cards"
      >
        <div className="card">
          <div className="cardBox">
            <div className="cardImg">
              <img
                // src={()=>{if(myValue.id==202){
                // return;
                // }}}

                src={myValue && findCityWeatherImageToBeDisplayed(myValue)}
                alt="cardImg"
              />
            </div>
            <div className="cardText">
              {/* {myValue.id && myValue.weather.map((elm) => {
                                return <p key={toString(myValue.id)}>{elm.id} </p>
                            })} */}
              {myValue.main && <h2>{myValue.main.temp}°C </h2>}
              {myValue.id &&
                myValue.weather.map((elm) => {
                  return <p key={toString(myValue.id)}>{elm.main} </p>;
                })}
              <p className="line">
                {myValue && <span>{myValue.name}, </span>}
                {myValue.sys && <span>{myValue.sys.country}</span>}{" "}
              </p>
              <h3>
                {" "}
                {myValue.main && (
                  <span className="lineVr">
                    {" "}
                    Humidity = {myValue.main.humidity}{" "}
                  </span>
                )}{" "}
                {myValue.main && <span> Wind = {myValue.wind.speed} </span>}
              </h3>
            </div>
            {/* <div className="btn">
                        <button className="deleteBtn">Delete</button>
                    </div> */}
          </div>
        </div>
      </div>

      {/* {myValue.id && myValue.weather.map((elm) => { return <h1 style={{ textAlign: "center" }}
                    key={toString(myValue.id)}> City =  {elm.main} </h1>
            })} */}
      {/* City =  {myValue.id && myValue.weather.map((elm)=>{return  <h1 style={{ textAlign: "center" }}>{elm.main} </h1>  })} */}
      {/* {myValue.map((elm,index)=>{ return  <h1>{elm.weather}</h1> })}  */}
    </div>
  );
};

export default Weather;
