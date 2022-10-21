import { QuantitativeValue } from "./CommonTypes";

export const getQuantitativeValue = (
  value: number | QuantitativeValue,
  unitCode: string
) => {
  if (typeof value === "number") {
    const newValue: QuantitativeValue = {
      value,
      unitCode,
    };
    return newValue;
  }

  return value;
};
