import {
  BaseEndpointArgs,
  Format,
  isObservationCollectionGeoJson,
  isObservationCollectionJsonLd,
  isObservationGeoJson,
  isObservationJsonLd,
  ObservationCollectionGeoJson,
  ObservationCollectionJsonLd,
  ObservationGeoJson,
  ObservationJsonLd,
} from "../common";
import { apiRoot } from "../common/CommonConstants";
import {
  addQueryString,
  simpleGetRequest,
  textGetRequest,
} from "../common/Network";
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
  stationId: string;
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

interface GetTafArgs extends BaseEndpointArgs {
  date: string;
  stationId: string;
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

/**
 * Get a Terminal Aerodrome Forecast (TAF) in IWXXM format.
 */
export const getTafIwxxm = ({
  date,
  stationId,
  time,
  userAgent,
}: GetTafArgs) => {
  return textGetRequest({
    endpoint: `/stations/${stationId}/tafs/${date}/${time}`,
    format: Format.Iwxxm,
    userAgent,
  });
};

/**
 * Get a Terminal Aerodrome Forecast (TAF) in IWXXM format.
 */
export const getTafByUriIwxxm = ({ uri, userAgent }: GetTafByUriArgs) => {
  return textGetRequest({
    endpoint: uri,
    format: Format.Iwxxm,
    userAgent,
  });
};

/**
 * Get Terminal Aerodrome Forecasts (TAF) in JSON-LD format.
 */
export const getTafsJsonLd = ({ stationId, userAgent }: GetTafsArgs) => {
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

  return simpleGetRequest<ObservationGeoJson | ObservationJsonLd>({
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
  return simpleGetRequest<ObservationJsonLd | ObservationGeoJson>({
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
