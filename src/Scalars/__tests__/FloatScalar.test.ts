import { getType } from "../../ValueObject";
import { FloatScalar } from "../FloatScalar";

describe("Test FloatScalar", () => {
  const testFloat = 20.3;
  const differentFloat = 34.5;
  const testFloatClass = new FloatScalar(testFloat);

  test("fromNative() initialises object with correct type", () => {
    const obj = FloatScalar.fromNative(testFloat);
    expect(getType(obj)).toBe("FloatScalar");
    expect(obj.value).toBe(testFloat);
  });

  test(`toNative() returns "${testFloat}"`, () => {
    expect(testFloatClass.toNative()).toBe(testFloat);
  });

  test("isSame() returns true when values match", () => {
    expect(testFloatClass.isSame(new FloatScalar(testFloat))).toBeTruthy();
  });

  test("isSame() returns false when values don't match", () => {
    expect(
      testFloatClass.isSame(new FloatScalar(differentFloat))
    ).not.toBeTruthy();
  });

  test("isNull() returns false", () => {
    expect(testFloatClass.isNull()).not.toBeTruthy();
  });
});
