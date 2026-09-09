// In a method call, the object before the dot becomes the receiver. Therefore,
// `this` inside `showNumber` refers to `testObj` for this invocation.
const testObj = {
  number: 67,
  showNumber() {
    return this.number;
  },
};

console.log(testObj.showNumber()); // 67
