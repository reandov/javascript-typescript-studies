import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { jobScheduling } from "./maximum-profit-in-job-scheduling";

describe("jobScheduling", () => {
  it("combines compatible jobs that touch at a boundary", () => {
    assert.equal(jobScheduling([1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70]), 120);
  });

  it("chooses the most profitable compatible subset", () => {
    assert.equal(jobScheduling([1, 2, 3, 4, 6], [3, 5, 10, 6, 9], [20, 20, 100, 70, 60]), 150);
  });

  it("chooses one job when all jobs overlap from the same start", () => {
    assert.equal(jobScheduling([1, 1, 1], [2, 3, 4], [5, 6, 4]), 6);
  });

  it("handles the minimum single-job input", () => {
    assert.equal(jobScheduling([1], [2], [5]), 5);
  });
});
