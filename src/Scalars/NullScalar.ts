import { ValueObject } from "../ValueObject";

export class NullScalar extends ValueObject<null> {
  constructor() {
    super(null);
  }

  public static fromNative(): NullScalar {
    return new this();
  }

  public isSame = (object: ValueObject<null>): boolean => {
    return object.toNative() === null;
  };

  public isNull = (): boolean => {
    return true;
  };

  public toNative = (): null => {
    return null;
  };
}
