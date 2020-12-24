import { ValueObject, GenericObject } from "./ValueObject";

export type CompositeProperties = Record<string, ValueObject<unknown>>;

export class CompositeValueObject<
  T extends CompositeProperties
> extends ValueObject<T> {
  constructor(args: T, type: unknown) {
    super(Object.freeze(args), type);
  }

  public isSame = (object: ValueObject<CompositeProperties>): boolean => {
    const isObject = (obj: unknown): boolean => {
      return obj != null && typeof obj === "object";
    };

    const isObjectEqual = (
      object1: GenericObject,
      object2: GenericObject
    ): boolean => {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      return keys1.reduce((result: boolean, key: string): boolean => {
        if (result === false) {
          return false;
        }

        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);

        if (
          (areObjects &&
            !isObjectEqual(val1 as GenericObject, val2 as GenericObject)) ||
          (!areObjects && val1 !== val2)
        ) {
          return false;
        }

        return true;
      }, true);
    };

    return isObjectEqual(this.toNative(), object.toNative() as GenericObject);
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
