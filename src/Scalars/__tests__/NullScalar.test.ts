import { getType } from "../../ValueObject";
import { NullScalar } from "../NullScalar";

describe("Test Null", () => {
  class TESTNull1 extends NullScalar {}
  const testStringClass = new TESTNull1();

  test("must be extended (not instantiated)", () => {
    expect(() => {
      return new NullScalar();
    }).toThrow(
      "NullScalar cannot be instantiated, you should create your own domain value objects that extend it"
    );
  });

  test("fromNative() initialises object with correct type", () => {
    const obj = TESTNull1.fromNative();
    expect(getType(obj)).toBe("TESTNull1");
  });

  test(`toNative() returns null`, () => {
    expect(testStringClass.toNative()).toBeNull();
  });

  test("isSame() returns true when given null valueobject", () => {
    expect(testStringClass.isSame(new TESTNull1())).toBeTruthy();
  });
});
