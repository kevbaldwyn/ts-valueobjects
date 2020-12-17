import { ValueObject } from "../ValueObject";

export class StringScalar extends ValueObject<string> {
  constructor(value: string) {
    super(value, StringScalar);
  }

  public static fromNative(value: string): StringScalar {
    return new this(value);
  }

  public isSame = (object: ValueObject<string>): boolean => {
    return this.value === object.value;
  };

  public toNative = (): string => {
    return this.value;
  };
}
