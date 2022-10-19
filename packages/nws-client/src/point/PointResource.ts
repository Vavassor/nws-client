import { BaseEndpointArgs, Format } from "../common";
import {
  apiRoot,
  getPointGeolocationPrecision,
} from "../common/CommonConstants";
import { simpleGetRequest } from "../common/Network";
import { Point, PointGeoJson } from "./PointTypes";

interface GetPointArgs extends BaseEndpointArgs {
  format?: Format;
  latitude: number;
  longitude: number;
}

export const getPoint = ({
  format = Format.GeoJson,
  latitude,
  longitude,
  userAgent,
}: GetPointArgs) => {
  /**
   * Coordinates with more precision than needed cause the point API to return a
   * 301 redirect request to a corrected position. Circumvent this extra
   * request by rounding before calling that endpoint.
   */
  const precision = getPointGeolocationPrecision;
  const lat = latitude.toFixed(precision);
  const lon = longitude.toFixed(precision);

  return simpleGetRequest<Point | PointGeoJson>({
    endpoint: `${apiRoot}/points/${lat},${lon}`,
    format,
    userAgent,
  });
};
