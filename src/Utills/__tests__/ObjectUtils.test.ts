import { GenericObject } from "../../ValueObject";
import { ObjectUtils } from "../ObjectUtils";

describe("Test isObjectEqual", () => {
  test("returns false if keys lengths are different", () => {
    expect(
      ObjectUtils.isObjectEqual({ key1: "oo" }, { key1: "oo", key2: "oo" })
    ).not.toBeTruthy();
  });

  test("returns true for exactly matching simple objects", () => {
    expect(
      ObjectUtils.isObjectEqual({ key1: "oo" }, { key1: "oo" })
    ).toBeTruthy();
  });

  test("returns true for exactly matching nested objects", () => {
    expect(
      ObjectUtils.isObjectEqual(
        { key1: "oo", key2: { n1: "1" } },
        { key1: "oo", key2: { n1: "1" } }
      )
    ).toBeTruthy();
  });

  test("returns false for not matching nested objects", () => {
    expect(
      ObjectUtils.isObjectEqual(
        { key1: "oo", key2: { n1: "1" } },
        { key1: "oo", key2: "1" }
      )
    ).not.toBeTruthy();
  });
});

describe("Test isObject", () => {
  test("returns true if is object", () => {
    expect(ObjectUtils.isObject({ key: "value" })).toBeTruthy();
  });
  test("returns false if is not object", () => {
    expect(ObjectUtils.isObject("this is not an object")).not.toBeTruthy();
  });
  test("returns false if is null", () => {
    expect(ObjectUtils.isObject(null)).not.toBeTruthy();
  });
});
