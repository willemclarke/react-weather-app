import React from "react";
import { TempData } from "../App";

interface Props {
  temp: TempData;
}

export const Day = (props: Props) => {
  const { temp } = props;
  return (
    <div className="forcastday-container">
      <div className="image">
        <img src={temp.icon} />
      </div>
      <div className="text">{temp.temp}</div>
      <div className="muted-text">{temp.description}</div>
    </div>
  );
};
