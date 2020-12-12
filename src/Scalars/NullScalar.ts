import { ValueObject } from "../ValueObject";

export class NullScalar extends ValueObject<null> {
  constructor() {
    super(null, NullScalar, true);
  }

  public static fromNative(): NullScalar {
    return new this();
  }

  public isSame = (object: ValueObject<null>): boolean => {
    return object.value === null;
  };

  public toNative = (): null => {
    return null;
  };
}
