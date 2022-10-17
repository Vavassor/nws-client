import { FeatureGeoJson, JsonLdContext } from "../common";

export interface Zone {
  "@context": JsonLdContext;
  "@id": string;
  "@type": string;
  cwa: string[];
  effectiveDate: string;
  expirationDate: string;
  forecastOffices: string[];
  geometry?: string | null;
  id: string;
  name: string;
  observationStations: string[];
  radarStation?: string | null;
  state: string;
  timeZone: string[];
  type: ZoneType;
}

export interface ZoneCollectionGeoJson {
  "@context": JsonLdContext;
  features: FeatureGeoJson<Zone>[];
  type: "FeatureCollection";
}

export interface ZoneCollectionJsonLd {
  "@context": JsonLdContext;
  "@graph": Zone[];
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
