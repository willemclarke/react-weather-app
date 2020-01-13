import React from "react";
import { Container, Jumbotron, Button } from "react-bootstrap";

interface Props {
  cityName: string;
  date: string;
  icon: string;
  temp: string;
  description: string;
}

export const CurrentWeather = (props: Props) => {
  return (
    <div>
      <h1>{props.cityName}</h1>
      <h5>{props.date}</h5>
      <h3>
        <img src={props.icon} />
        {props.temp}
      </h3>
      <p>{props.description}</p>
    </div>
  );
};
