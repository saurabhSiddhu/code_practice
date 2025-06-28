# Tree Diameter

<div align="center">
  <a href="">
    <img src="https://img.shields.io/badge/LeetCode-Medium-orange" alt="LeetCode Difficulty" />
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/Pattern-Tree%20DP%20%2F%20Two--DFS-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                       |
| -------------- | --------------------------------------------- |
| **Difficulty** | Medium                                        |
| **Pattern**    | Tree DP / Two-DFS Algorithm                   |
| **Tags**       | `Tree`, `DFS`, `Graph`, `Dynamic Programming` |
| **LeetCode**   | [View on LeetCode]()                          |

## 📝 Problem Description

You are given a tree represented as an undirected graph with `n` nodes (0-indexed) and `n-1` edges. Your task is to find the **diameter of the tree**, which is defined as the length of the longest path between any two nodes in the tree.

**Important Note:** This is a classic algorithmic pattern problem that requires **pattern recognition** rather than intuitive derivation.

## 💡 Solution Approaches

### 🎯 Pattern Recognition

**Key Signal:** `Tree + "Longest Path"` → **Tree Diameter Pattern**

This problem has two optimal O(n) solutions:

### Approach 1: Two-DFS Algorithm (Classic)

**Intuition:** Uses the extremal point theorem - the farthest node from any starting point is guaranteed to be one endpoint of the diameter.

**Algorithm:**

1. Run DFS from any node (e.g., node 0) to find the farthest node
2. Run DFS from that farthest node to find the actual diameter

**Why it works:** In trees, there's exactly one path between any two nodes, and the diameter endpoints are maximally separated.

### Approach 2: Single DFS with Tree DP

**Intuition:** Calculate the potential diameter passing through each node by combining the two longest downward paths from that node.

**Algorithm:**

1. For each node, calculate the longest and second-longest paths going down
2. Diameter through this node = `firstMax + secondMax`
3. Return the maximum diameter found across all nodes

### Key Insights

- **This is a LEARNED pattern**, not something to derive from scratch
- **Pattern Recognition > Algorithm Invention** in interviews
- Both approaches use the fundamental property that trees have unique paths
- The "calculate diameter at each node" insight is the core of tree DP approach

## ⏱️ Complexity Analysis

### Time Complexity

```
O(n) - Both approaches visit each node exactly once
- Two-DFS: Two complete tree traversals
- Tree DP: Single DFS traversal with O(1) work per node
```

### Space Complexity

```
O(n) - For adjacency list representation and recursion stack
- Adjacency list: O(n + edges) = O(n) for trees
- Recursion stack: O(height) = O(n) worst case
```

## 🧠 Algorithm Understanding

### Two-DFS Mathematical Property

The algorithm relies on the **extremal point theorem**:

- Starting from any node, the farthest reachable node is always a diameter endpoint
- This is a mathematical property of trees, not an intuitive insight

### Tree DP Pattern

Each node calculates: _"What if the diameter path passes through me?"_

- Combines results from children to determine local optimum
- Global optimum emerges from all local calculations

## 🎭 Interview Strategy

### ✅ Correct Approach:

1. **"This is a tree diameter problem"** (Pattern Recognition)
2. **"I'll use the two-DFS approach"** (Template Application)
3. **"This works due to extremal point property"** (Understanding)
4. **"Time: O(n), Space: O(n)"** (Complexity Analysis)

### ❌ Avoid:

- Trying to derive the algorithm from scratch
- Apologizing for using a "known" algorithm
- Spending time on brute force approaches

## 🔗 Related Problems

- **Tree Path Sum** - Similar tree traversal with path optimization
- **Lowest Common Ancestor** - Tree structure with optimal path finding
- **Tree Center** - Related to diameter, finding the "middle" of tree
- **Binary Tree Maximum Path Sum** - Tree DP with path calculations

## 💡 Key Takeaway

Tree diameter is a **pattern recognition problem**. Success comes from:

1. **Recognizing** the `Tree + Longest Path` signal
2. **Applying** the appropriate algorithm template
3. **Understanding** why the algorithm works
4. **Implementing** cleanly with proper edge cases

Focus on pattern mastery rather than algorithm invention! 🚀

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1: Linear tree
Input: n = 4, edges = [[0,1], [1,2], [2,3]]
Output: 3
Explanation: Longest path is 0→1→2→3 with length 3

// Example 2: Small balanced tree
Input: n = 5, edges = [[0,1], [0,2], [1,3], [1,4]]
Output: 3
Explanation: Longest path is 3→1→0→2 with length 3
```

### Edge Cases

```javascript
// Edge Case 1: Single node
Input: n = 1, edges = []
Output: 0
Explanation: No path exists in single node

// Edge Case 2: Two nodes
Input: n = 2, edges = [[0,1]]
Output: 1
Explanation: Only one edge, diameter = 1

// Edge Case 3: Star graph
Input: n = 5, edges = [[0,1], [0,2], [0,3], [0,4]]
Output: 2
Explanation: All paths go through center, max length = 2
```

### Performance Test Cases

```javascript
// Large Linear Tree
Input: n = 1000, edges = [[0,1], [1,2], ..., [998,999]]
Output: 999
Explanation: Tests performance on deep trees

// Large Complete Binary Tree
Input: n = 1023 (complete binary tree of height 9)
Output: 18
Explanation: Tests performance on wide trees
```

## 🚀 How to Run

```bash
# Run basic tests
npm test tree-diameter

# Run with performance tests
npm test tree-diameter --skip-performance=false

# Run with detailed output
npm test tree-diameter --detail
```

## 📚 References

- [Tree Diameter Algorithm Explanation](<https://en.wikipedia.org/wiki/Distance_(graph_theory)>)
- [Extremal Point Theorem for Trees](https://cp-algorithms.com/graph/tree_diameter.html)
- [Tree DP Patterns](https://codeforces.com/blog/entry/20935)
