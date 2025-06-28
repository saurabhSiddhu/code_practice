class Solution {
  solve(edges) {
    const [node1, node2] = edges[0];
    const [node3, node4] = edges[1];
    if (node1 === node3 || node1 === node4) {
      return node1;
    } else return node2;
  }
}

module.exports = Solution;
