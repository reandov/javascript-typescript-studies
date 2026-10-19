// Time complexity: O(n), where n is the total number of stops across all routes
// Space complexity: O(n)
export function numBusesToDestination(routes: number[][], source: number, target: number): number {
  // Already at the destination, so no bus is needed.
  if (source === target) return 0;

  // Map each stop to the indices of all bus routes that visit it.
  function buildStopToRoutes(routes: number[][]): Map<number, number[]> {
    const stopToRoutes = new Map<number, number[]>();

    // Use route indices to distinguish buses from stop numbers.
    for (let routeIndex = 0; routeIndex < routes.length; routeIndex++) {
      // Register this route at every stop it visits.
      for (const stop of routes[routeIndex]) {
        // Reuse the stop's list, or create one for its first route.
        const connectedRoutes = stopToRoutes.get(stop) ?? [];

        // This bus can be boarded at this stop.
        connectedRoutes.push(routeIndex);

        // Store the list so shared stops connect multiple routes.
        stopToRoutes.set(stop, connectedRoutes);
      }
    }

    return stopToRoutes;
  }

  // Each BFS level represents boarding one more bus.
  let numberOfBuses = 0;

  // Find buses available at a stop without searching every route again.
  const stopToRoutes = buildStopToRoutes(routes);

  // Enqueue each stop only once, when it is first reached with the fewest buses.
  const visitedStops = new Set<number>([source]);
  // Scan each route only once: boarding it makes all its stops reachable.
  const visitedRoutes = new Set<number>([]);

  // Start at source before boarding any bus. Advance head instead of shifting the array.
  const queue = [source];
  let head = 0;

  while (head < queue.length) {
    // Board the next bus from each stop in the current frontier.
    numberOfBuses++;

    // Freeze this level's size so newly queued stops wait until the next level.
    const levelSize = queue.length - head;

    for (let i = 0; i < levelSize; i++) {
      // Consume a stop reached using numberOfBuses - 1 buses.
      const stop = queue[head++];

      // Try every bus serving this stop; a missing map entry means none are available.
      for (const route of stopToRoutes.get(stop)?.values() ?? []) {
        if (!visitedRoutes.has(route)) {
          // Boarding this route elsewhere later cannot improve its reachable stops.
          visitedRoutes.add(route);

          // Stay on this bus to reach any stop on its repeating route.
          for (const newStop of routes[route]) {
            // BFS explores bus counts in order, so the first arrival is optimal.
            if (newStop === target) return numberOfBuses;

            if (!visitedStops.has(newStop)) {
              // Save this stop as a possible transfer point for the next bus.
              queue.push(newStop);
              // Mark on enqueue to prevent duplicate entries from overlapping routes.
              visitedStops.add(newStop);
            }
          }
        }
      }
    }
  }

  // Every reachable stop and route was explored without finding the target.
  return -1;
}
