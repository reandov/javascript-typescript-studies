import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { intersection } from "./intersection-of-two-arrays-i";

function sorted(nums: number[]): number[] {
  return [...nums].sort((a, b) => a - b);
}

describe("intersection", () => {
  it("returns [2] for example [1, 2, 2, 1] | [2, 2]", () => {
    assert.deepEqual(sorted(intersection([1, 2, 2, 1], [2, 2])), [2]);
  });

  it("returns [4, 9] for example [4, 9, 5] | [9, 4, 9, 8, 4]", () => {
    assert.deepEqual(sorted(intersection([4, 9, 5], [9, 4, 9, 8, 4])), [4, 9]);
  });

  it("returns each shared value only once", () => {
    assert.deepEqual(sorted(intersection([1, 1, 2, 2], [1, 1, 2, 2])), [1, 2]);
  });

  it("returns an empty array when there is no intersection", () => {
    assert.deepEqual(intersection([1, 2, 3], [4, 5, 6]), []);
  });

  it("returns an empty array when the first input is empty", () => {
    assert.deepEqual(intersection([], [1, 2, 3]), []);
  });

  it("returns an empty array when the second input is empty", () => {
    assert.deepEqual(intersection([1, 2, 3], []), []);
  });
});
