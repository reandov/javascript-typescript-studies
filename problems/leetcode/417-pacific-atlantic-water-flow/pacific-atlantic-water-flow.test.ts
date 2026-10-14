import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { pacificAtlantic } from "./pacific-atlantic-water-flow";

describe("pacificAtlantic", () => {
  it("returns the cells that can reach both oceans in varied terrain", () => {
    assert.deepEqual(
      pacificAtlantic([
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4],
      ]),
      [
        [0, 4],
        [1, 3],
        [1, 4],
        [2, 2],
        [3, 0],
        [3, 1],
        [4, 0],
      ],
    );
  });

  it("returns the only cell in a one-cell island", () => {
    assert.deepEqual(pacificAtlantic([[1]]), [[0, 0]]);
  });

  it("returns a single cell at the minimum allowed height", () => {
    assert.deepEqual(pacificAtlantic([[0]]), [[0, 0]]);
  });

  it("returns every cell of a single row", () => {
    assert.deepEqual(pacificAtlantic([[0, 100000, 0]]), [
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  it("returns every cell of a single column", () => {
    assert.deepEqual(pacificAtlantic([[0], [100000], [0]]), [
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  it("allows water to flow between cells of equal height", () => {
    assert.deepEqual(
      pacificAtlantic([
        [0, 0],
        [0, 0],
      ]),
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ],
    );
  });

  it("excludes a low center surrounded by higher cells", () => {
    assert.deepEqual(
      pacificAtlantic([
        [2, 2, 2],
        [2, 0, 2],
        [2, 2, 2],
      ]),
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
      ],
    );
  });
});
