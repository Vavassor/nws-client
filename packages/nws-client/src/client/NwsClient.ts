import { Format, UnitType } from "../common";
import {
  getGridpointByUri,
  getGridpointForecastByUri,
  GetGridpointForecastFeatureFlag,
} from "../gridpoint";
import { isPoint } from "../point";
import { getZoneByUri } from "../zone";
import { PointCache } from "./PointCache";

interface GetGridpointArgs {
  format?: Format;
  latitude: number;
  longitude: number;
}

interface GetGridpointForecastArgs {
  featureFlags?: GetGridpointForecastFeatureFlag[];
  format?: Format;
  latitude: number;
  longitude: number;
  units?: UnitType;
}

interface GetGridpointForecastHourlyArgs {
  featureFlags?: GetGridpointForecastFeatureFlag[];
  format?: Format;
  latitude: number;
  longitude: number;
  units?: UnitType;
}

interface GetZoneArgs {
  effective?: string;
  format?: Format;
  latitude: number;
  longitude: number;
}

/**
 * NWS API client that caches data and combines simultaneous requests for the
 * same data.
 *
 * Some NWS endpoints require data from other endpoints. Frameworks like React
 * encourage separate components to fetch data they need, separately. These
 * factors together can create situations where endpoints are called redundantly.
 */
export class NwsClient {
  pointCache = new PointCache();
  userAgent: string | undefined;

  async getGridpoint({ format, latitude, longitude }: GetGridpointArgs) {
    const point = await this.getPoint(latitude, longitude);
    return getGridpointByUri({
      format,
      uri: point.forecastGridData,
      userAgent: this.userAgent,
    });
  }

  async getGridpointForecast({
    featureFlags,
    format,
    latitude,
    longitude,
    units,
  }: GetGridpointForecastArgs) {
    const point = await this.getPoint(latitude, longitude);
    return getGridpointForecastByUri({
      featureFlags,
      format,
      units,
      uri: point.forecast,
      userAgent: this.userAgent,
    });
  }

  async getGridpointForecastHourly({
    featureFlags,
    format,
    latitude,
    longitude,
    units,
  }: GetGridpointForecastHourlyArgs) {
    const point = await this.getPoint(latitude, longitude);
    return getGridpointForecastByUri({
      featureFlags,
      format,
      units,
      uri: point.forecast,
      userAgent: this.userAgent,
    });
  }

  async getZone({ effective, format, latitude, longitude }: GetZoneArgs) {
    const point = await this.getPoint(latitude, longitude);
    return getZoneByUri({
      effective,
      format,
      uri: point.forecastZone,
      userAgent: this.userAgent,
    });
  }

  setUserAgent(userAgent: string) {
    this.userAgent = userAgent;
  }

  setUserAgentWebsiteAndEmail(website: string, email: string) {
    this.userAgent = `(${website}, ${email})`;
  }

  private async getPoint(latitude: number, longitude: number) {
    const point = await this.pointCache.getPoint(latitude, longitude);
    if (isPoint(point)) {
      return point;
    } else {
      return point.properties;
    }
  }
}
