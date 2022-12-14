import { BaseEndpointArgs, Format, isString } from "../common";
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
  /** The pagination cursor that specifies the page of records to fetch. */
  cursor?: string;
  end?: string;
  event?: string[];
  /**
   * The maximum number of records to return. This is also the page size when
   * using pagination.
   */
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

interface GetAlertsByUriArgs extends BaseEndpointArgs {
  uri: string;
}

/**
 * Get active alerts in {@link Format.Atom | Atom} format.
 */
export const getActiveAlertsAtom = (args: GetActiveAlertsArgs = {}) =>
  requestInFormat(args, Format.Atom, isString, getActiveAlertsInternal);

/**
 * Get active alerts in {@link Format.GeoJson | GeoJSON} format.
 */
export const getActiveAlertsGeoJson = (args: GetActiveAlertsArgs = {}) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isAlertCollectionGeoJson,
    getActiveAlertsInternal
  );

/**
 * Get active alerts in {@link Format.JsonLd | JSON-LD} format.
 */
export const getActiveAlertsJsonLd = (args: GetActiveAlertsArgs = {}) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isAlertCollectionJsonLd,
    getActiveAlertsInternal
  );

/**
 * Get active alerts for a defined area in {@link Format.Atom | Atom} format.
 */
export const getActiveAlertsByAreaAtom = (args: GetActiveAlertsByAreaArgs) =>
  requestInFormat(args, Format.Atom, isString, getActiveAlertsByAreaInternal);

/**
 * Get active alerts for a defined area in {@link Format.GeoJson | GeoJSON}
 * format.
 */
export const getActiveAlertsByAreaGeoJson = (args: GetActiveAlertsByAreaArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isAlertCollectionGeoJson,
    getActiveAlertsByAreaInternal
  );

/**
 * Get active alerts for a defined area in {@link Format.JsonLd | JSON-LD}
 * format.
 */
export const getActiveAlertsByAreaJsonLd = (args: GetActiveAlertsByAreaArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isAlertCollectionJsonLd,
    getActiveAlertsByAreaInternal
  );

/**
 * Get active alerts for a region in {@link Format.Atom | Atom} format.
 */
export const getActiveAlertsByRegionAtom = (
  args: GetActiveAlertsByRegionArgs
) =>
  requestInFormat(args, Format.Atom, isString, getActiveAlertsByRegionInternal);

/**
 * Get active alerts for a region in {@link Format.GeoJson | GeoJSON} format.
 */
export const getActiveAlertsByRegionGeoJson = (
  args: GetActiveAlertsByRegionArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isAlertCollectionGeoJson,
    getActiveAlertsByRegionInternal
  );

/**
 * Get active alerts for a region in {@link Format.JsonLd | JSON-LD} format.
 */
export const getActiveAlertsByRegionJsonLd = (
  args: GetActiveAlertsByRegionArgs
) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isAlertCollectionJsonLd,
    getActiveAlertsByRegionInternal
  );

/**
 * Get active alerts for a zone in {@link Format.Atom | Atom} format.
 */
export const getActiveAlertsByZoneAtom = (args: GetActiveAlertsByZoneArgs) =>
  requestInFormat(args, Format.Atom, isString, getActiveAlertsByZoneInternal);

/**
 * Get active alerts for a zone in {@link Format.GeoJson | GeoJSON} format.
 */
export const getActiveAlertsByZoneGeoJson = (args: GetActiveAlertsByZoneArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isAlertCollectionGeoJson,
    getActiveAlertsByZoneInternal
  );

/**
 * Get active alerts for a zone in {@link Format.JsonLd | JSON-LD} format.
 */
export const getActiveAlertsByZoneJsonLd = (args: GetActiveAlertsByZoneArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isAlertCollectionJsonLd,
    getActiveAlertsByZoneInternal
  );

/**
 * Get information about the number of active alerts.
 */
export const getActiveAlertsCount = (args: BaseEndpointArgs) => {
  const { userAgent } = args;
  return simpleGetRequest<ActiveAlertsCount>({
    endpoint: `${apiRoot}/alerts/active/count`,
    format: Format.JsonLd,
    userAgent,
  });
};

