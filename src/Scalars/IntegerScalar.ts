import { ValueObject, getType } from "../ValueObject";

// npm install big-integer // type?
//

export class IntegerScalar implements ValueObject<BigInt> {
  type: string;

  value: BigInt;

  constructor(value: BigInt) {
    this.value = value;
    this.type = getType(this, IntegerScalar, true);
  }

  public static fromNative(value: BigInt): ValueObject<BigInt> {
    return new this(value);
  }

  public isSame = (object: ValueObject<BigInt>): boolean => {
    return this.type === object.type && this.value === object.value;
  };

  public toNative = (): BigInt => {
    return this.value;
  };
}
