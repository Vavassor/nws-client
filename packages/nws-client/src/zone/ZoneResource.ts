import {
  BaseEndpointArgs,
  Format,
  ObservationCollectionGeoJson,
  ObservationCollectionJsonLd,
} from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import {
  ObservationStationCollectionGeoJson,
  ObservationStationCollectionJsonLd,
} from "../station";
import {
  Zone,
  ZoneCollectionGeoJson,
  ZoneCollectionJsonLd,
  ZoneForecast,
  ZoneForecastGeoJson,
  ZoneGeoJson,
  ZoneType,
} from "./ZoneTypes";

interface GetZoneArgs extends BaseEndpointArgs {
  effective?: string;
  format?: Format;
  type: "county" | "fire" | "forecast";
  zoneId: string;
}

interface GetZoneByUriArgs extends BaseEndpointArgs {
  effective?: string;
  format?: Format;
  uri: string;
}

interface GetZoneForecastArgs extends BaseEndpointArgs {
  format?: Format;
  type: ZoneType;
  zoneId: string;
}

interface GetZoneForecastByUriArgs extends BaseEndpointArgs {
  format?: Format;
  uri: string;
}

interface GetZoneObservationsArgs extends BaseEndpointArgs {
  end?: string;
  format?: Format;
  limit?: number;
  start?: string;
  zoneId: string;
}

interface GetZoneStationsArgs extends BaseEndpointArgs {
  format?: Format;
  zoneId: string;
}

interface GetZonesArgs extends BaseEndpointArgs {
  area?: string[];
  effective?: string;
  format?: Format;
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
  format?: Format;
  id?: string[];
  includeGeometry?: boolean;
  limit?: number;
  point?: string;
  region?: string[];
  type: ZoneType;
}

export const getZone = ({
  effective,
  format = Format.GeoJson,
  type,
  userAgent,
  zoneId,
}: GetZoneArgs) => {
  const endpoint = addQueryString(`${apiRoot}/zones/${type}/${zoneId}`, {
    effective,
  });
  return simpleGetRequest<Zone | ZoneGeoJson>({ endpoint, format, userAgent });
};

export const getZoneByUri = ({
  effective,
  format = Format.GeoJson,
  uri,
  userAgent,
}: GetZoneByUriArgs) => {
  const endpoint = addQueryString(uri, { effective });
  return simpleGetRequest<Zone | ZoneGeoJson>({
    endpoint,
    format,
    userAgent,
  });
};

export const getZoneForecast = ({
  format = Format.GeoJson,
  type,
  userAgent,
  zoneId,
}: GetZoneForecastArgs) => {
  return simpleGetRequest<ZoneForecast | ZoneForecastGeoJson>({
    endpoint: `${apiRoot}/zones/${type}/${zoneId}/forecast`,
    format,
    userAgent,
  });
};

export const getZoneForecastByUri = ({
  format = Format.GeoJson,
  uri,
  userAgent,
}: GetZoneForecastByUriArgs) => {
  return simpleGetRequest<ZoneForecast | ZoneForecastGeoJson>({
    endpoint: uri,
    format,
    userAgent,
  });
};

export const getZoneObservations = ({
  end,
  format = Format.GeoJson,
  limit,
  start,
  userAgent,
  zoneId,
}: GetZoneObservationsArgs) => {
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

export const getZoneStations = ({
  format = Format.GeoJson,
  userAgent,
  zoneId,
}: GetZoneStationsArgs) => {
  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint: `${apiRoot}/zones/forecast/${zoneId}/stations`,
    format,
    userAgent,
  });
};

export const getZones = ({
  area,
  effective,
  format = Format.GeoJson,
  id,
  includeGeometry,
  limit,
  point,
  region,
  type,
  userAgent,
}: GetZonesArgs) => {
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

export const getZonesByType = ({
  area,
  effective,
  format = Format.GeoJson,
  id,
  includeGeometry,
  limit,
  point,
  region,
  type,
  userAgent,
}: GetZonesByTypeArgs) => {
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
