import {
  FeatureGeoJson,
  JsonLdContext,
  QuantitativeValue,
} from "../common/CommonTypes";

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
  relativeLocation: RelativeLocationGeoJson | RelativeLocationJsonLd;
  timeZone: string;
}

export type PointGeoJson = FeatureGeoJson<Point>;

export type RelativeLocationGeoJson = FeatureGeoJson<RelativeLocation>;

export interface RelativeLocationJsonLd {
  bearing: QuantitativeValue;
  city: string;
  geometry?: null | string;
  distance: QuantitativeValue;
  state: string;
}

export interface RelativeLocation {
  bearing: QuantitativeValue;
  city: string;
  distance: QuantitativeValue;
  state: string;
}
