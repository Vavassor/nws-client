import { QuantitativeValue } from "./CommonTypes";

/**
 * Get a value and unit code as a {@link QuantitativeValue}, if it isn't already
 * in that format.
 *
 * @param value The value, or existing QuantitativeValue.
 * @param unitCode The unit code.
 * @returns A new QuantitativeValue or the value as-is if it already was a
 *   QuantitativeValue.
 */
export const getQuantitativeValue = (
  value: number | string | QuantitativeValue,
  unitCode: string
) => {
  if (typeof value === "number") {
    const newValue: QuantitativeValue = {
      value,
      unitCode,
    };
    return newValue;
  }

  if (typeof value === "string") {
    const newValue: QuantitativeValue = {
      value: parseFloat(value),
      unitCode,
    };
    return newValue;
  }

  return value;
};
