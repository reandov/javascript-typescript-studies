// Time complexity: O(V + E), where V is numCourses and E is the number of prerequisites
// Space complexity: O(V + E)
export function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  // graph[course] lists the courses that depend on it.
  const graph: number[][] = Array.from({ length: numCourses }, () => []);

  // Indegree counts each course's remaining prerequisites (incoming edges).
  const indegree = Array.from({ length: numCourses }, () => 0);

  // Add directed edges: prerequisite -> course.
  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    indegree[course] += 1;
  }

  const queue: number[] = [];
  let head = 0;

  // Start with courses that have no prerequisites.
  for (let course = 0; course < numCourses; course++) {
    if (indegree[course] === 0) {
      queue.push(course);
    }
  }

  // Order array used to track the order in which the nodes are processed
  const order = [];

  // Process ready courses, including those added as prerequisites are satisfied.
  while (head < queue.length) {
    const course = queue[head++];
    order.push(course);

    // Completing this course satisfies one prerequisite for each dependent.
    for (const nextCourse of graph[course]) {
      indegree[nextCourse] -= 1;

      // No remaining prerequisites: this course is now ready.
      if (indegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // If the length of the order is different from the number of courses, return []
  if (order.length !== numCourses) return [];

  // Otherwhise return the ordered array
  return order;
}
