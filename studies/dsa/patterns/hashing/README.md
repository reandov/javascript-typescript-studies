# Hashing, Sets, Maps, and Frequency Counting

Hash-based structures trade additional memory for fast lookup. A `Set` answers whether a key
exists; a `Map` associates each key with information such as an index, count, or group.

## How to recognize hashing

Look for questions like:

- Have I seen this value before?
- Does the matching or complementary value exist?
- How many times does each value occur?
- Which inputs share the same defining property?
- Can repeated lookup replace a nested loop?

The central invariant is that the table accurately summarizes the portion of the input already
processed.

## Choosing the structure

### Set

Use a `Set` when membership is the only required fact. Typical uses include duplicate
detection, visited state, intersections, and finding the start of a sequence.

### Map to an index or value

Use a `Map` when finding a key must also recover something about it. A complement lookup often
maps values to their earlier indexes.

### Frequency map

Use `Map<value, count>` when duplicates matter. Frequency maps model multisets and support
anagram checks, resource consumption, and top-frequency questions.

### Canonical signature

Transform equivalent objects into the same stable key, then group by that key. Sorted letters
form one possible signature for anagrams; a vector of character counts is another.

## Complexity

JavaScript `Map` and `Set` operations are expected `O(1)`. A full pass is therefore usually
expected `O(n)` time with `O(k)` space for `k` distinct keys. Signature construction may add
sorting or copying costs.

## Common mistakes

- Using a `Set` when multiplicity matters.
- Looking up after inserting when an element must not match itself.
- Treating `map.get(key)` as a truth test when zero is a valid stored value.
- Leaving zero-count keys in a frequency map and then relying on `map.size`.
- Creating a signature that groups inputs that are not actually equivalent.
- Assuming object keys compare structurally; objects are keyed by identity.

## Worked example: remember the missing partner

For `[3, 2, 8]` and target `10`, ask what earlier value would complete each pair:

| Current index/value | Needed value | Earlier map before checking | Result                |
| ------------------- | ------------ | --------------------------- | --------------------- |
| 0 / 3               | 7            | empty                       | Store 3 → 0           |
| 1 / 2               | 8            | 3 → 0                       | Store 2 → 1           |
| 2 / 8               | 2            | 3 → 0, 2 → 1                | Return indexes [1, 2] |

Checking before insertion ensures the partner is an earlier, distinct element.
For `[5]` and target `10`, the answer is absent; for `[5, 5]`, it is `[0, 1]`.

## More examples and recognition checks

- `aab` and `abb` contain the same distinct letters but different counts. A set
  loses the information needed to distinguish them; use frequencies.
- `eat`, `tea`, and `ate` all sort to `aet`; `tan` sorts to `ant`. The signature
  decides which group receives each word.
- If the pair input is already sorted and only values are requested, compare
  [two pointers](../two-pointers/README.md) before allocating a map.

A useful recognition sentence is: **I am repeating a search for a fact that I
could remember under a key.** State what the value stores: membership, an index,
a count, or a group. These answer different questions.

The character-count lesson assumes simple BMP/ASCII characters. The examples
are not Unicode normalization or grapheme-cluster utilities. JavaScript string
length and indexing use UTF-16 code units, while `for...of` iterates code points.

Try predicting: first repeated value in `[4, 2, 4, 2]` is `4`; in `[]` it is
`null`. It means first repetition encountered, not the smallest duplicated value.

## Study order

1. [`01-membership-and-complements.ts`](./01-membership-and-complements.ts)
2. [`02-frequency-counters.ts`](./02-frequency-counters.ts)
3. [`03-group-by-signature.ts`](./03-group-by-signature.ts)

## Related solved problems

- [Two Sum](../../../../problems/leetcode/1-two-sum/)
- [Group Anagrams](../../../../problems/leetcode/49-group-anagrams/)
- [Longest Consecutive Sequence](../../../../problems/leetcode/128-longest-consecutive-sequence/)
- [Contains Duplicate](../../../../problems/leetcode/217-contains-duplicate/)
- [Valid Anagram](../../../../problems/leetcode/242-valid-anagram/)
- [Top K Frequent Elements](../../../../problems/leetcode/347-top-k-frequent-elements/)
- [Intersection of Two Arrays II](../../../../problems/leetcode/350-intersection-of-two-arrays-ii/)
- [Ransom Note](../../../../problems/leetcode/383-ransom-note/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/hashing/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
