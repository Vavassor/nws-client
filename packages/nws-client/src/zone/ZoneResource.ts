import {
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

interface GetZoneArgs {
  effective?: string;
  format?: Format;
  type: "county" | "fire" | "forecast";
  zoneId: string;
}

interface GetZoneByUriArgs {
  format?: Format;
  uri: string;
}

interface GetZoneForecastArgs {
  format?: Format;
  type: ZoneType;
  zoneId: string;
}

interface GetZoneObservationsArgs {
  end?: string;
  format?: Format;
  limit?: number;
  start?: string;
  zoneId: string;
}

interface GetZoneStationsArgs {
  format?: Format;
  zoneId: string;
}

interface GetZonesArgs {
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

interface GetZonesByTypeArgs {
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
  zoneId,
}: GetZoneArgs) => {
  const endpoint = addQueryString(`${apiRoot}/zones/${type}/${zoneId}`, {
    effective,
  });
  return simpleGetRequest<Zone | ZoneGeoJson>({ endpoint, format });
};

export const getZoneByUri = ({
  format = Format.GeoJson,
  uri,
}: GetZoneByUriArgs) => {
  return simpleGetRequest<Zone | ZoneGeoJson>({
    endpoint: uri,
    format,
  });
};

export const getZoneForecast = ({
  format = Format.GeoJson,
  type,
  zoneId,
}: GetZoneForecastArgs) => {
  return simpleGetRequest<ZoneForecast | ZoneForecastGeoJson>({
    endpoint: `${apiRoot}/zones/${type}/${zoneId}/forecast`,
    format,
  });
};

export const getZoneObservations = ({
  end,
  format = Format.GeoJson,
  limit,
  start,
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
  });
};

export const getZoneStations = ({
  format = Format.GeoJson,
  zoneId,
}: GetZoneStationsArgs) => {
  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint: `${apiRoot}/zones/forecast/${zoneId}/stations`,
    format,
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
  });
};
