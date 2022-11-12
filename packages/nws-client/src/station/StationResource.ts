import {
  BaseEndpointArgs,
  Format,
  isObservationCollectionGeoJson,
  isObservationCollectionJsonLd,
  ObservationCollectionGeoJson,
  ObservationCollectionJsonLd,
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
  id?: string[];
  limit?: number;
  state?: string[];
}

export const getLatestStationObservationsGeoJson = (
  args: GetLatestStationObservationArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationCollectionGeoJson,
    getLatestStationObservationsInternal
  );

export const getLatestStationObservationsJsonLd = (
  args: GetLatestStationObservationArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationCollectionJsonLd,
    getLatestStationObservationsInternal
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
    isObservationStationGeoJson,
    getStationObservationByTimeInternal
  );

export const getStationObservationByTimeJsonLd = (
  args: GetStationObservationByTimeArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationStationJsonLd,
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

const getLatestStationObservationsInternal = (
  { requireQc, stationId, userAgent }: GetLatestStationObservationArgs,
  format: Format
) => {
  const endpoint = addQueryString(
    `${apiRoot}/stations/${stationId}/observations/latest`,
    {
      require_qc: requireQc,
    }
  );

  return simpleGetRequest<
    ObservationCollectionGeoJson | ObservationCollectionJsonLd
  >({
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
  return simpleGetRequest<ObservationStationJsonLd | ObservationStationGeoJson>(
    {
      endpoint: `${apiRoot}/stations/${stationId}/observations/${time}`,
      format,
      userAgent,
    }
  );
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
  { id, limit, state, userAgent }: GetStationsArgs,
  format: Format
) => {
  const endpoint = addQueryString(`${apiRoot}/stations`, { id, limit, state });
  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint,
    format,
    userAgent,
  });
};
