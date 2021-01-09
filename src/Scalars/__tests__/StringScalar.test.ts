import { getType } from "../../ValueObject";
import { StringScalar } from "../StringScalar";

describe("Test StringScalar", () => {
  const testString = "Test String";
  const testStringClass = new StringScalar(testString);

  test("fromNative() initialises object with correct type", () => {
    const obj1 = StringScalar.fromNative(testString);
    expect(getType(obj1)).toBe("StringScalar");
    expect(obj1.value).toBe(testString);
  });

  test(`toNative() returns "${testString}"`, () => {
    expect(testStringClass.toNative()).toBe(testString);
  });

  test("isSame() returns true when values match", () => {
    expect(testStringClass.isSame(new StringScalar(testString))).toBeTruthy();
  });

  test("isSame() returns false when values don't match", () => {
    expect(
      testStringClass.isSame(new StringScalar("Not the same"))
    ).not.toBeTruthy();
  });

  test("isNull() returns false", () => {
    expect(testStringClass.isNull()).not.toBeTruthy();
  });
});
