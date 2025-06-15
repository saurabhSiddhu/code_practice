class Solution {
  solve(input) {
    const [routes, source, target] = input;

    // Base case: already at target
    if (source === target) return 0;
    if (routes.length === 0) return -1;

    // Convert to Sets for O(1) intersection operations
    const routeSets = routes.map((route) => new Set(route));

    // Build bidirectional route-to-route graph optimally
    const graph = Array(routeSets.length)
      .fill(null)
      .map(() => []);
    for (let i = 0; i < routeSets.length; i++) {
      for (let j = i + 1; j < routeSets.length; j++) {
        if (routeSets[i].intersection(routeSets[j]).size > 0) {
          graph[i].push(j);
          graph[j].push(i); // Bidirectional connection
        }
      }
    }

    // Find all routes that contain source
    const queue = [];
    for (let i = 0; i < routeSets.length; i++) {
      if (routeSets[i].has(source)) {
        queue.push(i);
      }
    }

    let buses = 0;
    const visited = new Set(); // Use Set for O(1) lookup

    while (queue.length > 0) {
      buses++;
      const levelLength = queue.length;

      for (let i = 0; i < levelLength; i++) {
        const routeNumber = queue.shift();

        // Skip if already visited
        if (visited.has(routeNumber)) continue;
        visited.add(routeNumber);

        // Check if target is reachable from this route
        if (routeSets[routeNumber].has(target)) {
          return buses;
        }

        // Add all connected routes that haven't been visited
        for (const nextRoute of graph[routeNumber]) {
          if (!visited.has(nextRoute)) {
            queue.push(nextRoute);
          }
        }
      }
    }
    return -1;
  }
  solveAlternative(input) {
    const [routes, source, target] = input;

    // Base case: already at target
    if (source === target) return 0;
    if (routes.length === 0) return -1;
    const stopRoutes = new Map();
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i];
      for (let j = 0; j < route.length; j++) {
        let stop = route[j];
        if (!stopRoutes.has(stop)) {
          stopRoutes.set(stop, []);
        }
        stopRoutes.get(stop).push(i);
      }
    }
    if (!stopRoutes.has(source) || !stopRoutes.has(target)) {
      return -1;
    }
    const visitedStops = new Set([source]);
    const visitedRoutes = new Set();
    let queue = [source];
    let buses = 0;
    while (queue.length > 0) {
      buses++;
      const levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        const currentStop = queue.shift();
        const availableRoutes = stopRoutes.get(currentStop);
        for (const route of availableRoutes) {
          if (visitedRoutes.has(route)) {
            continue;
          }
          visitedRoutes.add(route);
          for (const stop of routes[route]) {
            if (stop === target) {
              return buses;
            }
            if (visitedStops.has(stop)) {
              continue;
            }
            visitedStops.add(stop);
            queue.push(stop);
          }
        }
      }
    }
    return -1;
  }
}

module.exports = Solution;
