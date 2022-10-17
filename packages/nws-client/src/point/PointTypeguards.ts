import { isRecord } from "../common/CommonTypeguards";
import { Point, PointGeoJson } from "./PointTypes";

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
