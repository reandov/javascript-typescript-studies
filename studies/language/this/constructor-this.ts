class User {
  name: string;

  constructor(name: string) {
    // During `new User(...)`, `this` is the newly created instance.
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const user = new User("Ada");

console.log(user.getName()); // "Ada"
