import { ValueObject } from "./ValueObject";

type EnumValue = string | number;

export class EnumValueObject extends ValueObject<EnumValue> {
  constructor(value: EnumValue) {
    super(value, EnumValueObject, true);
  }

  public static fromNative(value: EnumValue): EnumValueObject {
    return new this(value);
  }

  public isSame = (object: ValueObject<EnumValue>): boolean => {
    return object.value === this.value;
  };

  public toNative = (): EnumValue => {
    return this.value;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = any> = new (...args: any[]) => T;

export function Enumerate<TBase extends Constructor>(Base: TBase): TBase {
  return class extends Base {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      if (Object.values(Base).filter((i) => args[0] === i).length !== 1) {
        throw Error(`"${args[0]}" doesn't exist`);
      }
    }
  };
}
