import { getType } from "../ValueObject";
import { EnumValueObject, Enumerate } from "../EnumValueObject";

class TESTEnum1 extends EnumValueObject {}

describe("Test EnumValueObject", () => {
  const testFloat = 20.3;
  const testString = "20.3";

  const differentFloat = 34.5;
  const differentString = "34.5";

  const testStringClass = new TESTEnum1(testString);
  const testFloatClass = new TESTEnum1(testFloat);

  test("must be extended (not instantiated)", () => {
    expect(() => {
      return new EnumValueObject(testFloat);
    }).toThrow(
      "EnumValueObject cannot be instantiated, you should create your own domain value objects that extend it"
    );
  });

  test("fromNative() initialises object with correct type", () => {
    const obj1 = TESTEnum1.fromNative(testFloat);
    expect(getType(obj1)).toBe("TESTEnum1");

    const obj2 = TESTEnum1.fromNative(testString);
    expect(getType(obj2)).toBe("TESTEnum1");
  });

  test("toNative() returns expected values", () => {
    expect(testStringClass.toNative()).toBe(testString);
    expect(testFloatClass.toNative()).toBe(testFloat);
  });

  test("isSame() returns true when values match", () => {
    expect(testFloatClass.isSame(new TESTEnum1(testFloat))).toBeTruthy();
    expect(testStringClass.isSame(new TESTEnum1(testString))).toBeTruthy();
  });

  test("isSame() returns false when values don't match", () => {
    expect(
      testFloatClass.isSame(new TESTEnum1(differentFloat))
    ).not.toBeTruthy();
    expect(
      testStringClass.isSame(new TESTEnum1(differentString))
    ).not.toBeTruthy();
  });
});

describe("test Eunerate() mixin", () => {
  const Enumerated = Enumerate(
    class extends EnumValueObject {
      static VAL1 = "One";
      static VAL2 = "Two";
    }
  );

  test("should throw error when instantiated with unknown properties", () => {
    expect(() => {
      return new Enumerated("Three");
    }).toThrow('"Three" doesn\'t exist');
  });

  test("should allow fromNative() instantiation", () => {
    const obj = Enumerated.fromNative(Enumerated.VAL2);
    expect(obj.toNative()).toBe(Enumerated.VAL2);
  });

  test("should allow static access to defined properties", () => {
    expect(Enumerated.VAL1).toBe("One");
    expect(Enumerated.VAL2).toBe("Two");
  });

  test("should allow toNative() to be called", () => {
    const obj = new Enumerated(Enumerated.VAL1);
    expect(obj.toNative()).toBe(Enumerated.VAL1);
  });

  test("should allow isSame() to be called", () => {
    const obj1 = new Enumerated(Enumerated.VAL1);
    const obj2 = new Enumerated(Enumerated.VAL1);
    expect(obj1.isSame(obj2)).toBeTruthy();
  });
});
