import { getType } from "../../ValueObject";
import { BooleanScalar } from "../BooleanScalar";

describe("Test BooleanScalar", () => {
  const testBoolean = true;
  const testBooleanClass = new BooleanScalar(testBoolean);

  test("fromNative() initialises object with correct type", () => {
    const obj = BooleanScalar.fromNative(testBoolean);
    expect(getType(obj)).toBe("BooleanScalar");
    expect(obj.value).toBe(testBoolean);
  });

  test("true() initialises object with correct type", () => {
    const obj = BooleanScalar.true();
    expect(getType(obj)).toBe("BooleanScalar");
    expect(obj.value).toBeTruthy();
  });

  test("false() initialises object with correct type", () => {
    const obj = BooleanScalar.false();
    expect(getType(obj)).toBe("BooleanScalar");
    expect(obj.value).not.toBeTruthy();
  });

  test(`toNative() returns "${testBoolean}"`, () => {
    expect(testBooleanClass.toNative()).toBe(testBoolean);
  });

  test("isSame() returns true when match", () => {
    expect(
      testBooleanClass.isSame(new BooleanScalar(testBoolean))
    ).toBeTruthy();
  });

  test("isSame() returns false when values don't match", () => {
    expect(testBooleanClass.isSame(new BooleanScalar(false))).not.toBeTruthy();
  });

  test("isTrue() returns true when true", () => {
    const t = new BooleanScalar(true);
    expect(t.isTrue()).toBeTruthy();
  });

  test("isTrue() returns false when false", () => {
    const t = new BooleanScalar(false);
    expect(t.isTrue()).not.toBeTruthy();
  });

  test("isFalse() returns true when false", () => {
    const t = new BooleanScalar(false);
    expect(t.isFalse()).toBeTruthy();
  });

  test("isFalse() returns false when true", () => {
    const t = new BooleanScalar(true);
    expect(t.isFalse()).not.toBeTruthy();
  });
});
