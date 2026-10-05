import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildGraph, GraphNode } from "./build-graph";
import { graphToAdjacencyList } from "./graph-to-adjacency-list";

describe("graphToAdjacencyList", () => {
  it("converts a connected cyclic graph to an adjacency list", () => {
    const adjacencyList = [
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ];

    assert.deepEqual(graphToAdjacencyList(buildGraph(adjacencyList)), adjacencyList);
  });

  it("converts a single node with no neighbors", () => {
    assert.deepEqual(graphToAdjacencyList(buildGraph([[]])), [[]]);
  });

  it("returns an empty adjacency list for a null root", () => {
    assert.deepEqual(graphToAdjacencyList(null), []);
  });

  it("rejects non-consecutive node values", () => {
    const first = new GraphNode(1);
    const third = new GraphNode(3);
    first.neighbors = [third];
    third.neighbors = [first];

    assert.throws(() => graphToAdjacencyList(first), RangeError);
  });

  it("rejects distinct nodes with the same value", () => {
    const first = new GraphNode(1);
    const duplicate = new GraphNode(1);
    first.neighbors = [duplicate];

    assert.throws(() => graphToAdjacencyList(first), /more than one node/);
  });
});
