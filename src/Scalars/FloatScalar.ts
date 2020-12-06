import {
  ValueObject,
  ValueObjectStatic,
  getValueObjectType,
  enforceExtension
} from "../ValueObject";

export const FloatScalar: ValueObjectStatic<number> = class FloatScalar {
  type: string;
  value: number;

  constructor(value: number) {
    this.value = value;
    this.type = getValueObjectType(this);

    enforceExtension(this, FloatScalar);
  }

  public static fromNative(value: number) {
    return new this(value);
  }

  public isSame = (object: ValueObject<number>): boolean => {
    return this.type === object.type && this.value === object.value;
  };

  public toNative = (): number => {
    return this.value;
  };
};
