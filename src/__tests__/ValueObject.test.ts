import { ValueObject, getType } from "../ValueObject";

class BaseStub implements ValueObject<string> {
  type = "TYPE";

  value: string;

  constructor(value: string) {
    this.value = value;
  }

  isSame = (): boolean => {
    return false;
  };

  toNative = (): string => {
    return this.value;
  };
}

class Stub extends BaseStub {
  public static fromNative(value: string): Stub {
    return new this(value);
  }
}

describe("Test getType()", () => {
  test("should return 'Stub' for stubbed class", () => {
    expect(getType(new Stub("jh"), Stub)).toBe("Stub");
  });

  test("should throw excpetion for 'Stub' class that requires extension", () => {
    expect(() => {
      getType(new Stub("jh"), Stub, true);
    }).toThrow(
      "Stub cannot be instantiated, you should create your own domain value objects that extend it"
    );
  });

  test("should throw exception for 'BaseStub' class that doesn't include fromNative() method", () => {
    expect(() => {
      getType(new BaseStub("jh"), BaseStub);
    }).toThrow("BaseStub must include a fromNative method");
  });
});
