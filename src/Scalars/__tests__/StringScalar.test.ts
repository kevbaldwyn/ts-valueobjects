import { getType } from "../../ValueObject";
import { StringScalar } from "../StringScalar";

describe("Test StringScalar", () => {
  const testString = "Test String";
  class TESTString1 extends StringScalar {}
  const testStringClass = new TESTString1(testString);

  test("must be extended (not instantiated)", () => {
    expect(() => {
      return new StringScalar(testString);
    }).toThrow(
      "StringScalar cannot be instantiated, you should create your own domain value objects that extend it"
    );
  });

  test("fromNative() initialises object with correct type", () => {
    const obj = TESTString1.fromNative(testString);
    expect(getType(obj)).toBe("TESTString1");
  });

  test(`toNative() returns "${testString}"`, () => {
    expect(testStringClass.toNative()).toBe(testString);
  });

  test("isSame() returns true when values match", () => {
    expect(testStringClass.isSame(new TESTString1(testString))).toBeTruthy();
  });

  test("isSame() returns false when values don't match", () => {
    expect(
      testStringClass.isSame(new TESTString1("Not the same"))
    ).not.toBeTruthy();
  });
});
