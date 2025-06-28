# 🎯 Anki Cards for Path With Maximum Probability

_Generated on: 6/24/2025_

---

## 📚 Quick Reference

**Problem:** Path With Maximum Probability  
**Pattern:** Modified Dijkstra's Algorithm  
**Difficulty:** Medium  
**LeetCode:** https://leetcode.com/problems/path-with-maximum-probability/description/

---

## 🔧 Questions

**Q1:** What pattern does "Path With Maximum Probability" follow and when should I recognize it?

**Q2:** What are the key insights and intuition for "Path With Maximum Probability"?

**Q3:** What are the different approaches for "Path With Maximum Probability" and their trade-offs?

**Q4:** What is the optimal code template for "Path With Maximum Probability" pattern?

**Q5:** What are the common mistakes in "Path With Maximum Probability"?

**Q6:** What is the time and space complexity of "Path With Maximum Probability"?

**Q7:** How should I approach "Path With Maximum Probability" in an interview?

**Q8:** What are the key optimization techniques for "Path With Maximum Probability"?

**Q9:** What follow-up questions might be asked for "Path With Maximum Probability"?

**Q10:** What similar problems share the same pattern as "Path With Maximum Probability"?

---

## 🔧 Answers

**A1:** What pattern does "Path With Maximum Probability" follow and when should I recognize it?

```
Pattern: Modified Dijkstra's Algorithm (NOT DFS!)

Recognition Signals:
✅ "Maximum probability path" → Shortest path variant
✅ Weighted graph with probability values [0,1]
✅ Need GLOBALLY optimal path (not just any path)
✅ Single source, single destination
✅ Undirected graph with positive weights

Key Insight: This is a shortest path problem where we MAXIMIZE
probability instead of minimizing distance!

When to use: Graph problems asking for "maximum/minimum path"
with optimal substructure property.
```

**A2:** What are the key insights and intuition for "Path With Maximum Probability"?

```
🧠 Key Insights:
💡 Pattern Misidentification: Looks like DFS but is actually Dijkstra's!
💡 Optimal Substructure: Best path to target contains best paths to intermediates
💡 Priority Processing: Always process highest probability path first
💡 Early Termination: First time reaching target = optimal (guaranteed)

🎯 Intuition:
- Natural approach: "Try all paths" → DFS thinking (WRONG!)
- Correct insight: "Find optimal efficiently" → Dijkstra's approach
- Mathematical insight: Probability multiplication has optimal substructure
- Visual understanding: Greedy choice of highest probability at each step

🔑 Mental Model:
"Always chase the most promising path first - when you reach the
target via max-heap, you've found the globally optimal solution."
```

**A3:** What are the different approaches for "Path With Maximum Probability" and their trade-offs?

```
Approach 1: DFS/BFS (Brute Force)
├── Description: Explore all paths, track maximum
├── Time: O(V!) | Space: O(V)
├── Pros: Easy to understand, handles all cases
└── Cons: Exponential time, explores unnecessary paths

Approach 2: Array + Sort (Suboptimal)
├── Description: Priority queue via array.sort()
├── Time: O(E² log E) | Space: O(V + E)
├── Pros: Correct algorithm, easier implementation
└── Cons: Inefficient sorting on every iteration

Approach 3: Dijkstra's + MaxHeap (Optimal)
├── Description: Proper heap-based priority queue
├── Time: O((V + E) log V) | Space: O(V + E)
├── Pros: Optimal complexity, handles large graphs
└── Cons: More complex heap implementation

💡 Progression: Exponential → Polynomial Inefficient → Polynomial Optimal
```

**A4:** What is the optimal code template for "Path With Maximum Probability"?

```javascript
// Modified Dijkstra's Template for Maximum Probability

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    let i = this.heap.length - 1;
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.heap[parent][0] >= this.heap[i][0]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      let left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;
      if (left < this.heap.length && this.heap[left][0] > this.heap[largest][0]) largest = left;
      if (right < this.heap.length && this.heap[right][0] > this.heap[largest][0]) largest = right;
      if (largest === i) break;
      [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
      i = largest;
    }
    return top;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function maxProbabilityPath(n, edges, succProb, start, end) {
  // 1. Build adjacency list
  const graph = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    const prob = succProb[i];
    graph[u].push([v, prob]);
    graph[v].push([u, prob]);
  }

  // 2. Dijkstra's with max-heap
  const visited = new Set();
  const pq = new MaxHeap();
  pq.push([1.0, start]);

  while (!pq.isEmpty()) {
    const [prob, node] = pq.pop();

    // Early termination - first time reaching target is optimal
    if (node === end) return prob;

    // Skip if already processed
    if (visited.has(node)) continue;
    visited.add(node);

    // Process neighbors
    for (const [neighbor, edgeProb] of graph[node]) {
      if (!visited.has(neighbor)) {
        pq.push([prob * edgeProb, neighbor]);
      }
    }
  }

  return 0; // No path exists
}
```

**A5:** What are the common mistakes in "Path With Maximum Probability"?

```
Common Mistakes:
❌ Pattern Misidentification: Thinking it's DFS when it's Dijkstra's
❌ Wrong Priority Queue: Using min-heap instead of max-heap
❌ Inefficient Implementation: array.sort() instead of proper heap
❌ Visited Timing: Marking visited at wrong time (though current works)
❌ Complexity Unawareness: Not knowing you're using O(E² log E) approach

Prevention:
✅ Ask yourself: "Do I need GLOBALLY optimal?" → Dijkstra's
✅ Remember: Maximum probability = max-heap priority queue
✅ Use proper heap for O((V+E) log V) complexity
✅ Mark visited immediately after popping from queue
✅ Always analyze and state your time complexity
```

