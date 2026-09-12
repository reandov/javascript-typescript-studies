import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { numBusesToDestination } from "./bus-routes";

describe("numBusesToDestination", () => {
  it("returns the minimum buses needed to reach the destination", () => {
    assert.equal(
      numBusesToDestination(
        [
          [1, 2, 7],
          [3, 6, 7],
        ],
        1,
        6,
      ),
      2,
    );
  });

  it("returns negative one when no bus sequence can reach the target", () => {
    assert.equal(
      numBusesToDestination([[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]], 15, 12),
      -1,
    );
  });

  it("requires no buses when already at the destination", () => {
    assert.equal(numBusesToDestination([[1]], 1, 1), 0);
  });
});
