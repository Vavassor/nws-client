import { BaseEndpointArgs, Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import {
  ActiveAlertsCount,
  AlertCollectionGeoJson,
  AlertCollectionJsonLd,
  AlertGeoJson,
  AlertJsonLd,
  AlertTypes,
} from "./AlertTypes";

interface GetActiveAlertsArgs extends BaseEndpointArgs {
  area?: string[];
  certainty?: string[];
  code?: string[];
  event?: string[];
  format?: string;
  limit?: number;
  messageType?: string[];
  point?: string;
  region?: string[];
  regionType?: string;
  severity?: string[];
  status?: string[];
  urgency?: string[];
  zone?: string[];
}

interface GetActiveAlertsByAreaArgs extends BaseEndpointArgs {
  areaId: string;
  format?: Format;
}

interface GetActiveAlertsByRegionArgs extends BaseEndpointArgs {
  format?: Format;
  regionId: string;
}

interface GetActiveAlertsByZoneArgs extends BaseEndpointArgs {
  format?: Format;
  zoneId: string;
}

interface GetAlertArgs extends BaseEndpointArgs {
  format?: string;
  id: string;
}

interface GetAlertsArgs extends BaseEndpointArgs {
  area?: string[];
  certainty?: string[];
  code?: string[];
  cursor?: string;
  end?: string;
  event?: string[];
  format?: string;
  limit?: number;
  messageType?: string[];
  point?: string;
  severity?: string[];
  start?: string;
  status?: string[];
  region?: string[];
  regionType?: string;
  urgency?: string[];
  zone?: string[];
}

export const getActiveAlerts = ({
  area,
  certainty,
  code,
  event,
  format = Format.GeoJson,
  limit,
  messageType,
  point,
  region,
  regionType,
  severity,
  status,
  urgency,
  userAgent,
  zone,
}: GetActiveAlertsArgs) => {
  const endpoint = addQueryString(`${apiRoot}/alerts/active`, {
    area,
    certainty,
    code,
    event,
    limit,
    message_type: messageType,
    point,
    region,
    region_type: regionType,
    severity,
    status,
    urgency,
    zone,
  });

  return simpleGetRequest<AlertCollectionGeoJson | AlertCollectionJsonLd>({
    endpoint,
    format,
    userAgent,
  });
};

export const getActiveAlertsByArea = ({
  areaId,
  format = Format.GeoJson,
  userAgent,
}: GetActiveAlertsByAreaArgs) => {
  return simpleGetRequest<AlertCollectionGeoJson | AlertCollectionJsonLd>({
    endpoint: `${apiRoot}/alerts/active/area/${areaId}`,
    format,
    userAgent,
  });
};

export const getActiveAlertsByRegion = ({
  format = Format.GeoJson,
  regionId,
  userAgent,
}: GetActiveAlertsByRegionArgs) => {
  return simpleGetRequest<AlertCollectionGeoJson | AlertCollectionJsonLd>({
    endpoint: `${apiRoot}/alerts/active/region/${regionId}`,
    format,
    userAgent,
  });
};

export const getActiveAlertsByZone = ({
  format = Format.GeoJson,
  userAgent,
  zoneId,
}: GetActiveAlertsByZoneArgs) => {
  return simpleGetRequest<AlertCollectionGeoJson | AlertCollectionJsonLd>({
    endpoint: `${apiRoot}/alerts/active/zone/${zoneId}`,
    format,
    userAgent,
  });
};

export const getActiveAlertsCount = ({ userAgent }: BaseEndpointArgs) => {
  return simpleGetRequest<ActiveAlertsCount>({
    endpoint: `${apiRoot}/alerts/active/count`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getAlert = ({
  format = Format.GeoJson,
  id,
  userAgent,
}: GetAlertArgs) => {
  return simpleGetRequest<AlertJsonLd | AlertGeoJson>({
    endpoint: `${apiRoot}/alerts/${id}`,
    format,
    userAgent,
  });
};

export const getAlertTypes = ({ userAgent }: BaseEndpointArgs) => {
  return simpleGetRequest<AlertTypes>({
    endpoint: `${apiRoot}/alerts/types`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getAlerts = ({
  area,
  certainty,
  code,
  cursor,
  end,
  event,
  format = Format.GeoJson,
  limit,
  messageType,
  point,
  severity,
  start,
  status,
  region,
  regionType,
  urgency,
  userAgent,
  zone,
}: GetAlertsArgs) => {
  const endpoint = addQueryString(`${apiRoot}/alerts`, {
    area,
    certainty,
    code,
    cursor,
    end,
    event,
    limit,
    message_type: messageType,
    point,
    severity,
    start,
    status,
    region,
    region_type: regionType,
    urgency,
    zone,
  });

  return simpleGetRequest<AlertCollectionGeoJson | AlertCollectionJsonLd>({
    endpoint,
    format,
    userAgent,
  });
};
