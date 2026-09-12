import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { kthSmallest } from "./kth-smallest-element-in-a-bst";

describe("kthSmallest", () => {
  it("returns the smallest value when k is 1", () => {
    const root = buildTree([3, 1, 4, null, 2]);

    assert.equal(kthSmallest(root, 1), 1);
  });

  it("returns the third smallest value from a deeper tree", () => {
    const root = buildTree([5, 3, 6, 2, 4, null, null, 1]);

    assert.equal(kthSmallest(root, 3), 3);
  });

  it("returns the root value for a single-node tree", () => {
    const root = buildTree([1]);

    assert.equal(kthSmallest(root, 1), 1);
  });
});
