import { ValueObject } from "../ValueObject";

export class FloatScalar extends ValueObject<number> {
  constructor(value: number) {
    super(value, FloatScalar);
  }

  public static fromNative(value: number): FloatScalar {
    return new this(value);
  }

  public isSame = (object: ValueObject<number>): boolean => {
    return this.value === object.value;
  };

  public isNull = (): boolean => {
    return false;
  };

  public toNative = (): number => {
    return this.value;
  };
}
