/**
 * Definition for a Node.
 * function Node(val, neighbors) {
 *     this.val = val === undefined ? 0 : val;
 *     this.neighbors = neighbors === undefined ? [] : neighbors;
 * }
 */

/**
 * @param {Node} node
 * @return {Node}
 */
const cloneGraph = function (node) {
  if (!node) {
    return null;
  }

  const visited = {};

  function dfs(node) {
    if (!node) {
      return null;
    }

    if (visited[node.val]) {
      return visited[node.val];
    }

    const clonedNode = { val: node.val, neighbors: [] };
    visited[node.val] = clonedNode;

    for (const neighbor of node.neighbors) {
      clonedNode.neighbors.push(dfs(neighbor));
    }

    return clonedNode;
  }

  return dfs(node);
};

// For the test framework
function Solution() {}
Solution.prototype.solve = cloneGraph;

module.exports = Solution;
