interface FeePolicy {
  calculate(balance: number): number;
}

class FixedFeePolicy implements FeePolicy {
  constructor(private readonly fee: number) {}

  public calculate(_balance: number): number {
    return this.fee;
  }
}

class PercentageFeePolicy implements FeePolicy {
  constructor(private readonly rate: number) {}

  public calculate(balance: number): number {
    return balance * this.rate;
  }
}

class AccountWithFeePolicy {
  #balance: number;

  constructor(
    initialBalance: number,
    private readonly feePolicy: FeePolicy,
  ) {
    this.#balance = initialBalance;
  }

  public get balance(): number {
    return this.#balance;
  }

  public closeMonth(): number {
    const fee = this.feePolicy.calculate(this.#balance);
    this.#balance -= fee;
    return fee;
  }
}

const fixedFeeAccount = new AccountWithFeePolicy(1000, new FixedFeePolicy(10));
const percentageFeeAccount = new AccountWithFeePolicy(1000, new PercentageFeePolicy(0.01));

console.log(fixedFeeAccount.closeMonth(), fixedFeeAccount.balance);
console.log(percentageFeeAccount.closeMonth(), percentageFeeAccount.balance);
