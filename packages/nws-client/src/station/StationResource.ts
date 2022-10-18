import {
  Format,
  ObservationCollectionGeoJson,
  ObservationCollectionJsonLd,
} from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import {
  ObservationStation,
  ObservationStationCollectionGeoJson,
  ObservationStationCollectionJsonLd,
  ObservationStationGeoJson,
} from "./StationTypes";

interface GetLatestStationObservationArgs {
  format?: Format;
  requireQc?: string;
  stationId: string;
}

interface GetStationArgs {
  format?: Format;
  stationId: string;
}

interface GetStationObservationByTimeArgs {
  format?: Format;
  stationId: string;
  time: string;
}

interface GetStationObservationsArgs {
  end?: string;
  format?: Format;
  limit?: number;
  stationId: string;
  start?: string;
}

interface GetStationsArgs {
  format?: Format;
  id?: string[];
  limit?: number;
  state?: string[];
}

export const getLatestStationObservation = ({
  format = Format.GeoJson,
  requireQc,
  stationId,
}: GetLatestStationObservationArgs) => {
  const endpoint = addQueryString(
    `${apiRoot}/stations/${stationId}/observations/latest`,
    {
      require_qc: requireQc,
    }
  );
  return simpleGetRequest<ObservationStation | ObservationStationGeoJson>({
    endpoint,
    format,
  });
};

export const getStation = ({
  format = Format.GeoJson,
  stationId,
}: GetStationArgs) => {
  return simpleGetRequest<ObservationStation | ObservationStationGeoJson>({
    endpoint: `${apiRoot}/stations/${stationId}`,
    format,
  });
};

export const getStationObservationByTime = ({
  format = Format.GeoJson,
  stationId,
  time,
}: GetStationObservationByTimeArgs) => {
  return simpleGetRequest<ObservationStation | ObservationStationGeoJson>({
    endpoint: `${apiRoot}/stations/${stationId}/observations/${time}`,
    format,
  });
};

export const getStationObservations = ({
  end,
  format = Format.GeoJson,
  limit,
  start,
  stationId,
}: GetStationObservationsArgs) => {
  const endpoint = addQueryString(
    `${apiRoot}/stations/${stationId}/observations`,
    { end, limit, start }
  );
  return simpleGetRequest<
    ObservationCollectionGeoJson | ObservationCollectionJsonLd
  >({
    endpoint,
    format,
  });
};

export const getStations = ({
  format = Format.GeoJson,
  id,
  limit,
  state,
}: GetStationsArgs) => {
  const endpoint = addQueryString(`${apiRoot}/stations`, { id, limit, state });
  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint,
    format,
  });
};
