# Segment Trees and Dynamic Segment Trees

A segment tree recursively divides a coordinate range and stores a summary for each covered
segment. It supports repeated range updates and queries without touching every individual
coordinate.

## How to recognize a segment tree

Look for:

- many online range updates and range queries;
- answers needed after each update rather than after one offline batch;
- operations such as range sum, minimum, maximum, or covered count;
- coordinates too numerous to scan repeatedly;
- an associative summary that can be combined from two child ranges.

For one static batch of intervals, sorting and merging is usually simpler. Segment trees earn
their complexity when operations are repeated and interleaved.

## Tree structure

The root represents the entire coordinate domain. Each internal node splits its range at the
middle:

- left child: `[start, middle]`;
- right child: `[middle + 1, end]`.

Each node stores a summary for its range. After updating children, the parent recomputes its
summary by combining them.

## Range-update cases

For a node range and an update range, exactly three relationships matter:

1. **No overlap:** return without changing the node.
2. **Complete coverage:** update the whole node without descending.
3. **Partial overlap:** recurse into the intersecting children, then recompute the parent.

Keeping these cases explicit prevents most boundary bugs.

## Dynamic allocation

A normal segment tree allocates nodes for the whole known domain. A dynamic segment tree
creates children only when an update reaches them. This is valuable for enormous coordinate
ranges such as `1..1_000_000_000` with relatively few operations.

A node known to be fully covered can prune future recursion below it. Its children may even be
discarded when their details are no longer needed.

## Complexity

Tree height is `O(log M)` for coordinate-domain size `M`. The add-only coverage
implementation below supports O(log M) interval additions and O(1) total-count
queries. Other summaries and update semantics need their own complexity argument.
Dynamic space grows only for visited branches.

## Common mistakes

- Mixing inclusive and half-open range conventions.
- Forgetting the no-overlap case.
- Descending even when a node is already fully covered.
- Failing to recompute the parent after child updates.
- Allocating the entire huge coordinate domain eagerly.
- Choosing a segment tree when offline sorting would solve the problem more simply.

## Worked example: covered integer count

On domain `[1, 10]`, add closed interval `[2, 5]`: integers 2, 3, 4, 5 give
count 4. Add `[4, 8]`: the union is `[2, 8]`, giving count 7, not 9. Add
`[3, 4]`: the count remains 7. Coverage is idempotent; adding already covered
positions does not count them twice.

The root splits into `[1, 5]` and `[6, 10]`. An update covering a whole node
sets its count to `right - left + 1`. Partial overlap updates children and sums
their counts. The `full` flag records that every integer in the segment is
covered, so future additions can stop immediately there.

A domain up to a billion needs only about 30 splitting levels. It does not need
an array with a billion entries. Dynamic allocation follows touched branches.

## Choose the simplest structure that matches the operations

| Operation mix                                          | Candidate                |
| ------------------------------------------------------ | ------------------------ |
| One batch, final merged coverage only                  | Sort and merge intervals |
| Static array, many sum queries                         | Prefix sums              |
| Point updates and prefix sums                          | Fenwick tree             |
| Interleaved range operations with combinable summaries | Segment tree             |
| Huge domain, online sparse interval additions          | Dynamic segment tree     |

"Online" means each operation must be answered before future operations are
known. If all coordinates are known in advance, coordinate compression may make
an array-based structure practical. Segment trees are a family of structures;
the exact update semantics determine the summary and lazy state.

## Boundaries of this implementation

`CoveredIntegerCounter` supports **add-only integer coverage** and a whole-domain
count. It is not a generic range-sum tree and does not support removing coverage.
Discarding a full node's children is safe precisely because coverage never needs
to be undone. An inverted added interval is treated as empty; updates outside
the domain are ignored and partially outside updates are clipped by overlap.

Use finite safe integer endpoints and a domain length representable exactly as
a JavaScript number. The constructor rejects reversed domain bounds, but these
learning templates do not perform complete numeric validation. Fractional
endpoints violate the splitting contract.

For this implementation, an interval addition takes O(log M) time: at each
depth, only the two boundary branches can remain partially intersected, while
fully covered interior segments stop immediately. Whole-domain count is O(1).
After q additions, allocated space is bounded by O(1 + q log M) and by the size
of the full domain tree; pruning can reduce live nodes. Other update/query
semantics need their own complexity argument.

## Example

- [`./covered-integer-counter.ts`](./covered-integer-counter.ts)

## Related solved problem

- [Count Integers in Intervals](../../../../problems/leetcode/2276-count-integers-in-intervals/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/segment-trees/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