/**
 * Get an alert in {@link Format.Cap | CAP} format.
 */
export const getAlertCap = (args: GetAlertArgs) =>
  requestInFormat(args, Format.Cap, isString, getAlertInternal);

/**
 * Get an alert in {@link Format.GeoJson | GeoJSON} format.
 */
export const getAlertGeoJson = (args: GetAlertArgs) =>
  requestInFormat(args, Format.GeoJson, isAlertGeoJson, getAlertInternal);

/**
 * Get an alert in {@link Format.JsonLd | JSON-LD} format.
 */
export const getAlertJsonLd = (args: GetAlertArgs) =>
  requestInFormat(args, Format.JsonLd, isAlertJsonLd, getAlertInternal);

/**
 * Get information about alert types.
 */
export const getAlertTypes = (args: BaseEndpointArgs) => {
  const { userAgent } = args;
  return simpleGetRequest<AlertTypes>({
    endpoint: `${apiRoot}/alerts/types`,
    format: Format.JsonLd,
    userAgent,
  });
};

/**
 * Get alerts in {@link Format.Atom | Atom} format.
 */
export const getAlertsAtom = (args: GetAlertsArgs = {}) =>
  requestInFormat(args, Format.Atom, isString, getAlertsInternal);

/**
 * Get alerts in {@link Format.GeoJson | GeoJSON} format.
 */
export const getAlertsGeoJson = (args: GetAlertsArgs = {}) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isAlertCollectionGeoJson,
    getAlertsInternal
  );

/**
 * Get alerts in {@link Format.JsonLd | JSON-LD} format.
 */
export const getAlertsJsonLd = (args: GetAlertsArgs = {}) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isAlertCollectionJsonLd,
    getAlertsInternal
  );

/**
 * Get alerts given a URI in {@link Format.GeoJson | GeoJSON} format.
 */
export const getAlertsByUriGeoJson = (args: GetAlertsByUriArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isAlertCollectionGeoJson,
    getAlertsByUriInternal
  );

/**
 * Get alerts given a URI in {@link Format.JsonLd | JSON-LD} format.
 */
export const getAlertsByUriJsonLd = (args: GetAlertsByUriArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isAlertCollectionJsonLd,
    getAlertsByUriInternal
  );

const getActiveAlertsByAreaInternal = (
  { areaId, userAgent }: GetActiveAlertsByAreaArgs,
  format: Format
) => {
  return simpleGetRequest<
    AlertCollectionGeoJson | AlertCollectionJsonLd | string
  >({
    endpoint: `${apiRoot}/alerts/active/area/${areaId}`,
    format,
    userAgent,
  });
};

const getActiveAlertsByRegionInternal = (
  { regionId, userAgent }: GetActiveAlertsByRegionArgs,
  format: Format
) => {
  return simpleGetRequest<
    AlertCollectionGeoJson | AlertCollectionJsonLd | string
  >({
    endpoint: `${apiRoot}/alerts/active/region/${regionId}`,
    format,
    userAgent,
  });
};

const getActiveAlertsByZoneInternal = (
  { userAgent, zoneId }: GetActiveAlertsByZoneArgs,
  format: Format
) => {
  return simpleGetRequest<
    AlertCollectionGeoJson | AlertCollectionJsonLd | string
  >({
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

  return simpleGetRequest<
    AlertCollectionGeoJson | AlertCollectionJsonLd | string
  >({
    endpoint,
    format,
    userAgent,
  });
};

const getAlertInternal = ({ id, userAgent }: GetAlertArgs, format: Format) => {
  return simpleGetRequest<AlertJsonLd | AlertGeoJson | string>({
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

  return simpleGetRequest<
    AlertCollectionGeoJson | AlertCollectionJsonLd | string
  >({
    endpoint,
    format,
    userAgent,
  });
};

const getAlertsByUriInternal = (
  { uri, userAgent }: GetAlertsByUriArgs,
  format: Format
) => {
  return simpleGetRequest<
    AlertCollectionGeoJson | AlertCollectionJsonLd | string
  >({
    endpoint: uri,
    format,
    userAgent,
  });
};
