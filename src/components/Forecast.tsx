import React from "react";

interface Props {
  icon: string;
  temp: string;
  description: string;
}

export const Forecast = (props: Props) => {
  return (
    <div>
      <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} />
      <h3>{props.temp}</h3>
      <p>{props.description}</p>
    </div>
  );
};
