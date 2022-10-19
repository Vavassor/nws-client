import { BaseEndpointArgs, Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import {
  RadarServer,
  RadarServerCollection,
  RadarStationAlarmCollection,
  RadarStationCollectionGeoJson,
  RadarStationCollectionJsonLd,
  RadarStationGeoJson,
  RadarStationJsonLd,
} from "./RadarTypes";

interface GetRadarServerArgs extends BaseEndpointArgs {
  reportingHost?: string;
  serverId: string;
}

interface GetRadarServersArgs extends BaseEndpointArgs {
  reportingHost?: string;
}

interface GetRadarStationArgs extends BaseEndpointArgs {
  format?: string;
  host?: string;
  reportingHost?: string;
  stationId: string;
}

interface GetRadarStationAlarmsArgs extends BaseEndpointArgs {
  stationId: string;
}

interface GetRadarStationsArgs extends BaseEndpointArgs {
  format?: string;
  host?: string;
  reportingHost?: string;
  stationType?: string;
}

export const getRadarServer = ({
  reportingHost,
  serverId,
  userAgent,
}: GetRadarServerArgs) => {
  const endpoint = addQueryString(`${apiRoot}/radar/servers/${serverId}`, {
    reportingHost,
  });

  return simpleGetRequest<RadarServer>({
    endpoint,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getRadarServers = ({
  reportingHost,
  userAgent,
}: GetRadarServersArgs) => {
  const endpoint = addQueryString(`${apiRoot}/radar/servers`, {
    reportingHost,
  });

  return simpleGetRequest<RadarServerCollection>({
    endpoint,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getRadarStation = ({
  format = Format.GeoJson,
  host,
  reportingHost,
  stationId,
  userAgent,
}: GetRadarStationArgs) => {
  const endpoint = addQueryString(`${apiRoot}/radar/stations/${stationId}`, {
    host,
    reportingHost,
  });

  return simpleGetRequest<RadarStationGeoJson | RadarStationJsonLd>({
    endpoint,
    format,
    userAgent,
  });
};

export const getRadarStationAlarms = ({
  stationId,
  userAgent,
}: GetRadarStationAlarmsArgs) => {
  return simpleGetRequest<RadarStationAlarmCollection>({
    endpoint: `${apiRoot}/radar/stations/${stationId}/alarms`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getRadarStations = ({
  format = Format.GeoJson,
  host,
  reportingHost,
  stationType,
  userAgent,
}: GetRadarStationsArgs) => {
  const endpoint = addQueryString(`${apiRoot}/radar/stations`, {
    host,
    reportingHost,
    stationType,
  });

  return simpleGetRequest<
    RadarStationCollectionGeoJson | RadarStationCollectionJsonLd
  >({ endpoint, format, userAgent });
};
