export interface ValueObject<V>
  extends Readonly<{
    type: string;
    value: V;
  }> {
  isSame(object: ValueObject<V>): boolean;
  toNative(): V;
}

const getValueObjectType = <V>(obj: ValueObject<V>): string => {
  return obj.constructor.name;
};

const enforceExtension = <V, O>(v: ValueObject<V>, s: O): void => {
  if (typeof s === "function" && getValueObjectType(v) === s.name) {
    throw new Error(
      `${s.name} cannot be instantiated, you should create your own domain value objects that extend it`
    );
  }
};

const enforceFromNative = <V, O>(obj: ValueObject<V>, c: O): void => {
  if (Object.keys(c).filter((method) => method === "fromNative").length === 0) {
    throw Error(`${getValueObjectType(obj)} must include a fromNative method`);
  }
};

export const getType = <V, O>(
  obj: ValueObject<V>,
  c: O,
  mustBeExtended = false
): string => {
  enforceFromNative(obj, c);
  if (mustBeExtended) {
    enforceExtension(obj, c);
  }
  return getValueObjectType(obj);
};
