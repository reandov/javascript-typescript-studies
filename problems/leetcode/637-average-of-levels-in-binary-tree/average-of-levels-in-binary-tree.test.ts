import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { averageOfLevels } from "./average-of-levels-in-binary-tree";

describe("averageOfLevels", () => {
  it("averages values across each level with sparse children", () => {
    const root = buildTree([3, 9, 20, null, null, 15, 7]);

    assert.deepEqual(averageOfLevels(root), [3, 14.5, 11]);
  });

  it("averages values across each level in a complete prefix tree", () => {
    const root = buildTree([3, 9, 20, 15, 7]);

    assert.deepEqual(averageOfLevels(root), [3, 14.5, 11]);
  });

  it("returns the root value as the only average for a single-node tree", () => {
    const root = buildTree([1]);

    assert.deepEqual(averageOfLevels(root), [1]);
  });
});
