import { Format } from "../common";
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

interface GetRadarServerArgs {
  reportingHost?: string;
  serverId: string;
}

interface GetRadarServersArgs {
  reportingHost?: string;
}

interface GetRadarStationArgs {
  format?: string;
  host?: string;
  reportingHost?: string;
  stationId: string;
}

interface GetRadarStationAlarmsArgs {
  stationId: string;
}

interface GetRadarStationsArgs {
  format?: string;
  host?: string;
  reportingHost?: string;
  stationType?: string;
}

export const getRadarServer = ({
  reportingHost,
  serverId,
}: GetRadarServerArgs) => {
  const endpoint = addQueryString(`${apiRoot}/radar/servers/${serverId}`, {
    reportingHost,
  });

  return simpleGetRequest<RadarServer>({
    endpoint,
    format: Format.JsonLd,
  });
};

export const getRadarServers = ({ reportingHost }: GetRadarServersArgs) => {
  const endpoint = addQueryString(`${apiRoot}/radar/servers`, {
    reportingHost,
  });

  return simpleGetRequest<RadarServerCollection>({
    endpoint,
    format: Format.JsonLd,
  });
};

export const getRadarStation = ({
  format = Format.GeoJson,
  host,
  reportingHost,
  stationId,
}: GetRadarStationArgs) => {
  const endpoint = addQueryString(`${apiRoot}/radar/stations/${stationId}`, {
    host,
    reportingHost,
  });

  return simpleGetRequest<RadarStationGeoJson | RadarStationJsonLd>({
    endpoint,
    format,
  });
};

export const getRadarStationAlarms = ({
  stationId,
}: GetRadarStationAlarmsArgs) => {
  return simpleGetRequest<RadarStationAlarmCollection>({
    endpoint: `${apiRoot}/radar/stations/${stationId}/alarms`,
    format: Format.JsonLd,
  });
};

export const getRadarStations = ({
  format = Format.GeoJson,
  host,
  reportingHost,
  stationType,
}: GetRadarStationsArgs) => {
  const endpoint = addQueryString(`${apiRoot}/radar/stations`, {
    host,
    reportingHost,
    stationType,
  });

  return simpleGetRequest<
    RadarStationCollectionGeoJson | RadarStationCollectionJsonLd
  >({ endpoint, format });
};
