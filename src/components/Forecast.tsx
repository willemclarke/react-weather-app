import React from "react";
import { TempData } from "../App";
import { Day } from "./Day";
import { Card } from "react-bootstrap";
import * as _ from "lodash";

interface Props {
  temps: TempData[];
}

export const Forecast = (props: Props) => {
  const { temps } = props;
  const days = _.map(temps, temp => {
    return <Day temp={temp} />;
  });
  return (
    <div
      className="forecast-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      }}
    >
      {days}
    </div>
  );
};
