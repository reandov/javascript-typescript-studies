// Time complexity: O(n), where n is the total number of stops across all routes
// Space complexity: O(n)
export function numBusesToDestination(routes: number[][], source: number, target: number): number {
  // Already at the destination, so no bus is needed.
  if (source === target) return 0;

  // Map each stop to the indices of all bus routes that visit it.
  const stopToRoutes = new Map<number, number[]>();

  // Use route indices to distinguish buses from stop numbers.
  for (let route = 0; route < routes.length; route++) {
    // Register this route at every stop it visits.
    for (const stop of routes[route]) {
      // Reuse the stop's list, or create one for its first route.
      const buses = stopToRoutes.get(stop) ?? [];

      // This bus can be boarded at this stop.
      buses.push(route);

      // Store the list so shared stops connect multiple routes.
      stopToRoutes.set(stop, buses);
    }
  }

  // Discover each stop only once, when it is first reached with the fewest buses.
  const visitedStops = new Set<number>([source]);
  // Scan each route only once: boarding it makes all its stops reachable.
  const visitedRoutes = new Set<number>();

  // Start at source before boarding any bus.
  let currentStops = [source];
  // Each BFS level represents boarding one more bus.
  let buses = 0;

  while (currentStops.length > 0) {
    // Board the next bus from each stop in the current frontier.
    buses++;

    // Keep newly reached stops separate so transfers wait until the next level.
    const nextStops: number[] = [];

    // These stops were reached using buses - 1 buses.
    for (const stop of currentStops) {
      // Look up buses serving this stop without searching every route again.
      // A missing map entry means no bus is available here.
      for (const route of stopToRoutes.get(stop) ?? []) {
        // Boarding an explored route elsewhere cannot improve its reachable stops.
        if (visitedRoutes.has(route)) continue;
        visitedRoutes.add(route);

        // Stay on this bus to reach any stop on its repeating route.
        for (const nextStop of routes[route]) {
          // BFS explores bus counts in order, so the first arrival is optimal.
          if (nextStop === target) return buses;
          // Previously discovered stops cannot offer a shorter path now.
          if (visitedStops.has(nextStop)) continue;

          // Mark before adding to prevent duplicates from overlapping routes.
          visitedStops.add(nextStop);
          // Save this stop as a possible transfer point for the next bus.
          nextStops.push(nextStop);
        }
      }
    }

    // Explore transfers from the newly reached stops in the next BFS level.
    currentStops = nextStops;
  }

  // Every reachable stop and route was explored without finding the target.
  return -1;
}
