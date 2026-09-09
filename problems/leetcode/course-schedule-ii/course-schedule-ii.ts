/**
 * Course Schedule II
 *
 * Returns an ordering of courses that satisfies all prerequisites, or an empty
 * array when no valid ordering exists.
 *
 * Builds a directed graph from each prerequisite to the courses it unlocks,
 * then uses Kahn's topological sort. Courses with no remaining prerequisites
 * are processed first, reducing the indegree of dependent courses until either
 * every course is scheduled or a cycle prevents progress.
 *
 * Time complexity: O(V + E), where V is numCourses and E is the number of
 * prerequisites.
 * Space complexity: O(V + E).
 */
export function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  const indegree = Array.from({ length: numCourses }, () => 0);

  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    indegree[course] += 1;
  }

  const queue: number[] = [];
  let head = 0;

  for (let course = 0; course < numCourses; course++) {
    if (indegree[course] === 0) {
      queue.push(course);
    }
  }

  const order = [];

  while (head < queue.length) {
    const course = queue[head++];
    order.push(course);

    for (const nextCourse of graph[course]) {
      indegree[nextCourse] -= 1;

      if (indegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  if (order.length !== numCourses) return [];

  return order;
}
