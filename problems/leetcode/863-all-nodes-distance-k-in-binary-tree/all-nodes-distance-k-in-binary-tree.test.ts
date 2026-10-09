import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { distanceK } from "./all-nodes-distance-k-in-binary-tree";

describe("distanceK", () => {
  it("returns nodes at the requested distance both below and above the target", () => {
    const root = buildTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
    assert.ok(root?.left);

    assert.deepEqual(
      distanceK(root, root.left, 2).sort((a, b) => a - b),
      [1, 4, 7],
    );
  });

  it("returns no nodes when a single-node tree has no node at that distance", () => {
    const root = buildTree([1]);
    assert.ok(root);

    assert.deepEqual(distanceK(root, root, 3), []);
  });

  it("returns the target itself when the distance is zero", () => {
    const root = buildTree([3, 5, 1]);
    assert.ok(root?.left);

    assert.deepEqual(distanceK(root, root.left, 0), [5]);
  });

  it("returns children when the target is the root", () => {
    const root = buildTree([0, 1, 500]);
    assert.ok(root);

    assert.deepEqual(
      distanceK(root, root, 1).sort((a, b) => a - b),
      [1, 500],
    );
  });

  it("includes the parent of a leaf target at distance one", () => {
    const root = buildTree([3, 5, 1]);
    assert.ok(root?.left);

    assert.deepEqual(distanceK(root, root.left, 1), [3]);
  });

  it("finds a node across an ancestor in a different subtree", () => {
    const root = buildTree([3, 5, 1, 6]);
    assert.ok(root?.left?.left);

    assert.deepEqual(distanceK(root, root.left.left, 3), [1]);
  });

  it("returns no nodes for the maximum distance in a small tree", () => {
    const root = buildTree([0, null, 500]);
    assert.ok(root?.right);

    assert.deepEqual(distanceK(root, root.right, 1000), []);
  });
});
