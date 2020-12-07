import { ValueObject, getValueObjectType } from "../ValueObject";

class Stub implements ValueObject<string> {
  type = "TYPE";

  value = "some value";

  isSame = (): boolean => {
    return false;
  };

  toNative = (): string => {
    return this.value;
  };
}

describe("Test getValueObjectType()", () => {
  test("should return 'Stub' for stubbed class", () => {
    expect(getValueObjectType(new Stub())).toBe("Stub");
  });
});
