import { BankAccount } from "./bank-account";
import { PremiumBankAccount } from "./premium-bank-account";

console.log("Standard bank account");

const standardAccount = new BankAccount("Alice Smith", "123-456-789-00", 1000);
console.log(standardAccount);

standardAccount.deposit(200);
console.log(standardAccount);

standardAccount.withdrawal(100);
console.log(standardAccount);

console.log("\nPremium bank account");

const premiumAccount = new PremiumBankAccount("Susan Smith", "123-456-789-99", 1000, 2000);
console.log(premiumAccount);

premiumAccount.deposit(500);
console.log(premiumAccount);

premiumAccount.withdrawal(1500);
console.log(premiumAccount);

premiumAccount.withdrawal(1500);
console.log(premiumAccount);
