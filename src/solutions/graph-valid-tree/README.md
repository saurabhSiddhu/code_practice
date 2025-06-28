# Graph Valid Tree

<div align="center">
  <a href="https://neetcode.io/problems/valid-tree">
    <img src="https://img.shields.io/badge/LeetCode-Medium-yellow" alt="LeetCode Difficulty" />
  </a>
  <a href="https://neetcode.io/problems/valid-tree">
    <img src="https://img.shields.io/badge/Pattern-Graph%20Theory-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                     |
| -------------- | ----------------------------------------------------------- |
| **Difficulty** | Medium                                                      |
| **Pattern**    | Graph Theory, DFS, Union-Find                               |
| **Tags**       | `Graph`, `Tree`, `DFS`, `Connectivity`                      |
| **LeetCode**   | [View on LeetCode](https://neetcode.io/problems/valid-tree) |

## 📝 Problem Description

Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

**A valid tree must satisfy two conditions:**

1. **Connected**: All nodes are reachable from any other node
2. **Acyclic**: No cycles exist in the graph

## 💡 Solution Approaches

### Approach 1: DFS with Cycle Detection (Explicit)

**Core Idea**: Use DFS traversal with parent tracking to detect cycles explicitly.

```javascript
// Key insight: Track parent to avoid false cycle detection
const stack = [[node, parent]];
if (visited.has(node)) return false; // Cycle found
```

**Algorithm:**

1. Check if edges.length === n-1 (necessary condition)
2. Build adjacency list representation
3. DFS from node 0 with parent tracking
4. If we revisit a node → cycle detected
5. Check if all nodes visited → connectivity verified

### Approach 2: Mathematical Property (Elegant)

**Core Insight**: Connected graph + exactly (n-1) edges = Tree (guaranteed)

```javascript
// Mathematical guarantee - no explicit cycle detection needed!
if (edges.length !== n - 1) return false;
return visited.size === n; // Just check connectivity
```

**Mathematical Proof:**

- Any connected graph with **≥ n edges** → has cycles
- Any graph with **< n-1 edges** → disconnected
- Connected graph with **exactly n-1 edges** → tree (impossible to have cycles)

### Key Insights

- **Mathematical Elegance**: Tree validation can be reduced to two simple checks
- **Edge Count is Critical**: The n-1 edge count eliminates most invalid cases instantly
- **Graph Theory Fundamentals**: Leveraging mathematical properties vs algorithmic detection
- **Parent Tracking**: Essential for cycle detection in undirected graphs during DFS

## ⏱️ Complexity Analysis

### Approach 1: DFS with Cycle Detection

**Time Complexity:** `O(V + E)` where V = nodes, E = edges

- Building adjacency list: O(E)
- DFS traversal: O(V + E)

**Space Complexity:** `O(V + E)`

- Adjacency list storage: O(V + E)
- Visited set and stack: O(V)

### Approach 2: Mathematical Property

**Time Complexity:** `O(V + E)`

- Same as Approach 1, but with simpler logic

**Space Complexity:** `O(V + E)`

- Same space requirements

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Valid Tree
Input: { n: 5, edges: [[0,1],[0,2],[0,3],[1,4]] }
Output: true
Explanation: Connected acyclic graph with exactly 4 edges

// Graph with Cycle
Input: { n: 5, edges: [[0,1],[1,2],[2,3],[1,3],[1,4]] }
Output: false
Explanation: Contains cycle 1→2→3→1
```

### Edge Cases

```javascript
// Empty Graph
Input: { n: 0, edges: [] }
Output: true
Explanation: Empty graph is trivially a valid tree

// Single Node
Input: { n: 1, edges: [] }
Output: true
Explanation: Single isolated node forms a valid tree

// Disconnected Components
Input: { n: 2, edges: [] }
Output: false
Explanation: Two isolated nodes - not connected
```

### Mathematical Edge Cases

```javascript
// Too Many Edges
Input: { n: 3, edges: [[0,1],[1,2],[2,0]] }
Output: false
Explanation: 3 edges for 3 nodes (should be 2) - creates cycle

// Linear Tree
Input: { n: 4, edges: [[0,1],[1,2],[2,3]] }
Output: true
Explanation: Perfect linear tree structure
```

## 🎯 Interview Discussion Points

### Why Two Approaches?

1. **Approach 1**: Demonstrates understanding of graph algorithms and cycle detection
2. **Approach 2**: Shows deep mathematical intuition and elegant problem-solving

### Interview Excellence Strategy

- **Mathematical Insight**: Recognizing that connected + (n-1 edges) = tree shows advanced problem-solving
- **Edge Case Handling**: Proper handling of n=0, n=1 cases demonstrates thoroughness
- **Optimization**: Early termination with edge count check shows efficiency awareness
- **Clean Code**: Both approaches are readable and efficient
- **Multiple Solutions**: Showing both algorithmic and mathematical approaches demonstrates comprehensive understanding

### Common Implementation Pitfalls (Learned from Experience)

1. **Syntax Errors**: Watch for `if ((n = 0))` vs `if (n === 0)` - assignment vs comparison
2. **Parent Tracking**: Must track parent per-node in DFS stack, not globally
3. **False Cycle Detection**: Without parent tracking, you'll immediately detect false cycles
4. **Overengineering**: Check mathematical properties first before complex algorithms

### Follow-up Questions

- "How would you handle directed graphs?"
- "What if edges could have weights?"
- "Can you implement using Union-Find?"
- "How does this relate to Minimum Spanning Tree?"

## 🧠 Core Learning

**Mathematical Property**: The most elegant solution leverages the fundamental theorem that a connected graph with exactly n-1 edges cannot have cycles. This transforms a complex algorithmic problem into two simple checks.

**Graph Theory Foundation**: Understanding when mathematical properties can replace algorithmic complexity is a hallmark of advanced problem-solving.

## 🚀 How to Run

```bash
# Run basic tests
npm test graph-valid-tree

# Run with performance tests
npm test graph-valid-tree --skip-performance=false

# Run with detailed output
npm test graph-valid-tree --detail
```

## 📚 References

- [LeetCode Problem](https://neetcode.io/problems/valid-tree)
- [Graph Theory Fundamentals](<https://en.wikipedia.org/wiki/Tree_(graph_theory)>)
- [Union-Find Data Structure](https://en.wikipedia.org/wiki/Disjoint-set_data_structure)
