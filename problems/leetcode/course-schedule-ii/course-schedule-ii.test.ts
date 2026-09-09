import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { findOrder } from "./course-schedule-ii";

function assertValidOrder(numCourses: number, prerequisites: number[][], order: number[]): void {
  assert.equal(order.length, numCourses);
  assert.equal(new Set(order).size, numCourses);

  const positionByCourse = new Map<number, number>();
  order.forEach((course, index) => {
    assert.ok(course >= 0 && course < numCourses);
    positionByCourse.set(course, index);
  });

  for (const [course, prerequisite] of prerequisites) {
    assert.ok(
      (positionByCourse.get(prerequisite) ?? Infinity) < (positionByCourse.get(course) ?? -1),
    );
  }
}

describe("findOrder", () => {
  it("orders a course after its prerequisite", () => {
    assert.deepEqual(findOrder(2, [[1, 0]]), [0, 1]);
  });

  it("returns a valid order when multiple orders are possible", () => {
    const prerequisites = [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
    ];

    assertValidOrder(4, prerequisites, findOrder(4, prerequisites));
  });

  it("returns the only course when there are no prerequisites", () => {
    assert.deepEqual(findOrder(1, []), [0]);
  });

  it("returns an empty order when prerequisites form a cycle", () => {
    assert.deepEqual(
      findOrder(2, [
        [1, 0],
        [0, 1],
      ]),
      [],
    );
  });
});
