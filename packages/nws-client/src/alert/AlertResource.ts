import { BaseEndpointArgs, Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import { requestInFormat } from "../common/RequestInFormat";
import {
  isAlertCollectionGeoJson,
  isAlertCollectionJsonLd,
  isAlertGeoJson,
  isAlertJsonLd,
} from "./AlertTypeguards";
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
}

interface GetActiveAlertsByRegionArgs extends BaseEndpointArgs {
  regionId: string;
}

interface GetActiveAlertsByZoneArgs extends BaseEndpointArgs {
  zoneId: string;
}

interface GetAlertArgs extends BaseEndpointArgs {
  id: string;
}

interface GetAlertsArgs extends BaseEndpointArgs {
  area?: string[];
  certainty?: string[];
  code?: string[];
  cursor?: string;
  end?: string;
  event?: string[];
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

export const getActiveAlertsGeoJson = (args: GetActiveAlertsArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isAlertCollectionGeoJson,
    getActiveAlertsInternal
  );

export const getActiveAlertsJsonLd = (args: GetActiveAlertsArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isAlertCollectionJsonLd,
    getActiveAlertsInternal
  );

export const getActiveAlertsByAreaGeoJson = (args: GetActiveAlertsByAreaArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isAlertCollectionGeoJson,
    getActiveAlertsByAreaInternal
  );

export const getActiveAlertsByAreaJsonLd = (args: GetActiveAlertsByAreaArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isAlertCollectionJsonLd,
    getActiveAlertsByAreaInternal
  );

export const getActiveAlertsByRegionGeoJson = (
  args: GetActiveAlertsByRegionArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isAlertCollectionGeoJson,
    getActiveAlertsByRegionInternal
  );

export const getActiveAlertsByRegionJsonLd = (
  args: GetActiveAlertsByRegionArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isAlertCollectionJsonLd,
    getActiveAlertsByRegionInternal
  );

export const getActiveAlertsByZoneGeoJson = (args: GetActiveAlertsByZoneArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isAlertCollectionGeoJson,
    getActiveAlertsByZoneInternal
  );

export const getActiveAlertsByZoneJsonLd = (args: GetActiveAlertsByZoneArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isAlertCollectionJsonLd,
    getActiveAlertsByZoneInternal
  );

export const getActiveAlertsCount = ({ userAgent }: BaseEndpointArgs) => {
  return simpleGetRequest<ActiveAlertsCount>({
    endpoint: `${apiRoot}/alerts/active/count`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getAlertGeoJson = (args: GetAlertArgs) =>
  requestInFormat(args, Format.GeoJson, isAlertGeoJson, getAlertInternal);

export const getAlertJsonLd = (args: GetAlertArgs) =>
  requestInFormat(args, Format.JsonLd, isAlertJsonLd, getAlertInternal);

export const getAlertTypes = ({ userAgent }: BaseEndpointArgs) => {
  return simpleGetRequest<AlertTypes>({
    endpoint: `${apiRoot}/alerts/types`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getAlertsGeoJson = (args: GetAlertsArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isAlertCollectionGeoJson,
    getAlertsInternal
  );

export const getAlertsJsonLd = (args: GetAlertsArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isAlertCollectionJsonLd,
    getAlertsInternal
  );

const getActiveAlertsByAreaInternal = (
  { areaId, userAgent }: GetActiveAlertsByAreaArgs,
  format: Format
) => {
  return simpleGetRequest<AlertCollectionGeoJson | AlertCollectionJsonLd>({
    endpoint: `${apiRoot}/alerts/active/area/${areaId}`,
    format,
    userAgent,
  });
};

const getActiveAlertsByRegionInternal = (
  { regionId, userAgent }: GetActiveAlertsByRegionArgs,
  format: Format
) => {
  return simpleGetRequest<AlertCollectionGeoJson | AlertCollectionJsonLd>({
    endpoint: `${apiRoot}/alerts/active/region/${regionId}`,
    format,
    userAgent,
  });
};

const getActiveAlertsByZoneInternal = (
  { userAgent, zoneId }: GetActiveAlertsByZoneArgs,
  format: Format
) => {
  return simpleGetRequest<AlertCollectionGeoJson | AlertCollectionJsonLd>({
    endpoint: `${apiRoot}/alerts/active/zone/${zoneId}`,
    format,
    userAgent,
  });
};

const getActiveAlertsInternal = (
  {
    area,
    certainty,
    code,
    event,
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
  }: GetActiveAlertsArgs,
  format: Format
) => {
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

const getAlertInternal = ({ id, userAgent }: GetAlertArgs, format: Format) => {
  return simpleGetRequest<AlertJsonLd | AlertGeoJson>({
    endpoint: `${apiRoot}/alerts/${id}`,
    format,
    userAgent,
  });
};

const getAlertsInternal = (
  {
    area,
    certainty,
    code,
    cursor,
    end,
    event,
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
  }: GetAlertsArgs,
  format: Format
) => {
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
