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
  ObservationStationCollectionGeoJson,
  ObservationStationCollectionJsonLd,
} from "../station";
import {
  isZoneCollectionGeoJson,
  isZoneCollectionJsonLd,
  isZoneForecastGeoJson,
  isZoneForecastJsonLd,
  isZoneGeoJson,
  isZoneJsonLd,
} from "./ZoneTypeguards";
import {
  ZoneCollectionGeoJson,
  ZoneCollectionJsonLd,
  ZoneForecastGeoJson,
  ZoneForecastJsonLd,
  ZoneGeoJson,
  ZoneJsonLd,
  ZoneType,
} from "./ZoneTypes";

interface GetZoneArgs extends BaseEndpointArgs {
  effective?: string;
  type: "county" | "fire" | "forecast";
  zoneId: string;
}

interface GetZoneByUriArgs extends BaseEndpointArgs {
  effective?: string;
  uri: string;
}

interface GetZoneForecastArgs extends BaseEndpointArgs {
  type: ZoneType;
  zoneId: string;
}

interface GetZoneForecastByUriArgs extends BaseEndpointArgs {
  uri: string;
}

interface GetZoneObservationsArgs extends BaseEndpointArgs {
  end?: string;
  limit?: number;
  start?: string;
  zoneId: string;
}

interface GetZoneStationsArgs extends BaseEndpointArgs {
  zoneId: string;
}

interface GetZonesArgs extends BaseEndpointArgs {
  area?: string[];
  effective?: string;
  id?: string[];
  includeGeometry?: boolean;
  limit?: number;
  point?: string;
  region?: string[];
  type?: ZoneType[];
}

interface GetZonesByTypeArgs extends BaseEndpointArgs {
  area?: string[];
  effective?: string;
  id?: string[];
  includeGeometry?: boolean;
  limit?: number;
  point?: string;
  region?: string[];
  type: ZoneType;
}

export const getZoneGeoJson = (args: GetZoneArgs) =>
  requestInFormat(args, Format.GeoJson, isZoneGeoJson, getZoneInternal);

export const getZoneJsonLd = (args: GetZoneArgs) =>
  requestInFormat(args, Format.JsonLd, isZoneJsonLd, getZoneInternal);

export const getZoneByUriGeoJson = (args: GetZoneByUriArgs) =>
  requestInFormat(args, Format.GeoJson, isZoneGeoJson, getZoneByUriInternal);

export const getZoneByUriJsonLd = (args: GetZoneByUriArgs) =>
  requestInFormat(args, Format.JsonLd, isZoneJsonLd, getZoneByUriInternal);

export const getZoneForecastGeoJson = (args: GetZoneForecastArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isZoneForecastGeoJson,
    getZoneForecastInternal
  );

export const getZoneForecastJsonLd = (args: GetZoneForecastArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isZoneForecastJsonLd,
    getZoneForecastInternal
  );

export const getZoneForecastByUriGeoJson = (args: GetZoneForecastByUriArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isZoneForecastGeoJson,
    getZoneForecastByUriInternal
  );

export const getZoneForecastByUriJsonLd = (args: GetZoneForecastByUriArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isZoneForecastJsonLd,
    getZoneForecastByUriInternal
  );

export const getZoneObservationsGeoJson = (args: GetZoneObservationsArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationCollectionGeoJson,
    getZoneObservationsInternal
  );

export const getZoneObservationsJsonLd = (args: GetZoneObservationsArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationCollectionJsonLd,
    getZoneObservationsInternal
  );

export const getZoneStationsGeoJson = (args: GetZoneStationsArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isObservationStationCollectionGeoJson,
    getZoneStationsInternal
  );

export const getZoneStationsJsonLd = (args: GetZoneStationsArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isObservationStationCollectionJsonLd,
    getZoneStationsInternal
  );

export const getZonesGeoJson = (args: GetZonesArgs = {}) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isZoneCollectionGeoJson,
    getZonesInternal
  );

export const getZonesJsonLd = (args: GetZonesArgs = {}) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isZoneCollectionJsonLd,
    getZonesInternal
  );

export const getZonesByTypeGeoJson = (args: GetZonesByTypeArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isZoneCollectionGeoJson,
    getZonesByTypeInternal
  );

export const getZonesByTypeJsonLd = (args: GetZonesByTypeArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isZoneCollectionJsonLd,
    getZonesByTypeInternal
  );

const getZoneInternal = (
  { effective, type, userAgent, zoneId }: GetZoneArgs,
  format: Format
) => {
  const endpoint = addQueryString(`${apiRoot}/zones/${type}/${zoneId}`, {
    effective,
  });
  return simpleGetRequest<ZoneJsonLd | ZoneGeoJson>({
    endpoint,
    format,
    userAgent,
  });
};

const getZoneByUriInternal = (
  { effective, uri, userAgent }: GetZoneByUriArgs,
  format: Format
) => {
  const endpoint = addQueryString(uri, { effective });
  return simpleGetRequest<ZoneJsonLd | ZoneGeoJson>({
    endpoint,
    format,
    userAgent,
  });
};

const getZoneForecastInternal = (
  { type, userAgent, zoneId }: GetZoneForecastArgs,
  format: Format
) => {
  return simpleGetRequest<ZoneForecastGeoJson | ZoneForecastJsonLd>({
    endpoint: `${apiRoot}/zones/${type}/${zoneId}/forecast`,
    format,
    userAgent,
  });
};

const getZoneForecastByUriInternal = (
  { uri, userAgent }: GetZoneForecastByUriArgs,
  format: Format
) => {
  return simpleGetRequest<ZoneForecastGeoJson | ZoneForecastJsonLd>({
    endpoint: uri,
    format,
    userAgent,
  });
};

const getZoneObservationsInternal = (
  { end, limit, start, userAgent, zoneId }: GetZoneObservationsArgs,
  format: Format
) => {
  const endpoint = addQueryString(
    `${apiRoot}/zones/forecast/${zoneId}/observations`,
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

const getZoneStationsInternal = (
  { userAgent, zoneId }: GetZoneStationsArgs,
  format: Format
) => {
  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint: `${apiRoot}/zones/forecast/${zoneId}/stations`,
    format,
    userAgent,
  });
};

const getZonesInternal = (
  {
    area,
    effective,
    id,
    includeGeometry,
    limit,
    point,
    region,
    type,
    userAgent,
  }: GetZonesArgs,
  format: Format
) => {
  const endpoint = addQueryString(`${apiRoot}/zones`, {
    area,
    effective,
    id,
    include_geometry: includeGeometry,
    limit,
    point,
    region,
    type,
  });

  return simpleGetRequest<ZoneCollectionGeoJson | ZoneCollectionJsonLd>({
    endpoint,
    format,
    userAgent,
  });
};

const getZonesByTypeInternal = (
  {
    area,
    effective,
    id,
    includeGeometry,
    limit,
    point,
    region,
    type,
    userAgent,
  }: GetZonesByTypeArgs,
  format: Format
) => {
  const endpoint = addQueryString(`${apiRoot}/zones/${type}`, {
    area,
    effective,
    id,
    include_geometry: includeGeometry,
    limit,
    point,
    region,
  });

  return simpleGetRequest<ZoneCollectionGeoJson | ZoneCollectionJsonLd>({
    endpoint,
    format,
    userAgent,
  });
};
