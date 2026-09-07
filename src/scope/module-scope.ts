const userName: string = "John Doe";

function sayName(): void {
  // An inner scope can access variables from its outer scope.
  console.log(`Hello, ${userName}`);
}

sayName();

// This project uses `moduleDetection: "force"`, so userName belongs to this
// module. Another file cannot access it unless it is exported and imported.
