import { ValueObject, getType } from "../ValueObject";

class Stub extends ValueObject<string> {
  constructor(value: string) {
    super(value, Stub, false);
  }

  isSame = (): boolean => {
    return false;
  };

  toNative = (): string => {
    return this.value;
  };

  public static fromNative(value: string): Stub {
    return new this(value);
  }
}

class StubRequiresExtension extends ValueObject<string> {
  constructor(value: string) {
    super(value, StubRequiresExtension, true);
  }

  isSame = (): boolean => {
    return false;
  };

  toNative = (): string => {
    return this.value;
  };

  public static fromNative(value: string): StubRequiresExtension {
    return new this(value);
  }
}

class StubRequiresMissingFromNative extends ValueObject<string> {
  constructor(value: string) {
    super(value, StubRequiresMissingFromNative, false);
  }

  isSame = (): boolean => {
    return false;
  };

  toNative = (): string => {
    return this.value;
  };
}

describe("Test ValueObject abstract class()", () => {
  test("should return 'Stub' for stubbed class", () => {
    expect(getType(new Stub("jh"))).toBe("Stub");
  });

  test("should throw excpetion for 'Stub' class that requires extension", () => {
    expect(() => {
      getType(new StubRequiresExtension("jh"));
    }).toThrow(
      "StubRequiresExtension cannot be instantiated, you should create your own domain value objects that extend it"
    );
  });

  test("should throw exception for 'StubRequiresMissingFromNative' class that doesn't include fromNative() method", () => {
    expect(() => {
      getType(new StubRequiresMissingFromNative("jh"));
    }).toThrow(
      "StubRequiresMissingFromNative must include a fromNative method"
    );
  });
});
