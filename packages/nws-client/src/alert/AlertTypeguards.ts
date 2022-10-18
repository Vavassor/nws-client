import { isRecord } from "../common";
import {
  Alert,
  AlertCollectionGeoJson,
  AlertCollectionJsonLd,
  AlertGeoJson,
  AlertJsonLd,
} from "./AlertTypes";

export const isAlert = (value: unknown): value is Alert => {
  return (
    isRecord(value) &&
    typeof value.category === "string" &&
    typeof value.severity === "string" &&
    typeof value.urgency === "string"
  );
};

export const isAlertCollectionGeoJson = (
  value: unknown
): value is AlertCollectionGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "FeatureCollection" &&
    Array.isArray(value.features)
  );
};

export const isAlertCollectionJsonLd = (
  value: unknown
): value is AlertCollectionJsonLd => {
  return isRecord(value) && Array.isArray(value["@graph"]);
};

export const isAlertJsonLd = (value: unknown): value is AlertJsonLd => {
  return isRecord(value) && Array.isArray(value["@graph"]);
};

export const isAlertGeoJson = (value: unknown): value is AlertGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "Feature" &&
    isAlert(value.properties)
  );
};
