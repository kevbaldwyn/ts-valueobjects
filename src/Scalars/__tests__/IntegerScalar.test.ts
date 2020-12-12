import { getType } from "../../ValueObject";
import { IntegerScalar } from "../IntegerScalar";

describe("Test IntegerScalar", () => {
  const testInteger = BigInt(2);
  const differentInteger = BigInt(1);
  class TESTFInteger1 extends IntegerScalar {}
  const testStringClass = new TESTFInteger1(testInteger);

  test("must be extended (not instantiated)", () => {
    expect(() => {
      return new IntegerScalar(testInteger);
    }).toThrow(
      "IntegerScalar cannot be instantiated, you should create your own domain value objects that extend it"
    );
  });

  test("fromNative() initialises object with correct type", () => {
    const obj = TESTFInteger1.fromNative(testInteger);
    expect(getType(obj)).toBe("TESTFInteger1");
  });

  test(`toNative() returns "${testInteger}"`, () => {
    expect(testStringClass.toNative()).toBe(testInteger);
  });

  test("isSame() returns true when values match", () => {
    expect(testStringClass.isSame(new TESTFInteger1(testInteger))).toBeTruthy();
  });

  test("isSame() returns false when values don't match", () => {
    expect(
      testStringClass.isSame(new TESTFInteger1(differentInteger))
    ).not.toBeTruthy();
  });
});
