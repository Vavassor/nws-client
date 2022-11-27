import { BaseEndpointArgs, Format, isString, UnitType } from "../common";
import { apiRoot } from "../common/CommonConstants";
import {
  addQueryString,
  getStringArrayHeader,
  getStringRecord,
  jsonRequest,
  simpleGetRequest,
} from "../common/Network";
import { requestInFormat } from "../common/RequestInFormat";
import {
  isObservationStationCollectionGeoJson,
  isObservationStationCollectionJsonLd,
  ObservationStationCollectionGeoJson,
  ObservationStationCollectionJsonLd,
} from "../station";
import {
  isGridpointForecastGeoJson,
  isGridpointForecastJsonLd,
  isGridpointGeoJson,
  isGridpointJsonLd,
} from "./GridpointTypeguards";
import {
  GridpointForecastGeoJson,
  GridpointForecastJsonLd,
  GridpointGeoJson,
  GridpointJsonLd,
} from "./GridpointTypes";

interface GetGridpointArgs extends BaseEndpointArgs {
  forecastOfficeId: string;
  gridX: string;
  gridY: string;
}

interface GetGridpointByUriArgs extends BaseEndpointArgs {
  uri: string;
}

interface GetGridpointForecastArgs extends BaseEndpointArgs {
  featureFlags?: GetGridpointForecastFeatureFlag[];
  forecastOfficeId: string;
  gridX: number | string;
  gridY: number | string;
  /** Use US customary or SI (metric) units in textual output. */
  units?: UnitType;
}

interface GetGridpointForecastByUriArgs extends BaseEndpointArgs {
  featureFlags?: GetGridpointForecastFeatureFlag[];
  /** Use US customary or SI (metric) units in textual output. */
  units?: UnitType;
  uri: string;
}

interface GetGridpointStationsArgs extends BaseEndpointArgs {
  cursor?: string;
  forecastOfficeId: string;
  gridX: string;
  gridY: string;
  limit?: number;
}

interface GetGridpointStationsByUriArgs extends BaseEndpointArgs {
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

export const getGridpointGeoJson = (args: GetGridpointArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointGeoJson,
    getGridpointInternal
  );

export const getGridpointJsonLd = (args: GetGridpointArgs) =>
  requestInFormat(args, Format.JsonLd, isGridpointJsonLd, getGridpointInternal);

export const getGridpointByUriGeoJson = (args: GetGridpointByUriArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointGeoJson,
    getGridpointByUriInternal
  );

export const getGridpointByUriJsonLd = (args: GetGridpointByUriArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isGridpointJsonLd,
    getGridpointByUriInternal
  );

export const getGridpointForecastDwml = (args: GetGridpointForecastArgs) =>
  requestInFormat(args, Format.Dwml, isString, getGridpointForecastInternal);

export const getGridpointForecastGeoJson = (args: GetGridpointForecastArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointForecastGeoJson,
    getGridpointForecastInternal
  );

export const getGridpointForecastJsonLd = (args: GetGridpointForecastArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isGridpointForecastJsonLd,
    getGridpointForecastInternal
  );

export const getGridpointForecastByUriDwml = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.Dwml,
    isString,
    getGridpointForecastByUriInternal
  );

export const getGridpointForecastByUriGeoJson = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointForecastGeoJson,
    getGridpointForecastByUriInternal
  );

export const getGridpointForecastByUriJsonLd = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isGridpointForecastJsonLd,
    getGridpointForecastByUriInternal
  );

export const getGridpointForecastHourlyDwml = (
  args: GetGridpointForecastArgs
) =>
  requestInFormat(
    args,
    Format.Dwml,
    isString,
    getGridpointForecastHourlyInternal
  );

export const getGridpointForecastHourlyGeoJson = (
  args: GetGridpointForecastArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointForecastGeoJson,
    getGridpointForecastHourlyInternal
  );

export const getGridpointForecastHourlyJsonLd = (
  args: GetGridpointForecastArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isGridpointForecastJsonLd,
    getGridpointForecastHourlyInternal
  );

export const getGridpointForecastHourlyByUriDwml = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.Dwml,
    isString,
    getGridpointForecastHourlyByUriInternal
  );

export const getGridpointForecastHourlyByUriGeoJson = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointForecastGeoJson,
    getGridpointForecastHourlyByUriInternal
  );

export const getGridpointForecastHourlyByUriJsonLd = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isGridpointForecastJsonLd,
    getGridpointForecastHourlyByUriInternal
  );

