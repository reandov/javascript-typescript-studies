import { BankAccount } from "./bank-account";

export class PremiumBankAccount extends BankAccount {
  public overdraftLimit: number;
  private cashbackEarned: number = 0;
  private static readonly CASHBACK_RATE = 0.01;

  constructor(
    ownerName: string,
    accountNumber: string,
    initialDeposit: number,
    overdraftLimit: number = 1000,
  ) {
    super(ownerName, accountNumber, initialDeposit);
    this.overdraftLimit = overdraftLimit;
  }

  public override deposit(amount: number): void {
    super.deposit(amount);

    const cashback = amount * PremiumBankAccount.CASHBACK_RATE;
    this.cashbackEarned += cashback;
    console.log(`Premium Benefit: Earned $${cashback.toFixed(2)} in cashback!`);
  }

  public override withdrawal(amount: number): boolean {
    if (amount <= 0) throw new Error("Withdrawal amount must be positive.");

    if (amount > this._balance + this.overdraftLimit) {
      console.log("Transaction declined: Exceeds overdraft limit.");
      return false;
    }

    this._balance -= amount;
    this.logTransaction(amount, "withdrawal");

    return true;
  }

  public get totalRewards(): number {
    return this.cashbackEarned;
  }
}
