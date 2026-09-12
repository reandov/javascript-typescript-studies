import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validPath } from "./find-if-path-exists-in-graph";

describe("validPath", () => {
  it("returns true when the source can reach the destination", () => {
    assert.equal(
      validPath(
        3,
        [
          [0, 1],
          [1, 2],
          [2, 0],
        ],
        0,
        2,
      ),
      true,
    );
  });

  it("returns false when the source and destination are disconnected", () => {
    assert.equal(
      validPath(
        6,
        [
          [0, 1],
          [0, 2],
          [3, 5],
          [5, 4],
          [4, 3],
        ],
        0,
        5,
      ),
      false,
    );
  });

  it("returns true for the only vertex in a graph without edges", () => {
    assert.equal(validPath(1, [], 0, 0), true);
  });

  it("returns false for isolated vertices without connecting edges", () => {
    assert.equal(validPath(2, [], 0, 1), false);
  });
});
