import { ValueObject, getType, DomainObjectFrom } from "../ValueObject";

class Stub extends ValueObject<string> {
  constructor(value: string) {
    super(value, Stub);
  }

  isSame = (object: ValueObject<string>): boolean => {
    return object.value === this.value;
  };

  toNative = (): string => {
    return this.value;
  };

  public static fromNative(value: string): Stub {
    return new this(value);
  }
}

class StubMissingFromNative extends ValueObject<string> {
  constructor(value: string) {
    super(value, StubMissingFromNative);
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

  test("should throw exception for 'StubMissingFromNative' class that doesn't include fromNative() method", () => {
    expect(() => {
      getType(new StubMissingFromNative("jh"));
    }).toThrow("StubMissingFromNative must include a fromNative method");
  });
});

describe("Test DomainObjectFrom() mixin", () => {
  test("should create object of same value as parent", () => {
    const domainString = "this string";
    class DomainObject extends DomainObjectFrom(
      class extends Stub {
        readonly DomainObject = true;
      }
    ) {}

    const domainInstance = new DomainObject(domainString);
    const stubInstance = new Stub(domainString);

    expect(domainInstance.value).toBe(domainString);
    expect(domainInstance.isSame(stubInstance)).toBeTruthy();
  });

  test("should enforce property requirement that defined uniqueness", () => {
    const domainString = "this string";
    class DomainObject extends DomainObjectFrom(Stub) {}
    const DomainObject2 = DomainObjectFrom(Stub);

    expect(() => {
      const domainInstance = new DomainObject(domainString);
      domainInstance.toNative();
    }).toThrow(
      'DomainObject cannot be instantiated, you should create your own domain value objects that extend it by adding a readonly property "readonly DomainObject = true;"'
    );

    expect(() => {
      const domainInstance2 = new DomainObject2(domainString);
      domainInstance2.toNative();
    }).toThrow(
      'class_1 cannot be instantiated, you should create your own domain value objects that extend it by adding a readonly property "readonly class_1 = true;"'
    );
  });

  test("should create type safe domain objects", () => {
    const testString = "test string";

    class DomainObject1 extends DomainObjectFrom(
      class extends Stub {
        readonly DomainObject1 = true;
      }
    ) {}

    class DomainObject2 extends DomainObjectFrom(
      class extends Stub {
        readonly DomainObject2 = true;
      }
    ) {}

    const testFunc = (
      domainObject1: DomainObject1,
      domainObject2: DomainObject2
    ): boolean => {
      return domainObject1.isSame(domainObject2);
    };

    expect(
      testFunc(new DomainObject1(testString), new DomainObject2(testString))
    ).toBeTruthy();

    // compiler should complain about this
    // testFunc(new DomainObject2(testString), new DomainObject1(testString));
  });
});
