import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { ladderLength } from "./word-ladder";

describe("ladderLength", () => {
  it("returns the shortest transformation length", () => {
    assert.equal(ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]), 5);
  });

  it("returns zero when the end word is not available", () => {
    assert.equal(ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log"]), 0);
  });

  it("handles the minimum one-step dictionary", () => {
    assert.equal(ladderLength("a", "c", ["c"]), 2);
  });
});
