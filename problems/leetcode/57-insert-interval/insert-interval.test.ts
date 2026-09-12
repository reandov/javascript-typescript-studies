import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { insert } from "./insert-interval";

describe("insert", () => {
  it("merges a new interval with one overlapping interval", () => {
    assert.deepEqual(
      insert(
        [
          [1, 3],
          [6, 9],
        ],
        [2, 5],
      ),
      [
        [1, 5],
        [6, 9],
      ],
    );
  });

  it("merges a new interval across multiple overlapping intervals", () => {
    assert.deepEqual(
      insert(
        [
          [1, 2],
          [3, 5],
          [6, 7],
          [8, 10],
          [12, 16],
        ],
        [4, 8],
      ),
      [
        [1, 2],
        [3, 10],
        [12, 16],
      ],
    );
  });

  it("returns the new interval when the original intervals are empty", () => {
    assert.deepEqual(insert([], [5, 7]), [[5, 7]]);
  });
});
