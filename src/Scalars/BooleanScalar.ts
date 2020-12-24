import { ValueObject } from "../ValueObject";

export class BooleanScalar extends ValueObject<boolean> {
  constructor(value: boolean) {
    super(value, BooleanScalar);
  }

  public static fromNative(value: boolean): BooleanScalar {
    return new this(value);
  }

  public static true(): BooleanScalar {
    return new this(true);
  }

  public static false(): BooleanScalar {
    return new this(false);
  }

  public isSame = (object: ValueObject<boolean>): boolean => {
    return this.value === object.value;
  };

  public isNull = (): boolean => {
    return false;
  };

  public toNative = (): boolean => {
    return this.value;
  };

  public isTrue = (): boolean => {
    return this.toNative();
  };

  public isFalse = (): boolean => {
    return !this.toNative();
  };
}
