import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "./build-tree";

describe("buildTree", () => {
  it("builds a complete tree from level-order values", () => {
    const root = buildTree([1, 2, 3]);

    assert.equal(root?.val, 1);
    assert.equal(root?.left?.val, 2);
    assert.equal(root?.right?.val, 3);
  });

  it("uses null values as missing-child placeholders", () => {
    const root = buildTree([1, null, 2, 3]);

    assert.equal(root?.left, null);
    assert.equal(root?.right?.val, 2);
    assert.equal(root?.right?.left?.val, 3);
  });

  it("preserves duplicate and negative values", () => {
    const root = buildTree([-1, 2, 2]);

    assert.equal(root?.val, -1);
    assert.equal(root?.left?.val, 2);
    assert.equal(root?.right?.val, 2);
  });

  it("returns null for an empty array", () => {
    assert.equal(buildTree([]), null);
  });

  it("returns null when the root value is null", () => {
    assert.equal(buildTree([null]), null);
  });
});
