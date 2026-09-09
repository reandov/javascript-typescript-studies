// This curried function returns three nested closures. The final function can
// access `a`, `b`, `c`, and `e` through its lexical scope chain and combines
// them with its own `d` parameter.
function sum(a: number) {
  const e = 10;

  return function (b: number) {
    return function (c: number) {
      return function (d: number) {
        return a + b + c + d + e;
      };
    };
  };
}

const result = sum(1)(2)(3)(4);

console.log(result); // 20
