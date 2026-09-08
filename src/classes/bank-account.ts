export interface Transaction {
  amount: number;
  type: "deposit" | "withdrawal";
  date: Date;
}

export class BankAccount {
  protected _balance: number;
  private transactionHistory: Transaction[] = [];

  public readonly accountNumber: string;
  public readonly ownerName: string;

  constructor(ownerName: string, accountNumber: string, initialDeposit: number) {
    this.ownerName = ownerName;
    this.accountNumber = accountNumber;
    this._balance = initialDeposit;
  }

  protected logTransaction(amount: number, type: Transaction["type"]): void {
    this.transactionHistory.push({
      amount,
      type,
      date: new Date(),
    });
  }

  public get balance(): number {
    return this._balance;
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive.");
    }

    this._balance += amount;
    this.logTransaction(amount, "deposit");
  }

  public withdrawal(amount: number): boolean {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive.");
    }

    if (amount > this._balance) {
      console.log("Insufficient funds!");
      return false;
    }

    this._balance -= amount;
    this.logTransaction(amount, "withdrawal");
    return true;
  }
}
