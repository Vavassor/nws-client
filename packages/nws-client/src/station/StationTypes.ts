import { FeatureGeoJson, JsonLdContext, QuantitativeValue } from "../common";

export interface ObservationStation {
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

export type ObservationStationGeoJson = FeatureGeoJson<ObservationStation>;

export interface ObservationStationCollectionGeoJson {
  "@context": JsonLdContext;
  features: FeatureGeoJson<ObservationStation>[];
  observationStations: string[];
  type: "FeatureCollection";
}

export interface ObservationStationCollectionJsonLd {
  "@context": JsonLdContext;
  "@graph": ObservationStation[];
  observationStations: string[];
}
