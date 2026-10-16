// Time complexity: O(1) amortized for push; O(1) for all other operations.
// Space complexity: O(n), where n is the number of stored values.
export class MinStack {
  stack: number[];
  // minStack[i] stores the minimum of stack[0..i]; both arrays have equal length.
  minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(value: number): void {
    this.stack.push(value);

    if (this.minStack.length == 0) {
      this.minStack.push(value);
    } else {
      // Store the minimum at every depth, even when the new value is larger.
      this.minStack.push(Math.min(value, this.minStack[this.minStack.length - 1]));
    }
  }

  pop(): void {
    // Remove the value and its minimum snapshot together.
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}
