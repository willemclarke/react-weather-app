import React from "react";
import { TempData } from "../App";
import { Card } from "react-bootstrap";

interface Props {
  temp: TempData;
}

export const Day = (props: Props) => {
  const { temp } = props;
  return (
    <Card
      style={{
        marginTop: "30px",
        marginLeft: "55px",
        marginRight: "55px",
        height: "100%",
        width: "10em",
        backgroundColor: "transparent",
        borderColor: "transparent"
      }}
    >
      <div
        className="forcastday-container"
        style={{
          width: "10em",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <div className="image" style={{ width: "10em", height: "10em" }}>
          <img src={temp.icon} style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="text" style={{ fontSize: "25px" }}>
          {temp.temp}
        </div>
        <div className="muted-text" style={{ fontSize: "19px" }}>
          {temp.description}
        </div>
      </div>
    </Card>
  );
};
