import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { findMinArrowShots } from "./minimum-number-of-arrows-to-burst-balloons";

describe("findMinArrowShots", () => {
  it("bursts overlapping balloons with shared arrows", () => {
    assert.equal(
      findMinArrowShots([
        [10, 16],
        [2, 8],
        [1, 6],
        [7, 12],
      ]),
      2,
    );
  });

  it("uses one arrow per disjoint balloon", () => {
    assert.equal(
      findMinArrowShots([
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
      ]),
      4,
    );
  });

  it("treats touching endpoints as overlapping", () => {
    assert.equal(
      findMinArrowShots([
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
      ]),
      2,
    );
  });

  it("returns one arrow for the minimum input size", () => {
    assert.equal(findMinArrowShots([[1, 2]]), 1);
  });
});
