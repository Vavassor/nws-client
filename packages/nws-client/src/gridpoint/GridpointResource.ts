import { BaseEndpointArgs, Format, UnitType } from "../common";
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

interface GetGridpointArgs extends BaseEndpointArgs {
  forecastOfficeId: string;
  format?: Format;
  gridX: string;
  gridY: string;
}

interface GetGridpointByUriArgs extends BaseEndpointArgs {
  format?: Format;
  uri: string;
}

interface GetGridpointForecastArgs extends BaseEndpointArgs {
  featureFlags?: GetGridpointForecastFeatureFlag[];
  forecastOfficeId: string;
  format?: Format;
  gridX: number | string;
  gridY: number | string;
  /** Use US customary or SI (metric) units in textual output. */
  units?: UnitType;
}

interface GetGridpointForecastByUriArgs extends BaseEndpointArgs {
  featureFlags?: GetGridpointForecastFeatureFlag[];
  format?: Format;
  /** Use US customary or SI (metric) units in textual output. */
  units?: UnitType;
  uri: string;
}

interface GetGridpointStationsArgs extends BaseEndpointArgs {
  forecastOfficeId: string;
  format?: Format;
  gridX: string;
  gridY: string;
}

interface GetGridpointStationsByUriArgs extends BaseEndpointArgs {
  format?: Format;
  uri: string;
}

/**
 * Enable future and experimental features.
 * 
 * forecast_temperature_qv - Represent temperature as QuantitativeValue.
 * forecast_wind_speed_qv - Represent wind speed as QuantitativeValue.
 */
export type GetGridpointForecastFeatureFlag =
  | "forecast_temperature_qv"
  | "forecast_wind_speed_qv";

export const getGridpoint = ({
  forecastOfficeId,
  format = Format.GeoJson,
  gridX,
  gridY,
  userAgent,
}: GetGridpointArgs) => {
  return simpleGetRequest<Gridpoint | GridpointGeoJson>({
    endpoint: `${apiRoot}/gridpoints/${forecastOfficeId}/${gridX},${gridY}`,
    format,
    userAgent,
  });
};

export const getGridpointByUri = ({
  format = Format.GeoJson,
  uri,
  userAgent,
}: GetGridpointByUriArgs) => {
  return simpleGetRequest<Gridpoint | GridpointGeoJson>({
    endpoint: uri,
    format,
    userAgent,
  });
};

export const getGridpointForecast = ({
  featureFlags,
  forecastOfficeId,
  format = Format.GeoJson,
  gridX,
  gridY,
  units,
  userAgent,
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
      "User-Agent": userAgent,
    }),
    method: "GET",
  });
};

export const getGridpointForecastByUri = ({
  featureFlags,
  format = Format.GeoJson,
  units,
  uri,
  userAgent,
}: GetGridpointForecastByUriArgs) => {
  const endpoint = addQueryString(uri, { units });

  return jsonRequest<GridpointForecast | GridpointForecastGeoJson>({
    endpoint,
    headers: getStringRecord({
      Accept: format,
      "Feature-Flags": getStringArrayHeader(featureFlags),
      "User-Agent": userAgent,
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
  userAgent,
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
      "User-Agent": userAgent,
    }),
    method: "GET",
  });
};

export const getGridpointForecastHourlyByUri = ({
  featureFlags,
  format = Format.GeoJson,
  units,
  uri,
  userAgent,
}: GetGridpointForecastByUriArgs) => {
  const endpoint = addQueryString(uri, { units });
  return jsonRequest<GridpointForecast | GridpointForecastGeoJson>({
    endpoint,
    headers: getStringRecord({
      Accept: format,
      "Feature-Flags": getStringArrayHeader(featureFlags),
      "User-Agent": userAgent,
    }),
    method: "GET",
  });
};

export const getGridpointStations = ({
  forecastOfficeId,
  format = Format.GeoJson,
  gridX,
  gridY,
  userAgent,
}: GetGridpointStationsArgs) => {
  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint: `${apiRoot}/gridpoints/${forecastOfficeId}/${gridX},${gridY}/stations`,
    format,
    userAgent,
  });
};

export const getGridpointStationsByUri = ({
  format = Format.GeoJson,
  uri,
  userAgent,
}: GetGridpointStationsByUriArgs) => {
  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint: uri,
    format,
    userAgent,
  });
};
