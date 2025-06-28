# Reorder Routes To Make All Paths Lead To The City Zero

<div align="center">
  <a href="https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/description/">
    <img src="https://img.shields.io/badge/LeetCode-Medium-yellow" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/description/">
    <img src="https://img.shields.io/badge/Pattern-Tree_Traversal-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Difficulty** | Medium                                                                                                                |
| **Pattern**    | Tree Traversal (DFS/BFS) + Graph Transformation                                                                       |
| **Tags**       | `graph`, `tree`, `dfs`, `bfs`                                                                                         |
| **LeetCode**   | [View on LeetCode](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/description/) |

## 📝 Problem Description

There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network forms a tree). Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.

This year, there will be a big event in the capital (city 0), and many people want to travel to this city. Your task consists of reorienting some roads such that each city can visit city 0. Return the minimum number of edges changed.

It's guaranteed that each city can reach city 0 after reorder.

## 💡 Solution Approach

### Intuition

The key insight is to transform this into a tree traversal problem. Since we want all paths to lead to city 0, we need to traverse from city 0 and count how many original edges point "away" from our traversal direction (these need reversal).

### Approach

1. **Transform to Bidirectional Graph**: For each original edge `[a,b]`, create:

   - `a → b` with weight `1` (original edge, needs reversal if traversed)
   - `b → a` with weight `0` (reverse edge, no reversal needed if traversed)

2. **Traverse from City 0**: Use DFS or BFS to visit all cities from city 0
3. **Count Reversals**: Sum up the weights of edges traversed

### Key Insights

- **Tree Property**: n-1 edges connecting n cities = tree structure, so any traversal visits each node exactly once
- **Bidirectional Representation**: Transform directed graph to undirected with edge weights representing reversal cost
- **DFS vs BFS**: Both work equally well - DFS has better space complexity for deep trees, BFS for wide trees

## ⏱️ Complexity Analysis

### Time Complexity

```
O(n) - Visit each city exactly once, process each edge exactly twice (once in each direction)
```

### Space Complexity

```
DFS: O(height) ≈ O(log n) for balanced trees, O(n) worst case for linear trees
BFS: O(width) ≈ O(n) for trees (width can be up to n/2 in worst case)
Graph storage: O(n) for adjacency lists
```

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1: Simple tree requiring 3 changes
Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
Output: 3
Explanation: Need to reverse edges: 0→1, 1→3, and 4→0

// Example 2: Linear path requiring 2 changes
Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
Output: 2
Explanation: Need to reverse edges: 3→2 and 3→4
```

### Edge Cases

```javascript
// Edge Case 1: Two cities only
Input: n = 2, connections = [[0,1]]
Output: 1
Explanation: Need to reverse 0→1 to 1→0

// Edge Case 2: All edges already correct
Input: n = 4, connections = [[1,0],[2,0],[3,0]]
Output: 0
Explanation: All edges already point toward city 0
```

### Performance Test Cases

```javascript
// Deep linear chain
Input: n = 1000, connections = [[0,1],[1,2],...,[998,999]]
Output: 999
Explanation: All edges need reversal in linear chain away from 0
```

## 🔄 Implementation Alternatives

### DFS with Stack (Recommended)

- **Best for**: Most cases, especially deep trees
- **Space**: O(height) - better for memory-constrained environments

### BFS with Queue

- **Best for**: When you need level-order processing
- **Space**: O(width) - might use more memory but equally correct

### Recursive DFS

- **Best for**: Clean code preference
- **Risk**: Stack overflow on very deep trees

## 🚀 How to Run

```bash
# Run basic tests
npm test reorder-routes-to-make-all-paths-lead-to-the-city-zero

# Run with performance tests
npm test reorder-routes-to-make-all-paths-lead-to-the-city-zero --skip-performance=false

# Run with detailed output
npm test reorder-routes-to-make-all-paths-lead-to-the-city-zero --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/description/)
- [Tree Traversal Patterns](https://leetcode.com/explore/learn/card/patterns/)
- [DFS vs BFS Trade-offs](https://leetcode.com/explore/learn/card/graph/)

````

## 🧪 Test Cases

### Basic Test Cases
```javascript
// Example 1
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]

// Example 2
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]
````

### Edge Cases

```javascript
// Edge Case 1
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]

// Edge Case 2
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]
```

### Performance Test Cases

```javascript
// Large Input
Input: [Add large input]
Output: [Add expected output]
```

## 🚀 How to Run

```bash
# Run basic tests
npm test reorder-routes-to-make-all-paths-lead-to-the-city-zero

# Run with performance tests
npm test reorder-routes-to-make-all-paths-lead-to-the-city-zero --skip-performance=false

# Run with detailed output
npm test reorder-routes-to-make-all-paths-lead-to-the-city-zero --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/description/)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)
