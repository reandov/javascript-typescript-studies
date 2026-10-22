/**
 * A key-value node in a doubly linked list.
 * New nodes are detached: prev and next are null until the list connects them.
 * The owning list maintains reciprocal links between neighboring nodes.
 * Construction takes O(1) time and O(1) space per node.
 */
export class DLLNode {
  // The key lets a cache remove the corresponding map entry when evicting a node.
  key: number;
  value: number;

  // Links allow removal from the middle without searching for the predecessor.
  prev: DLLNode | null = null;
  next: DLLNode | null = null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}
