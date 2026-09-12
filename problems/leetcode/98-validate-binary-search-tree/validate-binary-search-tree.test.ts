import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { isValidBST } from "./validate-binary-search-tree";

describe("isValidBST", () => {
  it("returns true for a tree whose children satisfy the root ordering", () => {
    const root = buildTree([2, 1, 3]);

    assert.equal(isValidBST(root), true);
  });

  it("returns false when a right subtree value is less than the root", () => {
    const root = buildTree([5, 1, 4, null, null, 3, 6]);

    assert.equal(isValidBST(root), false);
  });

  it("returns true for a single-node tree", () => {
    const root = buildTree([1]);

    assert.equal(isValidBST(root), true);
  });
});
