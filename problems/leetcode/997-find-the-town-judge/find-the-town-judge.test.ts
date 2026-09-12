import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { findJudge } from "./find-the-town-judge";

describe("findJudge", () => {
  it("returns the person trusted by the only other person", () => {
    assert.equal(findJudge(2, [[1, 2]]), 2);
  });

  it("returns the person trusted by everyone else", () => {
    assert.equal(
      findJudge(3, [
        [1, 3],
        [2, 3],
      ]),
      3,
    );
  });

  it("returns negative one when the trusted person trusts someone else", () => {
    assert.equal(
      findJudge(3, [
        [1, 3],
        [2, 3],
        [3, 1],
      ]),
      -1,
    );
  });

  it("returns the only person when the town has one person", () => {
    assert.equal(findJudge(1, []), 1);
  });

  it("returns negative one when nobody is trusted by everyone else", () => {
    assert.equal(findJudge(2, []), -1);
  });
});
