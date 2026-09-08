# Classes

A **class** defines how to create objects that share behavior while keeping separate instance state. JavaScript classes are runtime values built on top of the language's prototype system. TypeScript uses the same runtime model and adds compile-time features for describing and checking class designs.

```ts
class BankAccount {
  private balance: number;

  constructor(initialDeposit: number) {
    this.balance = initialDeposit;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }
}

const account = new BankAccount(1000);
```

`BankAccount` is the class, while `account` is an **instance** of that class.

## JavaScript runtime features and TypeScript checks

It is important to know which class features survive at runtime:

| Feature                                                       | JavaScript runtime       | TypeScript only                |
| ------------------------------------------------------------- | ------------------------ | ------------------------------ |
| `class`, `constructor`, fields, methods, getters, and setters | Yes                      | Adds type checking             |
| `extends`, `super`, `static`, and static blocks               | Yes                      | Adds compatibility checks      |
| `#privateField` and `#privateMethod`                          | Yes, enforced at runtime | Can also have type annotations |
| `public`, `protected`, and `private`                          | No                       | Yes, erased during compilation |
| `readonly`, `abstract`, `implements`, and `override`          | No                       | Yes, erased during compilation |
| Interfaces and generic type parameters                        | No                       | Yes, erased during compilation |

This distinction explains why valid TypeScript can still need runtime validation. Types can protect code during development, but values received from a user, file, API, or untyped JavaScript are not automatically checked.

## Class declarations, expressions, and instances

A class can be declared with a name or created as an expression:

```ts
class DeclaredGreeter {}

const ExpressionGreeter = class {};
```

Class declarations are block-scoped and remain in the temporal dead zone until their declaration is evaluated. Unlike a function declaration, a class cannot be used before its declaration in the source code.

Calling a class without `new` throws an error. In simplified terms, `new Example()` creates an object linked to `Example.prototype`, binds that object to `this` during construction, and returns the resulting instance.

A class declaration creates a runtime value—the constructor—and TypeScript also makes its name available as the type of its instances. These are related but different uses:

```ts
const AccountClass = BankAccount; // value: the constructor
let selectedAccount: BankAccount; // type: a BankAccount instance
```

Use `typeof BankAccount` when a type must describe the class constructor and its static side rather than an instance.

## Instance fields, prototype methods, and accessors

Instance fields hold state belonging to each object. Two bank accounts therefore have independent balances and transaction histories.

Ordinary instance methods are stored on the class's prototype and shared by instances. A function stored in a class field, including an arrow function, is instead created as an own property for every instance. Arrow fields can retain the instance's `this`, but they also allocate a separate function per instance and cannot be overridden through the prototype in exactly the same way as ordinary methods.

A class can contain several kinds of members:

- **Fields** store instance state, such as `_balance` and `transactionHistory`.
- **Methods** define operations, such as `deposit` and `withdrawal`.
- **Getters and setters** provide property-style access while running code.
- **Static members** belong to the class constructor instead of an instance.

The `balance` getter in `BankAccount` exposes the current balance for reading without allowing normal callers to assign directly to `_balance`:

```ts
account.balance; // invokes the getter
```

Getters should normally avoid surprising side effects. Setters should validate before changing state. When exposing mutable internal data such as an array, returning a copy prevents callers from mutating the class's internal collection directly.

## `this` and method calls

An instance method receives the instance as `this` when it is called through that instance:

```ts
account.deposit(200); // `this` is `account`
```

Methods are not automatically bound. Detaching a method can lose its receiver:

```ts
const deposit = account.deposit;
deposit(200); // `this` is undefined inside the method
```

Use a wrapper, `bind`, or an arrow field when a callback must retain a particular instance. See [`this.md`](../this/this.md) for the complete receiver and binding rules.

## Constructors and initialization order

The `constructor` receives the arguments passed to `new` and initializes the instance through `this`. A class can have only one runtime constructor implementation.

A derived constructor must call `super(...)` before it can access `this`. Initialization then follows this order:

1. Base-class fields are initialized.
2. The base-class constructor body runs.
3. Derived-class fields are initialized after `super()` returns.
4. The rest of the derived constructor body runs.

Calling an overridable method from a base constructor is risky because the override can run before the derived fields it needs are initialized. [`initialization-order.ts`](./initialization-order.ts) makes this behavior visible.

TypeScript **parameter properties** combine a constructor parameter with a field declaration and assignment:

```ts
class User {
  constructor(public readonly name: string) {}
}
```

The visibility or `readonly` modifier tells TypeScript to create and initialize `this.name`. This is a TypeScript convenience rather than separate JavaScript syntax.

## Encapsulation and access modifiers

TypeScript supports three visibility modifiers:

- `public` members can be accessed from anywhere and are public by default.
- `protected` members can be accessed by the declaring class and its subclasses.
- `private` members can be accessed only inside the declaring class.

