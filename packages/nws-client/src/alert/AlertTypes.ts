import { FeatureGeoJson, JsonLdContext, PaginationInfo } from "../common";

export interface ActiveAlertsCount {
  areas: Record<string, number>;
  land: number;
  marine: number;
  regions: Record<string, number>;
  total: number;
  zones: Record<string, number>;
}

export interface Alert {
  /**
   * URIs for zones affected by the alert. This is an API-specific extension
   * field and is not part of the CAP specification.
   */
  affectedZones: string[];
  /** A description of the area affected by the alert. */
  areaDesc: string;
  /** The code denoting the category of the subject event of the alert message. */
  category: AlertCategory;
  certainty: AlertCertainty;
  /** The text describing the subject event of the alert message. */
  description: string;
  /**
   * The effective time of the information of the alert message.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  effective: string;
  /**
   * The expected end time of the subject event of the alert message.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  ends?: string | null;
  /** The text denoting the type of the subject event of the alert message. */
  event: string;
  /**
   * The expiry time of the information of the alert message.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  expires: string;
  geocode: AlertGeocode;
  /** The text headline of the alert message. */
  headline?: string | null;
  /** The identifier of the alert message. */
  id: string;
  /**
   * The text describing the recommended action to be taken by recipients of
   * the alert message.
   */
  instruction?: string | null;
  messageType: AlertMessageType;
  /**
   * The expected time of the beginning of the subject event of the alert message.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  onset?: string | null;
  parameters: AlertParameters;
  /** Prior alerts that this alert updates or replaces. */
  references: AlertReference[];
  response: AlertResponse;
  /** Email address of the NWS webmaster. */
  sender: string;
  /** The text naming the originator of the alert message. */
  senderName: string;
  /**
   * The time of the origination of the alert message.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
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
  pagination?: PaginationInfo;
  /** A title describing the alert collection. */
  title?: string;
  /**
   * The last time a change occurred to this collection.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  updated?: string;
}

export interface AlertCollectionGeoJson {
  "@context"?: JsonLdContext;
  features: AlertGeoJson[];
  pagination?: PaginationInfo;
  /** A title describing the alert collection. */
  title?: string;
  type: "FeatureCollection";
  /**
   * The last time a change occurred to this collection.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  updated?: string;
}

export interface AlertCollectionJsonLd {
  "@context"?: JsonLdContext;
  "@graph": Alert[];
  pagination?: PaginationInfo;
  /** A title describing the alert collection. */
  title?: string;
  /**
   * The last time a change occurred to this collection.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  updated?: string;
}

export type AlertGeoJson = FeatureGeoJson<Alert>;

/** Codes for NWS public zones and counties affected by an alert. */
export interface AlertGeocode {
  /** SAME (Specific Area Message Encoding) codes for affected counties. */
  SAME: string[];
  /** NWS public zone or county identifiers. */
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
  /** URI of the prior alert. */
  "@id": string;
  /** The identifier of the alert message. */
  identifier: string;
  /** The sender of the prior alert. */
  sender: string;
  /**
   * The time the prior alert was sent.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  sent: string;
}

/**
 * A code denoting the type of action recommended for the target audience.
 * This corresponds to responseType in the CAP specification.
 */
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
  "@context": JsonLdContext;
  eventTypes: string[];
}

export type AlertUrgency =
  | "Immediate"
  | "Expected"
  | "Future"
  | "Past"
  | "Unknown";
