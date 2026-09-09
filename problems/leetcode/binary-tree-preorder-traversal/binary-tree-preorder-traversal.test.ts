import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { preorderTraversal } from "./binary-tree-preorder-traversal";

describe("preorderTraversal", () => {
  it("traverses the root before the left and right subtrees", () => {
    const root = buildTree([1, null, 2, 3]);

    assert.deepEqual(preorderTraversal(root), [1, 2, 3]);
  });

  it("traverses a tree with children on both sides", () => {
    const root = buildTree([1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]);

    assert.deepEqual(preorderTraversal(root), [1, 2, 4, 5, 6, 7, 3, 8, 9]);
  });

  it("preserves duplicate node values", () => {
    const root = buildTree([1, 2, 2, 3, null, 3]);

    assert.deepEqual(preorderTraversal(root), [1, 2, 3, 2, 3]);
  });

  it("returns the root value for a single-node tree", () => {
    assert.deepEqual(preorderTraversal(buildTree([1])), [1]);
  });

  it("returns an empty array for an empty tree", () => {
    assert.deepEqual(preorderTraversal(buildTree([])), []);
  });
});
