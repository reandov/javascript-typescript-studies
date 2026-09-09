// TypeScript's special `this` parameter describes the receiver without becoming
// a runtime argument. The call site supplies a different receiver each time.
function getThis(this: { name: string }) {
  return this;
}

const obj1 = { name: "obj1", getThis };
const obj2 = { name: "obj2", getThis };

console.log(obj1.getThis().name); // "obj1"
console.log(obj2.getThis().name); // "obj2"
