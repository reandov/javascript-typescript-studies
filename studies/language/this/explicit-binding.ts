type Person = {
  name: string;
};

function introduce(this: Person, greeting: string, punctuation: string) {
  return `${greeting}, I am ${this.name}${punctuation}`;
}

const ada = { name: "Ada" };
const grace = { name: "Grace" };

// `call` lists the arguments individually, while `apply` receives an array.
console.log(introduce.call(ada, "Hello", "!"));
console.log(introduce.apply(grace, ["Welcome", "."]));

// `bind` creates a function with a fixed receiver. It can also prefill arguments.
const introduceAda = introduce.bind(ada, "Hi");

console.log(introduceAda("!"));
