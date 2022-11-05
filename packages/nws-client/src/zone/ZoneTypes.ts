import { FeatureGeoJson, JsonLdContext } from "../common";

export interface Zone {
  "@context"?: JsonLdContext;
  /** URI of this resource. */
  "@id"?: string;
  /** Type of this resource. */
  "@type": string;
  /** Three-letter identifiers of NWS offices in the zone. */
  cwa: string[];
  /**
   * Effective date of this zone information.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  effectiveDate: string;
  /**
   * Expiration date of this zone information.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  expirationDate: string;
  /** URIs of forecast offices in this zone. */
  forecastOffices: string[];
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: string | null;
  /**
   * UGC identifier for a NWS forecast zone or county. The first two letters
   * will correspond to either a state code or marine area code. The third
   * letter will be Z for public/fire zone or C for county.
   */
  id: string;
  /** The name of the zone. */
  name: string;
  /** URIs of observation stations in this zone. */
  observationStations: string[];
  /** ID of the radar station. */
  radarStation?: string | null;
  /** The two letter state abbreviation. */
  state: string;
  /**
   * TZ database names of the time zones in this zone.
   *
   * @see {@link https://www.iana.org/time-zones | IANA time zones}
   */
  timeZone: string[];
  /** The type of zone. */
  type: ZoneType;
}

export interface ZoneJsonLd {
  "@context": JsonLdContext;
  /** URI of this resource. */
  "@id": string;
  /** Type of this resource. */
  "@type": string;
  /** Three-letter identifiers of NWS offices in the zone. */
  cwa: string[];
  /**
   * Effective date of this zone information.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  effectiveDate: string;
  /**
   * Expiration date of this zone information.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  expirationDate: string;
  /** URIs of forecast offices in this zone. */
  forecastOffices: string[];
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: string | null;
  /**
   * UGC identifier for a NWS forecast zone or county. The first two letters
   * will correspond to either a state code or marine area code. The third
   * letter will be Z for public/fire zone or C for county.
   */
  id: string;
  /** The name of the zone. */
  name: string;
  /** URIs of observation stations in this zone. */
  observationStations: string[];
  /** ID of the radar station. */
  radarStation?: string | null;
  /** The two letter state abbreviation. */
  state: string;
  /**
   * TZ database names of the time zones in this zone.
   *
   * @see {@link https://www.iana.org/time-zones | IANA time zones}
   */
  timeZone: string[];
  /** The type of zone. */
  type: ZoneType;
}

export interface ZoneCollectionGeoJson {
  "@context"?: JsonLdContext;
  features: FeatureGeoJson<Zone>[];
  type: "FeatureCollection";
}

export interface ZoneCollectionJsonLd {
  "@context": JsonLdContext;
  "@graph": Zone[];
}

export interface ZoneForecast {
  "@context"?: JsonLdContext;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: string | null;
  periods: ZoneForecastPeriod[];
  /**
   * The time this zone forecast product was published.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  updated: string;
  /** URI of the zone this forecast is for. */
  zone: string;
}

export type ZoneForecastGeoJson = FeatureGeoJson<ZoneForecast>;

export interface ZoneForecastJsonLd {
  "@context": JsonLdContext;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: string | null;
  periods: ZoneForecastPeriod[];
  /**
   * The time this zone forecast product was published.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  updated: string;
  /** URI of the zone this forecast is for. */
  zone: string;
}

export interface ZoneForecastPeriod {
  /** A detailed textual forecast for the period. */
  detailedForecast: string;
  /** A description of the period. */
  name: string;
  /** A sequential identifier number. */
  number: number;
}

export type ZoneGeoJson = FeatureGeoJson<Zone>;

export type ZoneType =
  | "land"
  | "marine"
  | "forecast"
  | "public"
  | "coastal"
  | "offshore"
  | "fire"
  | "county";
