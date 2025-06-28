# Find Center Of Star Graph

<div align="center">
  <a href="https://leetcode.com/problems/find-center-of-star-graph/description/">
    <img src="https://img.shields.io/badge/LeetCode-Easy-green" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/find-center-of-star-graph/description/">
    <img src="https://img.shields.io/badge/Pattern-Constraint--Analysis-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Difficulty** | Easy                                                                                     |
| **Pattern**    | Graph → Constraint Analysis Optimization                                                 |
| **Tags**       | `Graph`, `Intersection`, `Star Graph`                                                    |
| **LeetCode**   | [View on LeetCode](https://leetcode.com/problems/find-center-of-star-graph/description/) |

## 📝 Problem Description

There is an undirected star graph consisting of n nodes labeled from 1 to n. A star graph is a graph where there is one center node and exactly n - 1 edges that connect the center node with every other node.

You are given a 2D integer array edges where each edges[i] = [ui, vi] indicates that there is an edge between the nodes ui and vi. Return the center of the given star graph.

## 💡 Solution Approach

### Intuition

**Initial thinking**: "I need to count how many times each node appears and return the one that appears n-1 times."

**Key insight**: "Wait! In a star graph, the center appears in EVERY edge. So I only need to find which node is common between any two edges!"

### Approach

**Optimal O(1) Solution**:

1. Take the first two edges: `[a, b]` and `[c, d]`
2. Check if `a` appears in the second edge
3. If yes, return `a`; otherwise, return `b`

**Why this works**: The center node must appear in every edge by definition of a star graph.

### Key Insights

- **Constraint Leverage**: "Star graph" guarantee eliminates need for full frequency counting
- **Intersection over Counting**: Finding common element is more efficient than counting all
- **O(1) Optimization**: Only need to examine first two edges, not all edges

## ⏱️ Complexity Analysis

### Optimal Solution (Implemented)

```
Time Complexity: O(1) - Only access first two edges
Space Complexity: O(1) - No additional data structures needed
```

### Alternative: Frequency Counting

```
Time Complexity: O(E) - Must examine all edges
Space Complexity: O(V) - Store frequency map for all nodes
```

**Note**: Our solution achieves optimal complexity by leveraging problem constraints!

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1: 4-node star, center is 2
Input: [[1,2],[2,3],[4,2]]
Output: 2
Explanation: Node 2 appears in all edges, making it the center

// Example 2: 3-node star, center is 1
Input: [[1,2],[1,3]]
Output: 1
Explanation: Node 1 connects to both other nodes
```

### Edge Cases

```javascript
// Edge Case 1: Minimum star graph (3 nodes)
Input: [[1,2],[2,3]]
Output: 2
Explanation: Smallest possible star with 3 nodes

// Edge Case 2: High numbered center node
Input: [[100,1],[100,2],[100,3]]
Output: 100
Explanation: Works regardless of node values
```

### Performance Test Cases

```javascript
// Large Input: 1000-node star
Input: [[1,2],[1,3],[1,4],...,[1,1000]]
Output: 1
Explanation: O(1) solution handles large inputs efficiently
```

## 🔄 Solution Comparison

### Approach 1: O(1) Intersection ⭐ (Implemented)

```javascript
// Check first two edges for common node
const [a, b] = edges[0];
const [c, d] = edges[1];
return a === c || a === d ? a : b;
```

**Pros**: Optimal time/space, leverages constraints
**Cons**: Requires understanding star graph properties

### Approach 2: O(E) Frequency Counting

```javascript
// Count appearances of each node
const freq = new Map();
for (const [u, v] of edges) {
  freq.set(u, (freq.get(u) || 0) + 1);
  freq.set(v, (freq.get(v) || 0) + 1);
}
// Return node with frequency n-1
```

**Pros**: More obvious algorithm, works for general graphs
**Cons**: Unnecessary when star property is guaranteed

## 🚀 How to Run

```bash
# Run basic tests
npm test find-center-of-star-graph

# Run with performance tests
npm test find-center-of-star-graph --skip-performance=false

# Run with detailed output
npm test find-center-of-star-graph --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/find-center-of-star-graph/description/)
- [Graph Theory: Star Graphs](https://en.wikipedia.org/wiki/Star_graph)
- [Similar: Find the Celebrity Problem](https://leetcode.com/problems/find-the-celebrity/)
  npm test find-center-of-star-graph --skip-performance=false

# Run with detailed output

npm test find-center-of-star-graph --detail

```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/find-center-of-star-graph/description/)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)
```
