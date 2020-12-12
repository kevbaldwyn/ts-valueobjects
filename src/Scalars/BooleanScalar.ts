import { ValueObject, getType } from "../ValueObject";

export class BooleanScalar implements ValueObject<boolean> {
  type: string;

  value: boolean;

  constructor(value: boolean) {
    this.value = value;
    this.type = getType(this, BooleanScalar, true);
  }

  public static fromNative(value: boolean): BooleanScalar {
    return new this(value);
  }

  public isSame = (object: ValueObject<boolean>): boolean => {
    return this.type === object.type && this.value === object.value;
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
