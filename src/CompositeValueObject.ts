import { ValueObject, GenericObject } from "./ValueObject";
import { ObjectUtils } from "./Utills/ObjectUtils";

export type CompositeProperties = Record<string, ValueObject<unknown>>;

export class CompositeValueObject<
  T extends CompositeProperties
> extends ValueObject<T> {
  constructor(args: T) {
    super(Object.freeze(args));
  }

  public isSame = (object: ValueObject<CompositeProperties>): boolean => {
    return ObjectUtils.isObjectEqual(
      this.toNative(),
      object.toNative() as GenericObject
    );
  };

  public isNull = (): boolean => {
    return Object.keys(this.value).reduce(
      (result: boolean, key: string): boolean => {
        if (result === false) {
          return false;
        }
        return this.value[key].isNull();
      },
      true
    );
  };

  public toNative = (): GenericObject => {
    return Object.keys(this.value).reduce((result: GenericObject, key) => {
      // eslint-disable-next-line no-param-reassign
      result[key] = this.value[key].toNative();
      return result;
    }, {});
  };
}
