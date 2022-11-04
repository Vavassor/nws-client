import {
  BaseEndpointArgs,
  Format,
  ObservationCollectionGeoJson,
  ObservationCollectionJsonLd,
} from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import {
  ObservationStationCollectionGeoJson,
  ObservationStationCollectionJsonLd,
  ObservationStationGeoJson,
  ObservationStationJsonLd,
} from "./StationTypes";

interface GetLatestStationObservationArgs extends BaseEndpointArgs {
  format?: Format;
  requireQc?: string;
  stationId: string;
}

interface GetStationArgs extends BaseEndpointArgs {
  format?: Format;
  stationId: string;
}

interface GetStationByUriArgs extends BaseEndpointArgs {
  format?: Format;
  uri: string;
}

interface GetStationObservationByTimeArgs extends BaseEndpointArgs {
  format?: Format;
  stationId: string;
  time: string;
}

interface GetStationObservationsArgs extends BaseEndpointArgs {
  end?: string;
  format?: Format;
  limit?: number;
  stationId: string;
  start?: string;
}

interface GetStationsArgs extends BaseEndpointArgs {
  format?: Format;
  id?: string[];
  limit?: number;
  state?: string[];
}

export const getLatestStationObservation = ({
  format = Format.GeoJson,
  requireQc,
  stationId,
  userAgent,
}: GetLatestStationObservationArgs) => {
  const endpoint = addQueryString(
    `${apiRoot}/stations/${stationId}/observations/latest`,
    {
      require_qc: requireQc,
    }
  );

  return simpleGetRequest<ObservationStationJsonLd | ObservationStationGeoJson>(
    {
      endpoint,
      format,
      userAgent,
    }
  );
};

export const getStation = ({
  format = Format.GeoJson,
  stationId,
  userAgent,
}: GetStationArgs) => {
  return simpleGetRequest<ObservationStationJsonLd | ObservationStationGeoJson>(
    {
      endpoint: `${apiRoot}/stations/${stationId}`,
      format,
      userAgent,
    }
  );
};

export const getStationByUri = ({
  format = Format.GeoJson,
  uri,
  userAgent,
}: GetStationByUriArgs) => {
  return simpleGetRequest<ObservationStationJsonLd | ObservationStationGeoJson>(
    {
      endpoint: uri,
      format,
      userAgent,
    }
  );
};

export const getStationObservationByTime = ({
  format = Format.GeoJson,
  stationId,
  time,
  userAgent,
}: GetStationObservationByTimeArgs) => {
  return simpleGetRequest<ObservationStationJsonLd | ObservationStationGeoJson>(
    {
      endpoint: `${apiRoot}/stations/${stationId}/observations/${time}`,
      format,
      userAgent,
    }
  );
};

export const getStationObservations = ({
  end,
  format = Format.GeoJson,
  limit,
  start,
  stationId,
  userAgent,
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
    userAgent,
  });
};

export const getStations = ({
  format = Format.GeoJson,
  id,
  limit,
  state,
  userAgent,
}: GetStationsArgs) => {
  const endpoint = addQueryString(`${apiRoot}/stations`, { id, limit, state });
  return simpleGetRequest<
    ObservationStationCollectionGeoJson | ObservationStationCollectionJsonLd
  >({
    endpoint,
    format,
    userAgent,
  });
};
