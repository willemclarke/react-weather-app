import React from "react";
import { Container, Jumbotron, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  cityName: string;
  date: string;
  icon: string;
  temp: string;
  description: string;
}

export const CurrentWeather = (props: Props) => {
  return (
    <div className="current-weather-section">
      <h1 className="current-city-name"> {props.cityName}</h1>
      <h3 className="current-date">{props.date}</h3>
      <h3 className="current-icon-and-temp">
        <img src={props.icon} />
        {props.temp}
      </h3>
      <p className="current-description">{props.description}</p>
    </div>
  );
};
