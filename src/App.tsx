import React from "react";
import axios from "axios";
import { Container, Jumbotron, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CurrentWeather } from "./components/CurrentWeather";
import { Forecast } from "./components/Forecast";
import * as _ from "lodash";

const weatherKey = process.env.REACT_APP_WEATHER_KEY;

interface AppState {
  cityName: string;
  date: string;
  isLoading: boolean;
  temp: string;
  description: string;
  icon: string;
}

const App: React.FC = () => {
  const [appState, updateAppState] = React.useState<AppState>({
    cityName: "Toowoomba",
    date: "",
    isLoading: false,
    temp: "",
    description: "",
    icon: ""
  });

  React.useEffect(() => {
    updateWeather(appState.cityName).then(weatherData => {
      const { temp, description, icon, date } = weatherData[0];
      updateAppState({
        ...appState,
        date: date,
        temp: temp,
        description: description,
        icon: icon
      });
    });
  }, []); // [] ensures the API is only called once

  return (
    <Container fluid>
      <Jumbotron>
        {renderTopSection(appState.cityName, appState.date, appState.temp, appState.description, appState.icon)}
        <p>
          <Button variant="primary" as="input" type="button" value="Select Location"></Button>
        </p>
        {/* <Forecast icon="11d" temp="30" description="Sunny" /> */}
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
      dt_text: string;
    }
  ];
}

interface Weather {
  temp: string;
  description: string;
  icon: string;
  date: string;
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
        const formattedDate = item.dt_txt.substring(0, 10);

        return {
          date: formattedDate,
          temp: `${item.main.temp}°C`,
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

function renderTopSection(cityName: string, date: string, temp: string, description: string, icon: string) {
  return <CurrentWeather cityName={cityName} date={date} temp={temp} description={description} icon={icon} />;
}

export default App;
