import { isRecord } from "../common";
import {
  ObservationStation,
  ObservationStationCollectionGeoJson,
  ObservationStationCollectionJsonLd,
  ObservationStationGeoJson,
  ObservationStationJsonLd,
} from "./StationTypes";

export const isObservationStation = (
  value: unknown
): value is ObservationStation => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:ObservationStation"
  );
};

export const isObservationStationGeoJson = (
  value: unknown
): value is ObservationStationGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "Feature" &&
    isObservationStation(value.properties)
  );
};

export const isObservationStationJsonLd = (
  value: unknown
): value is ObservationStationJsonLd => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:ObservationStation"
  );
};

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
