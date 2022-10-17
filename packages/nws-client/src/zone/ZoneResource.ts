import { Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import { Zone, ZoneGeoJson } from "./ZoneTypes";

interface GetZoneArgs {
  effective?: string;
  format?: Format;
  type: string;
  zoneId: string;
}

interface GetZoneByUriArgs {
  format?: Format;
  uri: string;
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
