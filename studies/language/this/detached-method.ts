function identifyReceiver(this: unknown) {
  return this;
}

const owner = { identifyReceiver };

// Calling through the object supplies `owner` as the receiver.
console.log(owner.identifyReceiver() === owner); // true

// Extracting the method removes the receiver from the call expression. This
// project uses strict module code, so a standalone call receives `undefined`.
const detached = owner.identifyReceiver;

console.log(detached() === undefined); // true
