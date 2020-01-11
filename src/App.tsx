import React from "react";
import { Container, Jumbotron, Button } from "react-bootstrap";
import { CurrentWeather } from "./components/CurrentWeather";
import { Forecast } from "./components/Forecast";

const App: React.FC = () => {
  const [cityName, updateCityName] = React.useState("");
  return (
    <Container fluid>
      <Jumbotron>
        <CurrentWeather cityName={cityName} temp="10" description="slightly drizzly" icon="10d" />
        <Forecast icon="11d" temp="30" description="Sunny" />
        <p>
          <Button variant="primary">Select Location</Button>
        </p>
      </Jumbotron>
    </Container>
  );
};

export default App;
