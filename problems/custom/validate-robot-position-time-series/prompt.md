# Validate Robot Position Time Series

## Problem Statement

You are given a time series representing the positions of robots on a
one-dimensional grid.

Each timestamp is represented by a binary array:

- `1` means the position is occupied by a robot.
- `0` means the position is empty.

Each row in `states` represents the grid at one timestamp.

Between two consecutive timestamps, each robot may:

- Stay at its current position.
- Move one position to the left.
- Move one position to the right.

A robot cannot move more than one position between consecutive timestamps.

Robots are indistinguishable. Determine whether there exists a valid assignment
between robot positions at every pair of consecutive timestamps.

## Function Signature

```ts
function isValidRobotTimeSeries(states: number[][], robotCount: number): boolean;
```

## Parameters

- `states[t][i]` represents position `i` at timestamp `t`.
- `states[t][i]` should be either `0` or `1`.
- `robotCount` is the expected number of robots at every timestamp.

## Return Value

Return `true` when:

1. Every timestamp contains exactly `robotCount` robots.
2. Every robot can be assigned a position at the next timestamp that is at most
   one index away from its current position.
3. The movement is valid across the entire time series.

Return `false` otherwise.

## Examples

### Example 1

```text
Input:
states = [
  [1, 0, 0, 1],
  [0, 1, 1, 0]
]
robotCount = 2

Output: true
```

The robot positions are `[0, 3]` at timestamp `0` and `[1, 2]` at timestamp
`1`. One possible assignment is `0 -> 1` and `3 -> 2`.

### Example 2

```text
Input:
states = [
  [1, 0, 0, 1],
  [1, 0, 1, 0],
  [0, 1, 0, 1]
]
robotCount = 2

Output: true
```

The robots can follow the paths `0 -> 0 -> 1` and `3 -> 2 -> 3`.

### Example 3

```text
Input:
states = [
  [1, 0, 0, 1],
  [1, 0, 1, 0],
  [0, 1, 0, 0]
]
robotCount = 2

Output: false
```

The final timestamp contains only one robot.

### Example 4

```text
Input:
states = [
  [1, 0, 0, 1, 0],
  [0, 0, 1, 0, 1]
]
robotCount = 2

Output: false
```

There is no assignment where the robot starting at position `0` reaches a next
position within distance `1`.

### Example 5

```text
Input:
states = [
  [0, 1, 0],
  [0, 1, 0],
  [1, 0, 0],
  [0, 1, 0]
]
robotCount = 1

Output: true
```

The robot follows the path `1 -> 1 -> 0 -> 1`.

### Example 6

```text
Input:
states = [
  [1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 1, 0, 1],
  [1, 0, 0, 1, 0]
]
robotCount = 2

Output: false
```

The transition from timestamp `2` to timestamp `3` is invalid.

### Example 7

```text
Input:
states = [
  [1, 1, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0]
]
robotCount = 2

Output: true
```

Both robots can move one position to the right at each timestamp.

### Example 8

```text
Input:
states = [
  [1, 0, 1, 0]
]
robotCount = 2

Output: true
```

There is only one timestamp, so there are no movements to validate.

### Example 9

```text
Input:
states = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
robotCount = 0

Output: true
```

Every timestamp contains zero robots.

## Constraints

```text
1 <= states.length <= 1000
1 <= states[t].length <= 1000
states[t][i] is either 0 or 1
0 <= robotCount <= states[t].length
```

Additional guarantees:

- Every row in `states` has the same length.
- Positions do not wrap around.
- A robot at position `0` cannot move left.
- A robot at the final position cannot move right.
- No position can contain more than one robot at a timestamp.

## Edge Cases And Notes

- A single timestamp is valid when it contains exactly `robotCount` robots.
- `robotCount` may be `0`; every timestamp must then contain no robots.
- Robots are indistinguishable, so any valid one-to-one assignment between
  consecutive timestamps is acceptable.

## Follow-Up

Suppose the timestamps are not equally spaced.

You are additionally given an array `timestamps`, where `timestamps[t]` is the
time associated with `states[t]`.

A robot can move at most one position per unit of elapsed time:

```ts
function isValidRobotTimeSeries(
  states: number[][],
  timestamps: number[],
  robotCount: number,
): boolean;
```

For two consecutive timestamps, the maximum allowed movement is
`timestamps[t] - timestamps[t - 1]`.

For example:

```text
Input:
states = [
  [1, 0, 0, 0],
  [0, 0, 1, 0]
]
timestamps = [10, 12]
robotCount = 1

Output: true
```

The robot moves from position `0` to position `2`, which is valid because two
units of time elapsed.
