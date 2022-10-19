import { getPointGeolocationPrecision } from "../common/CommonConstants";
import { getPoint, Point, PointGeoJson } from "../point";
import { ActionQueue } from "./ActionQueue";

/**
 * Cache to reduce redundant calls to the points endpoint.
 *
 * Most NWS API endpoints require point information in order to call them.
 *
 * From the NWS API documentation, "Applications may cache the grid for a
 * location to improve latency and reduce the additional lookup request."
 */
export class PointCache {
  coordsToPoint = new Map<string, Point | PointGeoJson>();
  coordsToRequestQueue = new Map<string, ActionQueue<Point | PointGeoJson>>();
  private maxCacheSize = 16;

  async getPoint(latitude: number, longitude: number) {
    const coords = this.getCoords(latitude, longitude);
    const cachedPoint = this.coordsToPoint.get(coords);
    if (cachedPoint) {
      return cachedPoint;
    }

    // If there is already an ongoing request for this location we don't want to
    // call the points endpoint multiple times. To deal with this situation, we
    // queue ongoing requests for the same coordinates.
    let queue = this.coordsToRequestQueue.get(coords);
    if (!queue) {
      queue = new ActionQueue();
      this.coordsToRequestQueue.set(coords, queue);
    }
    const point = await queue.runOrEnqueue(() =>
      getPoint({ latitude, longitude }).then((response) => response.json)
    );

    this.ensureCacheMaxSize();
    this.coordsToPoint.set(coords, point);

    return point;
  }

  /**
   * This clears the entire cache when it gets too big. An LRU cache could be
   * used instead, which doesn't unnecessarily throw away data like this.
   */
  private ensureCacheMaxSize() {
    if (this.coordsToPoint.size > this.maxCacheSize) {
      this.coordsToPoint.clear();
      this.coordsToRequestQueue.clear();
    }
  }

  private getCoords(latitude: number, longitude: number) {
    const precision = getPointGeolocationPrecision;
    return `${latitude.toFixed(precision)},${longitude.toFixed(precision)}`;
  }
}
