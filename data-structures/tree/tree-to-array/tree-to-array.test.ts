import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../array-to-tree/build-tree";
import { treeToArray } from "./tree-to-array";

describe("treeToArray", () => {
  it("converts a complete tree to level-order values", () => {
    assert.deepEqual(treeToArray(buildTree([1, 2, 3, 4, 5])), [1, 2, 3, 4, 5]);
  });

  it("preserves null placeholders inside a sparse tree", () => {
    assert.deepEqual(treeToArray(buildTree([1, null, 2, 3])), [1, null, 2, 3]);
  });

  it("removes trailing null placeholders", () => {
    assert.deepEqual(treeToArray(buildTree([1, 2])), [1, 2]);
  });

  it("returns an empty array for an empty tree", () => {
    assert.deepEqual(treeToArray(null), []);
  });
});
