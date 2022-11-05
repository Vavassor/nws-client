import {
  ObservationStationCollectionGeoJson,
  ObservationStationCollectionJsonLd,
} from "../station";
import { isRecord } from "./CommonTypeguards";

export const isObservationStationCollectionGeoJson = (
  value: unknown
): value is ObservationStationCollectionGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "FeatureCollection" &&
    Array.isArray(value.features)
  );
};

export const isObservationStationCollectionJsonLd = (
  value: unknown
): value is ObservationStationCollectionJsonLd => {
  return isRecord(value) && Array.isArray(value["@graph"]);
};
