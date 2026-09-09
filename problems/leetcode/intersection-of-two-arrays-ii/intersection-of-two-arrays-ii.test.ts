import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { intersect } from "./intersection-of-two-arrays-ii";

function sorted(nums: number[]): number[] {
  return [...nums].sort((a, b) => a - b);
}

describe("intersect", () => {
  it("returns [2, 2] for example [1, 2, 2, 1] | [2, 2]", () => {
    assert.deepEqual(sorted(intersect([1, 2, 2, 1], [2, 2])), [2, 2]);
  });

  it("returns [4, 9] for example [4, 9, 5] | [9, 4, 9, 8, 4]", () => {
    assert.deepEqual(sorted(intersect([4, 9, 5], [9, 4, 9, 8, 4])), [4, 9]);
  });

  it("returns each shared value as many times as it appears in both arrays", () => {
    assert.deepEqual(sorted(intersect([1, 1, 2, 2], [1, 1, 2, 2])), [1, 1, 2, 2]);
  });

  it("limits repeated values to the smaller occurrence count", () => {
    assert.deepEqual(sorted(intersect([1, 1, 1, 2], [1, 1, 3])), [1, 1]);
  });

  it("returns an empty array when there is no intersection", () => {
    assert.deepEqual(intersect([1, 2, 3], [4, 5, 6]), []);
  });

  it("returns an empty array when the first input is empty", () => {
    assert.deepEqual(intersect([], [1, 2, 3]), []);
  });

  it("returns an empty array when the second input is empty", () => {
    assert.deepEqual(intersect([1, 2, 3], []), []);
  });
});