**A6:** What is the time and space complexity of "Path With Maximum Probability"?

```
Time Complexity: O((V + E) log V)
- Building graph: O(V + E)
- Dijkstra's with heap: O((V + E) log V)
- Each heap operation: O(log V)
- Total heap operations: O(V + E)

Space Complexity: O(V + E)
- Adjacency list: O(V + E)
- Priority queue: O(V) worst case
- Visited set: O(V)
- Overall: O(V + E)

Common Mistake: Using array.sort() gives O(E² log E) time!
```

**A7:** How should I approach "Path With Maximum Probability" in an interview?

```
Interview Strategy:

Phase 1: Clarification (2-3 min)
- "Is this asking for the single path with maximum probability?"
- "Should I return the probability value or the actual path?"
- "Can I assume the graph is connected?"

Phase 2: Pattern Recognition (3-5 min)
- "This looks like a shortest path problem"
- "I need globally optimal solution, not just any path"
- "This is modified Dijkstra's - maximize instead of minimize"
- "I'll use max-heap priority queue"

Phase 3: Implementation (15-20 min)
- Start with MaxHeap class (or mention using library)
- Build adjacency list representation
- Implement Dijkstra's with early termination
- Handle edge cases (no path, start = end)

Phase 4: Analysis & Follow-ups (5 min)
- "Time: O((V+E) log V), Space: O(V+E)"
- "Could optimize with distance array instead of visited set"
- Handle follow-up questions confidently

Key Phrases: "Dijkstra's algorithm", "optimal substructure",
"priority queue", "early termination guaranteed optimal"
```

**A8:** What are the key optimization techniques for "Path With Maximum Probability"?

```
Optimization Techniques:
🔧 Proper Heap Implementation - Use MaxHeap vs array.sort()
   Benefit: O((V+E) log V) vs O(E² log E)

🔧 Distance Array vs Visited Set - Track best probability to each node
   Benefit: Prevents duplicate queue entries, more efficient

🔧 Early Termination - Return immediately when target reached
   Benefit: Guaranteed optimal, no need to process remaining queue

🔧 Adjacency List - Use array of arrays vs nested objects
   Benefit: Better cache locality, faster neighbor iteration

Advanced:
- Bidirectional Dijkstra's for very large graphs
- A* algorithm if heuristic available
- Graph preprocessing for multiple queries
```

**A9:** What follow-up questions might be asked for "Path With Maximum Probability"?

```
Follow-up Questions:
- "What if you need the K most probable paths?" → Use heap of size K
- "What if graph has negative probabilities?" → Problem constraints prevent this
- "How would you return the actual path?" → Track parent pointers in Dijkstra's
- "What if the graph is directed?" → Same algorithm, just build directed graph
- "How would you handle very large graphs?" → Discuss distributed algorithms
- "What's the difference between this and shortest path?" → Maximize vs minimize
- "Could you solve this with DP?" → Possible but less efficient than Dijkstra's

Expected Responses:
- Show understanding of Dijkstra's variations
- Explain when to use different algorithms
- Demonstrate knowledge of optimization trade-offs
```

**A10:** What similar problems share the same pattern as "Path With Maximum Probability"?

```
Similar Problems (Modified Dijkstra's):
- Network Delay Time (LeetCode 743) - Minimize time to reach all nodes
- Cheapest Flights Within K Stops (LeetCode 787) - Dijkstra's with constraints
- Swim in Rising Water (LeetCode 778) - Binary search + shortest path
- Path with Minimum Effort (LeetCode 1631) - Minimize maximum effort

Standard Dijkstra's Problems:
- Single Source Shortest Path - Classic application
- Course Schedule II - Topological sort variant
- Word Ladder - BFS/Dijkstra's on word graph

Pattern Template:
When you see "optimal path" with "maximize/minimize" some value,
think Dijkstra's algorithm with appropriate priority queue direction.

Key Recognition: Single source + optimal path + positive weights = Dijkstra's
```

---

## 📊 Study Schedule

### Daily (Days 1-3):

- Q1: Pattern Recognition - "Is this really DFS or Dijkstra's?"
- Q5: Common Mistakes - "Array sort vs proper heap"
- Q7: Interview Strategy - "How to communicate the approach"

### Weekly (Days 4-14):

- Q2: Core Insights - "Why Dijkstra's works here"
- Q4: Implementation - "MaxHeap + early termination"
- Q6: Complexity Analysis - "O((V+E) log V) explanation"

### Monthly (Days 15+):

- Q8: Optimizations - "Distance array vs visited set"
- Q9: Follow-ups - "K paths, directed graphs, etc."
- Q10: Pattern Transfer - "Apply to similar problems"

---

## 🎯 Success Metrics

Track your mastery:

- ✅ **Pattern Recognition**: Identify as Dijkstra's in <30 seconds
- ✅ **Algorithm Choice**: Explain why not DFS/BFS clearly
- ✅ **Implementation**: Code MaxHeap + Dijkstra's without bugs
- ✅ **Complexity**: State O((V+E) log V) and explain why
- ✅ **Interview Ready**: Handle "Why Dijkstra's?" confidently

_Master the pattern recognition - this separates good from great candidates!_ 🚀
