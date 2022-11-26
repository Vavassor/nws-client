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
  /** Pagination cursor that specifies which page of results to fetch. */
  cursor?: string;
  /** Filter the results by observation station IDs. */
  id?: string[];
  /**
   * The maximum number of results to return. This is also the page size when
   * using pagination.
   */
  limit?: number;
  /** Filter the results by state or marine area codes. */
  state?: string[];
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