In `BankAccount`, `_balance` and `logTransaction` are `protected`, so `PremiumBankAccount` can reuse them. `transactionHistory` is `private`, so subclasses cannot access it through type-checked code.

These modifiers are erased when TypeScript is converted to JavaScript. They describe an API and catch mistakes during development, but they do not enforce privacy at runtime.

JavaScript's `#` syntax creates runtime-private fields and methods:

```ts
class Account {
  #balance = 0;

  #recordDeposit(amount: number): void {
    this.#balance += amount;
  }
}
```

Private identifiers are enforced by the JavaScript engine and are not ordinary string-named properties. They can only be referenced inside the class body that declares them. Subclasses cannot access a base class's `#private` members. JavaScript has no native `protected` equivalent, so a hierarchy that needs protected access must use TypeScript checks, a public hook, or a different design.

## `readonly` and immutability

TypeScript's `readonly` modifier prevents reassignment through normal type-checked code after initialization. In `BankAccount`, `ownerName` and `accountNumber` can be assigned in the constructor but should not be reassigned later.

`readonly` is erased and does not freeze a property at runtime. It is also shallow: a readonly field that refers to an array does not automatically make that array immutable. Runtime immutability requires JavaScript mechanisms such as private state, getter-only properties, property descriptors, defensive copies, or `Object.freeze`, depending on the required guarantee.

## Inheritance with `extends`

Inheritance models an **is-a** relationship. A `PremiumBankAccount` is a specialized `BankAccount`, so it inherits the base class's public and protected behavior:

```ts
class PremiumBankAccount extends BankAccount {
  // additional state and behavior
}
```

`super(...)` calls the base constructor. `super.method()` calls a base implementation from an overriding method.

Inheritance creates a prototype chain, so a premium account is an instance of both runtime classes:

```ts
premiumAccount instanceof PremiumBankAccount; // true
premiumAccount instanceof BankAccount; // true
```

JavaScript and TypeScript classes support one direct base class, not multiple class inheritance. Interfaces and composition can combine several capabilities without multiple base classes.

## Overriding and polymorphism

A subclass **overrides** an inherited method by declaring a compatible method with the same name. Calls are dispatched according to the object's runtime class, even when a variable is typed as the base class. This is **subtype polymorphism**.

`PremiumBankAccount.deposit` calls `super.deposit(amount)` first. This preserves the base validation, balance update, and transaction logging before adding cashback behavior.

The TypeScript `override` keyword verifies that a compatible member exists in the base class. It catches misspellings and accidental overrides but has no runtime effect. Enabling TypeScript's `noImplicitOverride` option can require this keyword throughout a project.

An override that replaces all base behavior requires care. The premium withdrawal method repeats some of the base withdrawal workflow so it can apply an overdraft limit. If the base implementation changes, the override may also need to change. A shared protected helper, a template method, or composition can reduce this duplication.

A subtype should preserve the expectations established by its base type. If callers cannot safely use a subclass wherever the base class is accepted, the inheritance relationship is probably inappropriate. This design rule is commonly known as the Liskov substitution principle.

## Abstract classes

An `abstract` class is a TypeScript class intended only as a base for concrete subclasses. It can declare state, a constructor, and implemented methods while leaving selected members abstract:

```ts
abstract class Shape {
  public abstract area(): number;

  public describe(): string {
    return `Area: ${this.area()}`;
  }
}
```

TypeScript prevents direct construction of `Shape` and requires a concrete subclass to implement `area`. Variables can still use `Shape` as their type, allowing several concrete shapes to be handled polymorphically.

JavaScript itself has no `abstract` keyword. TypeScript erases `abstract`, so it does not provide a runtime construction check. A JavaScript API that requires runtime enforcement must add its own check, often with `new.target`, or throw from methods that a subclass must replace.

## Interfaces and `implements`

An interface describes a type contract without providing runtime code. A class can use `implements` to ask TypeScript to check its instance API:

```ts
interface Printable {
  print(): void;
}

class Report implements Printable {
  public print(): void {}
}
```

`implements` neither adds missing methods nor changes runtime inheritance. Interfaces are structurally typed, so any compatible object can satisfy an interface even if it was not created by the implementing class.

An abstract class and an interface solve related but different problems:

- Use an **interface** for a shape that many unrelated values can satisfy and when no implementation or runtime base is needed.
- Use an **abstract class** when related subclasses should share state, constructor logic, implemented behavior, or a runtime prototype relationship.

A class can implement several interfaces but extend only one class. The normal `implements` clause checks the instance side; a constructor or static-side contract requires a separate constructor type.

## Static members, blocks, and factories

A `static` member belongs to the class constructor rather than to each instance. `CASHBACK_RATE` is shared by all premium accounts and is accessed through `PremiumBankAccount`, not through `premiumAccount`.

Static methods are useful for factory functions and behavior that does not depend on one instance. Static initialization blocks run once, when the class definition is evaluated, and can initialize private static state.

