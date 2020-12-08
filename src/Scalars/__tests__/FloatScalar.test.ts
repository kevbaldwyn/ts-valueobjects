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
    expect(obj.type).toBe("TESTFloat1");
  });

  test(`toNative() returns "${testFloat}"`, () => {
    expect(testStringClass.toNative()).toBe(testFloat);
  });

  test("isSame() returns true when values and type match", () => {
    expect(testStringClass.isSame(new TESTFloat1(testFloat))).toBeTruthy();
  });

  test("isSame() returns false when values mismatch and type match", () => {
    expect(
      testStringClass.isSame(new TESTFloat1(differentFloat))
    ).not.toBeTruthy();
  });

  test("isSame() returns false when values match and type mismatch", () => {
    class TestFloatClass2 extends FloatScalar {}
    expect(
      testStringClass.isSame(new TestFloatClass2(testFloat))
    ).not.toBeTruthy();
  });
});
