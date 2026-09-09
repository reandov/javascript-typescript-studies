/**
 * Bus Routes
 *
 * Returns the fewest buses needed to travel from source to target, or -1 when
 * the destination cannot be reached by bus.
 *
 * Builds an index from each stop to the routes that visit it, then runs
 * breadth-first search by reachable stops. Each BFS layer represents taking one
 * additional bus; visited routes prevent expanding the same bus line more than
 * once, and visited stops prevent cycling through already reachable stops.
 *
 * Time complexity: O(n), where n is the total number of stops across all routes.
 * Space complexity: O(n).
 */
export function numBusesToDestination(routes: number[][], source: number, target: number): number {
  if (source === target) return 0;

  function buildStopToRoutes(routes: number[][]): Map<number, number[]> {
    const stopToRoutes = new Map<number, number[]>();

    for (let routeIndex = 0; routeIndex < routes.length; routeIndex++) {
      for (const stop of routes[routeIndex]) {
        const connectedRoutes = stopToRoutes.get(stop) ?? [];
        connectedRoutes.push(routeIndex);

        stopToRoutes.set(stop, connectedRoutes);
      }
    }

    return stopToRoutes;
  }

  let numberOfBuses = 0;

  const stopToRoutes = buildStopToRoutes(routes);

  const visitedStops = new Set<number>([source]);
  const visitedRoutes = new Set<number>([]);

  const queue = [source];
  let head = 0;

  while (head < queue.length) {
    numberOfBuses++;

    const levelSize = queue.length - head;

    for (let i = 0; i < levelSize; i++) {
      const stop = queue[head++];

      for (const route of stopToRoutes.get(stop)?.values() ?? []) {
        if (!visitedRoutes.has(route)) {
          visitedRoutes.add(route);

          for (const newStop of routes[route]) {
            if (newStop === target) return numberOfBuses;

            if (!visitedStops.has(newStop)) {
              queue.push(newStop);
              visitedStops.add(newStop);
            }
          }
        }
      }
    }
  }

  return -1;
}
