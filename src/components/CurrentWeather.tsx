import React from "react";

interface Props {
  cityName: string;
  icon: string;
  temp: string;
  description: string;
}

export const CurrentWeather = (props: Props) => {
  return (
    <div>
      <h1>{props.cityName}</h1>
      <h3>
        {props.temp}
        <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} />
      </h3>
      <p>{props.description}</p>
    </div>
  );
};
