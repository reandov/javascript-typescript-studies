import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { search } from "./binary-search";

describe("search", () => {
  it("returns the index when the target exists", () => {
    assert.equal(search([-1, 0, 3, 5, 9, 12], 9), 4);
  });

  it("returns negative one when the target is missing", () => {
    assert.equal(search([-1, 0, 3, 5, 9, 12], 2), -1);
  });

  it("finds the only element in a single-item array", () => {
    assert.equal(search([5], 5), 0);
  });

  it("returns negative one for a missing target in a single-item array", () => {
    assert.equal(search([5], -5), -1);
  });
});
