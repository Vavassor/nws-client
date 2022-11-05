import { isRecord } from "../common";
import {
  RadarStation,
  RadarStationGeoJson,
  RadarStationJsonLd,
  RadarStationCollectionGeoJson,
  RadarStationCollectionJsonLd,
} from "./RadarTypes";

export const isRadarStation = (value: unknown): value is RadarStation => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:RadarStation"
  );
};

export const isRadarStationCollectionGeoJson = (
  value: unknown
): value is RadarStationCollectionGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "FeatureCollection" &&
    Array.isArray(value.features)
  );
};

export const isRadarStationCollectionJsonLd = (
  value: unknown
): value is RadarStationCollectionJsonLd => {
  return isRecord(value) && Array.isArray(value["@graph"]);
};

export const isRadarStationJsonLd = (
  value: unknown
): value is RadarStationJsonLd => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:RadarStation"
  );
};

export const isRadarStationGeoJson = (
  value: unknown
): value is RadarStationGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "Feature" &&
    isRadarStation(value.properties)
  );
};
