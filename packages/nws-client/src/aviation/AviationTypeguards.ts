import { isRecord } from "../common";
import {
  Sigmet,
  SigmetCollectionGeoJson,
  SigmetGeoJson,
} from "./AviationTypes";

export const isSigmet = (value: unknown): value is Sigmet => {
  return (
    isRecord(value) &&
    typeof value.atsu === "string" &&
    typeof value.id === "string"
  );
};

export const isSigmetCollectionGeoJson = (
  value: unknown
): value is SigmetCollectionGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "FeatureCollection" &&
    Array.isArray(value.features)
  );
};

export const isSigmetGeoJson = (value: unknown): value is SigmetGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "Feature" &&
    isSigmet(value.properties)
  );
};
