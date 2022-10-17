import { isRecord } from "../common";
import {
  Gridpoint,
  GridpointForecast,
  GridpointForecastGeoJson,
  GridpointGeoJson,
} from "./GridpointTypes";

export const isGridpoint = (value: unknown): value is Gridpoint => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:Gridpoint"
  );
};

export const isGridpointForecast = (
  value: unknown
): value is GridpointForecast => {
  return (
    isRecord(value) &&
    typeof value.forecastGenerator === "string" &&
    typeof value.generatedAt === "string"
  );
};

export const isGridpointForecastGeoJson = (
  value: unknown
): value is GridpointForecastGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "Feature" &&
    isGridpointForecast(value.properties)
  );
};

export const isGridpointGeoJson = (
  value: unknown
): value is GridpointGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "Feature" &&
    isGridpoint(value.properties)
  );
};
