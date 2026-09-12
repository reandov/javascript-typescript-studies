// Time complexity: O(n + t), where t is trust.length
// Space complexity: O(n)
export function findJudge(n: number, trust: number[][]): number {
  const indegree = Array.from({ length: n + 1 }, () => 0);
  const outdegree = Array.from({ length: n + 1 }, () => 0);

  for (const person of trust) {
    outdegree[person[0]]++;
    indegree[person[1]]++;
  }

  for (let index = 1; index <= n; index++) {
    if (indegree[index] === n - 1 && outdegree[index] === 0) return index;
  }

  return -1;
}
