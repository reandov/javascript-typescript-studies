import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { inorderTraversal } from "./binary-tree-inorder-traversal";

describe("inorderTraversal", () => {
  it("traverses the left subtree before the root and right subtree", () => {
    const root = buildTree([1, null, 2, 3]);

    assert.deepEqual(inorderTraversal(root), [1, 3, 2]);
  });

  it("traverses a tree with children on both sides", () => {
    const root = buildTree([1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]);

    assert.deepEqual(inorderTraversal(root), [4, 2, 6, 5, 7, 1, 3, 9, 8]);
  });

  it("preserves duplicate node values", () => {
    const root = buildTree([1, 2, 2, 3, null, 3]);

    assert.deepEqual(inorderTraversal(root), [3, 2, 1, 3, 2]);
  });

  it("returns the root value for a single-node tree", () => {
    assert.deepEqual(inorderTraversal(buildTree([1])), [1]);
  });

  it("returns an empty array for an empty tree", () => {
    assert.deepEqual(inorderTraversal(buildTree([])), []);
  });
});
