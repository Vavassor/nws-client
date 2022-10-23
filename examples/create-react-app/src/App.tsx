import React from "react";
import "./App.css";
import { CurrentConditions } from "./CurrentConditions";
import { HourlyForecast } from "./HourlyForecast";

function App() {
  return (
    <div className="App">
      <h1>Weather</h1>
      <CurrentConditions />
      <HourlyForecast />
    </div>
  );
}

export default App;
