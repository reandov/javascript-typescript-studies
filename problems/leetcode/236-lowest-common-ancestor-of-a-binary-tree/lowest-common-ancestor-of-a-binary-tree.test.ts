import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { lowestCommonAncestor } from "./lowest-common-ancestor-of-a-binary-tree";

describe("lowestCommonAncestor", () => {
  it("returns the root for targets in opposite root subtrees", () => {
    const root = buildTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
    assert.ok(root?.left && root.right);

    assert.equal(lowestCommonAncestor(root, root.left, root.right), root);
  });

  it("returns a target that is an ancestor of the other target", () => {
    const root = buildTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
    assert.ok(root?.left?.right?.right);

    assert.equal(lowestCommonAncestor(root, root.left, root.left.right.right), root.left);
  });

  it("returns the root for a root and child in a two-node tree", () => {
    const root = buildTree([1, 2]);
    assert.ok(root?.left);

    assert.equal(lowestCommonAncestor(root, root, root.left), root);
  });

  it("returns the shared parent for sibling targets below the root", () => {
    const root = buildTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
    assert.ok(root?.left?.right?.left && root.left.right.right);
    const parent = root.left.right;

    assert.equal(lowestCommonAncestor(root, parent.left, parent.right), parent);
  });

  it("handles reversed target order in a skewed tree with negative values", () => {
    const root = buildTree([0, null, -1, null, -2]);
    assert.ok(root?.right?.right);

    assert.equal(lowestCommonAncestor(root, root.right.right, root.right), root.right);
  });

  it("supports target values at both constraint boundaries", () => {
    const root = buildTree([0, -1_000_000_000, 1_000_000_000]);
    assert.ok(root?.left && root.right);

    assert.equal(lowestCommonAncestor(root, root.left, root.right), root);
  });

  it("passes up an ancestor below an intermediate node", () => {
    const root = buildTree([10, 3, 20, 5, 1, null, null, 6, 2, 0, 8, null, null, 7, 4]);
    assert.ok(root?.left?.left?.left && root.left.left.right?.right);
    const ancestor = root.left.left;

    assert.equal(
      lowestCommonAncestor(root, ancestor.left, ancestor.right?.right ?? null),
      ancestor,
    );
  });

  it("returns an ancestor found entirely in the right subtree", () => {
    const root = buildTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
    assert.ok(root?.right?.left && root.right.right);

    assert.equal(lowestCommonAncestor(root, root.right.left, root.right.right), root.right);
  });
});
