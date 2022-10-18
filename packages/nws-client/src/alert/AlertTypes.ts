import { FeatureGeoJson, JsonLdContext } from "../common";

export interface ActiveAlertsCount {
  areas: Record<string, number>;
  land: number;
  marine: number;
  regions: Record<string, number>;
  total: number;
  zones: Record<string, number>;
}

export interface Alert {
  affectedZones: string[];
  areaDesc: string;
  category: AlertCategory;
  certainty: AlertCertainty;
  description: string;
  effective: string;
  ends?: string | null;
  event: string;
  expires: string;
  geocode: AlertGeocode;
  headline?: string | null;
  id: string;
  instruction?: string | null;
  messageType: AlertMessageType;
  onset?: string | null;
  parameters: AlertParameters;
  references: AlertReference[];
  response: AlertResponse;
  sender: string;
  senderName: string;
  sent: string;
  severity: AlertSeverity;
  status: AlertStatus;
  urgency: AlertUrgency;
}

export type AlertCategory =
  | "CBRNE"
  | "Env"
  | "Fire"
  | "Geo"
  | "Health"
  | "Infra"
  | "Met"
  | "Other"
  | "Rescue"
  | "Safety"
  | "Security"
  | "Transport";

export type AlertCertainty =
  | "Likely"
  | "Observed"
  | "Possible"
  | "Unknown"
  | "Unlikely";

export interface AlertCollection {
  pagination: AlertCollectionPagination;
  title: string;
  updated: string;
}

export interface AlertCollectionGeoJson {
  "@context": JsonLdContext;
  features: AlertGeoJson[];
  pagination: AlertCollectionPagination;
  title: string;
  type: "FeatureCollection";
  updated: string;
}

export interface AlertCollectionJsonLd {
  "@context": JsonLdContext;
  "@graph": Alert[];
  pagination: AlertCollectionPagination;
  title: string;
  updated: string;
}

export interface AlertCollectionPagination {
  next: string;
}

export type AlertGeoJson = FeatureGeoJson<Alert>;

export interface AlertGeocode {
  SAME: string[];
  UGC: string[];
}

export interface AlertJsonLd {
  "@graph": Alert[];
}

export type AlertMessageType = "Ack" | "Alert" | "Cancel" | "Error" | "Update";

export interface AlertParameters {
  [key: string]: any[];
}

export interface AlertReference {
  "@id": string;
  identifier: string;
  sender: string;
  sent: string;
}

export type AlertResponse =
  | "AllClear"
  | "Assess"
  | "Avoid"
  | "Evacuate"
  | "Execute"
  | "Monitor"
  | "None"
  | "Prepare"
  | "Shelter";

export type AlertSeverity =
  | "Extreme"
  | "Minor"
  | "Moderate"
  | "Severe"
  | "Unknown";

export type AlertStatus = "Actual" | "Draft" | "Exercise" | "System" | "Test";

export interface AlertTypes {
  eventTypes: string[];
}

export type AlertUrgency =
  | "Immediate"
  | "Expected"
  | "Future"
  | "Past"
  | "Unknown";
