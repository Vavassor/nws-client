import {
  getQuantitativeValue,
  isGridpointForecastGeoJson,
} from "@vavassor/nws-client";
import React, { FC, useEffect, useState } from "react";
import { nwsClient } from "./nws";

export const Forecast: FC = () => {
  const [temperatureFahrenheit, setTemperatureFahrenheit] = useState("0");
  const [shortForecast, setShortForecast] = useState<string | undefined>();

  useEffect(() => {
    const updateForecast = async () => {
      nwsClient.setUserAgentWebsiteAndEmail(
        "http://github.com/Vavassor/nws-client",
        "dawso.andrew@gmail.com"
      );
      const forecast = (
        await nwsClient.getGridpointForecast({
          latitude: 37.5247764,
          longitude: -77.5633017,
        })
      ).json;
      if (isGridpointForecastGeoJson(forecast)) {
        const period = forecast.properties.periods[0];
        const temperatureQv = getQuantitativeValue(
          period.temperature,
          "[degF]"
        );
        if (temperatureQv.value !== null) {
          setTemperatureFahrenheit(temperatureQv.value.toString());
        }
        setShortForecast(period.shortForecast)
      }
    };

    updateForecast();
    const intervalId = setInterval(() => updateForecast(), 3.6e6);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <section>
      <h2>Forecast</h2>
      <p>{shortForecast}</p>
      <p>Temperature {temperatureFahrenheit} °F</p>
    </section>
  );
};
