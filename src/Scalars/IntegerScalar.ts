import { ValueObject } from "../ValueObject";

export class IntegerScalar extends ValueObject<BigInt> {
  constructor(value: BigInt) {
    super(value, IntegerScalar);
  }

  public static fromNative(value: BigInt): ValueObject<BigInt> {
    return new this(value);
  }

  public isSame = (object: ValueObject<BigInt>): boolean => {
    return this.value === object.value;
  };

  public isNull = (): boolean => {
    return false;
  };

  public toNative = (): BigInt => {
    return this.value;
  };
}
