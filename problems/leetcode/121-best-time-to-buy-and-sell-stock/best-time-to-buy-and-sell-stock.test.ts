import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { maxProfit } from "./best-time-to-buy-and-sell-stock";

describe("maxProfit", () => {
  it("returns the largest profit from buying before selling", () => {
    assert.equal(maxProfit([7, 1, 5, 3, 6, 4]), 5);
  });

  it("returns zero when prices only decrease", () => {
    assert.equal(maxProfit([7, 6, 4, 3, 1]), 0);
  });

  it("returns zero for the minimum single-day input", () => {
    assert.equal(maxProfit([1]), 0);
  });
});
