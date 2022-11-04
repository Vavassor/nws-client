import { BaseEndpointArgs, Format } from "../common";
import {
  apiRoot,
  getPointGeolocationPrecision,
} from "../common/CommonConstants";
import { simpleGetRequest } from "../common/Network";
import { requestInFormat } from "../common/RequestInFormat";
import { isPointGeoJson, isPointJsonLd } from "./PointTypeguards";
import { PointGeoJson, PointJsonLd } from "./PointTypes";

interface GetPointArgs extends BaseEndpointArgs {
  latitude: number;
  longitude: number;
}

/** Returns metadata about a given latitude/longitude point. */
export const getPointGeoJson = (args: GetPointArgs) =>
  requestInFormat(args, Format.GeoJson, isPointGeoJson, getPointInternal);

/** Returns metadata about a given latitude/longitude point. */
export const getPointJsonLd = (args: GetPointArgs) =>
  requestInFormat(args, Format.JsonLd, isPointJsonLd, getPointInternal);

const getPointInternal = (
  { latitude, longitude, userAgent }: GetPointArgs,
  format: Format
) => {
  /**
   * Coordinates with more precision than needed cause the point API to return a
   * 301 redirect request to a corrected position. Circumvent this extra
   * request by rounding before calling that endpoint.
   */
  const precision = getPointGeolocationPrecision;
  const lat = latitude.toFixed(precision);
  const lon = longitude.toFixed(precision);

  return simpleGetRequest<PointGeoJson | PointJsonLd>({
    endpoint: `${apiRoot}/points/${lat},${lon}`,
    format,
    userAgent,
  });
};
