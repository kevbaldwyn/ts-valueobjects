![Build](https://github.com/kevbaldwyn/ts-valueobjects/workflows/Build/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/kevbaldwyn/ts-valueobjects/badge.svg?branch=master)](https://coveralls.io/github/kevbaldwyn/ts-valueobjects?branch=master)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fkevbaldwyn%2Fts-valueobjects%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/kevbaldwyn/ts-valueobjects/master)

- [Core principles](#core-principles)
  - [Inspiration](#inspiration)
- [ValueObjectInterface<T>](#valueobjectinterfacet)
- [Type helper classes](#type-helper-classes)
  - [StringScalar](#stringscalar)
  - [FloatScalar](#floatscalar)
  - [BooleanScalar](#booleanscalar)
  - [IntegerScalar](#integerscalar)
  - [NullScalar](#nullscalar)
  - [Enum Type Helper](#enum-type-helper)
- [Composite Value Objects](#composite-value-objects)
- [Domain Value Objects](#domain-value-objects)
- [Nullable Value Objects](#nullable-value-objects)

## Core principles
This package is built around 3 core principles:
1. Value objects MUST be immutable
2. Value objects holding the same values MUST be considered equal when compared
3. Domain value objects should be pure typesafe types

The first 2 are commonly understood principles applied to value objects. The third is an additional principle that allows code to better express a domain's ubiqutous language, it is provided as an aditional feature see the section on Domain Value Objects below. 

For a deeper understanding of value objects read [Martin Fowler's article on the subject](https://martinfowler.com/bliki/ValueObject.html), or Eric Evans, or Vaugn Vernon's writings on Domain Driven Design.

### Inspiration
This package is heavily inspiried by [funeralzone/valueobjects](https://github.com/funeralzone/valueobjects) and the [accompanying blog post](https://medium.com/funeralzone/a-better-way-of-writing-value-objects-in-php-d4e224de133)

## ValueObjectInterface<T>
The core of the library is the `ValueObjectInterface`, it enforces immutability by making the underlying value readonly and provides an interface for deserialising (`toNative()`) and comparing (`isSame()`) value objects. It requires a generic type that the vlaue being stored will be:

```typescript
import { ValueObjectInterface } from "ts-valueobjects";

const anEmailAddress: ValueObjectInterface<string> = {
  value: 'email@example.com',
  isSame(object: ValueObjectInterface<string>): boolean {
    return object.value === this.value;
  },
  toNative(): string {
    return this.value;
  }
}

// trying to reset the value will give an error:
anEmailAddress.value = 'new-email@example.com'
 -> `Cannot assign to 'value' because it is a read-only property`
```
More complex value objects can be created and compared depending on the relevant properties that define their equality:
```typescript
const someCoordinate: ValueObjectInterface<{x:number, y:number}> = {
  value: {
      x: 3.2,
      y: 1.4,
  },
  isSame(object: ValueObjectInterface<string>): boolean {
    return object.x === this.x && object.y === this.y;
  },
  toNative(): {x:number, y:number} {
    return this.value;
  }
}
```

## Type helper classes
Creating lots of value objects this way can get verbose so you can use some of the included classes for creating common scalar types (`StringScalar`, `FloatScalar`, `IntegerScalar`, `BooleanScalar`, `NullScalar`). 

### StringScalar
```typescript
import { StringScalar } from "ts-valueobjects";

// creating the above email example is much easier:
const anEmailAddress = new StringScalar('email@example.com');
// anEmailAddress is now immutable:
anEmailAddress.value = 'a-new-email@example.com'
 -> Will give a compiler error: `Cannot assign to 'value' because it is a read-only property`

// or using the additional static helper:
const anotherEmailAddress = StringScalar.fromNative('another-email@example.com');

console.log(anEmailAddress.isSame(anotherEmailAddress)); // false
```

### FloatScalar
```typescript
import { FloatScalar } from "ts-valueobjects";

const floatValue = FloatScalar.fromNative(23.5);
const floatValue = new FloatScalar(23.5);

floatValue.isNull();
floatValue.isSame(...);
floatValue.toNative();
```

### BooleanScalar
```typescript
import { BooleanScalar } from "ts-valueobjects";

const boolValue = BooleanScalar.true();
const boolValue = BooleanScalar.false();
const boolValue = BooleanScalar.fromNatiave(true);
const boolValue = new BooleanScalar(true);

boolValue.isNull();
boolValue.isSame(...);
boolValue.toNative();
boolValue.isTrue();
boolValue.isFalse();
```

### IntegerScalar
```typescript
import { IntegerScalar } from "ts-valueobjects";

const integerValue = IntegerScalar.fromNative(BigInt(1));
const integerValue = new IntegerScalar(BigInt(1));

integerValue.isNull();
integerValue.isSame(...);
integerValue.toNative();
```

### NullScalar
```typescript
import { NullScalar } from "ts-valueobjects";

const nullValue = NullScalar.fromNative();
const nullValue = new NullScalar();

integerValue.isNull();
integerValue.isSame(...);
integerValue.toNative();
```

### Enum Type Helper
Using the helper for cretaing Enums will throw errors when trying to access properties that do not exist:
```typescript
import { Enumerate, EnumValueObject } from "ts-valueobjects";

class Enumerated extends Enumerate(
  class extends EnumValueObject {
    static VAL1 = "One";
    static VAL2 = "Two";
  }
) {}
const value = new Enumerated(Enumerated.VAL3); // will throw an error
const value = new Enumerated(Enumerated.VAL1); // ok
// or
const value = Enumerated.fromNative(Enumerated.VAL1); // ok
```

## Composite Value Objects
The `CompositeValueObject` allows you to create value objects that are more complex and contain any number of other value objects (including nested `CompositeValueObject`s and Domain Objects). 

```typescript
import { CompositeValueObject } from "ts-valueobjects";

class User extends CompositeValueObject<{
  name: StringScalar;
  email: StringScalar;
  isRegistered: BooleanScalar;
}> {
  constructor(name: StringScalar, email: StrigScalar, isRegistered: BooleanScalar) {
    super({
      name,
      email,
      isRegistered
    });
  }

  public static fromNative(value: { name: string; email: string, isRegistered: boolean }): User {
    return new this(
      StringScalar.fromNative(value.name),
      StringScalar.fromNative(value.email),
      BooleanScalar.fromNative(value.isRegistered)
    );
  }

  public getName = (): StringScalar => {
    return this.value.name;
  };

  ...
}

// immutability of the properties is still enforced:
const user = new User(...);
user.value.name = StringValue.fromNative('new name'); // -> this will throw a TypeError
```

## Domain Value Objects
The above helpers can be combined with the `DomainObjectFrom()` mixin to allow you to easily create typesafe domain value objects that are more expressive of your domain language. For example:

```typescript
import { StringScalar, DomainObjectFrom } from "ts-valueobjects";

class EmailAddress extends DomainObjectFrom(
  // the class to extend the domain object from
  class extends StringScalar {
    // a required property that gives this object it's uniqueness 
    // allowing type checking in other parts of the application
    readonly EmailAddress = true;
  }
) {}

class PersonName extends DomainObjectFrom(
  // the class to extend the domain object from
  class extends StringScalar {
    // a required property that gives this object it's uniqueness 
    // allowing type checking in other parts of the application
    readonly PersonName = true;
  }
) {}

class User {
  name: PersonName;
  email: EmailAddress;

  // the compiler will complain if you try and pass anything other than a PersonName 
  // or EmailAddress to this constructor
  constructor(name: PersonName, email: EmailAddress) {
    this.name = name;
    this.email = email;
  }
}

const user = new User(
  new EmailAddress('email@example.com');
  new PersonName("Papa John");
);
```

You can further extend these domain objects to add any domain specific logic you would like:

```typescript
class EmailAddress extends DomainObjectFrom(
  class extends StringScalar {
    readonly EmailAddress = true;

    getRootDomain = (): string => {
      return this.value.split('@')[1];
    }
  }
) { }
```

Or provide further validation on the instantiation of the object:

```typescript
class EmailAddress extends DomainObjectFrom(
  class extends StringScalar {
    readonly EmailAddress = true;

    constructor(value: string) {
      super(value);
      if (value.length <= 3) {
        throw Error("Invalid email address");
      }
    }
  }
) { }
```

## Nullable Value Objects
The abstract `NullableValueObject` class allows wrapping a `null` and a non-`null` implementation into the same interface as a `ValueObjectInterface`. You just have to define 3 static methods: `fromNative()` which does the null / non-null negotiation, and, `nonNullImplementation()` and `nullImplementation()` which return the relevant implementations for the non-null and the null conditions. These methods should each return a `ValueObjectInterface`. By default `NullableValueObject` includes a `nullImplementation()` that returns a `NullScalar`. However this can be overridden and return any `ValueObjectInterface` implementation you like.

```typescript
import { NullableValueObject, NullOr, StringScalar } from "ts-valueobjects";

class NullableUserName extends NullableValueObject<string> {
  public static fromNative(value: NullOr<string>): NullableUserName {
    return new this(this.getWhichNullImplementation(value));
  }

  public static nonNullImplementation(value: string): StringScalar {
    return new StringScalar("fixed string");
  }
}

const nullVersion = NullableUserName.fromNative(null);
console.log(nullVersion.isNull()) // -> true

const nonNullVersion = NullableUserName.fromNative("John Doe");
console.log(nonNullVersion.isNull()) // -> false

console.log(nonNullVersion.isSame(nullVersion)) // -> false
```

Optionally override the default `nullImplementation()`:
```typescript
class NullImplementationValueObject extends ValueObject<null> {
  ...
}

class NullableUserName extends NullableValueObject<string> {
  public static fromNative(value: NullOr<string>): NullableUserName {
    return new this(this.getWhichNullImplementation(value));
  }

  public static nullImplementation(): StringScalar {
    return new NullImplementationValueObject();
  }

  public static nonNullImplementation(value: string): StringScalar {
    return new StringScalar("fixed string");
  }
}
```
  