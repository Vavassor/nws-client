import { isRecord } from "./CommonTypeguards";
import {
  ObservationCollectionGeoJson,
  ObservationCollectionJsonLd,
} from "./ObservationTypes";

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
