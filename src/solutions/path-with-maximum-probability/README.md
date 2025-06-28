# Path With Maximum Probability

<div align="center">
  <a href="https://leetcode.com/problems/path-with-maximum-probability/description/">
    <img src="https://img.shields.io/badge/LeetCode-Medium-yellow" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/path-with-maximum-probability/description/">
    <img src="https://img.shields.io/badge/Pattern-Dijkstra's%20Algorithm-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------- |
| **Difficulty** | Medium                                                                                       |
| **Pattern**    | Modified Dijkstra's Algorithm                                                                |
| **Tags**       | `Graph`, `Shortest Path`, `Priority Queue`, `Heap`                                           |
| **LeetCode**   | [View on LeetCode](https://leetcode.com/problems/path-with-maximum-probability/description/) |

## 📝 Problem Description

You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i].

Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability. If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.

## 💡 Solution Approach

### Intuition

This problem is **NOT a DFS problem** despite involving graph traversal. It's actually a **shortest path problem** where we want to maximize probability instead of minimizing distance. The key insight is recognizing this as a variant of Dijkstra's algorithm.

### Approach

1. **Build adjacency list** representation of the undirected graph
2. **Use Dijkstra's algorithm with Max-Heap** to always process the path with highest probability first
3. **Start with probability 1.0** at the source node
4. **Process nodes in order of decreasing probability** using priority queue
5. **Return immediately** when target is reached (guaranteed optimal due to Dijkstra's properties)
6. **Use visited set** to prevent reprocessing nodes and duplicate queue entries

### Key Insights

- **Pattern Recognition**: "Maximum probability path" = Modified Dijkstra's algorithm
- **Priority Queue Direction**: Use **max-heap** (highest probability first) not min-heap
- **Optimal Substructure**: The best path to any intermediate node is part of the best overall path
- **Early Termination**: First time we reach target from priority queue = optimal solution
- **Visited Set Benefits**: Prevents both reprocessing nodes AND duplicate queue entries

## ⏱️ Complexity Analysis

### Time Complexity

```
O((V + E) log V)
- V vertices, E edges
- Each edge relaxation: O(log V) for heap operations
- Total operations: O(V + E) with O(log V) each
- Max heap operations: O(V log V) for all vertices
```

### Space Complexity

```
O(V + E)
- Adjacency list: O(V + E) for storing graph
- Priority queue: O(V) in worst case
- Visited set: O(V) for tracking processed nodes
- Overall: O(V + E)
```

## 🔧 Implementation Details

### MaxHeap Implementation

- **Push**: O(log V) - bubble up to maintain heap property
- **Pop**: O(log V) - bubble down after removing root
- **Empty Check**: O(1) - simple length check

### Algorithm Flow

```javascript
1. Initialize max-heap with [1.0, start]
2. While heap not empty:
   a. Pop highest probability [prob, node]
   b. If node is target, return prob
   c. Mark node as visited
   d. For each unvisited neighbor:
      - Calculate new probability = prob * edge_probability
      - Add [new_probability, neighbor] to heap
3. Return 0 if no path found
```

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1: Multiple paths available
Input: n=3, edges=[[0,1],[1,2],[0,2]], succProb=[0.5,0.5,0.2], start=0, end=2
Output: 0.25
Explanation: Path 0→1→2 has probability 0.5×0.5=0.25, better than direct 0→2 (0.2)

// Example 2: Direct path is optimal
Input: n=3, edges=[[0,1],[1,2],[0,2]], succProb=[0.5,0.5,0.3], start=0, end=2
Output: 0.3
Explanation: Direct path 0→2 (0.3) is better than 0→1→2 (0.25)

// Example 3: No path exists
Input: n=3, edges=[[0,1]], succProb=[0.5], start=0, end=2
Output: 0.0
Explanation: No path exists from node 0 to node 2
```

### Edge Cases

```javascript
// Edge case 1: Start equals end
Input: n=2, edges=[[0,1]], succProb=[0.5], start=0, end=0
Output: 1.0
Explanation: No movement needed, probability is 1.0

// Edge case 2: Single node graph
Input: n=1, edges=[], succProb=[], start=0, end=0
Output: 1.0
Explanation: Already at target

// Edge case 3: Complex graph with cycles
Input: n=4, edges=[[0,1],[0,2],[1,3],[2,3]], succProb=[0.9,0.1,0.6,0.8], start=0, end=3
Output: 0.54
Explanation: Path 0→1→3 gives 0.9×0.6=0.54, better than 0→2→3 (0.1×0.8=0.08)
```

## 🚨 Common Pitfalls

### ❌ Wrong Algorithm Choice

```javascript
// WRONG: Using DFS/BFS
function dfsApproach() {
  // This explores ALL paths - exponential time!
  // Doesn't guarantee optimal path found first
}

// CORRECT: Using Dijkstra's with max-heap
function dijkstraApproach() {
  // Processes paths in optimal order
  // Guarantees first path to target is optimal
}
```

### ❌ Inefficient Priority Queue

```javascript
// WRONG: Array with sorting (O(E² log E))
pq.sort((a, b) => a[0] - b[0]);
let node = pq.pop();

// CORRECT: Proper heap implementation (O((V+E) log V))
const pq = new MaxHeap();
let node = pq.pop();
```

### ❌ Wrong Priority Direction

```javascript
// WRONG: Min-heap (processes smallest probability first)
if (parent[0] <= child[0]) break;

// CORRECT: Max-heap (processes largest probability first)
if (parent[0] >= child[0]) break;
```

## 🎯 Key Takeaways

1. **Pattern Recognition**: "Maximum probability path" → Modified Dijkstra's algorithm
2. **Implementation**: Use max-heap priority queue for optimal performance
3. **Correctness**: Early return after popping target from heap is guaranteed optimal
4. **Efficiency**: Visited set prevents both reprocessing and duplicate queue entries
5. **Complexity**: Achieve O((V+E) log V) time with proper heap implementation

## 🔗 Related Problems

- **Network Delay Time** (LeetCode 743) - Standard Dijkstra's for minimum time
- **Cheapest Flights Within K Stops** (LeetCode 787) - Dijkstra's with constraints
- **Swim in Rising Water** (LeetCode 778) - Binary search + shortest path

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
npm test path-with-maximum-probability

# Run with performance tests
npm test path-with-maximum-probability --skip-performance=false

# Run with detailed output
npm test path-with-maximum-probability --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/path-with-maximum-probability/description/)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)
