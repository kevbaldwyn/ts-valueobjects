import { NullableValueObject, NullOr } from "../NullableValueObject";
import { StringScalar } from "../Scalars/StringScalar";

class NullableStringObject extends NullableValueObject<string> {
  public static fromNative(value: NullOr<string>): NullableStringObject {
    return new this(this.getWhichNullImplementation(value));
  }

  public static nullImplementation(): StringScalar {
    // so we know this is being called
    return new StringScalar("null-implementation");
  }

  public static nonNullImplementation(value: string): StringScalar {
    return new StringScalar(value);
  }
}

class NullableProperStringObject extends NullableValueObject<string> {
  public static fromNative(value: NullOr<string>): NullableStringObject {
    return new this(this.getWhichNullImplementation(value));
  }

  public static nonNullImplementation(value: string): StringScalar {
    return new StringScalar("fixed string");
  }
}

class NullableMissingNonNullImplementation extends NullableValueObject<string> {
  public static fromNative(value: NullOr<string>): NullableStringObject {
    return new this(this.getWhichNullImplementation(value));
  }
}

beforeEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe("Test NullableValueObject", () => {
  test("isNull() should proxy to wrapped value object", () => {
    const obj1 = NullableProperStringObject.fromNative(null);
    expect(obj1.isNull()).toBeTruthy();
  });

  test("isSame() should proxy to wrapped value object", () => {
    const obj1 = NullableProperStringObject.fromNative("some string");
    const obj2 = NullableStringObject.fromNative("some string");
    expect(obj1.isSame(obj2)).toBeFalsy();
  });

  test("toNative() should proxy to wrapped value object", () => {
    const obj = NullableProperStringObject.fromNative("some string");
    expect(obj.toNative()).toBe("fixed string");
  });

  test("fromNative() should create a null value object when it recieves null", () => {
    const obj = NullableStringObject.fromNative(null);
    expect(obj.toNative()).toBe("null-implementation");
  });

  test("fromNative() should create a non-null value object when it recieves non-null", () => {
    const obj = NullableStringObject.fromNative("some value");
    expect(obj.toNative()).toBe("some value");
  });

  test("class missing nonNullImplementation should throw exception", () => {
    expect(() => {
      NullableMissingNonNullImplementation.fromNative("some string");
    }).toThrowError(
      "nonNullImplementation() Method must be implemented in child class."
    );
  });
});
