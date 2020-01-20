import React from "react";
import { TempData } from "../App";

export interface Props {
  temp: TempData;
}

export const CurrentWeather = (props: Props) => {
  const { temp } = props;
  return (
    <div className="current-weather-section">
      <h1 className="current-city-name"> {temp.cityName}</h1>
      <h3 className="current-date">{temp.date}</h3>
      <h3 className="current-icon-and-temp">
        <img src={temp.icon} />
        {temp.temp}
      </h3>
      <p className="current-description">{temp.description}</p>
    </div>
  );
};
