import { getGridpointForecast } from "../gridpoint";
import { isPoint } from "../point";
import { PointCache } from "./PointCache";

interface GetGridpointForecastArgs {
  latitude: number;
  longitude: number;
}

export class NwsClient {
  pointCache = new PointCache();
  userAgent: string | undefined;

  async getGridpointForecast({
    latitude,
    longitude,
  }: GetGridpointForecastArgs) {
    const point = await this.getPoint(latitude, longitude);
    return getGridpointForecast({
      forecastOfficeId: point.gridId,
      gridX: point.gridX,
      gridY: point.gridY,
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
