import { describe, expect, test } from "@jest/globals";
import { addQueryString, getStringRecord } from "./Network";

describe("addQueryString", () => {
  test("encodes parameters", () => {
    expect(addQueryString("https://example.com", { candy: "M&M's" })).toBe(
      "https://example.com/?candy=M%26M%27s"
    );
  });

  test("encodes arrays of values", () => {
    expect(
      addQueryString("https://example.com", {
        start: [-4, 6],
        end: ["12", "22"],
      })
    ).toBe("https://example.com/?end=12%2C22&start=-4%2C6");
  });

  test("encodes zero and false", () => {
    expect(
      addQueryString("https://example.com", {
        a: 0,
        b: false,
      })
    ).toBe("https://example.com/?a=0&b=false");
  });

  test("omits empty values", () => {
    expect(
      addQueryString("https://example.com", {
        a: "",
        b: undefined,
        c: [],
      })
    ).toBe("https://example.com/");
  });
});

describe("getStringRecord", () => {
  test("allows whitespace", () => {
    expect(
      getStringRecord({
        a: "1 2 3",
        b: "a, b",
        c: " ",
      })
    ).toStrictEqual({
      a: "1 2 3",
      b: "a, b",
      c: " ",
    });
  });

  test("omits empty values", () => {
    expect(
      getStringRecord({
        a: "1",
        b: undefined,
        c: "",
      })
    ).toStrictEqual({ a: "1" });
  });
});