export const getGridpointStationsGeoJson = (args: GetGridpointStationsArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationStationCollectionGeoJson,
    getGridpointStationsInternal
  );

export const getGridpointStationsJsonLd = (args: GetGridpointStationsArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationStationCollectionJsonLd,
    getGridpointStationsInternal
  );

export const getGridpointStationsByUriGeoJson = (
  args: GetGridpointStationsByUriArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationStationCollectionGeoJson,
    getGridpointStationsByUriInternal
  );

export const getGridpointStationsByUriJsonLd = (
  args: GetGridpointStationsByUriArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationStationCollectionJsonLd,
    getGridpointStationsByUriInternal
  );

const getGridpointByUriInternal = (
  { uri, userAgent }: GetGridpointByUriArgs,
  format: Format
) => {
  return simpleGetRequest<GridpointJsonLd | GridpointGeoJson>({
    endpoint: uri,
    format,
    userAgent,
  });
};

const getGridpointForecastByUriInternal = (
  { featureFlags, units, uri, userAgent }: GetGridpointForecastByUriArgs,
  format: Format
) => {
  const endpoint = addQueryString(uri, { units });

  return jsonRequest<GridpointForecastJsonLd | GridpointForecastGeoJson>({
    endpoint,
    headers: getStringRecord({
      Accept: format,
      "Feature-Flags": getStringArrayHeader(featureFlags),
      "User-Agent": userAgent,
    }),
    method: "GET",
  });
};

const getGridpointForecastHourlyByUriInternal = (
  { featureFlags, units, uri, userAgent }: GetGridpointForecastByUriArgs,
  format: Format
) => {
  const endpoint = addQueryString(uri, { units });
  return jsonRequest<GridpointForecastJsonLd | GridpointForecastGeoJson>({
    endpoint,
    headers: getStringRecord({
      Accept: format,
      "Feature-Flags": getStringArrayHeader(featureFlags),
      "User-Agent": userAgent,
    }),
    method: "GET",
  });
};

const getGridpointForecastHourlyInternal = (
  {
    featureFlags,
    forecastOfficeId,
    gridX,
    gridY,
    units,
    userAgent,
  }: GetGridpointForecastArgs,
  format: Format
) => {
  const endpoint = addQueryString(
    `${apiRoot}/gridpoints/${forecastOfficeId}/${gridX},${gridY}/forecast/hourly`,
    { units }
  );

  return jsonRequest<GridpointForecastJsonLd | GridpointForecastGeoJson>({
    endpoint,
    headers: getStringRecord({
      Accept: format,
      "Feature-Flags": getStringArrayHeader(featureFlags),
      "User-Agent": userAgent,
    }),
    method: "GET",
  });
};

const getGridpointForecastInternal = (
  {
    featureFlags,
    forecastOfficeId,
    gridX,
    gridY,
    units,
    userAgent,
  }: GetGridpointForecastArgs,
  format: Format
) => {
  const endpoint = addQueryString(
    `${apiRoot}/gridpoints/${forecastOfficeId}/${gridX},${gridY}/forecast`,
    { units }
  );

  return jsonRequest<GridpointForecastJsonLd | GridpointForecastGeoJson>({
    endpoint,
    headers: getStringRecord({
      Accept: format,
      "Feature-Flags": getStringArrayHeader(featureFlags),
      "User-Agent": userAgent,
    }),
    method: "GET",
  });
};

const getGridpointInternal = (
  { forecastOfficeId, gridX, gridY, userAgent }: GetGridpointArgs,
  format: Format
) => {
  return simpleGetRequest<GridpointJsonLd | GridpointGeoJson>({
    endpoint: `${apiRoot}/gridpoints/${forecastOfficeId}/${gridX},${gridY}`,
    format,
    userAgent,
  });
};

const getGridpointStationsByUriInternal = (
  { uri, userAgent }: GetGridpointStationsByUriArgs,
  format: Format
) => {
  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint: uri,
    format,
    userAgent,
  });
};

const getGridpointStationsInternal = (
  {
    cursor,
    forecastOfficeId,
    gridX,
    gridY,
    limit,
    userAgent,
  }: GetGridpointStationsArgs,
  format: Format
) => {
  const endpoint = addQueryString(
    `${apiRoot}/gridpoints/${forecastOfficeId}/${gridX},${gridY}/stations`,
    { cursor, limit }
  );

  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint,
    format,
    userAgent,
  });
};
