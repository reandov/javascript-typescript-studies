import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { isSameTree } from "./same-tree";

describe("isSameTree", () => {
  it("returns true for trees with identical structure and values", () => {
    const first = buildTree([1, 2, 3]);
    const second = buildTree([1, 2, 3]);

    assert.equal(isSameTree(first, second), true);
  });

  it("returns false when corresponding values differ", () => {
    const first = buildTree([1, 2, 1]);
    const second = buildTree([1, 1, 2]);

    assert.equal(isSameTree(first, second), false);
  });

  it("returns false when the tree structures differ", () => {
    const first = buildTree([1, 2]);
    const second = buildTree([1, null, 2]);

    assert.equal(isSameTree(first, second), false);
  });

  it("returns true when both trees are empty", () => {
    assert.equal(isSameTree(buildTree([]), buildTree([])), true);
  });

  it("returns false when only one tree is empty", () => {
    assert.equal(isSameTree(buildTree([1]), buildTree([])), false);
  });
});
