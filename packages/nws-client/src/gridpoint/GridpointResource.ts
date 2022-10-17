import { Format, UnitType } from "../common";
import { apiRoot } from "../common/CommonConstants";
import {
  addQueryString,
  getStringArrayHeader,
  getStringRecord,
  jsonRequest,
  simpleGetRequest,
} from "../common/Network";
import {
  ObservationStationCollectionGeoJson,
  ObservationStationCollectionJsonLd,
} from "../station";
import {
  Gridpoint,
  GridpointForecast,
  GridpointForecastGeoJson,
  GridpointGeoJson,
} from "./GridpointTypes";

interface GetGridpointArgs {
  forecastOfficeId: string;
  format?: Format;
  gridX: string;
  gridY: string;
}

interface GetGridpointForecastArgs {
  featureFlags?: GetGridpointForecastFeatureFlag[];
  forecastOfficeId: string;
  format?: Format;
  gridX: string;
  gridY: string;
  units?: UnitType;
}

interface GetGridpointStationsArgs {
  forecastOfficeId: string;
  format?: Format;
  gridX: string;
  gridY: string;
}

export type GetGridpointForecastFeatureFlag =
  | "forecast_temperature_qv"
  | "forecast_wind_speed_qv";

export const getGridpoint = ({
  forecastOfficeId,
  format = Format.GeoJson,
  gridX,
  gridY,
}: GetGridpointArgs) => {
  return simpleGetRequest<Gridpoint | GridpointGeoJson>({
    endpoint: `${apiRoot}/gridpoints/${forecastOfficeId}/${gridX},${gridY}`,
    format,
  });
};

export const getGridpointForecast = ({
  featureFlags,
  forecastOfficeId,
  format = Format.GeoJson,
  gridX,
  gridY,
  units,
}: GetGridpointForecastArgs) => {
  const endpoint = addQueryString(
    `${apiRoot}/gridpoints/${forecastOfficeId}/${gridX},${gridY}/forecast`,
    { units }
  );

  return jsonRequest<GridpointForecast | GridpointForecastGeoJson>({
    endpoint,
    headers: getStringRecord({
      Accept: format,
      "Feature-Flags": getStringArrayHeader(featureFlags),
    }),
    method: "GET",
  });
};

export const getGridpointForecastHourly = ({
  featureFlags,
  forecastOfficeId,
  format = Format.GeoJson,
  gridX,
  gridY,
  units,
}: GetGridpointForecastArgs) => {
  const endpoint = addQueryString(
    `${apiRoot}/gridpoints/${forecastOfficeId}/${gridX},${gridY}/forecast/hourly`,
    { units }
  );

  return jsonRequest<GridpointForecast | GridpointForecastGeoJson>({
    endpoint,
    headers: getStringRecord({
      Accept: format,
      "Feature-Flags": getStringArrayHeader(featureFlags),
    }),
    method: "GET",
  });
};

export const getGridpointStations = ({
  forecastOfficeId,
  format = Format.GeoJson,
  gridX,
  gridY,
}: GetGridpointStationsArgs) => {
  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint: `${apiRoot}/gridpoints/${forecastOfficeId}/${gridX},${gridY}/stations`,
    format,
  });
};
