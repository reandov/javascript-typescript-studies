class Counter {
  count = 0;

  increment() {
    this.count += 1;
    return this.count;
  }
}

const counter = new Counter();

// Passing a method directly would detach it from `counter`. Binding the method
// preserves the instance when another function invokes it as a callback.
const increment = counter.increment.bind(counter);

console.log(["first", "second", "third"].map(increment)); // [1, 2, 3]
