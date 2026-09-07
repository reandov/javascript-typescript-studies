function createCounter(): () => number {
  let count: number = 0;

  return function increment(): number {
    count += 1;
    return count;
  };
}

const counter = createCounter();

// The returned function retains access to count after createCounter finishes.
console.log(counter()); // 1
console.log(counter()); // 2
