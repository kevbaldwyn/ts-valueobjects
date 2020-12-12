import { ValueObject, getType } from "../ValueObject";

export class FloatScalar implements ValueObject<number> {
  type: string;

  value: number;

  constructor(value: number) {
    this.value = value;
    this.type = getType(this, FloatScalar, true);
  }

  public static fromNative(value: number): ValueObject<number> {
    return new this(value);
  }

  public isSame = (object: ValueObject<number>): boolean => {
    return this.type === object.type && this.value === object.value;
  };

  public toNative = (): number => {
    return this.value;
  };
}
