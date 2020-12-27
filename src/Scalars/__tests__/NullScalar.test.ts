import { getType } from "../../ValueObject";
import { NullScalar } from "../NullScalar";

describe("Test Null", () => {
  const testStringClass = new NullScalar();

  test("fromNative() initialises object with correct type", () => {
    const obj = NullScalar.fromNative();
    expect(getType(obj)).toBe("NullScalar");
    expect(obj.value).toBeNull();
  });

  test(`toNative() returns null`, () => {
    expect(testStringClass.toNative()).toBeNull();
  });

  test("isSame() returns true when given null valueobject", () => {
    const matched = new NullScalar();
    const matchSpy = jest.spyOn(matched, "toNative");
    expect(testStringClass.isSame(matched)).toBeTruthy();
    expect(matchSpy).toHaveBeenCalled();
  });

  test("isNull() returns true", () => {
    expect(testStringClass.isNull()).toBeTruthy();
  });
});
