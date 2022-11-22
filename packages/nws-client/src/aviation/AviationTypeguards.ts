import { isRecord } from "../common";
import {
  CenterWeatherAdvisory,
  CenterWeatherAdvisoryCollectionGeoJson,
  CenterWeatherAdvisoryGeoJson,
  CenterWeatherServiceUnitJsonLd,
  Sigmet,
  SigmetCollectionGeoJson,
  SigmetGeoJson,
} from "./AviationTypes";

export const isCenterWeatherAdvisory = (
  value: unknown
): value is CenterWeatherAdvisory => {
  return (
    isRecord(value) &&
    typeof value.cwsu === "string" &&
    typeof value.text === "string"
  );
};

export const isCenterWeatherAdvisoryCollectionGeoJson = (
  value: unknown
): value is CenterWeatherAdvisoryCollectionGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "FeatureCollection" &&
    Array.isArray(value.features)
  );
};

export const isCenterWeatherAdvisoryGeoJson = (
  value: unknown
): value is CenterWeatherAdvisoryGeoJson => {
  return (
    isRecord(value) &&
    typeof value.cwsu === "string" &&
    typeof value.text === "string"
  );
};

export const isCenterWeatherServiceUnitJsonLd = (
  value: unknown
): value is CenterWeatherServiceUnitJsonLd => {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    typeof value.webSiteUrl === "string"
  );
};

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
