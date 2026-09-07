var userName: string = "John Doe";
let role: string = "Junior Software Engineer";

console.log(`1. ${userName} is a ${role}`);

function changeVariables(): void {
  // The function can reassign mutable variables from its outer scope.
  userName = "Sarah Doe";
  role = "Senior Software Engineer";
}

// The variables retain their original values until the function is called.
changeVariables();

console.log(`2. ${userName} is a ${role}`);
