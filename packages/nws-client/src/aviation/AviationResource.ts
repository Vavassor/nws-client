import { BaseEndpointArgs, Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import {
  CenterWeatherAdvisoryCollectionGeoJson,
  CenterWeatherAdvisoryGeoJson,
  CenterWeatherServiceUnitJsonLd,
  SigmetCollectionGeoJson,
  SigmetGeoJson,
} from "./AviationTypes";

interface GetCenterWeatherAdvisoriesArgs extends BaseEndpointArgs {
  cwsuId: string;
}

interface GetCenterWeatherAdvisoryArgs extends BaseEndpointArgs {
  cwsuId: string;
  date: string;
  sequence: number;
}

interface GetCenterWeatherAdvisoryByUriArgs extends BaseEndpointArgs {
  uri: string;
}

interface GetCenterWeatherServiceUnitArgs extends BaseEndpointArgs {
  cwsuId: string;
}

interface GetSigmetArgs extends BaseEndpointArgs {
  /** The Air Traffic Services Unit (ATSU) Identifier. */
  atsu: string;
  /** Date in YYYY-MM-DD format. */
  date: string;
  /** Time in HHMM format. This time is always specified in UTC (Zulu) time. */
  time: string;
}

interface GetSigmetByUriArgs extends BaseEndpointArgs {
  uri: string;
}

interface GetSigmetsArgs extends BaseEndpointArgs {
  /** The Air Traffic Services Unit (ATSU) Identifier. */
  atsu?: string;
  /** Date in YYYY-MM-DD format. */
  date?: string;
  /** The end time. */
  end?: string;
  /** The SIGMET sequence number. */
  sequence?: string;
  /** The start time. */
  start?: string;
}

interface GetSigmetsByAtsuArgs extends BaseEndpointArgs {
  /** The Air Traffic Services Unit (ATSU) Identifier. */
  atsu: string;
}

interface GetSigmetsByAtsuAndDateArgs extends BaseEndpointArgs {
  /** The Air Traffic Services Unit (ATSU) Identifier. */
  atsu: string;
  /** Date in YYYY-MM-DD format. */
  date: string;
}

export const getCenterWeatherAdvisories = ({
  cwsuId,
  userAgent,
}: GetCenterWeatherAdvisoriesArgs) => {
  return simpleGetRequest<CenterWeatherAdvisoryCollectionGeoJson>({
    endpoint: `${apiRoot}/aviation/cwsus/${cwsuId}/cwas`,
    format: Format.GeoJson,
    userAgent,
  });
};

export const getCenterWeatherAdvisory = ({
  cwsuId,
  date,
  sequence,
  userAgent,
}: GetCenterWeatherAdvisoryArgs) => {
  return simpleGetRequest<CenterWeatherAdvisoryGeoJson>({
    endpoint: `${apiRoot}/aviation/cwsus/${cwsuId}/cwas/${date}/${sequence}`,
    format: Format.GeoJson,
    userAgent,
  });
};

export const getCenterWeatherAdvisoryByUri = ({
  uri,
  userAgent,
}: GetCenterWeatherAdvisoryByUriArgs) => {
  return simpleGetRequest<CenterWeatherAdvisoryGeoJson>({
    endpoint: uri,
    format: Format.GeoJson,
    userAgent,
  });
};

export const getCenterWeatherServiceUnitJsonLd = ({
  cwsuId,
  userAgent,
}: GetCenterWeatherServiceUnitArgs) => {
  return simpleGetRequest<CenterWeatherServiceUnitJsonLd>({
    endpoint: `${apiRoot}/aviation/cwsus/${cwsuId}`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getSigmet = ({ atsu, date, time, userAgent }: GetSigmetArgs) => {
  return simpleGetRequest<SigmetGeoJson>({
    endpoint: `${apiRoot}/aviation/sigmets/${atsu}/${date}/${time}`,
    format: Format.GeoJson,
    userAgent,
  });
};

export const getSigmetByUri = ({ uri, userAgent }: GetSigmetByUriArgs) => {
  return simpleGetRequest<SigmetGeoJson>({
    endpoint: uri,
    format: Format.GeoJson,
    userAgent,
  });
};

export const getSigmets = ({
  atsu,
  date,
  end,
  sequence,
  start,
  userAgent,
}: GetSigmetsArgs = {}) => {
  const endpoint = addQueryString(`${apiRoot}/aviation/sigmets`, {
    atsu,
    date,
    end,
    sequence,
    start,
  });

  return simpleGetRequest<SigmetCollectionGeoJson>({
    endpoint,
    format: Format.GeoJson,
    userAgent,
  });
};

export const getSigmetsByAtsu = ({ atsu, userAgent }: GetSigmetsByAtsuArgs) => {
  return simpleGetRequest<SigmetCollectionGeoJson>({
    endpoint: `${apiRoot}/aviation/sigmets/${atsu}`,
    format: Format.GeoJson,
    userAgent,
  });
};

export const getSigmetsByAtsuAndDate = ({
  atsu,
  date,
  userAgent,
}: GetSigmetsByAtsuAndDateArgs) => {
  return simpleGetRequest<SigmetCollectionGeoJson>({
    endpoint: `${apiRoot}/aviation/sigmets/${atsu}/${date}`,
    format: Format.GeoJson,
    userAgent,
  });
};
