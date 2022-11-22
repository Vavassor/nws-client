import { FeatureGeoJson, JsonLdContext } from "../common";

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
   * Sequence number of the SIGMET. This is incremented when the validity period
   * is due to expire but the phenomenon is expected to persist.
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
