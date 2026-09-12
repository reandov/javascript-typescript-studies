import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { levelOrder } from "./binary-tree-level-order-traversal";

describe("levelOrder", () => {
  it("groups values by depth from left to right", () => {
    const root = buildTree([3, 9, 20, null, null, 15, 7]);

    assert.deepEqual(levelOrder(root), [[3], [9, 20], [15, 7]]);
  });

  it("returns the root value as the only level for a single-node tree", () => {
    const root = buildTree([1]);

    assert.deepEqual(levelOrder(root), [[1]]);
  });

  it("returns an empty traversal for an empty tree", () => {
    assert.deepEqual(levelOrder(buildTree([])), []);
  });
});
