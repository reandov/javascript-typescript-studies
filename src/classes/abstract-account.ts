abstract class Account {
  public abstract readonly accountType: string;

  constructor(
    public readonly ownerName: string,
    protected _balance: number,
  ) {}

  public get balance(): number {
    return this._balance;
  }

  public abstract calculateMonthlyFee(): number;

  public closeMonth(): number {
    const fee = this.calculateMonthlyFee();
    this._balance -= fee;
    return fee;
  }
}

class CheckingAccount extends Account {
  public readonly accountType = "checking";

  constructor(
    ownerName: string,
    balance: number,
    private readonly monthlyFee: number,
  ) {
    super(ownerName, balance);
  }

  public override calculateMonthlyFee(): number {
    return this.monthlyFee;
  }
}

class SavingsAccount extends Account {
  public readonly accountType = "savings";

  public override calculateMonthlyFee(): number {
    return 0;
  }
}

const accounts: Account[] = [
  new CheckingAccount("Alice", 1000, 15),
  new SavingsAccount("Susan", 1000),
];

for (const account of accounts) {
  const fee = account.closeMonth();
  console.log(account.accountType, { fee, balance: account.balance });
}

// `new Account("John", 1000)` is rejected because Account is abstract.
