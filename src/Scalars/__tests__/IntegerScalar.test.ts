import { getType } from "../../ValueObject";
import { IntegerScalar } from "../IntegerScalar";

describe("Test IntegerScalar", () => {
  const testInteger = BigInt(2);
  const differentInteger = BigInt(1);
  const testIntegerClass = new IntegerScalar(testInteger);

  test("fromNative() initialises object with correct type", () => {
    const obj = IntegerScalar.fromNative(testInteger);
    expect(getType(obj)).toBe("IntegerScalar");
    expect(obj.value).toBe(testInteger);
  });

  test(`toNative() returns "${testInteger}"`, () => {
    expect(testIntegerClass.toNative()).toBe(testInteger);
  });

  test("isSame() returns true when values match", () => {
    expect(
      testIntegerClass.isSame(new IntegerScalar(testInteger))
    ).toBeTruthy();
  });

  test("isSame() returns false when values don't match", () => {
    expect(
      testIntegerClass.isSame(new IntegerScalar(differentInteger))
    ).not.toBeTruthy();
  });

  test("isNull() returns false", () => {
    expect(testIntegerClass.isNull()).not.toBeTruthy();
  });
});
