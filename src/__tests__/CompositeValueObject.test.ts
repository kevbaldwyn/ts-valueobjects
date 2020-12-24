import { StringScalar } from "../Scalars/StringScalar";
import { CompositeValueObject } from "../CompositeValueObject";
import { FloatScalar } from "../Scalars/FloatScalar";
import { getType } from "../ValueObject";
import { NullScalar } from "../Scalars";

class Comp extends CompositeValueObject<{
  name: StringScalar;
  number: FloatScalar;
}> {
  constructor(name: StringScalar, number: FloatScalar) {
    super(
      {
        name,
        number
      },
      Comp
    );
  }

  public static fromNative(value: { name: string; number: number }): Comp {
    return new this(
      StringScalar.fromNative(value.name),
      FloatScalar.fromNative(value.number)
    );
  }

  public getName = (): StringScalar => {
    return this.value.name;
  };
}

class ComplexComp extends CompositeValueObject<{
  name: StringScalar;
  composite: Comp;
}> {
  constructor(name: StringScalar, composite: Comp) {
    super(
      {
        name,
        composite
      },
      Comp
    );
  }

  public static fromNative(value: {
    name: string;
    composite: { name: string; number: number };
  }): ComplexComp {
    return new this(
      StringScalar.fromNative(value.name),
      Comp.fromNative(value.composite)
    );
  }
}

class CompWithNulls extends CompositeValueObject<{
  name: StringScalar;
  null1: NullScalar;
}> {
  constructor(name: StringScalar, null1: NullScalar) {
    super(
      {
        name,
        null1
      },
      Comp
    );
  }

  public static fromNative(value: { name: string }): CompWithNulls {
    return new this(
      StringScalar.fromNative(value.name),
      NullScalar.fromNative()
    );
  }
}

class CompOnlyNulls extends CompositeValueObject<{
  null1: NullScalar;
  null2: NullScalar;
}> {
  constructor(null1: NullScalar, null2: NullScalar) {
    super(
      {
        null1,
        null2
      },
      Comp
    );
  }

  public static fromNative(): CompOnlyNulls {
    return new this(NullScalar.fromNative(), NullScalar.fromNative());
  }
}

describe("Test CompositeValueObject", () => {
  test("should maintain immutability of the properties of .value property", () => {
    expect(() => {
      const obj = new Comp(
        StringScalar.fromNative("some name"),
        FloatScalar.fromNative(20)
      );
      obj.value.name = StringScalar.fromNative("new value");
    }).toThrowError();
  });

  test("isSame() returns true when values match", () => {
    const vo1 = new Comp(
      StringScalar.fromNative("some name"),
      FloatScalar.fromNative(20)
    );

    const vo2 = new Comp(
      StringScalar.fromNative("some name"),
      FloatScalar.fromNative(20)
    );
    expect(vo1.isSame(vo2)).toBeTruthy();
  });

  test("isSame() returns false when values don't match", () => {
    const vo1 = new Comp(
      StringScalar.fromNative("some name"),
      FloatScalar.fromNative(20)
    );

    const vo2 = new Comp(
      StringScalar.fromNative("some other value"),
      FloatScalar.fromNative(20)
    );
    expect(vo1.isSame(vo2)).not.toBeTruthy();
  });

  test("fromNative() initialises object with correct type", () => {
    const obj = Comp.fromNative({
      name: "some name",
      number: 34
    });
    expect(getType(obj)).toBe("Comp");
    expect(obj.value.name.toNative()).toBe("some name");
  });

  test("toNative() returns simple serialised object", () => {
    const obj = new Comp(
      StringScalar.fromNative("some name"),
      FloatScalar.fromNative(34)
    );

    expect(obj.toNative()).toStrictEqual({
      name: "some name",
      number: 34
    });
  });

  test("toNative() returns complex serialised object", () => {
    const obj = new ComplexComp(
      StringScalar.fromNative("some name"),
      Comp.fromNative({
        name: "other name",
        number: 29
      })
    );

    expect(obj.toNative()).toStrictEqual({
      name: "some name",
      composite: {
        name: "other name",
        number: 29
      }
    });
  });

  test("internal .value property is correctly typed and sub properties can be accesed", () => {
    const obj = new Comp(
      StringScalar.fromNative("some name"),
      FloatScalar.fromNative(20)
    );
    expect(obj.getName().toNative()).toBe("some name");
  });

  test("isNull() returns false when 1 or more properties are not null", () => {
    const wNull = new CompWithNulls(
      StringScalar.fromNative("some string"),
      NullScalar.fromNative()
    );
    expect(wNull.isNull()).not.toBeTruthy();
  });

  test("isNull() returns true when all properties are null", () => {
    const wNull = new CompOnlyNulls(
      NullScalar.fromNative(),
      NullScalar.fromNative()
    );
    expect(wNull.isNull()).toBeTruthy();
  });
});
