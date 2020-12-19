# TS Value Objects

![Build](https://github.com/kevbaldwyn/ts-valueobjects/workflows/Build/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/kevbaldwyn/ts-valueobjects/badge.svg?branch=master)](https://coveralls.io/github/kevbaldwyn/ts-valueobjects?branch=master)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fkevbaldwyn%2Fts-valueobjects%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/kevbaldwyn/ts-valueobjects/master)

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
Creating lots of value objects this way can get verbose so you can use some of the included classes for creating common scalar types (`StringScalar`, `FloatScalar`, `IntegerScalar`, `BooleanScalar`, `NullScalar`), and other more complex types such as `EnumValueObject`. 

```typescript
import { StringScalar } from "StringScalar";

// creating the above email example is much easier:
const anEmailAddress = new StringScalar('email@example.com');
// anEmailAddress is now immutable:
anEmailAddress.value = 'a-new-email@example.com'
 -> Will give a compiler error: `Cannot assign to 'value' because it is a read-only property`

// or using the additional static helper:
const anotherEmailAddress = StringScalar.fromNative('another-email@example.com');

console.log(anEmailAddress.isSame(anotherEmailAddress)); // false
```

## Domain Value Objects
The above helpers can be combined with the `DomainObjectFrom()` mixin to allow you to easily create typesafe domain value objects that are more expressive of your domain language. For example:

```typescript
import { StringScalar } from "StringScalar";
import { DomainObjectFrom } from "ValueObject";

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