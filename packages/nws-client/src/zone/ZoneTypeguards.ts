import { isRecord } from "../common/CommonTypeguards";
import {
  Zone,
  ZoneCollectionGeoJson,
  ZoneCollectionJsonLd,
  ZoneForecast,
  ZoneForecastGeoJson,
  ZoneForecastJsonLd,
  ZoneGeoJson,
  ZoneJsonLd,
} from "./ZoneTypes";

export const isZone = (value: unknown): value is Zone => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:Zone"
  );
};

export const isZoneCollectionGeoJson = (
  value: unknown
): value is ZoneCollectionGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "FeatureCollection" &&
    Array.isArray(value.features)
  );
};

export const isZoneCollectionJsonLd = (
  value: unknown
): value is ZoneCollectionJsonLd => {
  return isRecord(value) && Array.isArray(value["@graph"]);
};

export const isZoneForecast = (value: unknown): value is ZoneForecast => {
  return isRecord(value) && Array.isArray(value.periods);
};

export const isZoneForecastGeoJson = (
  value: unknown
): value is ZoneForecastGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "Feature" &&
    isZoneForecast(value.properties)
  );
};

export const isZoneForecastJsonLd = (
  value: unknown
): value is ZoneForecastJsonLd => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "Feature" &&
    isZoneForecast(value.properties)
  );
};

export const isZoneGeoJson = (value: unknown): value is ZoneGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "Feature" &&
    isZone(value.properties)
  );
};

export const isZoneJsonLd = (value: unknown): value is ZoneJsonLd => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:Zone"
  );
};
