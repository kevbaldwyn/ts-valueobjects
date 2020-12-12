import { getType } from "../../ValueObject";
import { FloatScalar } from "../FloatScalar";

describe("Test FloatScalar", () => {
  const testFloat = 20.3;
  const differentFloat = 34.5;
  class TESTFloat1 extends FloatScalar {}
  const testStringClass = new TESTFloat1(testFloat);

  test("must be extended (not instantiated)", () => {
    expect(() => {
      return new FloatScalar(testFloat);
    }).toThrow(
      "FloatScalar cannot be instantiated, you should create your own domain value objects that extend it"
    );
  });

  test("fromNative() initialises object with correct type", () => {
    const obj = TESTFloat1.fromNative(testFloat);
    expect(getType(obj)).toBe("TESTFloat1");
  });

  test(`toNative() returns "${testFloat}"`, () => {
    expect(testStringClass.toNative()).toBe(testFloat);
  });

  test("isSame() returns true when values match", () => {
    expect(testStringClass.isSame(new TESTFloat1(testFloat))).toBeTruthy();
  });

  test("isSame() returns false when values don't match", () => {
    expect(
      testStringClass.isSame(new TESTFloat1(differentFloat))
    ).not.toBeTruthy();
  });
});
