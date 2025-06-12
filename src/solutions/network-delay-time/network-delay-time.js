class Solution {
  solve(input) {
    const [times, n, k] = input;
    // TODO: Implement your solution
    // times: array of [source, target, time] edges
    // n: number of nodes (1 to n)
    // k: starting node
    // Return: minimum time for all nodes to receive signal, or -1 if impossible
    const graph = {};
    for (let i = 0; i < times.length; i++) {
      const [source, dest, time] = times[i];
      if (!graph[source]) {
        graph[source] = {};
      }
      if (graph[source][dest] !== undefined) {
        graph[source][dest] = Math.min(graph[source][dest], time);
      } else {
        graph[source][dest] = time;
      }
    }
    const distances = new Array(n + 1).fill(Infinity);
    distances[k] = 0;
    const visited = new Array(n + 1).fill(false);

    // Dijkstra's algorithm
    for (let count = 0; count < n; count++) {
      let minNode = -1;
      for (let node = 1; node <= n; node++) {
        if (!visited[node] && (minNode === -1 || distances[node] < distances[minNode])) {
          minNode = node;
        }
      }
      if (distances[minNode] === Infinity) {
        break;
      }
      visited[minNode] = true;
      if (graph[minNode]) {
        Object.entries(graph[minNode]).forEach(([node, time]) => {
          distances[node] = Math.min(distances[minNode] + time, distances[node]);
        });
      }
    }

    // Find maximum distance among all nodes
    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
      if (distances[i] === Infinity) {
        return -1; // Not all nodes reachable
      }
      maxTime = Math.max(maxTime, distances[i]);
    }

    return maxTime;
  }
}

module.exports = Solution;
