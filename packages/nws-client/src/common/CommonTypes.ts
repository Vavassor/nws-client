export interface BaseEndpointArgs {
  userAgent?: string;
}

/**
 * This is an API error based on Problem Detail RFC 7807.
 *
 * @see https://www.rfc-editor.org/rfc/rfc7807
 */
export interface ErrorResponse {
  correlationId: string;
  detail: string;
  instance: string;
  status: number;
  title: string;
  type: string;
}

export interface FeatureGeoJson<PropertiesType> {
  "@context": JsonLdContext;
  geometry: GeoJsonGeometry;
  id: string;
  properties: PropertiesType;
  type: "Feature";
}

export enum Format {
  GeoJson = "application/geo+json",
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
 * @see https://madis.ncep.noaa.gov/madis_sfc_qc_notes.shtml
 */
enum QualityControl {
  Preliminary = "Z",
  CoarsePass = "C",
  Screened = "S",
  Verified = "V",
  Rejected = "X",
  Questioned = "Q",
  SubjectiveGood = "G",
  SubjectiveBad = "B",
  AirTemperature = "T",
}

export interface QuantitativeValue {
  minValue?: number;
  maxValue?: number;
  qualityControl?: QualityControl;
  unitCode: string;
  value: null | number;
}

export interface ResponseWithoutBodyError {
  message: string;
  status: number;
  statusText: string;
}

export type UnitType = "si" | "us";
