# 383. Ransom Note

Source: [LeetCode — Ransom Note](https://leetcode.com/problems/ransom-note/)

## Problem

You receive two strings: `ransomNote`, the text you want to write, and `magazine`,
the letters available to you. Return `true` when the magazine supplies enough
copies of every letter needed by the note. Return `false` if any letter is missing
or there are too few copies of it.

A letter occurrence can be used once. You may rearrange the available letters and
leave some unused; the note does not need to appear as a substring of the magazine.

## Examples

### Example 1

```text
Input: ransomNote = "a", magazine = "b"
Output: false
```

The magazine has no `a` to supply the note.

### Example 2

```text
Input: ransomNote = "aa", magazine = "ab"
Output: false
```

The note needs two copies of `a`, but the magazine supplies one.

### Example 3

```text
Input: ransomNote = "aa", magazine = "aab"
Output: true
```

Both required copies of `a` are available. The extra `b` can remain unused.

## Constraints

- Each string contains between `1` and `10^5` characters, inclusive.
- Both strings use only the English letters `a` through `z`.

## Edge cases

- A longer note cannot be built from a shorter magazine.
- Repeated letters require enough separate occurrences in the magazine.
- Extra letters and their order in the magazine do not affect whether the note
  can be built.
- Empty strings are outside LeetCode's stated constraints; the local tests also
  exercise them as additional behavior.
