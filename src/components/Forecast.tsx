import React from "react";

interface Props {
  icon: string;
  temp: string;
  description: string;
}

export const Forecast = (props: Props) => {
  return (
    <div>
      <img src={props.icon} />
      <h3>{props.temp}</h3>
      <p>{props.description}</p>
    </div>
  );
};
