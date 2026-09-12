import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { maxDepth } from "./maximum-depth-of-binary-tree";

describe("maxDepth", () => {
  it("returns the longest root-to-leaf path in a balanced tree", () => {
    const root = buildTree([3, 9, 20, null, null, 15, 7]);

    assert.equal(maxDepth(root), 3);
  });

  it("handles a tree with only right children", () => {
    assert.equal(maxDepth(buildTree([1, null, 2, null, 3])), 3);
  });

  it("uses the deeper subtree", () => {
    const root = buildTree([1, 2, 3, 4, null, null, 5, 6]);

    assert.equal(maxDepth(root), 4);
  });

  it("returns one for a single-node tree", () => {
    assert.equal(maxDepth(buildTree([1])), 1);
  });

  it("returns zero for an empty tree", () => {
    assert.equal(maxDepth(buildTree([])), 0);
  });
});
