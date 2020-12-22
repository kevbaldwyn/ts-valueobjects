export type Native =
  | string
  | number
  | BigInt
  | null
  | boolean
  | Record<string, unknown>;

export type GenericObject = Record<string, unknown>;

export interface ValueObjectInterface<V>
  extends Readonly<{
    value: V;
  }> {
  isSame(object: ValueObjectInterface<V>): boolean;
  toNative(): Native;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueObjectConstructor<T = any> = new (...args: any[]) => T;

export const getType = (obj: ValueObjectInterface<unknown>): string => {
  return obj.constructor.name;
};

export const hasMember = (
  obj: ValueObjectInterface<unknown>,
  property: string
): boolean => {
  return Object.keys(obj).filter((method) => method === property).length !== 0;
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

  constructor(value: V, type: unknown) {
    this.value = value;
    enforceFromNative(this, type);
  }

  abstract isSame(object: ValueObjectInterface<V>): boolean;

  abstract toNative(): Native;
}

export function DomainObjectFrom<TBase extends ValueObjectConstructor, V>(
  Base: TBase
): TBase {
  return class extends Base {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      // make the compiler play nice
      const o = (this as unknown) as ValueObjectInterface<V>;
      const typeName = getType(o);

      if (!hasMember(o, typeName)) {
        throw new Error(
          `${typeName} cannot be instantiated, you should create your own domain value objects that extend it by adding a readonly property "readonly ${typeName} = true;"`
        );
      }
    }
  };
}
