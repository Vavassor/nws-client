import { FeatureGeoJson, JsonLdContext } from "../common";

export interface CenterWeatherAdvisory {
  /** The ID of the Center Weather Service Unit that issued the advisory. */
  cwsu: NWSCenterWeatherServiceUnitId;
  /**
   * The end time of the validity period.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  end: string;
  /** The URI of this resource. */
  id: string;
  /**
   * The issue time of the advisory.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  issueTime: string;
  /** URL describing the property observed in the advisory. */
  observedProperty: string;
  sequence: number;
  /**
   * The start time of the validity period.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  start: string;
  /** The encoded advisory message. */
  text: string;
}

export interface CenterWeatherAdvisoryCollectionGeoJson {
  "@context"?: JsonLdContext;
  features: CenterWeatherAdvisoryGeoJson[];
  type: "FeatureCollection";
}

export type CenterWeatherAdvisoryGeoJson =
  FeatureGeoJson<CenterWeatherAdvisory>;

export interface CenterWeatherServiceUnitJsonLd {
  "@context": JsonLdContext;
  city: string;
  email: string;
  fax: string;
  id: string;
  name: string;
  nwsRegion: string;
  parent: null;
  phone: string;
  state: string;
  street: string;
  webSiteUrl: string;
  zipCode: string;
}

/** Three-letter identifier for a Center Weather Service Unit (CWSU). */
export type NWSCenterWeatherServiceUnitId =
  | "ZAB"
  | "ZAN"
  | "ZAU"
  | "ZBW"
  | "ZDC"
  | "ZDV"
  | "ZFA"
  | "ZFW"
  | "ZHU"
  | "ZID"
  | "ZJX"
  | "ZKC"
  | "ZLA"
  | "ZLC"
  | "ZMA"
  | "ZME"
  | "ZMP"
  | "ZNY"
  | "ZOA"
  | "ZOB"
  | "ZSE"
  | "ZTL";

export interface CenterWeatherAdvisoryCollectionGeoJson {
  context?: JsonLdContext;
  features: CenterWeatherAdvisoryGeoJson[];
  type: "FeatureCollection";
}

/** SIGMETs are inflight weather advisories for Significant Meterological hazards. */
export interface Sigmet {
  /** The Air Traffic Services Unit (ATSU) Identifier. */
  atsu: string;
  /**
   * The end time of the validity period.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  end: string;
  /** The URI of this resource. */
  id: string;
  /**
   * The issue time of the advisory.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  issueTime: string;
  /**
   * The URI describing the weather phenomenon.
   */
  phenomenon?: string | null;
  /**
   * The sequence number of the SIGMET. This is incremented when the validity
   * period is due to expire but the phenomenon is expected to persist.
   */
  sequence?: string | null;
  /**
   * The start time of the validity period.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  start: string;
}

export interface SigmetCollectionGeoJson {
  "@context"?: JsonLdContext;
  features: SigmetGeoJson[];
  type: "FeatureCollection";
}

export type SigmetGeoJson = FeatureGeoJson<Sigmet>;
