import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTreeBfs } from "./build-tree-bfs";

describe("buildTreeBfs", () => {
  it("builds a complete tree from level-order values", () => {
    const root = buildTreeBfs([1, 2, 3]);

    assert.equal(root?.val, 1);
    assert.equal(root?.left?.val, 2);
    assert.equal(root?.right?.val, 3);
  });

  it("uses null values as missing-child placeholders", () => {
    const root = buildTreeBfs([1, null, 2, 3]);

    assert.equal(root?.left, null);
    assert.equal(root?.right?.val, 2);
    assert.equal(root?.right?.left?.val, 3);
  });

  it("preserves duplicate and negative values", () => {
    const root = buildTreeBfs([-1, 2, 2]);

    assert.equal(root?.val, -1);
    assert.equal(root?.left?.val, 2);
    assert.equal(root?.right?.val, 2);
  });

  it("returns null for an empty array", () => {
    assert.equal(buildTreeBfs([]), null);
  });

  it("returns null when the root value is null", () => {
    assert.equal(buildTreeBfs([null]), null);
  });
  it("leaves an omitted right child empty", () => {
    const root = buildTreeBfs([1, 2]);

    assert.equal(root?.left?.val, 2);
    assert.equal(root?.right, null);
  });
});
