import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { postorderTraversal } from "./binary-tree-postorder-traversal";

describe("postorderTraversal", () => {
  it("traverses the left and right subtrees before the root", () => {
    const root = buildTree([1, null, 2, 3]);

    assert.deepEqual(postorderTraversal(root), [3, 2, 1]);
  });

  it("traverses a tree with children on both sides", () => {
    const root = buildTree([1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]);

    assert.deepEqual(postorderTraversal(root), [4, 6, 7, 5, 2, 9, 8, 3, 1]);
  });

  it("preserves duplicate node values", () => {
    const root = buildTree([1, 2, 2, 3, null, 3]);

    assert.deepEqual(postorderTraversal(root), [3, 2, 3, 2, 1]);
  });

  it("returns the root value for a single-node tree", () => {
    assert.deepEqual(postorderTraversal(buildTree([1])), [1]);
  });

  it("returns an empty array for an empty tree", () => {
    assert.deepEqual(postorderTraversal(buildTree([])), []);
  });
});
