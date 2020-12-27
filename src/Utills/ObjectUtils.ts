import { GenericObject } from "../ValueObject";

export const ObjectUtils = {
  isObject: (obj: unknown): boolean => {
    return obj != null && typeof obj === "object";
  },
  isObjectEqual: (object1: GenericObject, object2: GenericObject): boolean => {
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
      const areObjects =
        ObjectUtils.isObject(val1) && ObjectUtils.isObject(val2);

      if (
        (areObjects &&
          !ObjectUtils.isObjectEqual(
            val1 as GenericObject,
            val2 as GenericObject
          )) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }

      return true;
    }, true);
  }
};
