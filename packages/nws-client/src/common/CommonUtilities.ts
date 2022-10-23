import { QuantitativeValue } from "./CommonTypes";

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
