# `this`

`this` gives a function access to the object associated with its current invocation. Unlike a normal variable, the value of `this` in a regular function is generally determined by **how the function is called**, not where the function was defined.

Arrow functions are the important exception: they do not create their own `this` binding and instead use `this` from their surrounding lexical environment.

## Method invocation

When a function is called as an object method, the object before the dot is the receiver and becomes `this` for that call.

```ts
const user = {
  name: "Ada",
  getName() {
    return this.name;
  },
};

user.getName(); // `this` is `user`
```

A function does not permanently belong to the object where it was first stored. The same function can be assigned to several objects and receive a different `this` from each method call.

## Default binding and detached methods

A regular function called without a receiver uses the default `this` binding. In strict mode, `this` is `undefined`; in a non-strict classic script, it is usually the global object. ECMAScript modules and class bodies always use strict mode.

Extracting a method from an object changes its call site:

```ts
const getName = user.getName;

getName(); // no `user` receiver
```

This is commonly described as **losing `this`**. Passing a method directly as a callback can cause the same problem because the callback's caller controls how it is invoked.

Top-level `this` should not be used to infer these rules because its value depends on the environment: it differs between ECMAScript modules, browser scripts, and CommonJS modules.

## Explicit binding

Regular functions can be invoked with an explicitly selected receiver:

- `function.call(receiver, argument1, argument2)` invokes the function immediately with arguments listed individually.
- `function.apply(receiver, arguments)` invokes it immediately with arguments supplied as an array-like value.
- `function.bind(receiver, argument1)` creates a new function with a fixed receiver and, optionally, arguments supplied in advance.

Binding a method is useful when an API expects a callback but the method still needs its original instance. A wrapper arrow function can achieve the same goal by calling the method through its object.

## Constructor invocation

Calling a constructable function with `new` creates a new object and binds `this` to that object while the constructor runs. If the constructor does not explicitly return another object, the new object is returned automatically.

JavaScript classes use this constructor behavior. Instance methods receive the instance as `this` only when they are called through that instance; class methods are not automatically bound when extracted.

## Arrow functions

An arrow function has no `this` binding of its own. It resolves `this` through the surrounding lexical scope in the same way it resolves an ordinary outer variable.

This makes arrows useful for nested callbacks that need the receiver of an enclosing method:

```ts
const account = {
  balance: 100,
  createReader() {
    return () => this.balance;
  },
};

const readBalance = account.createReader();
readBalance(); // 100
```

`call`, `apply`, and `bind` cannot replace an arrow function's lexical `this`. Arrow functions also cannot be called with `new`. For the same reason, an arrow is usually unsuitable as an object method when the method is supposed to receive the object as its receiver.

## Binding rules

For a regular function, determine `this` from the call expression:

1. A constructor call such as `new User()` uses the new instance.
2. A function created by `bind` uses its bound receiver. `call` and `apply` cannot replace it.
3. An explicit call such as `show.call(user)` or `show.apply(user)` uses the supplied receiver.
4. A method call such as `user.show()` uses the object before the dot.
5. A standalone call such as `show()` uses the default binding, which is `undefined` in strict mode.

When a bound function is used with `new`, constructor binding takes precedence over its bound receiver, although any prefilled arguments are still used.

For an arrow function, ignore those rules and use `this` from the surrounding lexical environment.

## TypeScript

TypeScript can declare the receiver a regular function expects by using a special `this` parameter:

```ts
function getName(this: { name: string }) {
  return this.name;
}
```

The `this` parameter is checked by TypeScript but erased from the emitted JavaScript, so it does not count as a runtime argument. With `noImplicitThis` enabled, TypeScript also reports many places where the type of `this` cannot be determined safely.

Type checking does not automatically bind a method at runtime. A class method can still lose its instance when it is extracted or passed as a callback.

## Examples

- [`this.ts`](./this.ts): receiving an object through method invocation
- [`get-this.ts`](./get-this.ts): using one typed function with different receivers
- [`detached-method.ts`](./detached-method.ts): changing `this` by detaching a method
- [`explicit-binding.ts`](./explicit-binding.ts): selecting `this` with `call`, `apply`, and `bind`
- [`arrow-this.ts`](./arrow-this.ts): retaining an enclosing method's receiver
- [`constructor-this.ts`](./constructor-this.ts): receiving a new instance in a class constructor
- [`class-method.ts`](./class-method.ts): preserving an instance when a method becomes a callback
