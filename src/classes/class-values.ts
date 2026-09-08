interface Greeter {
  greet(): string;
}

type GreeterConstructor = new (name: string) => Greeter;

function createGreeting(GreeterClass: GreeterConstructor, name: string): string {
  const greeter = new GreeterClass(name);
  return greeter.greet();
}

const FriendlyGreeter = class implements Greeter {
  constructor(private readonly name: string) {}

  public greet(): string {
    return `Welcome, ${this.name}!`;
  }
};

class Ticket {
  static #nextId: number;

  static {
    Ticket.#nextId = 1;
  }

  private constructor(
    public readonly id: number,
    public readonly label: string,
  ) {}

  public static create(label: string): Ticket {
    return new Ticket(Ticket.#nextId++, label);
  }
}

console.log(createGreeting(FriendlyGreeter, "Ada"));
console.log(Ticket.create("priority"));
console.log(Ticket.create("standard"));
