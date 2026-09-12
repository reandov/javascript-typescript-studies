import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { treeToArray } from "../../../data-structures/tree/tree-to-array/tree-to-array";
import { invertTree } from "./invert-binary-tree";

describe("invertTree", () => {
  it("swaps every left and right subtree", () => {
    const root = buildTree([4, 2, 7, 1, 3, 6, 9]);

    assert.deepEqual(treeToArray(invertTree(root)), [4, 7, 2, 9, 6, 3, 1]);
  });

  it("preserves missing children in their mirrored positions", () => {
    const root = buildTree([2, 1, 3, null, 4]);

    assert.deepEqual(treeToArray(invertTree(root)), [2, 3, 1, null, null, 4]);
  });

  it("moves a lone left child to the right", () => {
    assert.deepEqual(treeToArray(invertTree(buildTree([1, 2]))), [1, null, 2]);
  });

  it("returns a single-node tree unchanged", () => {
    assert.deepEqual(treeToArray(invertTree(buildTree([1]))), [1]);
  });

  it("returns null for an empty tree", () => {
    assert.equal(invertTree(buildTree([])), null);
  });
});
