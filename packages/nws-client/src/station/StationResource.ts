import {
  BaseEndpointArgs,
  Format,
  isObservationCollectionGeoJson,
  isObservationCollectionJsonLd,
  isObservationGeoJson,
  isObservationJsonLd,
  isString,
  ObservationCollectionGeoJson,
  ObservationCollectionJsonLd,
  ObservationGeoJson,
  ObservationJsonLd,
} from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import { requestInFormat } from "../common/RequestInFormat";
import {
  isObservationStationCollectionGeoJson,
  isObservationStationCollectionJsonLd,
  isObservationStationGeoJson,
  isObservationStationJsonLd,
} from "./StationTypeguards";
import {
  ObservationStationCollectionGeoJson,
  ObservationStationCollectionJsonLd,
  ObservationStationGeoJson,
  ObservationStationJsonLd,
  TerminalAerodromeForecastCollectionJsonLd,
} from "./StationTypes";

interface GetLatestStationObservationArgs extends BaseEndpointArgs {
  requireQc?: string;
  stationId: string;
}

interface GetStationArgs extends BaseEndpointArgs {
  stationId: string;
}

interface GetStationByUriArgs extends BaseEndpointArgs {
  uri: string;
}

interface GetStationObservationByTimeArgs extends BaseEndpointArgs {
  /** The observation station ID. */
  stationId: string;
  /** The timestamp of the observation. */
  time: string;
}

interface GetStationObservationsArgs extends BaseEndpointArgs {
  end?: string;
  limit?: number;
  stationId: string;
  start?: string;
}

interface GetStationsArgs extends BaseEndpointArgs {
  /** The pagination cursor that specifies the page of records to fetch. */
  cursor?: string;
  /** Filter by observation station IDs. */
  id?: string[];
  /**
   * The maximum number of records to return. This is also the page size when
   * using pagination.
   */
  limit?: number;
  /** Filter by state or marine area codes. */
  state?: string[];
}

interface GetStationsByUriArgs extends BaseEndpointArgs {
  uri: string;
}

interface GetTafArgs extends BaseEndpointArgs {
  /** Date in YYYY-MM-DD format. */
  date: string;
  /** The observation station ID. */
  stationId: string;
  /** Time in HHMM format. This time is always specified in UTC (Zulu) time. */
  time: string;
}

interface GetTafByUriArgs extends BaseEndpointArgs {
  uri: string;
}

interface GetTafsArgs extends BaseEndpointArgs {
  stationId: string;
}

export const getLatestStationObservationGeoJson = (
  args: GetLatestStationObservationArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationGeoJson,
    getLatestStationObservationInternal
  );

export const getLatestStationObservationJsonLd = (
  args: GetLatestStationObservationArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationJsonLd,
    getLatestStationObservationInternal
  );

export const getLatestStationObservationOxml = (
  args: GetLatestStationObservationArgs
) =>
  requestInFormat(
    args,
    Format.Oxml,
    isString,
    getLatestStationObservationInternal
  );

export const getLatestStationObservationUswx = (
  args: GetLatestStationObservationArgs
) =>
  requestInFormat(
    args,
    Format.Uswx,
    isString,
    getLatestStationObservationInternal
  );

export const getStationGeoJson = (args: GetStationArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationStationGeoJson,
    getStationInternal
  );

export const getStationJsonLd = (args: GetStationArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationStationJsonLd,
    getStationInternal
  );

export const getStationByUriGeoJson = (args: GetStationByUriArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationStationGeoJson,
    getStationByUriInternal
  );

export const getStationByUriJsonLd = (args: GetStationByUriArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationStationJsonLd,
    getStationByUriInternal
  );

export const getStationObservationByTimeGeoJson = (
  args: GetStationObservationByTimeArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationGeoJson,
    getStationObservationByTimeInternal
  );

export const getStationObservationByTimeJsonLd = (
  args: GetStationObservationByTimeArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationJsonLd,
    getStationObservationByTimeInternal
  );

export const getStationObservationByTimeOxml = (
  args: GetStationObservationByTimeArgs
) =>
  requestInFormat(
    args,
    Format.Oxml,
    isString,
    getStationObservationByTimeInternal
  );

export const getStationObservationByTimeUswx = (
  args: GetStationObservationByTimeArgs
) =>
  requestInFormat(
    args,
    Format.Uswx,
    isString,
    getStationObservationByTimeInternal
  );

