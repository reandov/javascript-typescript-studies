interface Identifiable {
  readonly id: string;
}

interface Depositable {
  deposit(amount: number): void;
}

interface BalanceReadable {
  readonly balance: number;
}

class Wallet implements Identifiable, Depositable, BalanceReadable {
  #balance: number;

  constructor(
    public readonly id: string,
    initialBalance: number,
  ) {
    this.#balance = initialBalance;
  }

  public get balance(): number {
    return this.#balance;
  }

  public deposit(amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new RangeError("Deposit amount must be a positive finite number.");
    }

    this.#balance += amount;
  }
}

function printBalance(container: Identifiable & BalanceReadable): void {
  console.log(`${container.id}: $${container.balance.toFixed(2)}`);
}

const wallet = new Wallet("wallet-1", 100);
wallet.deposit(50);
printBalance(wallet);

// Interfaces use structural typing, so a class instance is not required.
printBalance({ id: "plain-object", balance: 25 });
