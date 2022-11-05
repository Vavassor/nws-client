import { UnitType } from "../common";
import {
  getGridpointByUriGeoJson,
  getGridpointForecastByUriGeoJson,
  GetGridpointForecastFeatureFlag,
  getGridpointForecastHourlyByUriGeoJson,
} from "../gridpoint";
import { isPoint } from "../point";
import { getZoneByUriGeoJson } from "../zone";
import { PointCache } from "./PointCache";

interface GetGridpointArgs {
  latitude: number;
  longitude: number;
}

interface GetGridpointForecastArgs {
  featureFlags?: GetGridpointForecastFeatureFlag[];
  latitude: number;
  longitude: number;
  units?: UnitType;
}

interface GetGridpointForecastHourlyArgs {
  featureFlags?: GetGridpointForecastFeatureFlag[];
  latitude: number;
  longitude: number;
  units?: UnitType;
}

interface GetPointArgs {
  latitude: number;
  longitude: number;
}

interface GetZoneArgs {
  effective?: string;
  latitude: number;
  longitude: number;
}

/**
 * NWS API client that caches data and dedupes simultaneous requests for the
 * same data.
 *
 * Some NWS endpoints require data from other endpoints. Frameworks like React
 * encourage separate components to fetch data they need, separately. These
 * factors together can create situations where endpoints are called redundantly.
 */
export class NwsClient {
  private pointCache = new PointCache();
  private userAgent: string | undefined;

  async getGridpointGeoJson({ latitude, longitude }: GetGridpointArgs) {
    const point = await this.getPoint({ latitude, longitude });
    return getGridpointByUriGeoJson({
      uri: point.forecastGridData,
      userAgent: this.userAgent,
    });
  }

  async getGridpointForecastGeoJson({
    featureFlags,
    latitude,
    longitude,
    units,
  }: GetGridpointForecastArgs) {
    const point = await this.getPoint({ latitude, longitude });
    return getGridpointForecastByUriGeoJson({
      featureFlags,
      units,
      uri: point.forecast,
      userAgent: this.userAgent,
    });
  }

  async getGridpointForecastHourlyGeoJson({
    featureFlags,
    latitude,
    longitude,
    units,
  }: GetGridpointForecastHourlyArgs) {
    const point = await this.getPoint({ latitude, longitude });
    return getGridpointForecastHourlyByUriGeoJson({
      featureFlags,
      units,
      uri: point.forecastHourly,
      userAgent: this.userAgent,
    });
  }

  async getPoint({ latitude, longitude }: GetPointArgs) {
    const point = await this.pointCache.getPoint(latitude, longitude);
    if (isPoint(point)) {
      return point;
    } else {
      return point.properties;
    }
  }

  async getZone({ effective, latitude, longitude }: GetZoneArgs) {
    const point = await this.getPoint({ latitude, longitude });
    return getZoneByUriGeoJson({
      effective,
      uri: point.forecastZone,
      userAgent: this.userAgent,
    });
  }

  /**
   * @see {@link https://httpwg.org/specs/rfc9110.html#field.user-agent | HTTP Semantics - User Agent}
   */
  setUserAgent(userAgent: string) {
    this.userAgent = userAgent;
  }

  /**
   * @see {@link https://httpwg.org/specs/rfc9110.html#field.user-agent | HTTP Semantics - User Agent}
   */
  setUserAgentWebsiteAndEmail(website: string, email: string) {
    this.userAgent = `(${website}, ${email})`;
  }
}
