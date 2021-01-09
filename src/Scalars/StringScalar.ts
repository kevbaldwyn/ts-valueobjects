import { ValueObject } from "../ValueObject";

export class StringScalar extends ValueObject<string> {
  public static fromNative(value: string): StringScalar {
    return new this(value);
  }

  public isSame = (object: ValueObject<string>): boolean => {
    return this.value === object.value;
  };

  public isNull = (): boolean => {
    return false;
  };

  public toNative = (): string => {
    return this.value;
  };
}
