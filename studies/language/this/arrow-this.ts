const account = {
  balance: 100,

  createReader() {
    // The arrow has no receiver of its own, so it retains `this` from the call to
    // `account.createReader()`.
    return () => this.balance;
  },
};

const readBalance = account.createReader();

console.log(readBalance()); // 100

account.balance = 125;

console.log(readBalance()); // 125
