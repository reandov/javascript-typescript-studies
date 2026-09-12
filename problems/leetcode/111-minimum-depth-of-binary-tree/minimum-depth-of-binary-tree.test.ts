import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { minDepth } from "./minimum-depth-of-binary-tree";

describe("minDepth", () => {
  it("returns the nearest leaf depth when one subtree is shallow", () => {
    const root = buildTree([3, 9, 20, null, null, 15, 7]);

    assert.equal(minDepth(root), 2);
  });

  it("counts the full length of a single-child chain", () => {
    const root = buildTree([2, null, 3, null, 4, null, 5, null, 6]);

    assert.equal(minDepth(root), 5);
  });

  it("returns zero for an empty tree", () => {
    assert.equal(minDepth(buildTree([])), 0);
  });

  it("returns one for a single-node tree", () => {
    assert.equal(minDepth(buildTree([1])), 1);
  });
});
