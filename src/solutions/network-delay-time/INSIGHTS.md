# Network Delay Time - Interview Notes

## 🔧 Pattern/Category

Single-Source Shortest Path / Dijkstra's Algorithm

## 🔑 Key Insight

**Find shortest path to ALL nodes, return maximum**: This isn't about finding path to one target - it's about the time for signal to reach ALL nodes. Answer is the maximum of all shortest distances (last node to receive signal).

**Critical Realization**: Use Dijkstra's algorithm for single-source shortest path with non-negative weights. The "network delay" is determined by the farthest node.

## 🧠 Intuition

**Natural Approach**: BFS might seem reasonable but doesn't handle weighted edges optimally.

**Optimized Insight**: Dijkstra's greedy approach - always process closest unvisited node first. Use priority queue to efficiently get minimum distance node. Signal spreads optimally like ripples.

**Mental Model**: "Signal spreads like ripples, taking optimal paths. Network delay = time to reach the farthest node"

## ⚠️ Common Mistakes

- **Using BFS instead of Dijkstra**: BFS doesn't handle weighted graphs optimally
- **Wrong answer calculation**: Returning sum of distances instead of maximum
- **Index confusion**: Forgetting nodes are 1-indexed (1 to n), not 0-indexed
- **Unreachability handling**: Not checking if all nodes are reachable (-1 case)
- **Priority queue inefficiency**: Using sort() instead of proper heap implementation

## 📋 Template/Pattern

```javascript
// Dijkstra Single-Source Shortest Path Pattern:
// 1. Build adjacency list from edge list
// 2. Initialize distances to infinity, source to 0
// 3. Use priority queue (min-heap) with [distance, node] pairs
// 4. While queue not empty:
//    - Get minimum distance node
//    - Skip if current distance > recorded (duplicate processing)
//    - Update distances to all neighbors if shorter path found
// 5. Return maximum distance if all reachable, else -1
```

## 🔄 Different Ways to Solve

1. **Dijkstra with Priority Queue**: Efficient minimum distance selection → O((V+E) log V) time ⭐
2. **Dijkstra with Linear Search**: Simple but less efficient → O(V²) time
3. **Bellman-Ford**: Handles negative weights (overkill here) → O(VE) time
4. **Floyd-Warshall**: All-pairs shortest path (massive overkill) → O(V³) time

## 🌍 Real World Analogies

- **Network Packet Routing**: Find fastest route from router to all destinations
- **Disease Spread**: Time for infection to reach all connected populations
- **Information Dissemination**: Time for news to reach everyone in social network
- **Water Flow**: Time for water to reach all connected pipes from source

## 🔗 Similar Problems

- **Cheapest Flights Within K Stops** → Shortest path with constraints
- **Path with Maximum Probability** → Modified Dijkstra with probabilities  
- **Minimum Cost to Make Valid Path** → Grid-based Dijkstra variant
- **Course Schedule** → Different graph problem (topological sort)
- **Find the City With Smallest Number** → All-pairs shortest path variation

## ❓ Follow-up Questions

- "What if edges have negative weights?" → Use Bellman-Ford algorithm instead
- "How to find the actual path, not just time?" → Store parent pointers during traversal
- "What about all-pairs shortest paths?" → Floyd-Warshall algorithm
- "Can you handle dynamic edge updates?" → Dynamic shortest path algorithms
- "What if we want k shortest paths?" → Modified Dijkstra with k-best tracking
- "How to optimize for very large graphs?" → Bidirectional search, A* with heuristics

## 🚨 Google Interview Red Flags Avoided

- ✅ **Algorithm Choice**: Dijkstra for weighted shortest path, not BFS
- ✅ **Correct Answer**: Maximum distance (network delay), not sum or count
- ✅ **Index Handling**: Properly handled 1-indexed nodes in problem
- ✅ **Reachability Check**: Return -1 if any node unreachable
- ✅ **Efficient Implementation**: Priority queue optimization for node selection

## 🎯 Key Interview Talking Points

- **Why Dijkstra**: Non-negative weights make it optimal for single-source shortest path
- **Why maximum distance**: Network delay is determined by the slowest/farthest node
- **Priority queue importance**: Efficiently selects closest unvisited node (greedy choice)
- **Reachability requirement**: All nodes must receive signal, hence check for unreachable nodes
- **Alternative algorithms**: When Bellman-Ford or Floyd-Warshall might be needed instead
