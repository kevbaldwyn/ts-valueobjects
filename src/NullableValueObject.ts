import { NullScalar } from "./Scalars";
import { Native, ValueObject, ValueObjectInterface } from "./ValueObject";

export type NullOr<V> = V | null;

export abstract class NullableValueObject<V> extends ValueObject<
  ValueObjectInterface<NullOr<V>>
> {
  public isNull = (): boolean => {
    return this.value.isNull();
  };

  public isSame = (
    object: ValueObjectInterface<ValueObjectInterface<NullOr<V>>>
  ): boolean => {
    return this.value.isSame(object.value);
  };

  public toNative = (): Native => {
    return this.value.toNative();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected static getWhichNullImplementation(value: Native): any {
    if (value === null) {
      return this.nullImplementation();
    }
    return this.nonNullImplementation(value);
  }

  static nullImplementation(): unknown {
    return new NullScalar();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static nonNullImplementation(value: unknown): unknown {
    throw new Error(
      "nonNullImplementation() Method must be implemented in child class."
    );
  }
}
