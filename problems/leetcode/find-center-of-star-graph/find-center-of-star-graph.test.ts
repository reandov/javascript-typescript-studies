import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { findCenter } from "./find-center-of-star-graph";

describe("findCenter", () => {
  it("returns the shared node when it appears in every edge", () => {
    assert.equal(
      findCenter([
        [1, 2],
        [2, 3],
        [4, 2],
      ]),
      2,
    );
  });

  it("returns the shared node when it appears first in each edge", () => {
    assert.equal(
      findCenter([
        [1, 2],
        [5, 1],
        [1, 3],
        [1, 4],
      ]),
      1,
    );
  });

  it("handles the minimum valid star graph", () => {
    assert.equal(
      findCenter([
        [1, 2],
        [3, 1],
      ]),
      1,
    );
  });
});
