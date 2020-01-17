import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Container, Jumbotron, Button, InputGroup, FormControl } from "react-bootstrap";
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

// interface CityNameState {
//   cityName: string;
// }

const App: React.FC = () => {
  const [appState, updateAppState] = React.useState<AppState>({
    cityName: "Toowoomba",
    date: "",
    isLoading: false,
    temp: "",
    description: "",
    icon: ""
  });

  const [cityNameState, updateCityNameState] = React.useState<any>("");
  // console.log(onChangeState, "ON CHANGE STATE");

  console.log(appState, "APPSTATE");

  React.useEffect(() => {
    updateWeather(appState.cityName).then(weatherData => {
      const { temp, description, icon, date } = weatherData[0];
      updateAppState({
        ...appState,
        isLoading: true,
        date: date,
        temp: temp,
        description: description,
        icon: icon
      });
    });
  }, [appState]);
  // {renderTopSection(appState.cityName, appState.date, appState.temp, appState.description, appState.icon)}

  return (
    <Container>
      <Jumbotron>
        {CurrentWeather(appState)}
        <InputGroup className="form-select-location">
          <FormControl
            placeholder="Select Location"
            onChange={(event: React.FormEvent<HTMLInputElement>) => onChange(event, cityNameState, updateCityNameState)}
          />
          <Button
            variant="primary"
            type="submit"
            onClick={(event: React.FormEvent<HTMLButtonElement>) => onClick(cityNameState, appState, updateAppState)}
          >
            Submit
          </Button>
        </InputGroup>
        {/* <Forecast icon="11d" temp="30" description="Sunny" /> */}
      </Jumbotron>
    </Container>
  );
};

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
      return temps;
    })
    .catch(err => {
      console.error("Cannot fetch Weather Data from API", err);
      throw err;
    });
}

// on the onChange event,update the cityNameState to contain the value inputted into the input-group
function onChange(
  event: React.FormEvent<HTMLInputElement>,
  cityNameState: any,
  updateCityNameState: (value: React.SetStateAction<any>) => void
): void {
  const cityName = event.currentTarget.value;
  updateCityNameState({
    ...cityNameState,
    cityName
  });
}

// on the onClick event, pass the value from cityNameState (cityName) into the appState -> thus trigger state update
function onClick(cityNameState: any, appState: AppState, updateAppState: (value: React.SetStateAction<AppState>) => void): void {
  const cityName = cityNameState.cityName;
  console.log(cityName);
  updateAppState({
    ...appState,
    cityName,
    isLoading: true
  });
}

function manageState() {}

export default App;

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
