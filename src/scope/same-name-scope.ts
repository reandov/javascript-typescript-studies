const userName: string = "John Doe";

function sameNameDefinition(): void {
  // This is called shadowing: the inner declaration hides the outer variable
  // within this function without changing the outer variable's value.
  const userName: string = "Sarah Doe";

  console.log(`From inside the function: ${userName}`);
}

sameNameDefinition();

console.log(`From outside the function: ${userName}`);
