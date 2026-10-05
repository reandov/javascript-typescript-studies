import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildGraph } from "./build-graph";

describe("buildGraph", () => {
  it("builds nodes and neighbor references from an adjacency list", () => {
    const root = buildGraph([
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ]);

    assert.equal(root?.val, 1);
    assert.deepEqual(
      root?.neighbors.map((neighbor) => neighbor.val),
      [2, 4],
    );
    assert.equal(root?.neighbors[0].neighbors[0], root);
  });

  it("builds a single node with no neighbors", () => {
    const root = buildGraph([[]]);

    assert.equal(root?.val, 1);
    assert.deepEqual(root?.neighbors, []);
  });

  it("returns null for an empty adjacency list", () => {
    assert.equal(buildGraph([]), null);
  });

  it("rejects a neighbor value that does not identify a node", () => {
    assert.throws(() => buildGraph([[2]]), RangeError);
  });
});
