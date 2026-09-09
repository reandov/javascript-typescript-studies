# Scope

Scope determines where an identifier (such as a variable, function, or class name) can be accessed. JavaScript uses **lexical scope**, which means that scope is determined by where code is written, not by where a function is called.

JavaScript has four important kinds of scope:

- **Global scope:** Identifiers available throughout a script. The exact global environment depends on where JavaScript runs (for example, a browser or Node.js).
- **Module scope:** Top-level identifiers in a module. They are private to that module unless they are explicitly exported and imported elsewhere.
- **Function scope:** Parameters and variables declared inside a function. They cannot be accessed outside that function.
- **Block scope:** Identifiers declared with `let`, `const`, or `class` inside a block (`{ ... }`). In modern strict-mode and module code, block-level function declarations are block-scoped too.

This project sets `moduleDetection` to `"force"`, so the top level of every TypeScript file is a module scope rather than a true global scope.

## Scope chain

Code in an inner scope can access identifiers from its outer scopes. The reverse is not true: outer code cannot access identifiers declared only in an inner scope. JavaScript searches from the current scope outward until it finds a matching name.

If an inner scope declares an identifier with the same name as one in an outer scope, the inner declaration **shadows** the outer one. It does not overwrite the outer value.

## `var`, `let`, and `const`

- `let` and `const` are block-scoped.
- `var` is function-scoped (or module/global-scoped when declared outside a function), so it ignores ordinary block boundaries.
- `const` prevents reassignment of the binding; it does not make an object or array immutable.

Declarations are processed before execution, a behavior commonly called **hoisting**. However, `let`, `const`, and `class` cannot be accessed before their declarations are evaluated because they are in the **temporal dead zone**. Function declarations can normally be called before their position in the source code, while variables that hold function expressions follow the rules of the variable used to declare them.

## Closures

A function keeps access to the lexical scope in which it was created, even after that outer function has returned. This combination of a function and its retained outer variables is called a **closure**.

## Examples

- [`module-scope.ts`](./module-scope.ts): accessing a module-level variable from a function
- [`function-scope.ts`](./function-scope.ts): local variables and function declaration hoisting
- [`block-scope.ts`](./block-scope.ts): block scope compared with `var`
- [`same-name-scope.ts`](./same-name-scope.ts): variable shadowing
- [`reassign-scope.ts`](./reassign-scope.ts): reassigning variables from an outer scope
- [`closure-scope.ts`](./closure-scope.ts): retaining state with a closure
