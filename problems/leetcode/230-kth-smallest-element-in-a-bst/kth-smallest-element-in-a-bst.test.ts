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

  it("returns every rank in a balanced tree, including zero and the largest value", () => {
    const root = buildTree([3, 1, 5, 0, 2, 4, 6]);

    for (let k = 1; k <= 7; k++) {
      assert.equal(kthSmallest(root, k), k - 1);
    }
  });

  it("returns every rank in left- and right-skewed trees", () => {
    const roots = [buildTree([3, 2, null, 1]), buildTree([1, null, 2, null, 3])];

    for (const root of roots) {
      for (let k = 1; k <= 3; k++) {
        assert.equal(kthSmallest(root, k), k);
      }
    }
  });
});
