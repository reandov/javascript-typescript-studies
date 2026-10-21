/**
 * DFS, BACKTRACKING, AND MEMOIZATION
 *
 * DFS signals: explore an entire branch, inspect a component, or follow recursive structure.
 * Backtracking signals: enumerate choices and undo each choice before trying the next.
 * Memoization signal: multiple paths reach the same state, causing repeated subtrees of work.
 */

export function depthFirstOrder(graph: readonly (readonly number[])[], start: number): number[] {
  const order: number[] = [];
  const visited = new Set<number>();

  function dfs(node: number): void {
    // A graph node already explored needs no second traversal, even through a cycle.
    if (visited.has(node)) {
      return;
    }

    visited.add(node);
    // Record on entry, then finish this branch before returning to its siblings.
    order.push(node);

    for (const neighbor of graph[node]) {
      dfs(neighbor);
    }
  }

  dfs(start);
  return order;
}

export function allBinaryStrings(length: number): string[] {
  const answers: string[] = [];
  const choice: string[] = [];

  function backtrack(): void {
    // A full sequence is one answer; joining also separates it from the mutable path.
    if (choice.length === length) {
      answers.push(choice.join(""));
      return;
    }

    for (const bit of ["0", "1"]) {
      choice.push(bit); // choose
      backtrack(); // explore
      choice.pop(); // unchoose
    }
  }

  backtrack();
  return answers;
}

export function fibonacci(index: number, memo = new Map<number, number>()): number {
  // The first two Fibonacci values are complete base answers, not recursive work.
  if (index < 2) {
    return index;
  }

  const cached = memo.get(index);

  // Reuse the index's answer instead of rebuilding overlapping recursive branches.
  if (cached !== undefined) {
    return cached;
  }

  const result = fibonacci(index - 1, memo) + fibonacci(index - 2, memo);

  // Cache only after both smaller answers have been combined.
  memo.set(index, result);

  return result;
}
