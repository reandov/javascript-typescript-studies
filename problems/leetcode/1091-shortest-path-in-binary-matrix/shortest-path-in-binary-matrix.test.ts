import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { shortestPathBinaryMatrix } from "./shortest-path-in-binary-matrix";

describe("shortestPathBinaryMatrix", () => {
  it("finds a two-cell diagonal path", () => {
    assert.equal(
      shortestPathBinaryMatrix([
        [0, 1],
        [1, 0],
      ]),
      2,
    );
  });

  it("finds the shortest path through a larger matrix", () => {
    assert.equal(
      shortestPathBinaryMatrix([
        [0, 0, 0],
        [1, 1, 0],
        [1, 1, 0],
      ]),
      4,
    );
  });

  it("returns -1 when the starting cell is blocked", () => {
    assert.equal(
      shortestPathBinaryMatrix([
        [1, 0, 0],
        [1, 1, 0],
        [1, 1, 0],
      ]),
      -1,
    );
  });

  it("counts a single open cell as a path of length one", () => {
    assert.equal(shortestPathBinaryMatrix([[0]]), 1);
  });

  it("returns -1 for a single blocked cell", () => {
    assert.equal(shortestPathBinaryMatrix([[1]]), -1);
  });
});
