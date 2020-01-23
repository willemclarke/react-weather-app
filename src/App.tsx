import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Container, Jumbotron, Button, InputGroup, FormControl } from "react-bootstrap";
import { CurrentWeather } from "./components/CurrentWeather";
import { Forecast } from "./components/Forecast";
import * as _ from "lodash";

const weatherKey = process.env.REACT_APP_WEATHER_KEY;

export interface TempData {
  cityName: string;
  date: string;
  temp: string;
  description: string;
  icon: string;
}

const App: React.FC = () => {
  const [temps, setTemps] = React.useState<TempData[]>([]);
  const [cityNameInput, setCityNameInput] = React.useState<any>("Toowoomba");
  const firstTemp = _.head(temps);
  const forecastTemps = _.tail(temps);

  const currentWeather = firstTemp ? <CurrentWeather temp={firstTemp} /> : null;

  const fetchData = async (city: string) => {
    const temps = await getWeather(city);
    setTemps(temps);
  };

  React.useEffect(() => {
    fetchData(cityNameInput);
  }, []);

  return (
    <Container>
      <Jumbotron style={{ backgroundColor: "#445a71", color: "#fff" }}>
        {currentWeather}
        <InputGroup className="form-select-location" style={{ margin: "0 auto", float: "none", width: "25%" }}>
          <FormControl
            placeholder="Select Location"
            onChange={(event: React.FormEvent<HTMLInputElement>) => setCityNameInput(event.currentTarget.value)}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          />
          <Button variant="primary" type="submit" onClick={(event: React.FormEvent<HTMLButtonElement>) => fetchData(cityNameInput)}>
            Submit
          </Button>
        </InputGroup>
        <Forecast temps={forecastTemps} />
      </Jumbotron>
    </Container>
  );
};

function getWeather(cityName: string): Promise<TempData[]> {
  console.log(cityName);
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${weatherKey}`;
  return axios
    .get(URL)
    .then(res => {
      const data = res.data.list.filter((value: number, index: number) => {
        return index % 8 === 0;
      });

      const temps = _.map(data, item => {
        const formattedDate = item.dt_txt.substring(0, 10);
        return {
          cityName: cityName,
          date: formattedDate,
          temp: `${item.main.temp}°C`,
          description: item.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        };
      });
      return temps;
    })
    .catch(err => {
      console.error("Cannot fetch Weather Data from API", err);
      throw err;
    });
}

export default App;
