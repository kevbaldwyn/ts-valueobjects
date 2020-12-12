interface ValueObjectInterface<V>
  extends Readonly<{
    value: V;
  }> {
  isSame(object: ValueObjectInterface<V>): boolean;
  toNative(): V;
}

export const getType = (obj: ValueObjectInterface<unknown>): string => {
  return obj.constructor.name;
};

const enforceExtension = (
  v: ValueObjectInterface<unknown>,
  s: unknown
): void => {
  if (typeof s === "function" && getType(v) === s.name) {
    throw new Error(
      `${s.name} cannot be instantiated, you should create your own domain value objects that extend it`
    );
  }
};

const enforceFromNative = <O>(
  obj: ValueObjectInterface<unknown>,
  c: O
): void => {
  if (Object.keys(c).filter((method) => method === "fromNative").length === 0) {
    throw Error(`${getType(obj)} must include a fromNative method`);
  }
};

export abstract class ValueObject<V> implements ValueObjectInterface<V> {
  readonly value: V;

  constructor(value: V, type: unknown, mustBeExtended = false) {
    this.value = value;
    enforceFromNative(this, type);
    if (mustBeExtended) {
      enforceExtension(this, type);
    }
  }

  abstract isSame(object: ValueObjectInterface<V>): boolean;

  abstract toNative(): V;
}
