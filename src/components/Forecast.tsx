import React from "react";
import { TempData } from "../App";
import { Day } from "./Day";
import * as _ from "lodash";

interface Props {
  temps: TempData[];
}

export const Forecast = (props: Props) => {
  const { temps } = props;
  const days = _.map(temps, temp => {
    return <Day temp={temp} />;
  });
  return <div>{days}</div>;
};
