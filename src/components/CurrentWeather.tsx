import React from "react";
import { TempData } from "../App";

export interface Props {
  temp: TempData;
}

export const CurrentWeather = (props: Props) => {
  const { temp } = props;
  return (
    <div
      className="current-weather-section"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        marginBottom: "20px"
      }}
    >
      <div className="current-city-name" style={{ fontSize: "35px" }}>
        {" "}
        {temp.cityName}
      </div>
      <div className="current-date" style={{ marginTop: "10px", fontSize: "30px" }}>
        {temp.date}
      </div>
      <div className="current-icon-and-temp" style={{ fontSize: "45px" }}>
        <img src={temp.icon} style={{ height: "4em", width: "4em" }} />
        {temp.temp}
      </div>
      <div className="current-description" style={{ fontSize: "25px", marginBottom: "15px" }}>
        {temp.description}
      </div>
    </div>
  );
};
