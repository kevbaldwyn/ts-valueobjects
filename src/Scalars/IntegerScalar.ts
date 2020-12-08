import {
  ValueObject,
  ValueObjectStatic,
  getValueObjectType,
  enforceExtension
} from "../ValueObject";

// npm install big-integer // type?
//

export const IntegerScalar: ValueObjectStatic<BigInt> = class IntegerScalar {
  type: string;

  value: BigInt;

  constructor(value: BigInt) {
    this.value = value;
    this.type = getValueObjectType(this);

    enforceExtension(this, IntegerScalar);
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
};
