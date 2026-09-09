// This factory exposes methods while keeping its mutable state private in a
// closure, providing encapsulation similar to a class with a private field.
function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
      return count;
    },

    decrement() {
      count--;
      return count;
    },

    value() {
      return count;
    },

    get count() {
      return count;
    },
  };
}

const counter = createCounter();

counter.increment();
counter.increment();
counter.increment();

console.log(counter.value()); // 3
console.log(counter.count); // 3

counter.decrement();
counter.decrement();

console.log(counter.value()); // 1
console.log(counter.count); // 1
