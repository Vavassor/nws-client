import { BaseEndpointArgs, Format, isString } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import { requestInFormat } from "../common/RequestInFormat";
import {
  isCenterWeatherAdvisoryGeoJson,
  isSigmetGeoJson,
} from "./AviationTypeguards";
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

export const getCenterWeatherAdvisoryGeoJson = (
  args: GetCenterWeatherAdvisoryArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isCenterWeatherAdvisoryGeoJson,
    getCenterWeatherAdvisoryInternal
  );

export const getCenterWeatherAdvisoryUswx = (
  args: GetCenterWeatherAdvisoryArgs
) =>
  requestInFormat(
    args,
    Format.Uswx,
    isString,
    getCenterWeatherAdvisoryInternal
  );

export const getCenterWeatherAdvisoryByUriGeoJson = (
  args: GetCenterWeatherAdvisoryByUriArgs
) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isCenterWeatherAdvisoryGeoJson,
    getCenterWeatherAdvisoryByUriInternal
  );

export const getCenterWeatherAdvisoryByUriUswx = (
  args: GetCenterWeatherAdvisoryByUriArgs
) =>
  requestInFormat(
    args,
    Format.Uswx,
    isString,
    getCenterWeatherAdvisoryByUriInternal
  );

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

export const getSigmetGeoJson = (args: GetSigmetArgs) =>
  requestInFormat(args, Format.GeoJson, isSigmetGeoJson, getSigmetInternal);

export const getSigmetUswx = (args: GetSigmetArgs) =>
  requestInFormat(args, Format.Uswx, isString, getSigmetInternal);

export const getSigmetByUriGeoJson = (args: GetSigmetByUriArgs) =>
  requestInFormat(
    args,
    Format.GeoJson,
    isSigmetGeoJson,
    getSigmetByUriInternal
  );

export const getSigmetByUriUswx = (args: GetSigmetByUriArgs) =>
  requestInFormat(args, Format.Uswx, isString, getSigmetByUriInternal);

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

const getCenterWeatherAdvisoryInternal = (
  { cwsuId, date, sequence, userAgent }: GetCenterWeatherAdvisoryArgs,
  format: Format
) => {
  return simpleGetRequest<CenterWeatherAdvisoryGeoJson>({
    endpoint: `${apiRoot}/aviation/cwsus/${cwsuId}/cwas/${date}/${sequence}`,
    format,
    userAgent,
  });
};

const getCenterWeatherAdvisoryByUriInternal = (
  { uri, userAgent }: GetCenterWeatherAdvisoryByUriArgs,
  format: Format
) => {
  return simpleGetRequest<CenterWeatherAdvisoryGeoJson>({
    endpoint: uri,
    format,
    userAgent,
  });
};

const getSigmetInternal = (
  { atsu, date, time, userAgent }: GetSigmetArgs,
  format: Format
) => {
  return simpleGetRequest<SigmetGeoJson>({
    endpoint: `${apiRoot}/aviation/sigmets/${atsu}/${date}/${time}`,
    format,
    userAgent,
  });
};

export const getSigmetByUriInternal = (
  { uri, userAgent }: GetSigmetByUriArgs,
  format: Format
) => {
  return simpleGetRequest<SigmetGeoJson>({
    endpoint: uri,
    format,
    userAgent,
  });
};
