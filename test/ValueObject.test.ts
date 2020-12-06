import { ValueObject, getValueObjectType } from "../src/ValueObject";

class stub implements ValueObject<string> {
  type = "TYPE";
  value = "some value";
  constructor() {}
  isSame = (object: ValueObject<string>): boolean => {
    return false;
  };
  toNative = () => {
    return this.value;
  };
}

describe("Test getValueObjectType()", () => {
  test("should return 'stub' for stubbed class", () => {
    expect(getValueObjectType(new stub())).toBe("stub");
  });
});
