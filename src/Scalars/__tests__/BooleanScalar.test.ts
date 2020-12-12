import { BooleanScalar } from "../BooleanScalar";

describe("Test BooleanScalar", () => {
  const testBoolean = true;
  class TestBoolean1 extends BooleanScalar {}
  const testBooleanClass = new TestBoolean1(testBoolean);

  test("must be extended (not instantiated)", () => {
    expect(() => {
      return new BooleanScalar(testBoolean);
    }).toThrow(
      "BooleanScalar cannot be instantiated, you should create your own domain value objects that extend it"
    );
  });

  test("fromNative() initialises object with correct type", () => {
    const obj = TestBoolean1.fromNative(testBoolean);
    expect(obj.type).toBe("TestBoolean1");
  });

  test(`toNative() returns "${testBoolean}"`, () => {
    expect(testBooleanClass.toNative()).toBe(testBoolean);
  });

  test("isSame() returns true when values and type match", () => {
    expect(testBooleanClass.isSame(new TestBoolean1(testBoolean))).toBeTruthy();
  });

  test("isSame() returns false when values mismatch and type match", () => {
    expect(testBooleanClass.isSame(new TestBoolean1(false))).not.toBeTruthy();
  });

  test("isSame() returns false when values match and type mismatch", () => {
    class TestBooleanClass2 extends BooleanScalar {}
    expect(
      testBooleanClass.isSame(new TestBooleanClass2(testBoolean))
    ).not.toBeTruthy();
  });

  test("isTrue() returns true when true", () => {
    const t = new TestBoolean1(true);
    expect(t.isTrue()).toBeTruthy();
  });

  //   test("isTrue() returns false when false", () => {});

  //   test("isFalse() returns true when false", () => {});

  //   test("isFalse() returns false when true", () => {});
});
