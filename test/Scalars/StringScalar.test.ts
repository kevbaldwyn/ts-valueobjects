import { StringScalar } from "../../src/Scalars/StringScalar";

describe("Test StringScalar", () => {
  const testString = "Test String";
  class _String1 extends StringScalar {}
  const _string = new _String1(testString);

  test("must be extended (not instantiated)", () => {
    try {
      new StringScalar(testString);
      fail('"StringScalar" should not be allowed to be instantiated');
    } catch (e) {
      expect(e.message).toBe(
        "StringScalar cannot be instantiated, you should create your own domain value objects that extend it"
      );
    }
  });

  test("fromNative() initialises object with correct type", () => {
    const obj = _String1.fromNative(testString);
    expect(obj.type).toBe("_String1");
  });

  test(`toNative() returns "${testString}"`, () => {
    expect(_string.toNative()).toBe(testString);
  });

  test("isSame() returns true when values and type match", () => {
    expect(_string.isSame(new _String1(testString))).toBeTruthy();
  });

  test("isSame() returns false when values mismatch and type match", () => {
    expect(_string.isSame(new _String1("Not the same"))).not.toBeTruthy();
  });

  test("isSame() returns false when values match and type mismatch", () => {
    class _String2 extends StringScalar {}
    expect(_string.isSame(new _String2(testString))).not.toBeTruthy();
  });
});
