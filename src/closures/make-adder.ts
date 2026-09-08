// Each call creates a new `x` binding. The returned function closes over that
// binding and combines its value with the supplied `y` value.
function makeAdder(x: number) {
  return function (y: number) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2));
console.log(add10(2));
