import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { hasPathSum } from "./path-sum";

describe("hasPathSum", () => {
  it("returns true when a root-to-leaf path equals the target", () => {
    const root = buildTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]);

    assert.equal(hasPathSum(root, 22), true);
  });

  it("returns false when no root-to-leaf path equals the target", () => {
    assert.equal(hasPathSum(buildTree([1, 2, 3]), 5), false);
  });

  it("does not accept a sum that ends at a non-leaf node", () => {
    assert.equal(hasPathSum(buildTree([1, 2]), 1), false);
  });

  it("handles a single-node tree", () => {
    assert.equal(hasPathSum(buildTree([1]), 1), true);
  });

  it("handles negative node values", () => {
    assert.equal(hasPathSum(buildTree([-2, null, -3]), -5), true);
  });

  it("returns false for an empty tree", () => {
    assert.equal(hasPathSum(buildTree([]), 0), false);
  });
});
