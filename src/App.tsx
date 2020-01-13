import React from "react";
import axios from "axios";
import { Container, Jumbotron, Button } from "react-bootstrap";
import { CurrentWeather } from "./components/CurrentWeather";
import { Forecast } from "./components/Forecast";
import * as _ from "lodash";

const weatherKey = process.env.REACT_APP_WEATHER_KEY;

interface AppState {
  cityName: string;
  isLoading: boolean;
  temp: number;
  description: string;
  icon: string;
}

const App: React.FC = () => {
  const [appState, updateAppState] = React.useState<AppState>({
    cityName: "Toowoomba",
    isLoading: false,
    temp: 0,
    description: "",
    icon: ""
  });

  // inset [] somewhere in useEffect....
  React.useEffect(() => {
    updateWeather(appState.cityName).then(weatherData => {
      const { temp, description, icon } = weatherData[0];
      updateAppState({
        ...appState,
        temp: temp,
        description: description,
        icon: icon
      });
    });
  });

  return (
    <Container fluid>
      <Jumbotron>
        {renderTopSection(appState.cityName, appState.temp, appState.description, appState.icon)}
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
        temp: number;
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
  temp: number;
  description: string;
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

function renderTopSection(cityName: string, temp: number, description: string, icon: string) {
  return <CurrentWeather cityName={cityName} temp={temp} description={description} icon={icon} />;
}

export default App;
