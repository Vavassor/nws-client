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
  GetGridpointForecastFeatureFlag,
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
 * Get a gridpoint in {@link Format.GeoJson | GeoJSON} format.
 */
export const getGridpointGeoJson = (args: GetGridpointArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointGeoJson,
    getGridpointInternal
  );

/**
 * Get a gridpoint in {@link Format.JsonLd | JSON-LD} format.
 */
export const getGridpointJsonLd = (args: GetGridpointArgs) =>
  requestInFormat(args, Format.JsonLd, isGridpointJsonLd, getGridpointInternal);

/**
 * Get a gridpoint given a URI in {@link Format.GeoJson | GeoJSON} format.
 */
export const getGridpointByUriGeoJson = (args: GetGridpointByUriArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointGeoJson,
    getGridpointByUriInternal
  );


/**
 * Get a gridpoint given a URI in {@link Format.JsonLd | JSON-LD} format.
 */
export const getGridpointByUriJsonLd = (args: GetGridpointByUriArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isGridpointJsonLd,
    getGridpointByUriInternal
  );

/**
 * Get the forecast for a gridpoint in {@link Format.Dwml | DWML} format.
 */
export const getGridpointForecastDwml = (args: GetGridpointForecastArgs) =>
  requestInFormat(args, Format.Dwml, isString, getGridpointForecastInternal);

/**
 * Get the forecast for a gridpoint in {@link Format.GeoJson | GeoJSON} format.
 */
export const getGridpointForecastGeoJson = (args: GetGridpointForecastArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointForecastGeoJson,
    getGridpointForecastInternal
  );

/**
 * Get the forecast for a gridpoint in {@link Format.JsonLd | JSON-LD} format.
 */
export const getGridpointForecastJsonLd = (args: GetGridpointForecastArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isGridpointForecastJsonLd,
    getGridpointForecastInternal
  );

/**
 * Get a gridpoint forecast given a URI in {@link Format.Dwml | DWML} format.
 */
export const getGridpointForecastByUriDwml = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.Dwml,
    isString,
    getGridpointForecastByUriInternal
  );

/**
 * Get a gridpoint forecast given a URI in
 * {@link Format.GeoJson | GeoJSON} format.
 */
export const getGridpointForecastByUriGeoJson = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointForecastGeoJson,
    getGridpointForecastByUriInternal
  );

/**
 * Get a gridpoint forecast given a URI in
 * {@link Format.JsonLd | JSON-LD} format.
 */
export const getGridpointForecastByUriJsonLd = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isGridpointForecastJsonLd,
    getGridpointForecastByUriInternal
  );

/**
 * Get an hourly gridpoint forecast in {@link Format.Dwml | DWML} format.
 */
export const getGridpointForecastHourlyDwml = (
  args: GetGridpointForecastArgs
) =>
  requestInFormat(
    args,
    Format.Dwml,
    isString,
    getGridpointForecastHourlyInternal
  );

/**
 * Get an hourly gridpoint forecast in {@link Format.GeoJson | GeoJSON} format.
 */
export const getGridpointForecastHourlyGeoJson = (
  args: GetGridpointForecastArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointForecastGeoJson,
    getGridpointForecastHourlyInternal
  );

/**
 * Get an hourly gridpoint forecast in {@link Format.JsonLd | JSON-LD} format.
 */
export const getGridpointForecastHourlyJsonLd = (
  args: GetGridpointForecastArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isGridpointForecastJsonLd,
    getGridpointForecastHourlyInternal
  );

/**
 * Get an hourly gridpoint forecast given a URI in
 * {@link Format.Dwml | DWML} format.
 */
export const getGridpointForecastHourlyByUriDwml = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.Dwml,
    isString,
    getGridpointForecastHourlyByUriInternal
  );

/**
 * Get an hourly gridpoint forecast given a URI in
 * {@link Format.GeoJson | GeoJSON} format.
 */
export const getGridpointForecastHourlyByUriGeoJson = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isGridpointForecastGeoJson,
    getGridpointForecastHourlyByUriInternal
  );

/**
 * Get an hourly gridpoint forecast given a URI in
 * {@link Format.JsonLd | JSON-LD} format.
 */
export const getGridpointForecastHourlyByUriJsonLd = (
  args: GetGridpointForecastByUriArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isGridpointForecastJsonLd,
    getGridpointForecastHourlyByUriInternal
  );

/**
 * Get observations stations within a gridpoint in
 * {@link Format.GeoJson | GeoJSON} format.
 */
export const getGridpointStationsGeoJson = (args: GetGridpointStationsArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationStationCollectionGeoJson,
    getGridpointStationsInternal
  );

/**
 * Get observations stations within a gridpoint in
 * {@link Format.JsonLd | JSON-LD} format.
 */
export const getGridpointStationsJsonLd = (args: GetGridpointStationsArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationStationCollectionJsonLd,
    getGridpointStationsInternal
  );

/**
 * Get observations stations within a gridpoint, given a URI, in
 * {@link Format.GeoJson | GeoJSON} format.
 */
export const getGridpointStationsByUriGeoJson = (
  args: GetGridpointStationsByUriArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationStationCollectionGeoJson,
    getGridpointStationsByUriInternal
  );

/**
 * Get observations stations within a gridpoint, given a URI, in
 * {@link Format.JsonLd | JSON-LD} format.
 */
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
  return simpleGetRequest<GridpointJsonLd | GridpointGeoJson | string>({
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

  return jsonRequest<
    GridpointForecastJsonLd | GridpointForecastGeoJson | string
  >({
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
  return jsonRequest<
    GridpointForecastJsonLd | GridpointForecastGeoJson | string
  >({
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

  return jsonRequest<
    GridpointForecastJsonLd | GridpointForecastGeoJson | string
  >({
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

  return jsonRequest<
    GridpointForecastJsonLd | GridpointForecastGeoJson | string
  >({
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
