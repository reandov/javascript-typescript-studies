import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { canFinish } from "./course-schedule";

describe("canFinish", () => {
  it("allows a course to follow its prerequisite", () => {
    assert.equal(canFinish(2, [[1, 0]]), true);
  });

  it("rejects courses that require each other first", () => {
    assert.equal(
      canFinish(2, [
        [1, 0],
        [0, 1],
      ]),
      false,
    );
  });

  it("allows a single course without prerequisites", () => {
    assert.equal(canFinish(1, []), true);
  });

  it("allows multiple courses without prerequisites", () => {
    assert.equal(canFinish(2000, []), true);
  });

  it("rejects a course that requires itself first", () => {
    assert.equal(canFinish(1, [[0, 0]]), false);
  });

  it("allows courses with shared prerequisites", () => {
    assert.equal(
      canFinish(4, [
        [1, 0],
        [2, 0],
        [3, 1],
        [3, 2],
      ]),
      true,
    );
  });

  it("rejects an impossible group even when other courses can be completed", () => {
    assert.equal(
      canFinish(5, [
        [1, 0],
        [2, 3],
        [3, 4],
        [4, 2],
      ]),
      false,
    );
  });
});
