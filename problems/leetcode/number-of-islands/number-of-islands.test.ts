import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { numIslands } from "./number-of-islands";

describe("numIslands", () => {
  it("counts one connected island", () => {
    assert.equal(
      numIslands([
        ["1", "1", "1", "1", "0"],
        ["1", "1", "0", "1", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "0", "0", "0"],
      ]),
      1,
    );
  });

  it("counts separated islands", () => {
    assert.equal(
      numIslands([
        ["1", "1", "0", "0", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "1", "0", "0"],
        ["0", "0", "0", "1", "1"],
      ]),
      3,
    );
  });

  it("returns zero for a minimum water-only grid", () => {
    assert.equal(numIslands([["0"]]), 0);
  });

  it("returns one for a minimum land-only grid", () => {
    assert.equal(numIslands([["1"]]), 1);
  });
});
