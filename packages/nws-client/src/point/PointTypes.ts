import { GeoJsonGeometry, JsonLdContext, QuantitativeValue } from "../common/CommonTypes";

export interface Point {
  "@context": JsonLdContext;
  "@id": string;
  "@type": "wx:Point";
  county: string;
  cwa: string;
  fireWeatherZone: string;
  forecast: string;
  forecastGridData: string;
  forecastHourly: string;
  forecastOffice: string;
  forecastZone: string;
  geometry?: null | string;
  gridId: string;
  gridX: number;
  gridY: number;
  observationStations: string;
  radarStation: string;
  relativeLocation: RelativeLocationJsonLd;
  timeZone: string;
}

export interface PointGeoJson {
  "@context": JsonLdContext;
  geometry: GeoJsonGeometry;
  id: string;
  properties: Point;
  type: "Feature";
}

export interface RelativeLocationJsonLd {
  bearing: QuantitativeValue;
  city: string;
  geometry?: null | string;
  distance: QuantitativeValue;
  state: string;
}
