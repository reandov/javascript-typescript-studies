import assert from "node:assert/strict";
import test from "node:test";

import { mapLimit } from "./map-limit";

test("maps values and preserves their input order", async () => {
  const results = await mapLimit([1, 2, 3], 2, async (value) => {
    await new Promise((resolve) => setTimeout(resolve, (4 - value) * 5));
    return value * 2;
  });

  assert.deepEqual(results, [2, 4, 6]);
});

test("never exceeds the requested concurrency", async () => {
  let activeTasks = 0;
  let maximumActiveTasks = 0;

  await mapLimit([1, 2, 3, 4, 5], 2, async () => {
    activeTasks += 1;
    maximumActiveTasks = Math.max(maximumActiveTasks, activeTasks);
    await new Promise((resolve) => setTimeout(resolve, 5));
    activeTasks -= 1;
  });

  assert.equal(maximumActiveTasks, 2);
});

test("handles empty input", async () => {
  const results = await mapLimit([], 3, (value) => value);

  assert.deepEqual(results, []);
});

test("rejects invalid limits", async () => {
  await assert.rejects(() => mapLimit([1], 0, (value) => value), RangeError);
  await assert.rejects(() => mapLimit([1], 1.5, (value) => value), RangeError);
});
