# Two Pointers

The two-pointer pattern coordinates two positions moving through one or more sequences. It
often replaces nested search with a linear scan when ordering or an in-place invariant tells
us which pointer can move safely.

## How to recognize two pointers

Look for:

- a sorted array or string;
- comparisons between opposite ends;
- merging two sorted inputs;
- removing or compacting values in place;
- checking pairs without enumerating every pair;
- a requirement for `O(1)` auxiliary space.

“Two pointers” describes pointer movement, not one fixed algorithm. The proof comes from the
invariant that justifies each movement.

## Important forms

### Opposite ends

One pointer starts at each end of sorted data. If a pair sum is too small, moving the left
pointer is the only movement that can increase it; if too large, move the right pointer.

This reasoning depends on ordering. The same movement is not valid on arbitrary unsorted data.

### Read and write pointers

The read pointer inspects every element. The write pointer marks where the next kept value
belongs. A useful invariant is:

> The prefix before `write` contains exactly the accepted values seen before `read`.

### Merging sorted streams

Keep one pointer per input. Repeatedly take the smaller current value, then append whatever
remains after one input is exhausted.

### Processing from the back

When an array has free space at its end, merging backward prevents unread values from being
overwritten.

## Complexity

Each pointer usually moves only forward or only backward, so the total work is `O(n)` or
`O(n + m)`. In-place variants commonly use `O(1)` auxiliary space.

## Common mistakes

- Moving a pointer without proving that skipped candidates cannot be answers.
- Using opposite-end logic on unsorted input.
- Returning the entire mutated array instead of the meaningful prefix length.
- Forgetting to process the remainder of one input during a merge.
- Overwriting unread data when merging forward into the same array.
- Using `left <= right` when the problem requires two distinct elements.

## Worked example: why an endpoint can be discarded

For sorted `[1, 2, 4, 7, 11]`, target `9`:

| Left value | Right value | Sum | Safe movement     |
| ---------- | ----------- | --- | ----------------- |
| 1          | 11          | 12  | Move right inward |
| 1          | 7           | 8   | Move left inward  |
| 2          | 7           | 9   | Found [2, 7]      |

When `1 + 11` is too large, every other remaining value paired with `11` is at
least `1 + 11`. No answer can use that right endpoint. When `1 + 7` is too small,
every remaining partner for `1` is at most `7`, so no answer can use `1`.

The ordering proves that an entire group of pairs can be skipped. On unsorted
`[4, 1, 3, 2]`, target `7`, the same movements miss `[4, 3]`: the first sum is
`4 + 2 = 6`, so moving left wrongly discards `4`.

## Worked example: a compacted prefix

Remove `3` from `[3, 2, 2, 3, 4]`:

| Value read | Action     | Kept prefix |
| ---------- | ---------- | ----------- |
| 3          | Skip       | []          |
| 2          | Write at 0 | [2]         |
| 2          | Write at 1 | [2, 2]      |
| 3          | Skip       | [2, 2]      |
| 4          | Write at 2 | [2, 2, 4]   |

The return value is length `3`. Positions after that prefix are unspecified;
the array itself is not shortened. `write` never passes `read`, so unread data
is safe. The merge lesson instead returns a new array: `[1, 4]` and `[2, 3]`
produce `[1, 2, 3, 4]`, using O(n + m) output space.

Recognize the variant by its job: **eliminate endpoint candidates, write a kept
prefix, or consume sorted streams**. A sliding window also uses two boundaries,
but maintains a contiguous range summary between them.

## Study order

1. [`01-opposite-ends.ts`](./01-opposite-ends.ts)
2. [`02-read-and-write.ts`](./02-read-and-write.ts)
3. [`03-merge-sorted-streams.ts`](./03-merge-sorted-streams.ts)

## Related solved problems

- [Remove Duplicates from Sorted Array](../../../../problems/leetcode/26-remove-duplicates-from-sorted-array/)
- [Remove Element](../../../../problems/leetcode/27-remove-element/)
- [Merge Sorted Array](../../../../problems/leetcode/88-merge-sorted-array/)
- [Valid Palindrome](../../../../problems/leetcode/125-valid-palindrome/)
- [Summary Ranges](../../../../problems/leetcode/228-summary-ranges/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/two-pointers/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
