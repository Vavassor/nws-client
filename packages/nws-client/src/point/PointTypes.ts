import {
  FeatureGeoJson,
  JsonLdContext,
  QuantitativeValue,
} from "../common/CommonTypes";

/** Metadata about a latitude/longitude point. */
export interface Point {
  "@context": JsonLdContext;
  /** URI of this resource. */
  "@id": string;
  /** Type of this resource. */
  "@type": "wx:Point";
  /** URI of the county zone. */
  county: string;
  /** Three-letter identifier for a NWS office. */
  cwa: string;
  /** URI of the fire weather zone. */
  fireWeatherZone: string;
  /** URI of the textual forecast. */
  forecast: string;
  /** URI of the numerical forecast. */
  forecastGridData: string;
  /** URI of the textual hourly forecast. */
  forecastHourly: string;
  /** URI of the forecast office. */
  forecastOffice: string;
  /** URI of the forecast zone. */
  forecastZone: string;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: null | string;
  /** Three-letter identifier for a NWS office. */
  gridId: string;
  gridX: number;
  gridY: number;
  /** URI of the forecast stations. */
  observationStations: string;
  /** ID of the radar station. */
  radarStation: string;
  relativeLocation: RelativeLocationGeoJson | RelativeLocationJsonLd;
  /**
   * TZ database name of the time zone.
   * 
   * @see {@link https://www.iana.org/time-zones | IANA time zones}
   */
  timeZone: string;
}

/** Metadata about a latitude/longitude point in GeoJSON format. */
export type PointGeoJson = FeatureGeoJson<Point>;

export type RelativeLocationGeoJson = FeatureGeoJson<RelativeLocation>;

export interface RelativeLocationJsonLd {
  /** The bearing toward the location. */
  bearing: QuantitativeValue;
  /** The name of the city. */
  city: string;
  /** The distance to the location. */
  distance: QuantitativeValue;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: null | string;
  /** The two letter state abbreviation. */
  state: string;
}

export interface RelativeLocation {
  /** The bearing toward the location. */
  bearing: QuantitativeValue;
  /** The name of the city. */
  city: string;
  /** The distance to the location. */
  distance: QuantitativeValue;
  /** The two letter state abbreviation. */
  state: string;
}
