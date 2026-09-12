import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildTree } from "../../../data-structures/tree/array-to-tree/build-tree";
import { rob } from "./house-robber-iii";

describe("rob", () => {
  it("chooses grandchildren when robbing the root blocks its children", () => {
    assert.equal(rob(buildTree([3, 2, 3, null, 3, null, 1])), 7);
  });

  it("chooses both children when they beat the root and grandchildren", () => {
    assert.equal(rob(buildTree([3, 4, 5, 1, 3, null, 1])), 9);
  });

  it("handles the minimum single-house tree", () => {
    assert.equal(rob(buildTree([5])), 5);
  });
});
