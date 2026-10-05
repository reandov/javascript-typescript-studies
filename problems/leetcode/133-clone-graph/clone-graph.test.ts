import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildGraph, GraphNode } from "../../../data-structures/graph/adjacency-list/build-graph";
import { graphToAdjacencyList } from "../../../data-structures/graph/adjacency-list/graph-to-adjacency-list";
import { cloneGraph } from "./clone-graph";

function collectNodes(node: GraphNode | null): Set<GraphNode> {
  const nodes = new Set<GraphNode>();
  if (node === null) return nodes;

  const queue = [node];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined || nodes.has(current)) continue;

    nodes.add(current);
    queue.push(...current.neighbors);
  }

  return nodes;
}

describe("cloneGraph", () => {
  it("deeply clones a connected graph with cycles", () => {
    const adjacencyList = [
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ];
    const original = buildGraph(adjacencyList);

    const clone = cloneGraph(original);

    assert.deepEqual(graphToAdjacencyList(clone), adjacencyList);
    assert.notEqual(clone, original);

    const originalNodes = collectNodes(original);
    for (const clonedNode of collectNodes(clone)) {
      assert.equal(originalNodes.has(clonedNode), false);
    }
  });

  it("clones a single node with no neighbors", () => {
    const original = buildGraph([[]]);

    const clone = cloneGraph(original);

    assert.deepEqual(graphToAdjacencyList(clone), [[]]);
    assert.notEqual(clone, original);
  });

  it("returns null for an empty graph", () => {
    assert.equal(cloneGraph(null), null);
  });
});
