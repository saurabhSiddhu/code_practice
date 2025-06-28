class Solution {
  /**
   * Calculates the diameter of a tree given its nodes and edges
   * @example
   * solve({ n: 3, edges: [[0, 1], [1, 2]] })
   * 2
   * @param {number} {n} - Total number of nodes in the tree.
   * @param {Array[]} {edges} - List of edges representing the tree.
   * @returns {number} The diameter of the tree.
   * @description
   *   - Utilizes two depth-first searches (DFS) to determine the tree's diameter.
   *   - Converts edges into an adjacency list to facilitate DFS traversal.
   *   - Returns early for edge cases where the number of nodes is less than three.
   *   - Assumes the input represents a valid tree.
   */
  solve({ n, edges }) {
    // Handle edge cases
    if (n === 1) return 0;
    if (n === 2) return 1;

    // Build adjacency list representation of the tree
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
      graph[u].push(v);
      graph[v].push(u);
    }

    // Two-DFS approach using stacks (original/classic solution):
    // 1. Find the farthest node from any starting point using DFS with stack
    // 2. Find the farthest node from that result using DFS with stack
    // The distance from step 2 is the tree diameter

    // First DFS: Find the farthest node from node 0
    const firstResult = this.dfsWithStack(graph, 0, n);
    const farthestNode = firstResult.farthestNode;

    // Second DFS: Find the farthest distance from the farthest node
    const secondResult = this.dfsWithStack(graph, farthestNode, n);

    return secondResult.maxDistance;
  }

  /**
   * Iterative DFS using stack to find the farthest node and maximum distance
   * @param {Array[]} graph - Adjacency list representation
   * @param {number} start - Starting node
   * @param {number} n - Total number of nodes
   * @returns {Object} - {farthestNode, maxDistance}
   */
  dfsWithStack(graph, start, n) {
    const visited = new Array(n).fill(false);
    const stack = [[start, 0]]; // [node, distance]
    visited[start] = true;

    let farthestNode = start;
    let maxDistance = 0;

    while (stack.length > 0) {
      const [currentNode, currentDistance] = stack.pop();

      // Update farthest node if we found a longer distance
      if (currentDistance > maxDistance) {
        maxDistance = currentDistance;
        farthestNode = currentNode;
      }

      // Explore all neighbors (push them onto the stack)
      for (const neighbor of graph[currentNode]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push([neighbor, currentDistance + 1]);
        }
      }
    }

    return { farthestNode, maxDistance };
  }
  solveAlternative({ n, edges }) {
    // Handle edge cases
    if (n <= 1) return 0;
    if (n === 2) return 1;

    // Build adjacency list representation of the tree
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
      graph[u].push(v);
      graph[v].push(u);
    }

    let globalDiameter = 0;

    function dfs(node, parent) {
      let firstMax = 0; // Longest path from this node
      let secondMax = 0; // Second longest path from this node

      for (const child of graph[node]) {
        if (child !== parent) {
          let pathLength = dfs(child, node);

          // Update the two longest paths
          if (pathLength > firstMax) {
            secondMax = firstMax;
            firstMax = pathLength;
          } else if (pathLength > secondMax) {
            secondMax = pathLength;
          }
        }
      }

      // Update global diameter: path through this node
      globalDiameter = Math.max(globalDiameter, firstMax + secondMax);

      // Return max depth from this node (for parent's calculation)
      return firstMax + 1;
    }

    dfs(0, -1); // Start from node 0 with no parent
    return globalDiameter;
  }
}

module.exports = Solution;
