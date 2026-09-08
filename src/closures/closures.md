# Closures

A **closure** is a function together with access to the lexical environment in which the function was created. The lexical environment contains the bindings that are available at that position in the source code, including variables from enclosing functions, blocks, modules, and the global scope.

JavaScript uses lexical scope, so a function's available outer variables are determined by where the function is defined, not where it is called. When the function runs, JavaScript first looks for a binding in the function's local scope and then follows its outer scope chain.

## Retaining an outer environment

Normally, local bindings are no longer needed after a function finishes. If an inner function still refers to those bindings and remains reachable, however, its outer environment must also remain reachable.

```ts
function createCounter() {
  let count = 0;

  return () => ++count;
}

const counter = createCounter();

counter(); // 1
counter(); // 2
```

The call to `createCounter` finishes before `counter` is called. Even so, the returned function can continue reading and updating `count` because it closes over the environment created by that call.

A function does not have to be returned to form a closure. Functions used as event handlers, timers, promise callbacks, or callbacks passed to another function also retain access to their creation environment.

## Bindings, not frozen values

A closure retains access to a binding rather than taking a frozen copy of its value. If the binding is reassigned, the closure observes the new value.

```ts
let message = "before";
const readMessage = () => message;

message = "after";
readMessage(); // "after"
```

The same rule allows a closure to update a mutable outer binding, as the counter does. Normal value semantics still apply: copying a primitive into an object property creates a separate value, while a getter or method can read the current closed-over binding each time it is called.

## A new environment for each call

Every function call creates a new execution environment for its parameters and local variables. Closures created by different calls therefore retain different bindings.

For example, `makeAdder(5)` and `makeAdder(10)` create two independent `x` bindings. The returned functions use the `x` from their own call, so one adds `5` and the other adds `10`.

Multiple closures created during the same outer function call can share an environment. This allows several methods to read and update the same private state, as demonstrated by the counter factory in `class-closure.ts`.

## Encapsulation and function factories

Closures can keep state private without storing it on a publicly accessible object. A factory function can create local state and return only the functions that are allowed to interact with it. Each factory call produces a separate instance of that state.

Closures are also used to configure functions. Partial application creates a function with some arguments supplied in advance, while currying represents a function with multiple parameters as a sequence of functions that each accept one parameter.

## Closures in loops and callbacks

Closures make the difference between `var` and `let` especially visible in asynchronous callbacks. A loop declared with `var` has one function-scoped binding shared by every callback. A loop declared with `let` creates a new binding for each iteration, so each callback observes its own iteration value.

A callback may also observe data from an earlier point in an application's lifecycle. For example, a React callback created during one render retains the state and props from that render. This behavior is sometimes described as a **stale closure**, although the closure itself is working normally: it is reading the environment in which it was created.

## Closures and `this`

Lexical scope and `this` are related but separate rules. A regular function's `this` value generally depends on how the function is called. An arrow function has no `this` binding of its own and instead uses `this` from its surrounding lexical environment.

## Lifetime and garbage collection

An environment remains reachable for as long as a reachable closure needs it. Once the closure and its environment are no longer reachable, JavaScript can garbage-collect them.

Long-lived event listeners, timers, and caches can unintentionally keep closures—and the data reachable through them—in memory. Cleaning up those resources allows the captured data to become eligible for garbage collection.

## TypeScript

Closures are JavaScript runtime behavior. TypeScript can describe the parameters, return values, and public API of closure-based code, but its type annotations do not change how lexical environments are created or retained.

## Examples

- [`counter.ts`](./counter.ts): retaining and updating private state
- [`make-adder.ts`](./make-adder.ts): creating independently configured functions
- [`nested-closures.ts`](./nested-closures.ts): combining nested closures with currying
- [`class-closure.ts`](./class-closure.ts): sharing private state between methods
