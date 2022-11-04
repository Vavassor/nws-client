import { isRecord } from "../common/CommonTypeguards";
import {
  Point,
  PointGeoJson,
  PointJsonLd,
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

export const isPointJsonLd = (value: unknown): value is PointJsonLd => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:Point"
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

export const isRelativeLocationJsonLd = (
  value: unknown
): value is RelativeLocationJsonLd => {
  return (
    isRecord(value) &&
    typeof value.city === "string" &&
    typeof value.state === "string"
  );
};
