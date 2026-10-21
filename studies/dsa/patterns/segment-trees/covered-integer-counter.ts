/**
 * DYNAMIC SEGMENT TREE
 *
 * Recognition signals: many online range updates/queries, coordinates are too large for an
 * array, and intervals cannot be processed once offline. Each node summarizes a coordinate
 * range; children are created only for portions that are touched.
 */

class SegmentNode {
  // The summary counts covered integers in the segment represented by this node.
  covered = 0;
  // Full coverage makes every later addition within this segment redundant.
  full = false;
  left: SegmentNode | null = null;
  right: SegmentNode | null = null;
}

export class CoveredIntegerCounter {
  readonly #root = new SegmentNode();
  readonly minimum: number;
  readonly maximum: number;

  constructor(minimum: number, maximum: number) {
    if (minimum > maximum) {
      throw new RangeError("minimum must not exceed maximum");
    }

    this.minimum = minimum;
    this.maximum = maximum;
  }

  add(queryLeft: number, queryRight: number): void {
    // Begin with the whole domain; recursive calls supply each child's interval.
    this.#add(this.#root, this.minimum, this.maximum, queryLeft, queryRight);
  }

  count(): number {
    return this.#root.covered;
  }

  #add(
    node: SegmentNode,
    left: number,
    right: number,
    queryLeft: number,
    queryRight: number,
  ): void {
    // Stop for already covered segments or updates that do not intersect this range.
    if (node.full || queryRight < left || right < queryLeft) {
      return;
    }

    // The update covers this entire segment, so no child traversal is needed.
    if (queryLeft <= left && right <= queryRight) {
      // Both integer endpoints are included in the segment length.
      node.covered = right - left + 1;
      node.full = true;
      // Add-only coverage never needs the finer details of a fully covered segment.
      node.left = null;
      node.right = null;
      return;
    }

    // Split into disjoint integer ranges [left, middle] and [middle + 1, right].
    const middle = left + Math.floor((right - left) / 2);

    if (queryLeft <= middle) {
      // Allocate a branch only when an update actually reaches it.
      node.left ??= new SegmentNode();
      this.#add(node.left, left, middle, queryLeft, queryRight);
    }

    if (queryRight > middle) {
      node.right ??= new SegmentNode();
      this.#add(node.right, middle + 1, right, queryLeft, queryRight);
    }

    // Recombine disjoint child summaries; an absent branch has no covered integers.
    node.covered = (node.left?.covered ?? 0) + (node.right?.covered ?? 0);
    node.full = node.covered === right - left + 1;
  }
}
