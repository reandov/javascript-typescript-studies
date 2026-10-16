import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { MinStack } from "./min-stack";

describe("MinStack", () => {
  it("restores the previous minimum after removing the top minimum", () => {
    const stack = new MinStack();
    assert.equal(stack.push(-2), undefined);
    assert.equal(stack.push(0), undefined);
    assert.equal(stack.push(-3), undefined);
    assert.equal(stack.getMin(), -3);
    assert.equal(stack.pop(), undefined);
    assert.equal(stack.top(), 0);
    assert.equal(stack.getMin(), -2);
  });

  it("restores the earlier minimum after popping duplicate zeros and an intervening value", () => {
    const stack = new MinStack();
    assert.equal(stack.push(2), undefined);
    assert.equal(stack.push(0), undefined);
    assert.equal(stack.push(3), undefined);
    assert.equal(stack.push(0), undefined);
    assert.equal(stack.getMin(), 0); // [2, 0, 3, 0] -> 0
    assert.equal(stack.pop(), undefined); // [2, 0, 3]
    assert.equal(stack.getMin(), 0); // [2, 0, 3] -> 0
    assert.equal(stack.pop(), undefined); // [2, 0]
    assert.equal(stack.getMin(), 0); // [2, 0] -> 0
    assert.equal(stack.pop(), undefined); // [2]
    assert.equal(stack.getMin(), 2); // 2
  });

  it("returns the only value as both the top and minimum", () => {
    const stack = new MinStack();
    stack.push(0);
    assert.equal(stack.top(), 0);
    assert.equal(stack.getMin(), 0);
  });

  it("preserves duplicate minima until both copies are removed", () => {
    const stack = new MinStack();
    stack.push(3);
    stack.push(1);
    stack.push(1);
    stack.pop();
    assert.equal(stack.top(), 1);
    assert.equal(stack.getMin(), 1);
    stack.pop();
    assert.equal(stack.top(), 3);
    assert.equal(stack.getMin(), 3);
  });

  it("keeps queries read-only and removes values in last-in-first-out order", () => {
    const stack = new MinStack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    assert.equal(stack.top(), 3);
    assert.equal(stack.top(), 3);
    assert.equal(stack.getMin(), 1);
    assert.equal(stack.getMin(), 1);
    stack.pop();
    assert.equal(stack.top(), 2);
    assert.equal(stack.getMin(), 1);
  });

  it("accepts the signed 32-bit integer boundaries", () => {
    const stack = new MinStack();
    stack.push(2147483647);
    stack.push(-2147483648);
    assert.equal(stack.top(), -2147483648);
    assert.equal(stack.getMin(), -2147483648);
    stack.pop();
    assert.equal(stack.top(), 2147483647);
    assert.equal(stack.getMin(), 2147483647);
  });

  it("can be reused after removing its last value", () => {
    const stack = new MinStack();
    stack.push(-1);
    stack.pop();
    stack.push(5);
    assert.equal(stack.top(), 5);
    assert.equal(stack.getMin(), 5);
  });
});
