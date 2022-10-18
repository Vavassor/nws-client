import { FeatureGeoJson, JsonLdContext, QuantitativeValue } from "../common";

export interface ObservationStation {
  "@context": JsonLdContext;
  "@id": string;
  "@type": "wx:ObservationStation";
  county: string;
  elevation: QuantitativeValue;
  fireWeatherZone: string;
  forecast: string;
  geometry?: string | null;
  name: string;
  stationIdentifier: string;
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
