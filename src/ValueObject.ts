export interface ValueObject<V>
  extends Readonly<{
    type: string;
    value: V;
    isSame(object: ValueObject<V>): boolean;
    toNative(): V;
  }> {}

export interface ValueObjectStatic<V> {
  new (value: V): ValueObject<V>;
  fromNative(value: V): ValueObject<V>;
}

export const getValueObjectType = <V>(obj: ValueObject<V>): string => {
  return obj.constructor.name;
};

export const enforceExtension = <V>(
  v: ValueObject<V>,
  s: ValueObjectStatic<V>
): void => {
  if (v.type === s.name) {
    throw new Error(
      `${s.name} cannot be instantiated, you should create your own domain value objects that extend it`
    );
  }
};
