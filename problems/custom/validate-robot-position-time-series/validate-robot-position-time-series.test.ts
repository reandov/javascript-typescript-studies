import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isValidRobotTimeSeries } from "./validate-robot-position-time-series";

describe("isValidRobotTimeSeries", () => {
  const testCases = [
    {
      name: "assigns two robots moving toward each other",
      states: [
        [1, 0, 0, 1],
        [0, 1, 1, 0],
      ],
      robotCount: 2,
      expected: true,
    },
    {
      name: "validates movement across multiple timestamps",
      states: [
        [1, 0, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
      ],
      robotCount: 2,
      expected: true,
    },
    {
      name: "rejects a timestamp with too few robots",
      states: [
        [1, 0, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 0],
      ],
      robotCount: 2,
      expected: false,
    },
    {
      name: "rejects when no assignment keeps every move within one position",
      states: [
        [1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1],
      ],
      robotCount: 2,
      expected: false,
    },
    {
      name: "allows a single robot to stay still and move one position",
      states: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 0, 0],
        [0, 1, 0],
      ],
      robotCount: 1,
      expected: true,
    },
    {
      name: "rejects a later invalid transition",
      states: [
        [1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 0, 1, 0],
      ],
      robotCount: 2,
      expected: false,
    },
    {
      name: "allows adjacent robots to shift right together",
      states: [
        [1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0],
      ],
      robotCount: 2,
      expected: true,
    },
    {
      name: "accepts a single valid timestamp",
      states: [[1, 0, 1, 0]],
      robotCount: 2,
      expected: true,
    },
    {
      name: "accepts zero robots at every timestamp",
      states: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      robotCount: 0,
      expected: true,
    },
    {
      name: "rejects when a timestamp does not match the expected robot count",
      states: [
        [1, 0, 0],
        [0, 1, 0],
      ],
      robotCount: 2,
      expected: false,
    },
  ];

  for (const { name, states, robotCount, expected } of testCases) {
    it(name, () => {
      assert.equal(isValidRobotTimeSeries(states, robotCount), expected);
    });
  }
});
