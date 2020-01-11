import React from "react";
import axios from "axios";
import { Container, Jumbotron, Button } from "react-bootstrap";
import { CurrentWeather } from "./components/CurrentWeather";
import { Forecast } from "./components/Forecast";
import * as _ from "lodash";

const weatherKey = process.env.REACT_APP_WEATHER_KEY;
console.log(weatherKey);

const App: React.FC = () => {
  const [cityName, updateCityName] = React.useState("London");
  updateWeather(cityName);
  return (
    <Container fluid>
      <Jumbotron>
        <CurrentWeather cityName={cityName} temp="10" description="slightly drizzly" icon="10d" />
        {/* <Forecast icon="11d" temp="30" description="Sunny" /> */}
        <p>
          <Button variant="primary">Select Location</Button>
        </p>
      </Jumbotron>
    </Container>
  );
};

interface WeatherResponse {
  list: [
    {
      main: {
        temp: string;
      };
      weather: [
        {
          description: string;
          icon: string;
        }
      ];
    }
  ];
}

interface Weather {
  temp: any;
  description: any;
  icon: string;
}

function updateWeather(cityName: string): Promise<Weather[]> {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${weatherKey}`;
  return axios
    .get(URL)
    .then(res => {
      const data = res.data.list.filter((value: number, index: number) => {
        return index % 8 === 0;
      });
      const temps = _.map(data, item => {
        return {
          temp: item.main.temp,
          description: item.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        };
      });
      console.log(temps);
      return temps;
    })
    .catch(err => {
      console.error("Cannot fetch Weather Data from API", err);
      throw err;
    });
}

export default App;
