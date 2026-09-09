console.log("1");

setTimeout(() => console.log("2"), 0);

console.log("3");

new Promise<void>((resolve) => {
  console.log("4");
  resolve();
}).then(() => console.log("5"));

Promise.resolve().then(() => console.log("6"));

setTimeout(() => console.log("7"), 0);

new Promise<void>((resolve) => {
  console.log("8");

  setTimeout(() => {
    console.log("9");
    resolve();
  }, 0);
}).then(() => console.log("10"));

console.log("11");
