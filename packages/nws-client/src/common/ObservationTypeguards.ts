import { isRecord } from "./CommonTypeguards";
import {
  Observation,
  ObservationCollectionGeoJson,
  ObservationCollectionJsonLd,
  ObservationGeoJson,
  ObservationJsonLd,
} from "./ObservationTypes";

export const isObservation = (value: unknown): value is Observation => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:ObservationStation"
  );
};

export const isObservationGeoJson = (
  value: unknown
): value is ObservationGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "FeatureCollection" &&
    isObservation(value.properties)
  );
};

export const isObservationJsonLd = (
  value: unknown
): value is ObservationJsonLd => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:ObservationStation"
  );
};

export const isObservationCollectionGeoJson = (
  value: unknown
): value is ObservationCollectionGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "FeatureCollection" &&
    Array.isArray(value.features)
  );
};

export const isObservationCollectionJsonLd = (
  value: unknown
): value is ObservationCollectionJsonLd => {
  return isRecord(value) && Array.isArray(value["@graph"]);
};