A TypeScript `private constructor` can direct typed callers toward a static factory:

```ts
class Token {
  private constructor(public readonly value: string) {}

  public static create(): Token {
    return new Token(crypto.randomUUID());
  }
}
```

Like other TypeScript access modifiers, a private constructor is not runtime-private after compilation. JavaScript does not have a `#constructor` syntax.

## Generic classes

A generic class uses type parameters so one implementation can preserve the types of different values:

```ts
class Box<T> {
  constructor(public value: T) {}
}

const numberBox = new Box<number>(42);
```

Constraints such as `T extends Entity` require every accepted type to provide particular members. Type parameters are erased at runtime, so a generic class still has one JavaScript constructor. For the same reason, a class's static members cannot refer to its instance-side type parameter: all generic instantiations share the same static state.

## Polymorphic `this`

TypeScript can use `this` as a return type. It means the current subtype rather than only the class where the method was declared:

```ts
class Builder {
  public configure(): this {
    return this;
  }
}
```

If a subclass adds another chainable method, calling `configure()` on that subclass retains the subclass type. This is useful for fluent APIs and is demonstrated in [`fluent-builder.ts`](./fluent-builder.ts).

## Classes as values and constructor types

Because a class is a runtime value, it can be stored in a variable, passed to a function, or returned from a function. A constructor signature describes which class values a function accepts:

```ts
type GreeterConstructor = new (name: string) => Greeter;
```

This type says that the value is constructable with a string and produces a `Greeter`. It does not require one particular class; any compatible constructor can be supplied. This idea is useful for factories, dependency injection, registries, and mixin functions.

## Runtime checks and structural types

`instanceof` is a JavaScript runtime operation that follows the prototype chain. It works with classes because their constructors and prototypes exist at runtime. It cannot test a TypeScript interface or generic type because those are erased.

TypeScript usually compares public object shapes structurally. Two unrelated classes with compatible public members can therefore be assignable even without a shared base class or `implements` clause. Private and protected TypeScript members introduce additional compatibility restrictions because their declaring class matters.

## Composition

Inheritance couples a subclass to its base class. When objects merely need to collaborate rather than form a true is-a relationship, **composition** is often more flexible: an object stores another object and delegates part of its work to it.

[`composition.ts`](./composition.ts) gives an account a `FeePolicy`. Fixed and percentage policies can be exchanged without creating a subclass for every account-and-fee combination. This approach is also called the strategy pattern.

Whether using inheritance or composition, keep invariants inside the owning class. Deposits and withdrawals should validate inputs and update related state together instead of requiring callers to coordinate balance and transaction history manually.

## Modules and side effects

Importing a module evaluates its top-level code once before the importing module continues. Reusable class modules should normally contain declarations and exports rather than demonstrations or application startup logic.

The account classes are defined in separate modules, while `bank-account-demo.ts` is the executable entry point. This separation lets one class import another without unexpectedly running both demonstrations. The additional focused examples in this directory are themselves executable entry points and are not imported by the reusable account modules.

## Features classes do not provide automatically

- TypeScript method overloads provide several checked call signatures, but JavaScript still receives one implementation and performs no overload dispatch by parameter type.
- JavaScript and TypeScript have no general `final` or `sealed` class keyword. API design and runtime checks are needed if subclassing must be discouraged or rejected.
- JavaScript has no abstract classes, interfaces, protected members, or runtime type annotations; those keywords belong to TypeScript.
- Classes do not automatically validate data, bind detached methods, clone mutable values, or make `readonly` data immutable.
- Mixins and decorators can extend class behavior, but they are advanced metaprogramming tools rather than prerequisites for understanding the core class model.

## Examples

- [`bank-account.ts`](./bank-account.ts): constructors, instance state, access modifiers, getters, and transaction methods
- [`premium-bank-account.ts`](./premium-bank-account.ts): inheritance, `super`, overriding, protected members, and static state
- [`bank-account-demo.ts`](./bank-account-demo.ts): using both account types without adding side effects to reusable modules
- [`abstract-account.ts`](./abstract-account.ts): abstract classes, abstract members, parameter properties, and polymorphism
- [`class-contract.ts`](./class-contract.ts): interfaces, `implements`, structural typing, and intersection types
- [`runtime-private-fields.ts`](./runtime-private-fields.ts): runtime-private instance fields, methods, and static fields
- [`generic-repository.ts`](./generic-repository.ts): generic classes, constraints, private collections, and fluent returns
- [`class-values.ts`](./class-values.ts): class expressions, constructor types, static blocks, private constructors, and factories
- [`composition.ts`](./composition.ts): composition and interchangeable strategy objects
- [`initialization-order.ts`](./initialization-order.ts): base and derived field initialization order and constructor hazards
- [`fluent-builder.ts`](./fluent-builder.ts): polymorphic `this` in an inheritance-based fluent API
