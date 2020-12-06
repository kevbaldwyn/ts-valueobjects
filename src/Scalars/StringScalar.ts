import {
  ValueObject,
  ValueObjectStatic,
  getValueObjectType,
  enforceExtension
} from "../ValueObject";

export const StringScalar: ValueObjectStatic<string> = class StringScalar {
  type: string;
  value: string;

  constructor(value: string) {
    this.value = value;
    this.type = getValueObjectType(this);

    enforceExtension(this, StringScalar);
  }

  public static fromNative(value: string) {
    return new this(value);
  }

  public isSame = (object: ValueObject<string>): boolean => {
    return this.type === object.type && this.value === object.value;
  };

  public toNative = (): string => {
    return this.value;
  };
};
