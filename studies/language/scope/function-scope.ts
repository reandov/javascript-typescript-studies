function sayName(): void {
  const userName: string = "John Doe";

  // Because userName is declared inside the function, it cannot be accessed
  // outside it. A `var`, `let`, or `const` declared directly in a function body
  // is local to that function.
  console.log(`Hello, ${userName}`);
}

sayName();

// console.log(userName); // ReferenceError: userName is not defined

// Function declarations are hoisted, so they can be called before their
// declaration appears in the source code.
callLaterFunction();

function callLaterFunction(): void {
  console.log("This function was called before its declaration.");
}
