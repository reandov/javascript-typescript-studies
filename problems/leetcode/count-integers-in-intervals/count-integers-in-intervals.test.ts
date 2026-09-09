import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { CountIntervals } from "./count-integers-in-intervals";

describe("CountIntervals", () => {
  it("counts integers covered after adding separated and overlapping intervals", () => {
    const countIntervals = new CountIntervals();

    countIntervals.add(2, 3);
    countIntervals.add(7, 10);

    assert.equal(countIntervals.count(), 6);

    countIntervals.add(5, 8);

    assert.equal(countIntervals.count(), 8);
  });

  it("counts zero integers before any interval is added", () => {
    const countIntervals = new CountIntervals();

    assert.equal(countIntervals.count(), 0);
  });

  it("does not double count duplicate coverage", () => {
    const countIntervals = new CountIntervals();

    countIntervals.add(1, 5);
    countIntervals.add(2, 4);
    countIntervals.add(5, 7);

    assert.equal(countIntervals.count(), 7);
  });

  it("handles the full endpoint range", () => {
    const countIntervals = new CountIntervals();

    countIntervals.add(1, 1_000_000_000);

    assert.equal(countIntervals.count(), 1_000_000_000);
  });
});