export const getStationObservationsGeoJson = (
  args: GetStationObservationsArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationCollectionGeoJson,
    getStationObservationsInternal
  );

export const getStationObservationsJsonLd = (
  args: GetStationObservationsArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationCollectionJsonLd,
    getStationObservationsInternal
  );

export const getStationsGeoJson = (args: GetStationsArgs = {}) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationStationCollectionGeoJson,
    getStationsInternal
  );

export const getStationsJsonLd = (args: GetStationsArgs = {}) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationStationCollectionJsonLd,
    getStationsInternal
  );

export const getStationsByUriGeoJson = (args: GetStationsByUriArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationStationCollectionGeoJson,
    getStationsByUriInternal
  );

export const getStationsByUriJsonLd = (args: GetStationsByUriArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationStationCollectionJsonLd,
    getStationsByUriInternal
  );

/**
 * Get a Terminal Aerodrome Forecast (TAF) in IWXXM format.
 */
export const getTafIwxxm = (args: GetTafArgs) => {
  const { date, stationId, time, userAgent } = args;
  return simpleGetRequest<string>({
    endpoint: `/stations/${stationId}/tafs/${date}/${time}`,
    format: Format.Iwxxm,
    userAgent,
  });
};

/**
 * Get a Terminal Aerodrome Forecast (TAF) in IWXXM format.
 */
export const getTafByUriIwxxm = (args: GetTafByUriArgs) => {
  const { uri, userAgent } = args;
  return simpleGetRequest<string>({
    endpoint: uri,
    format: Format.Iwxxm,
    userAgent,
  });
};

/**
 * Get Terminal Aerodrome Forecasts (TAF) in JSON-LD format.
 */
export const getTafsJsonLd = (args: GetTafsArgs) => {
  const { stationId, userAgent } = args;
  return simpleGetRequest<TerminalAerodromeForecastCollectionJsonLd>({
    endpoint: `/stations/${stationId}/tafs`,
    format: Format.JsonLd,
    userAgent,
  });
};

const getLatestStationObservationInternal = (
  { requireQc, stationId, userAgent }: GetLatestStationObservationArgs,
  format: Format
) => {
  const endpoint = addQueryString(
    `${apiRoot}/stations/${stationId}/observations/latest`,
    {
      require_qc: requireQc,
    }
  );

  return simpleGetRequest<ObservationGeoJson | ObservationJsonLd | string>({
    endpoint,
    format,
    userAgent,
  });
};

const getStationByUriInternal = (
  { uri, userAgent }: GetStationByUriArgs,
  format: Format
) => {
  return simpleGetRequest<ObservationStationJsonLd | ObservationStationGeoJson>(
    {
      endpoint: uri,
      format,
      userAgent,
    }
  );
};

const getStationInternal = (
  { stationId, userAgent }: GetStationArgs,
  format: Format
) => {
  return simpleGetRequest<ObservationStationJsonLd | ObservationStationGeoJson>(
    {
      endpoint: `${apiRoot}/stations/${stationId}`,
      format,
      userAgent,
    }
  );
};

const getStationObservationByTimeInternal = (
  { stationId, time, userAgent }: GetStationObservationByTimeArgs,
  format: Format
) => {
  return simpleGetRequest<ObservationJsonLd | ObservationGeoJson | string>({
    endpoint: `${apiRoot}/stations/${stationId}/observations/${time}`,
    format,
    userAgent,
  });
};

const getStationObservationsInternal = (
  { end, limit, start, stationId, userAgent }: GetStationObservationsArgs,
  format: Format
) => {
  const endpoint = addQueryString(
    `${apiRoot}/stations/${stationId}/observations`,
    { end, limit, start }
  );
  return simpleGetRequest<
    ObservationCollectionGeoJson | ObservationCollectionJsonLd
  >({
    endpoint,
    format,
    userAgent,
  });
};

const getStationsInternal = (
  { cursor, id, limit, state, userAgent }: GetStationsArgs,
  format: Format
) => {
  const endpoint = addQueryString(`${apiRoot}/stations`, {
    cursor,
    id,
    limit,
    state,
  });

  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint,
    format,
    userAgent,
  });
};

const getStationsByUriInternal = (
  { uri, userAgent }: GetStationsByUriArgs,
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
