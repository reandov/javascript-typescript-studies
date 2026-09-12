import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { merge } from "./merge-intervals";

describe("merge", () => {
  it("combines intervals with overlapping ranges", () => {
    assert.deepEqual(
      merge([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ]),
      [
        [1, 6],
        [8, 10],
        [15, 18],
      ],
    );
  });

  it("combines intervals that touch at an endpoint", () => {
    assert.deepEqual(
      merge([
        [1, 4],
        [4, 5],
      ]),
      [[1, 5]],
    );
  });

  it("combines intervals when the input is not ordered by start", () => {
    assert.deepEqual(
      merge([
        [4, 7],
        [1, 4],
      ]),
      [[1, 7]],
    );
  });

  it("returns a single interval unchanged", () => {
    assert.deepEqual(merge([[0, 0]]), [[0, 0]]);
  });
});
