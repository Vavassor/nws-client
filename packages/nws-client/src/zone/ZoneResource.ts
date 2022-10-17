import { Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import {
  Zone,
  ZoneCollectionGeoJson,
  ZoneCollectionJsonLd,
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
