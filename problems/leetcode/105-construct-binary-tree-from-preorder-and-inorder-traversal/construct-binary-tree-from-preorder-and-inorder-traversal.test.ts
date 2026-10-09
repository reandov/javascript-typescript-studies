import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { treeToArray } from "../../../data-structures/tree/tree-to-array/tree-to-array";
import { buildTree } from "./construct-binary-tree-from-preorder-and-inorder-traversal";

describe("buildTree", () => {
  it("constructs a tree with children in both subtrees", () => {
    assert.deepEqual(treeToArray(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])), [
      3,
      9,
      20,
      null,
      null,
      15,
      7,
    ]);
  });

  it("constructs a single negative-valued node", () => {
    assert.deepEqual(treeToArray(buildTree([-1], [-1])), [-1]);
  });

  it("constructs a single zero-valued node", () => {
    assert.deepEqual(treeToArray(buildTree([0], [0])), [0]);
  });

  it("constructs a tree with only left children", () => {
    assert.deepEqual(treeToArray(buildTree([3, 2, 1], [1, 2, 3])), [3, 2, null, 1]);
  });

  it("constructs a tree with only right children", () => {
    assert.deepEqual(treeToArray(buildTree([1, 2, 3], [1, 2, 3])), [1, null, 2, null, 3]);
  });

  it("supports node values at both constraint boundaries", () => {
    assert.deepEqual(treeToArray(buildTree([0, -3000, 3000], [-3000, 0, 3000])), [0, -3000, 3000]);
  });
});
