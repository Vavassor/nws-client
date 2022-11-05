import { BaseEndpointArgs, Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import { requestInFormat } from "../common/RequestInFormat";
import { isRadarStationCollectionGeoJson, isRadarStationCollectionJsonLd, isRadarStationGeoJson, isRadarStationJsonLd } from "./RadarTypeguards";
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
  host?: string;
  reportingHost?: string;
  stationId: string;
}

interface GetRadarStationAlarmsArgs extends BaseEndpointArgs {
  stationId: string;
}

interface GetRadarStationsArgs extends BaseEndpointArgs {
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

export const getRadarStationGeoJson = (args: GetRadarStationArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isRadarStationGeoJson,
    getRadarStationInternal
  );

export const getRadarStationJsonLd = (args: GetRadarStationArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isRadarStationJsonLd,
    getRadarStationInternal
  );

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

export const getRadarStationsGeoJson = (args: GetRadarStationsArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isRadarStationCollectionGeoJson,
    getRadarStationsInternal
  );

export const getRadarStationsJsonLd = (args: GetRadarStationsArgs) =>
  requestInFormat(
    args,
    Format.JsonLd,
    isRadarStationCollectionJsonLd,
    getRadarStationsInternal
  );

const getRadarStationInternal = (
  { host, reportingHost, stationId, userAgent }: GetRadarStationArgs,
  format: Format
) => {
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

const getRadarStationsInternal = (
  { host, reportingHost, stationType, userAgent }: GetRadarStationsArgs,
  format: Format
) => {
  const endpoint = addQueryString(`${apiRoot}/radar/stations`, {
    host,
    reportingHost,
    stationType,
  });

  return simpleGetRequest<
    RadarStationCollectionGeoJson | RadarStationCollectionJsonLd
  >({ endpoint, format, userAgent });
};
