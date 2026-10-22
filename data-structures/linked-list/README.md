# Linked-list nodes

[`DLLNode`](./dll-node.ts) stores a numeric `key` and `value`, with nullable
`prev` and `next` links for a doubly linked list. It is shared by
[LRU Cache](../../problems/leetcode/146-lru-cache/lru-cache.ts).

Construct a detached node with `new DLLNode(key, value)`. Both links initially
equal `null`. The owning list connects nodes and maintains these invariants:

- Adjacent nodes have reciprocal links: `node.next.prev === node` and
  `node.prev.next === node` whenever those neighbors exist.
- The first node has no predecessor; the last has no successor.
- An empty list has no first or last node.

Construction and individual field reads or writes take O(1) time. Each node uses
O(1) space. The node itself does not manage a list or enforce its invariants.
