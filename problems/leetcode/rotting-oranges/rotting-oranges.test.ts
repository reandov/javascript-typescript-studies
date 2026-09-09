import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { orangesRotting } from "./rotting-oranges";

describe("orangesRotting", () => {
  it("returns the minutes needed to rot all reachable fresh oranges", () => {
    assert.equal(
      orangesRotting([
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 1],
      ]),
      4,
    );
  });

  it("returns negative one when a fresh orange can never rot", () => {
    assert.equal(
      orangesRotting([
        [2, 1, 1],
        [0, 1, 1],
        [1, 0, 1],
      ]),
      -1,
    );
  });

  it("returns zero when there are no fresh oranges initially", () => {
    assert.equal(orangesRotting([[0, 2]]), 0);
  });

  it("returns zero for a minimum empty-cell grid", () => {
    assert.equal(orangesRotting([[0]]), 0);
  });

  it("returns negative one for a minimum fresh-orange grid", () => {
    assert.equal(orangesRotting([[1]]), -1);
  });
});
