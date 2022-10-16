import { JsonLdContext, QuantitativeValue } from "../common/CommonTypes";

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

export interface RelativeLocationJsonLd {
  bearing: QuantitativeValue;
  city: string;
  geometry?: null | string;
  distance: QuantitativeValue;
  state: string;
}
