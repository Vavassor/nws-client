import {
  FeatureGeoJson,
  JsonLdContext,
  PaginationInfo,
  QuantitativeValue,
} from "../common";

export interface ObservationStation {
  "@context"?: JsonLdContext;
  /** URI of this resource. */
  "@id"?: string;
  /** Type of this resource. */
  "@type": "wx:ObservationStation";
  /** URI of the NWS county zone containing this station. */
  county: string;
  elevation: QuantitativeValue;
  /** URI of the NWS fire weather forecast zone containing this station. */
  fireWeatherZone: string;
  /** URI of the NWS public forecast zone containing this station. */
  forecast: string;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: string | null;
  name: string;
  stationIdentifier: string;
  /**
   * Time zone containing this station.
   *
   * @see {@link https://www.iana.org/time-zones | IANA time zones}
   */
  timeZone: string;
}

export type ObservationStationGeoJson = FeatureGeoJson<ObservationStation>;

export interface ObservationStationJsonLd {
  "@context": JsonLdContext;
  /** URI of this resource. */
  "@id": string;
  /** Type of this resource. */
  "@type": "wx:ObservationStation";
  /** URI of the NWS county zone containing this station. */
  county: string;
  elevation: QuantitativeValue;
  /** URI of the NWS fire weather forecast zone containing this station. */
  fireWeatherZone: string;
  /** URI of the NWS public forecast zone containing this station. */
  forecast: string;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: string | null;
  name: string;
  stationIdentifier: string;
  /**
   * Time zone containing this station.
   *
   * @see {@link https://www.iana.org/time-zones | IANA time zones}
   */
  timeZone: string;
}

export interface ObservationStationCollectionGeoJson {
  "@context"?: JsonLdContext;
  features: FeatureGeoJson<ObservationStation>[];
  observationStations: string[];
  pagination?: PaginationInfo;
  type: "FeatureCollection";
}

export interface ObservationStationCollectionJsonLd {
  "@context": JsonLdContext;
  "@graph": ObservationStation[];
  observationStations: string[];
  pagination?: PaginationInfo;
}

export interface TerminalAerodromeForecast {
  /**
   * The end time of the forecast period.
   *
   * @see {@link https://www.iso.org/standard/70907.html | ISO 8601-1:2019}
   */
  end: string;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry: string;
  /** URI of this resource. */
  id: string;
  /**
   * The issue time of the forecast.
   *
   * @see {@link https://www.iso.org/standard/70907.html | ISO 8601-1:2019}
   */
  issueTime: string;
  /** The ID of the observation station that issued the forecast. */
  location: string;
  /**
   * The start time of the forecast period.
   *
   * @see {@link https://www.iso.org/standard/70907.html | ISO 8601-1:2019}
   */
  start: string;
}

export interface TerminalAerodromeForecastCollectionJsonLd {
  "@context": JsonLdContext;
  "@graph": TerminalAerodromeForecast[];
}
