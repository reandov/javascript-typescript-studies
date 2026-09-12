import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { isSymmetric } from "./symmetric-tree";

describe("isSymmetric", () => {
  it("returns true for a mirrored tree", () => {
    const root = buildTree([1, 2, 2, 3, 4, 4, 3]);

    assert.equal(isSymmetric(root), true);
  });

  it("returns false when mirrored positions have different values", () => {
    const root = buildTree([1, 2, 2, null, 3, null, 4]);

    assert.equal(isSymmetric(root), false);
  });

  it("returns false when mirrored structure is missing", () => {
    const root = buildTree([1, 2, 2, null, 3]);

    assert.equal(isSymmetric(root), false);
  });

  it("returns true for a single-node tree", () => {
    const root = buildTree([1]);

    assert.equal(isSymmetric(root), true);
  });

  it("returns true for an empty tree", () => {
    assert.equal(isSymmetric(buildTree([])), true);
  });
});
