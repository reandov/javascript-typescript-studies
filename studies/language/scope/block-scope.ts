{
  var functionOrModuleScopedNumber: number = 400;
  let mutableBlockScopedNumber: number = 500;
  const immutableBlockScopedNumber: number = 600;

  console.log({
    functionOrModuleScopedNumber,
    mutableBlockScopedNumber,
    immutableBlockScopedNumber,
  });
}

// `var` ignores block boundaries, so this variable remains accessible in the
// surrounding function or module scope.
console.log(functionOrModuleScopedNumber);

// These variables do not exist outside the block. Uncommenting either line
// causes a TypeScript error (and would cause a ReferenceError in JavaScript).
// console.log(mutableBlockScopedNumber);
// console.log(immutableBlockScopedNumber);
