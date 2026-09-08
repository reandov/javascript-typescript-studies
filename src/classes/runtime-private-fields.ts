class SecureVault {
  static #instanceCount = 0;

  #entries: string[] = [];

  constructor(public readonly name: string) {
    SecureVault.#instanceCount += 1;
  }

  static get instanceCount(): number {
    return SecureVault.#instanceCount;
  }

  #assertEntry(entry: string): void {
    if (entry.trim() === "") {
      throw new Error("A vault entry cannot be empty.");
    }
  }

  public add(entry: string): void {
    this.#assertEntry(entry);
    this.#entries.push(entry);
  }

  public get entries(): readonly string[] {
    return [...this.#entries];
  }
}

const personalVault = new SecureVault("personal");
personalVault.add("passport");

const returnedEntries = personalVault.entries;

console.log(returnedEntries);
console.log(SecureVault.instanceCount);

// `personalVault.#entries` is a syntax error outside SecureVault.
