class Solution {
  solve({ n, edges }) {
    // Handle edge cases
    if (n === 0) {
      return true;
    }
    if (n === 1) {
      return edges.length === 0;
    }

    // Quick check: tree must have exactly n-1 edges
    if (edges.length !== n - 1) {
      return false;
    }

    // Build adjacency list
    const graph = {};
    for (let i = 0; i < n; i++) {
      graph[i] = new Set();
    }

    for (const [node1, node2] of edges) {
      graph[node1].add(node2);
      graph[node2].add(node1);
    }

    // DFS to check connectivity and cycles
    const visited = new Set();
    const stack = [[0, -1]]; // [node, parent]

    while (stack.length) {
      const [node, parent] = stack.pop();

      if (visited.has(node)) {
        return false; // Cycle detected
      }

      visited.add(node);

      // Add neighbors to stack (except parent)
      for (const neighbor of graph[node]) {
        if (neighbor !== parent) {
          stack.push([neighbor, node]);
        }
      }
    }

    // Check if all nodes are connected
    return visited.size === n;
  }

  solveAlternative({ n, edges }) {
    // Check if n - 1 edges exist
    if (n === 0) {
      return true;
    }
    if (n === 1) {
      return edges.length === 0;
    }

    if (edges.length !== n - 1) {
      return false;
    }

    const adjacency = Array.from({ length: n }, () => []);

    // Populate adjacency with all the connected nodes
    for (const [x, y] of edges) {
      adjacency[x].push(y);
      adjacency[y].push(x);
    }

    const visited = new Set();
    const stack = [0];
    visited.add(0);

    while (stack.length > 0) {
      const node = stack.pop();

      // Iterate over the neighbors of the popped node
      for (const neighbor of adjacency[node]) {
        if (!visited.has(neighbor)) {
          // Add a neighbor in visited set and stack if it doesn't already exist in the set
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }
    return visited.size === n;
  }
}

module.exports = Solution;
