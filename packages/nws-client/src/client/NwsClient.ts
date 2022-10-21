import { UnitType } from "../common";
import {
  getGridpointForecastByUri,
  GetGridpointForecastFeatureFlag,
} from "../gridpoint";
import { isPoint } from "../point";
import { PointCache } from "./PointCache";

interface GetGridpointForecastArgs {
  featureFlags?: GetGridpointForecastFeatureFlag[];
  latitude: number;
  longitude: number;
  units?: UnitType;
}

export class NwsClient {
  pointCache = new PointCache();
  userAgent: string | undefined;

  async getGridpointForecast({
    featureFlags,
    latitude,
    longitude,
  }: GetGridpointForecastArgs) {
    const point = await this.getPoint(latitude, longitude);
    return getGridpointForecastByUri({
      featureFlags,
      uri: point.forecast,
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
