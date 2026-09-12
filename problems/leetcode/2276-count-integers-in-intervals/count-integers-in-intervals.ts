class SegmentNode {
  coveredCount = 0;
  fullyCovered = false;
  left: SegmentNode | null = null;
  right: SegmentNode | null = null;
}

// Time complexity: O(log M) per add in sparse cases; O(1) per count; M is the maximum endpoint
// Space complexity: O(q log M), where q is the number of add calls
export class CountIntervals {
  readonly #root = new SegmentNode();

  constructor() {}

  add(left: number, right: number): void {
    this.#addRange(this.#root, 1, 1_000_000_000, left, right);
  }

  count(): number {
    return this.#root.coveredCount;
  }

  #addRange(node: SegmentNode, start: number, end: number, left: number, right: number): void {
    if (node.fullyCovered || right < start || end < left) {
      return;
    }

    if (left <= start && end <= right) {
      node.coveredCount = end - start + 1;
      node.fullyCovered = true;
      node.left = null;
      node.right = null;
      return;
    }

    const middle = Math.floor((start + end) / 2);

    if (left <= middle) {
      node.left ??= new SegmentNode();
      this.#addRange(node.left, start, middle, left, right);
    }

    if (middle < right) {
      node.right ??= new SegmentNode();
      this.#addRange(node.right, middle + 1, end, left, right);
    }

    node.coveredCount = (node.left?.coveredCount ?? 0) + (node.right?.coveredCount ?? 0);
    node.fullyCovered = node.coveredCount === end - start + 1;

    if (node.fullyCovered) {
      node.left = null;
      node.right = null;
    }
  }
}
