import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { getMinimumDifference } from "./minimum-absolute-difference-in-bst";

describe("getMinimumDifference", () => {
  it("finds the minimum difference in a balanced bst", () => {
    const root = buildTree([4, 2, 6, 1, 3]);

    assert.equal(getMinimumDifference(root), 1);
  });

  it("finds the minimum difference across a sparse bst", () => {
    const root = buildTree([1, 0, 48, null, null, 12, 49]);

    assert.equal(getMinimumDifference(root), 1);
  });

  it("handles the minimum two-node bst", () => {
    const root = buildTree([1, 0]);

    assert.equal(getMinimumDifference(root), 1);
  });
});
