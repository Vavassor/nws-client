import { apiRoot } from "../common/CommonConstants";
import { jsonRequest } from "../common/Network";
import { Point } from "./PointTypes";

interface GetPointArgs {
  latitude: number;
  longitude: number;
}

export const getPoint = ({ latitude, longitude }: GetPointArgs) => {
  /**
   * Coordinates with more precision than needed cause the point API to return a
   * 301 redirect request to a corrected position. Circumvent this extra
   * request by rounding before calling that endpoint.
   */
  const precision = 4;
  const lat = latitude.toFixed(precision);
  const lon = longitude.toFixed(precision);

  return jsonRequest<Point>({
    endpoint: `${apiRoot}/points/${lat},${lon}`,
    headers: {
      Accept: "application/ld+json",
    },
    method: "GET",
  });
};
