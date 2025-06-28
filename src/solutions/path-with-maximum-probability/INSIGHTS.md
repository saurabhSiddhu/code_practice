# Path With Maximum Probability - Interview Notes

## 🔧 Pattern/Category

**Modified Dijkstra's Algorithm** (Maximum Path Problem)

## 🔑 Key Insight

This is **NOT a DFS problem** - it's a **shortest path problem** where we maximize probability instead of minimizing distance. The key insight is recognizing that "maximum probability path" requires **Dijkstra's algorithm** with a max-heap, not graph traversal.

## 🧠 Intuition

- **Initial thought**: "Find all paths and pick maximum" → DFS/BFS approach
- **Correct insight**: "Find optimal path efficiently" → Modified Dijkstra's
- **Why Dijkstra's?**: We need **globally optimal** solution, and probability multiplication has **optimal substructure**
- **Key realization**: Process paths in order of **decreasing probability** to guarantee optimality

## ⚠️ Common Mistakes

- **❌ Pattern Misidentification**: Thinking this is DFS when it's actually shortest path
- **❌ Inefficient Priority Queue**: Using `array.sort()` instead of proper heap (O(E²logE) vs O((V+E)logV))
- **❌ Wrong Priority Direction**: Using min-heap instead of max-heap for maximum probability
- **❌ Visited Set Timing**: Marking nodes as visited at wrong time (though current implementation works)
- **❌ Early Return Confusion**: Not understanding why checking `currentNode === end` immediately after pop() works

## 📋 Template/Pattern

```javascript
// Modified Dijkstra's for Maximum Probability:
// 1. Build adjacency list graph
// 2. Use MAX-HEAP priority queue (highest probability first)
// 3. Start with probability 1.0 at source
// 4. Pop highest probability path, check if target reached
// 5. Process neighbors only if not visited
// 6. Add neighbor paths to heap with updated probability

// Key MaxHeap implementation:
class MaxHeap {
  constructor() {
    this.heap = [];
  }
  push(node) {
    /* bubble up */
  }
  pop() {
    /* bubble down */
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}
```

## 🔄 Different Ways to Solve

1. **Optimal: Dijkstra's + MaxHeap** - O((V+E) log V) time, O(V+E) space
   - Use proper heap-based priority queue
   - Process highest probability paths first
2. **Suboptimal: Array + Sort** - O(E² log E) time, O(V+E) space
   - Sort array after each insertion (your original approach)
   - Works but inefficient for large graphs
3. **Alternative: Distance Array** - O((V+E) log V) time, O(V) space
   - Track best probability to each node
   - Prevent duplicate queue entries more efficiently

## 🌍 Real World Analogies

- **Network Reliability**: Finding most reliable communication path between servers
- **Investment Portfolio**: Maximizing success probability through investment chains
- **Transportation**: Finding route with highest success rate (considering traffic, weather, etc.)

## 🔗 Similar Problems

- **Network Delay Time** - Dijkstra's for minimum time (LeetCode 743)
- **Cheapest Flights Within K Stops** - Modified Dijkstra's with constraints (LeetCode 787)
- **Swim in Rising Water** - Binary search + path finding (LeetCode 778)

## ❓ Follow-up Questions

- **"What's the time complexity?"** → O((V+E) log V) with proper heap vs O(E² log E) with array sorting
- **"Why not use DFS?"** → DFS explores all paths, doesn't guarantee we find optimal first
- **"Can you optimize space?"** → Use distance array instead of visited set to prevent duplicates
- **"What if graph has cycles?"** → Dijkstra's handles cycles naturally via optimal substructure
- **"How would you handle negative probabilities?"** → Problem constraint guarantees [0,1] range
- **"What if we want K most probable paths?"** → Modify to return top-K using heap of size K

## 🎯 Google Interview Red Flags

- **❌ Wrong Algorithm**: Implementing DFS/BFS instead of Dijkstra's
- **❌ Complexity Ignorance**: Not knowing your solution is O(E² log E)
- **❌ Implementation Issues**: Buggy heap or inefficient array sorting
- **❌ Pattern Blindness**: Not recognizing this as shortest path variant

## ✅ Google Interview Green Flags

- **✅ Correct Pattern Recognition**: "This is modified Dijkstra's for maximum path"
- **✅ Optimal Implementation**: Using proper MaxHeap with correct complexity
- **✅ Edge Case Handling**: start === end, disconnected graph, etc.
- **✅ Code Quality**: Clean, readable implementation with good variable naming
- **✅ Optimization Awareness**: Understanding visited set vs distance array trade-offs
