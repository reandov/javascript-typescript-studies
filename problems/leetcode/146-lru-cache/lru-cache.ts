import { DLLNode } from "../../../data-structures/linked-list/dll-node";

// Time complexity: O(1) on average for get and put; O(1) for construction
// Space complexity: O(capacity) for the map and linked-list nodes
export class LRUCache {
  private capacity: number;
  // Look up the exact list node by key without scanning the list.
  private cache = new Map<number, DLLNode>();

  // Order nodes from least recently used at head to most recently used at tail.
  // Both endpoints are null when the cache is empty.
  private head: DLLNode | null = null;
  private tail: DLLNode | null = null;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  // Detach a node already in the list; the caller manages its map entry.
  private removeNode(node: DLLNode): void {
    // Link the predecessor past this node, or advance head if it was first.
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    // Link the successor back, or retreat tail if this node was last.
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    // Clear stale links before the node is moved or discarded.
    node.prev = null;
    node.next = null;
  }

  // Attach a detached node as the most recently used entry.
  private appendNode(node: DLLNode): void {
    node.prev = this.tail;
    node.next = null;

    // An empty list needs both head and tail to point to its first node.
    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }

    this.tail = node;
  }

  // Accessing an entry refreshes its position without creating another node.
  private moveToTail(node: DLLNode): void {
    if (this.tail === node) return;

    this.removeNode(node);
    this.appendNode(node);
  }

  get(key: number): number {
    const node = this.cache.get(key);

    // A miss leaves the recency order unchanged.
    if (!node) return -1;

    // A successful read makes this entry the most recently used.
    this.moveToTail(node);

    return node.value;
  }

  put(key: number, value: number): void {
    const existingNode = this.cache.get(key);

    // Updating a key also counts as using it and consumes no extra capacity.
    if (existingNode) {
      existingNode.value = value;
      this.moveToTail(existingNode);
      return;
    }

    // Make room for a new key by removing the least recently used entry.
    if (this.cache.size >= this.capacity) {
      // Positive capacity and a full cache guarantee that head exists here.
      const lru = this.head!;

      // Remove the same entry from both representations to keep them in sync.
      this.removeNode(lru);
      this.cache.delete(lru.key);
    }

    const newNode = new DLLNode(key, value);

    // New entries start at the most recently used end and become searchable by key.
    this.appendNode(newNode);
    this.cache.set(key, newNode);
  }
}
