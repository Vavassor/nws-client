import { wmoCodes } from "./WmoCodes";

/**
 * These are the unit namespaces supported by the NWS API.
 *
 * "nwsUnit" - These units are custom to NWS and there is no standard.
 * "wmo" and "wmoUnit" - http://codes.wmo.int/common/unit
 * "uc" - https://ucum.org/ucum
 */
type UnitNamespace = "nwsUnit" | "uc" | "wmo" | "wmoUnit";

interface UnitOfMeasure {
  namespace: UnitNamespace | "unknown";
  unit: string;
}

/**
 * Standardizes a QuantitativeValue unit code to UCUM code format.
 *
 * @param unitCode the unit of measure, expressed in the format "{unit}" or
 *   "{namespace}:{unit}"
 * @returns a unit of measure as a UCUM code
 */
export const getUcumCode = (unitCode: string): string | null => {
  const unitOfMeasure = parseUnitOfMeasure(unitCode);
  switch (unitOfMeasure.namespace) {
    case "uc":
      return unitOfMeasure.unit;
    case "wmo":
    case "wmoUnit":
      return getUcumCodeFromWmoCode(unitOfMeasure.unit);
    default:
      return null;
  }
};

const getUcumCodeFromWmoCode = (wmoCode: string) => {
  const entry = wmoCodes.find((entry) => entry.wmoCode === wmoCode);
  return entry ? entry?.ucumCode : null;
};

const isNamespace = (value: unknown): value is UnitNamespace => {
  return (
    typeof value === "string" &&
    ["nwsUnit", "uc", "wmo", "wmoUnit"].includes(value)
  );
};

const parseUnitOfMeasure = (value: string): UnitOfMeasure => {
  const colonIndex = value.indexOf(":");
  if (colonIndex !== -1) {
    const namespace = value.substring(0, colonIndex);
    return {
      namespace: isNamespace(namespace) ? namespace : "unknown",
      unit: value.substring(colonIndex + 1),
    };
  } else {
    // Units with no namespace are compliant with the Unified Code for Units
    // of Measure syntax.
    return { namespace: "uc", unit: value };
  }
};
