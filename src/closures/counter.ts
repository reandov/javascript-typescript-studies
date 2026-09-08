// Each call creates a local `count` binding initialized to 0. The returned
// function closes over that binding, increments it, and returns its new value.
function createCounter() {
  let count = 0;

  // Returning `count + 1` without assigning it would always return 1 because the
  // closed-over `count` binding would remain 0.
  return () => {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
