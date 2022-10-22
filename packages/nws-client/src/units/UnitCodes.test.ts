import { describe, expect, test } from "@jest/globals";
import { getUcumCode } from "./UnitCodes";

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
});
