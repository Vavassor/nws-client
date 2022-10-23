import { isRecord } from "../common/CommonTypeguards";
import {
  Point,
  PointGeoJson,
  RelativeLocation,
  RelativeLocationGeoJson,
  RelativeLocationJsonLd,
} from "./PointTypes";

export const isPoint = (value: unknown): value is Point => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:Point"
  );
};

export const isPointGeoJson = (value: unknown): value is PointGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "Feature" &&
    isPoint(value.properties)
  );
};

export const isRelativeLocation = (
  value: unknown
): value is RelativeLocation => {
  return (
    isRecord(value) &&
    typeof value.city === "string" &&
    typeof value.state === "string"
  );
};

export const isRelativeLocationJsonLd = (
  value: unknown
): value is RelativeLocationJsonLd => {
  return (
    isRecord(value) &&
    typeof value.city === "string" &&
    typeof value.state === "string"
  );
};

export const isRelativeLocationGeoJson = (
  value: unknown
): value is RelativeLocationGeoJson => {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    value.type === "Feature" &&
    isRelativeLocation(value.properties)
  );
};
