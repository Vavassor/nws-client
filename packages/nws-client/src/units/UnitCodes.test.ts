import { describe, expect, test } from "@jest/globals";
import { getEcmaScriptCode, getUcumCode } from "./UnitCodes";

describe("UnitCodes", () => {
  describe("getUcumCode", () => {
    test("Return null when given an invalid value.", () => {
      expect(getUcumCode("")).toBeNull();
      expect(getUcumCode(":")).toBeNull();
    });

    test("Return null when given an invalid namespace.", () => {
      expect(getUcumCode(":m/s")).toBeNull();
      expect(getUcumCode("junk:m/s")).toBeNull();
    });

    test("Return null when given an NWS code.", () => {
      expect(getUcumCode("nwsUnit:m")).toBeNull();
    });

    test("Return a code with no namespace when given a UCUM code.", () => {
      expect(getUcumCode("m/s")).toBe("m/s");
      expect(getUcumCode("uc:m/s")).toBe("m/s");
    });

    test("Return a UCUM code when given a WMO code.", () => {
      expect(getUcumCode("wmo:m_s-1")).toBe("m/s");
      expect(getUcumCode("wmo:nautical_mile")).toBe("[nmi_i]");
      expect(getUcumCode("wmoUnit:m_s-1")).toBe("m/s");
      expect(getUcumCode("wmoUnit:degC")).toBe("Cel");
    });

    test("Return a UCUM code as-is when it's invalid.", () => {
      expect(getUcumCode("uc:junk2")).toBe("junk2");
      expect(getUcumCode("junk/junk2")).toBe("junk/junk2");
    });
  });

  describe("getEcmaScriptCode", () => {
    interface DataSetValue {
      expectedValue: string;
      ucumCode: string;
      value: number;
    }

    const formatDataSet: DataSetValue[] = [
      { expectedValue: "5 L", ucumCode: "L", value: 5 },
      { expectedValue: "5 L/km", ucumCode: "L/km", value: 5 },
      { expectedValue: "5 cm/h", ucumCode: "cm/h", value: 5 },
      { expectedValue: "5 mm", ucumCode: "mm", value: 5 },
      { expectedValue: "5 mm/s", ucumCode: "mm/s", value: 5 },
      { expectedValue: "5 m/s", ucumCode: "m/s", value: 5 },
      { expectedValue: "5 km/h", ucumCode: "km/h", value: 5 },
      { expectedValue: "5 km/d", ucumCode: "km/d", value: 5 },
      { expectedValue: "5 mph", ucumCode: "[mi_i]/h", value: 5 },
      { expectedValue: "10°C", ucumCode: "Cel", value: 10 },
      { expectedValue: "10°C/m", ucumCode: "Cel/m", value: 10 },
      { expectedValue: "10 mpg", ucumCode: "[mi_i]/[gal_us]", value: 10 },
    ];

    test.each(formatDataSet)(
      "Return a unit code compatible with Intl.NumberFormat given the UCUM code $ucumCode.",
      ({ expectedValue, ucumCode, value }: DataSetValue) => {
        const unit = getEcmaScriptCode(ucumCode);
        expect(unit).not.toBeNull();
        if (unit) {
          expect(
            new Intl.NumberFormat("en-US", {
              style: "unit",
              unit,
              unitDisplay: "short",
            }).format(value)
          ).toStrictEqual(expectedValue);
        }
      }
    );
  });
});
