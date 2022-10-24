export interface BaseEndpointArgs {
  /**
   * The user agent header used to identify your application. If you include
   * contact information (website or email), NWS can contact you if your string
   * is associated to a security event.
   *
   * @see {@link https://httpwg.org/specs/rfc9110.html#field.user-agent | HTTP Semantics - User Agent}
   */
  userAgent?: string;
}

/**
 * This is an API error based on Problem Detail RFC 7807.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7807 | RFC 7807}
 */
export interface ProblemDetail {
  correlationId: string;
  detail: string;
  instance: string;
  status: number;
  title: string;
  type: string;
}

/**
 * A GeoJSON feature.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7946 | RFC 7946}
 */
export interface FeatureGeoJson<PropertiesType> {
  "@context": JsonLdContext;
  geometry: GeoJsonGeometry;
  id: string;
  properties: PropertiesType;
  type: "Feature";
}

/**
 * Media types supported by the NWS API.
 *
 * @see {@link https://www.iana.org/assignments/media-types/media-types.xhtml | IANA Media Types}
 */
export enum Format {
  /**
   * GeoJSON is a format for geographic data.
   *
   * @see {@link https://datatracker.ietf.org/doc/html/rfc7946 | RFC 7946}
   */
  GeoJson = "application/geo+json",
  /**
   * JSON-LD is a format for linked data.
   *
   * @see {@link https://www.w3.org/TR/json-ld/ | JSON LD}
   */
  JsonLd = "application/ld+json",
}

export type GeoJsonGeometry =
  | GeoJsonLineString
  | GeoJsonMultiLineString
  | GeoJsonMultiPoint
  | GeoJsonMultiPolygon
  | GeoJsonPoint
  | GeoJsonPolygon;

export type GeoJsonPosition = number[];

export interface GeoJsonLineString {
  bbox: number[];
  coordinates: GeoJsonPosition[];
  type: "LineString";
}

export interface GeoJsonMultiLineString {
  bbox: number[];
  coordinates: GeoJsonPosition[][];
  type: "MultiLineString";
}

export interface GeoJsonMultiPoint {
  bbox: number[];
  coordinates: GeoJsonPosition[];
  type: "MultiPoint";
}

export interface GeoJsonMultiPolygon {
  bbox: number[];
  coordinates: GeoJsonPosition[][];
  type: "MultiPolygon";
}

export interface GeoJsonPoint {
  bbox: number[];
  coordinates: GeoJsonPosition;
  type: "Point";
}

export interface GeoJsonPolygon {
  bbox: number[];
  coordinates: GeoJsonPosition[];
  type: "Polygon";
}

export type JsonLdContext = JsonLdContextValue | JsonLdContextValue[];

export interface JsonLdContextObject {
  "@version": string;
}

export type JsonLdContextValue = string | JsonLdContextObject;

/**
 * Quality control data descriptor.
 *
 * @see {@link https://madis.ncep.noaa.gov/madis_sfc_qc_notes.shtml | MADIS Meteorological Surface Quality Control Checks}
 */
export enum QualityControl {
  /** No quality control available. */
  Preliminary = "Z",
  /** Automated QC check. Passed level 1. */
  CoarsePass = "C",
  /** Automated QC check. Passed level 1 and 2. */
  Screened = "S",
  /** Automated QC check. Passed levels 1, 2, and 3. */
  Verified = "V",
  /** Automated QC check. Failed level 1. */
  Rejected = "X",
  /** Automated QC check. Passed level 1, failed 2 or 3. */
  Questioned = "Q",
  /**
   * Subjective intervention labeling an observation as acceptable, overriding
   * the results of automated checks.
   */
  SubjectiveGood = "G",
  /**
   * Subjective intervention labeling an observation as rejected, overriding
   * the results of automated checks.
   */
  SubjectiveBad = "B",
  /**
   * Virtual temperature could not be calculated, air temperature passing all
   * QC checks has been returned
   */
  AirTemperature = "T",
}

/** A measured value, or range of values. */
export interface QuantitativeValue {
  /** The minimum value of a range of measured values. */
  minValue?: number;
  /** The maximum value of a range of measured values. */
  maxValue?: number;
  /**
   * For values in observation records, the quality control flag from the
   * MADIS system.
   */
  qualityControl?: QualityControl;
  /**
   * A unit of measure, in the format "unit" or "namespace:unit".
   *
   * Units with the namespace "wmo" or "wmoUnit" are defined in the
   * {@link http://codes.wmo.int/common/unit | World Meteorological Organization Codes Registry}
   * and should be canonically resolvable to
   * http://codes.wmo.int/common/unit/{unit}.
   *
   * Units with the namespace "nwsUnit" are currently custom and do not align
   * to any standard.
   *
   * Units with no namespace or the namespace "uc" are compliant with the
   * {@link https://unitsofmeasure.org/ | Unified Code for Units of Measure}
   * syntax.  This also aligns with recent versions of the Geographic Markup
   * Language (GML) standard, the IWXXM standard, and OGC Observations and
   * Measurements v2.0 (ISO/DIS 19156).
   *
   * Namespaced units are considered deprecated. NWS will be aligning the API to
   * use the same standards as GML/IWXXM in the future.
   */
  unitCode: string;
  /** A measured value. */
  value: null | number;
}

/**
 * An error returned if the response body can't be parsed.
 *
 * Normally endpoints should return a {@link ProblemDetail}.
 */
export interface ResponseWithoutBodyError {
  message: string;
  status: number;
  statusText: string;
}

/**
 * A system of units.
 *
 * SI units are also known as the International System of Units, or metric.
 * US units are the Unites States Customary System of units.
 *
 * @see {@link https://www.bipm.org/en/publications/si-brochure | SI Brochure}
 * @see {@link https://www.nist.gov/pml/weights-and-measures/publications/nist-handbooks/handbook-44-current-edition | NIST Handbook 44 - Appendix B Units and Systems of Measurement}
 */
export type UnitType = "si" | "us";
