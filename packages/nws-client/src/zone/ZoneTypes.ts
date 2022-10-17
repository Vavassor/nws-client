import { FeatureGeoJson, JsonLdContext } from "../common";

type ZoneType =
  | "land"
  | "marine"
  | "forecast"
  | "public"
  | "coastal"
  | "offshore"
  | "fire"
  | "county";

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

export type ZoneGeoJson = FeatureGeoJson<Zone>;
