# Bus Routes

<div align="center">
  <a href="https://leetcode.com/problems/bus-routes/description/">
    <img src="https://img.shields.io/badge/LeetCode-Hard-red" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/bus-routes/description/">
    <img src="https://img.shields.io/badge/Pattern-Graph_BFS-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                                   |
| -------------- | ------------------------------------------------------------------------- |
| **Difficulty** | Hard                                                                      |
| **Pattern**    | Graph BFS - Shortest Path                                                 |
| **Tags**       | `BFS`, `Graph`, `Array`, `Hash Table`                                     |
| **LeetCode**   | [View on LeetCode](https://leetcode.com/problems/bus-routes/description/) |

## 📝 Problem Description

You are given an array `routes` representing bus routes where `routes[i]` is a bus route that the `ith` bus repeats forever.

- For example, if `routes[0] = [1, 5, 7]`, this means that the `0th` bus travels in the sequence `1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ...` forever.

You will start at the bus stop `source` (you are not on any bus initially), and you want to go to the bus stop `target`. You can travel between bus stops by buses only.

Return the least number of buses you must take to travel from `source` to `target`. Return `-1` if it is not possible.

**Example 1:**

```
Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 3
Output: 2
Explanation: The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 3.
```

**Example 2:**

```
Input: routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
Output: -1
Explanation: It is not possible to travel from 15 to 12.
```

## 💡 Solution Approach

### Intuition

This is a **shortest path problem** but with a twist - instead of moving between adjacent nodes, taking one bus gives you access to ALL stops on that route. The key insight is that we need to minimize the number of **bus transfers**, not the number of **stop-to-stop moves**.

### Two Optimal Approaches

#### Approach 1: Route-to-Route Graph

Build a graph where nodes are **bus routes** and edges connect routes that share at least one stop.

**Steps:**

1. Convert routes to Sets for O(1) intersection checks
2. Build bidirectional graph of route connections
3. BFS starting from all routes containing source
4. Return when we reach any route containing target

#### Approach 2: Stop-to-Stop BFS

Perform BFS directly on bus stops, where each "step" is taking a bus route.

**Steps:**

1. Build mapping: stop → list of routes serving that stop
2. BFS starting from source stop
3. For each stop, try all available routes
4. Each route expansion adds ALL route stops to queue
5. Track visited routes to avoid cycles

### Key Insights

- **One bus ride** = access to ALL stops on that route (not just adjacent stops)
- **Route intersections** determine possible transfers
- **Level-order BFS** guarantees minimum number of transfers
- **Both visited stops AND visited routes** must be tracked

## ⏱️ Complexity Analysis

### Route-to-Route Approach

**Time Complexity:** `O(R² × S)`

- Building route graph: O(R² × S) where R = routes, S = avg stops per route
- BFS traversal: O(R + E) where E = edges in route graph

**Space Complexity:** `O(R² + R × S)`

- Route graph: O(R²) in worst case (all routes intersect)
- Route sets: O(R × S)

### Stop-to-Stop Approach

**Time Complexity:** `O(R × S)`

- Building stop mapping: O(R × S)
- BFS traversal: O(R × S) (each route visited once, each stop checked once)

**Space Complexity:** `O(R × S)`

- Stop-to-routes mapping: O(R × S)
- Visited sets: O(R + total unique stops)

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Simple 2-bus transfer
Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 3
Output: 2
Explanation: Take first bus to stop 7, then second bus to stop 3

// Multi-hop path
Input: routes = [[1,2],[2,3],[3,4]], source = 1, target = 4
Output: 3
Explanation: Bus 1→2, Bus 2→3, Bus 3→4
```

### Edge Cases

```javascript
// Source equals target
Input: routes = [[1,2,3],[4,5,6]], source = 2, target = 2
Output: 0
Explanation: Already at target

// Same route contains both
Input: routes = [[1,2,3,4,5],[6,7,8]], source = 2, target = 4
Output: 1
Explanation: Direct route available

// No path exists
Input: routes = [[1,2,3],[4,5,6]], source = 1, target = 5
Output: -1
Explanation: Disconnected route groups
```

### Performance Test Cases

```javascript
// Connected chain
Input: routes = [[0,100],[100,200],[200,299]], source = 0, target = 299
Output: 3
Explanation: Long chain of transfers
```

## 🔍 Algorithm Comparison

| Aspect             | Route-to-Route        | Stop-to-Stop              |
| ------------------ | --------------------- | ------------------------- |
| **Best for**       | Dense route networks  | Sparse route networks     |
| **Graph size**     | O(R²) edges max       | O(R×S) mapping            |
| **Memory**         | Higher (route graph)  | Lower (no explicit graph) |
| **Preprocessing**  | O(R²×S) intersections | O(R×S) mapping            |
| **BFS complexity** | O(R) nodes            | O(stops) nodes            |

## 🚀 How to Run

```bash
# Run basic tests
npm test bus-routes

# Run with performance tests
npm test bus-routes --skip-performance=false

# Run with detailed output
npm test bus-routes --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/bus-routes/description/)
- [BFS Pattern Documentation](https://leetcode.com/explore/learn/card/graph/620/breadth-first-search-in-graph/)
- [Graph Theory - Shortest Path Algorithms](https://en.wikipedia.org/wiki/Shortest_path_problem)
