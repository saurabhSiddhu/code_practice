class Solution {
  solve({ n, connections }) {
    // Build bidirectional graph
    // For original edge [a, b]: we can go a->b (needs reversal) or b->a (no reversal needed)
    let graph = Array.from({ length: n }, () => []);

    for (const connection of connections) {
      const [from, to] = connection;
      // Original direction: from -> to (needs reversal if we traverse this way)
      graph[from].push([to, 1]);
      // Reverse direction: to -> from (no reversal needed)
      graph[to].push([from, 0]);
    }

    // DFS from city 0 to count reversals needed
    let reversals = 0;
    let visited = new Set();
    let stack = [0];

    while (stack.length > 0) {
      let current = stack.pop();
      visited.add(current);

      for (const [neighbor, needReversal] of graph[current]) {
        if (!visited.has(neighbor)) {
          reversals += needReversal;
          stack.push(neighbor);
        }
      }
    }

    return reversals;
  }
}

module.exports = Solution;
