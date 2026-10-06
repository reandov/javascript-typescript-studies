// Time complexity: O(V + E), where V is numCourses and E is prerequisites.length
// Space complexity: O(V + E)
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
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

  // Process ready courses, including those added as prerequisites are satisfied.
  while (head < queue.length) {
    const course = queue[head++];

    // Completing this course satisfies one prerequisite for each dependent.
    for (const nextCourse of graph[course]) {
      indegree[nextCourse] -= 1;

      // No remaining prerequisites: this course is now ready.
      if (indegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // head counts processed courses; any unprocessed courses are blocked by a cycle.
  return head === numCourses;
}
