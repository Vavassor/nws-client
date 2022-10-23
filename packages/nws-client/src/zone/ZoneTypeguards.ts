import { isRecord } from "../common/CommonTypeguards";
import { Zone, ZoneGeoJson } from "./ZoneTypes";

export const isZone = (value: unknown): value is Zone => {
  return (
    isRecord(value) &&
    typeof value["@type"] === "string" &&
    value["@type"] === "wx:Zone"
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
