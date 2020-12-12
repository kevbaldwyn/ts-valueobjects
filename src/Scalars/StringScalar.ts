import { ValueObject, getType } from "../ValueObject";

export class StringScalar implements ValueObject<string> {
  type: string;

  value: string;

  constructor(value: string) {
    this.value = value;
    this.type = getType(this, StringScalar, true);
  }

  public static fromNative(value: string): StringScalar {
    return new this(value);
  }

  public isSame = (object: ValueObject<string>): boolean => {
    return this.type === object.type && this.value === object.value;
  };

  public toNative = (): string => {
    return this.value;
  };
}
