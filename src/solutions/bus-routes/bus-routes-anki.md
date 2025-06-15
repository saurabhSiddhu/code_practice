# 🎯 Anki Cards for Bus Routes

_Generated on: 6/15/2025_

---

## 📚 Quick Reference

**Problem:** Bus Routes  
**Pattern:** BFS with Route Graph  
**Difficulty:** Hard  
**LeetCode:** https://leetcode.com/problems/bus-routes/

---

## ❓ Questions

**Q1:** What pattern does "Bus Routes" follow and when should I recognize it?

**Q2:** What are the key insights and intuition for "Bus Routes"?

**Q3:** What are the different approaches for "Bus Routes" and their trade-offs?

**Q4:** What is the universal code template for solving "Bus Routes"?

**Q5:** What are the common mistakes in "Bus Routes"?

**Q6:** What is the time and space complexity of "Bus Routes"?

**Q7:** How should I approach "Bus Routes" in an interview?

**Q8:** What are the key optimization techniques for "Bus Routes"?

**Q9:** What follow-up questions might be asked for "Bus Routes"?

**Q10:** What similar problems share the same pattern as "Bus Routes"?

---

## ✅ Answers

**A1:** What pattern does "Bus Routes" follow and when should I recognize it?

```
Pattern: BFS with Route Graph (Super-edge expansion)

Recognition Signals:
✅ Minimum transfers/steps needed
✅ Groups/clusters of connected items
✅ One action gives access to multiple states
✅ Connections are transitive (A→B, B→C means A→C)

When to use: When taking one "route/action" gives you access to ALL items in that group

Key Insight: Think of routes as "super-edges" that connect ALL stops on that route
```

**A2:** What are the key insights and intuition for "Bus Routes"?

```
💡 Key Insight: Route-to-Route thinking, not Stop-to-Stop!

🧠 Intuition:
- Natural approach: BFS from source stop to target stop
- Why it works: Each bus route acts as a "teleporter" connecting all its stops
- Visual understanding: Routes are super-edges in a graph
- Real-world analogy: Taking a bus gives you access to ALL stops on that route

🔑 Mental Model:
"One bus ride = access to ALL stops on that route"
Think: Stop → Route → All connected stops (not Stop → Adjacent Stop)
```

**A3:** What are the different approaches for "Bus Routes" and their trade-offs?

```
Approach 1: [Stop-to-Stop BFS]
├── Description: Build graph where each stop connects to all other stops on same routes
├── Time: O(R×S²) | Space: O(R×S²)
├── Pros: Intuitive, direct BFS on stops
└── Cons: Massive space complexity, inefficient for dense networks

Approach 2: [Route-to-Route BFS]
├── Description: Build route graph, BFS on routes, track stops per route
├── Time: O(R²×S) | Space: O(R²)
├── Pros: Much better space complexity, elegant approach
└── Cons: Less intuitive, requires route-level thinking

Approach 3: [Stop BFS with Route Expansion]
├── Description: BFS on stops but expand via routes (no explicit graph)
├── Time: O(R×S) | Space: O(R×S)
├── Pros: Optimal complexity, space efficient
└── Cons: Most complex implementation

💡 Progression: Stop-Graph → Route-Graph → Route-Expansion
```

**A4:** What is the universal code template for solving "Bus Routes"?

```javascript
// Route-to-Route BFS Template (Optimal approach)

function numBusesToDestination(routes, source, target) {
  // 1. Input validation and edge cases
  if (source === target) return 0;
  if (!routes || routes.length === 0) return -1;

  // 2. Build route-to-route graph
  const routeGraph = new Map(); // route -> set of connected routes
  const stopToRoutes = new Map(); // stop -> set of routes containing this stop

  // Map stops to routes
  for (let i = 0; i < routes.length; i++) {
    routeGraph.set(i, new Set());
    for (const stop of routes[i]) {
      if (!stopToRoutes.has(stop)) {
        stopToRoutes.set(stop, new Set());
      }
      stopToRoutes.get(stop).add(i);
    }
  }

  // Build route connections (routes that share stops)
  for (const routeSet of stopToRoutes.values()) {
    const routeArray = Array.from(routeSet);
    for (let i = 0; i < routeArray.length; i++) {
      for (let j = i + 1; j < routeArray.length; j++) {
        routeGraph.get(routeArray[i]).add(routeArray[j]);
        routeGraph.get(routeArray[j]).add(routeArray[i]);
      }
    }
  }

  // 3. BFS on routes
  const queue = [];
  const visited = new Set();

  // Start from all routes containing source
  if (stopToRoutes.has(source)) {
    for (const route of stopToRoutes.get(source)) {
      queue.push([route, 1]); // [routeIndex, transfers]
      visited.add(route);
    }
  }

  // BFS
  while (queue.length > 0) {
    const [currentRoute, transfers] = queue.shift();

    // Check if current route contains target
    if (routes[currentRoute].includes(target)) {
      return transfers;
    }

    // Explore connected routes
    for (const nextRoute of routeGraph.get(currentRoute)) {
      if (!visited.has(nextRoute)) {
        visited.add(nextRoute);
        queue.push([nextRoute, transfers + 1]);
      }
    }
  }

  return -1;
}

// Key Pattern: Route-graph BFS with super-edge expansion
```

**A5:** What are the common mistakes in "Bus Routes"?

```
❌ Logic Mistakes:
- Building stop-to-stop graph instead of route-to-route
- Forgetting that one bus ride covers ALL stops on that route
- Not handling source === target edge case
- Counting stops instead of bus transfers

❌ Implementation Mistakes:
- Using arrays instead of Sets for O(1) lookup
- Building dense stop-to-stop adjacency matrix
- Not properly connecting routes that share stops
- Wrong BFS initialization (should start from all source routes)

❌ Optimization Mistakes:
- Building unnecessary explicit graphs when route expansion works
- Not using early termination when target found
- Inefficient data structure choices (Array vs Set vs Map)

✅ Prevention Strategy:
- Visualize: Route = super-edge connecting ALL its stops
- Remember: We count bus transfers, not stop visits
- Always check: Does route contain both source and target? → 1 transfer
```

**A6:** What is the time and space complexity of "Bus Routes"?

```
⏰ Time Complexity: O(R²×S) for route-graph approach
Analysis:
- Building stop-to-route mapping: O(R×S)
- Building route-to-route graph: O(R²×S) worst case
- BFS on routes: O(R²) for edges + O(R×S) for checking stops

💾 Space Complexity: O(R²) for route-graph approach
Analysis:
- Route-to-route graph: O(R²) worst case (all routes connected)
- Stop-to-route mapping: O(R×S)
- BFS structures: O(R)

🔄 Trade-offs:
- Route-graph: Better space than stop-graph, cleaner logic
- Route-expansion: O(R×S) time/space but more complex implementation
- Stop-graph: O(R×S²) space - avoid this!

Best Choice: Route-graph for interviews (good complexity + clear logic)
```

**A7:** How should I approach "Bus Routes" in an interview?

```
🎯 Interview Strategy (Google-style):

Phase 1: Understanding (3-5 min)
- "So we need minimum bus transfers from source to target?"
- "Each route covers multiple stops, and we can board at any stop?"
- "We're counting transfers, not total stops visited?"
- Walk through examples: routes=[[1,2,7],[3,6,7]], source=1, target=6

Phase 2: Approach (5-8 min)
- "I see this as a BFS problem for minimum transfers"
- "Key insight: Think route-to-route, not stop-to-stop"
- "One bus ride gives access to ALL stops on that route"
- "Build route graph, then BFS on routes"

Phase 3: Implementation (15-20 min)
- Start with data structure setup (route graph, stop mapping)
- Code route connections carefully
- Implement BFS with proper initialization
- Handle edge cases (source == target, no solution)

Phase 4: Verification (3-5 min)
- Test with provided examples
- Verify complexity: O(R²×S) time, O(R²) space
- Discuss optimization: route expansion approach
```

**A8:** What are the key optimization techniques for "Bus Routes"?

```
🔧 Common Optimizations:
- Early termination: Return as soon as target route found
- Bidirectional BFS: Search from both source and target routes
- Route expansion: Avoid building explicit route graph (O(R×S) space)
- Set operations: Use Sets for O(1) contains/add operations

🚀 Advanced Techniques:
- Route pruning: Skip routes that don't lead to target
- Stop frequency analysis: Prioritize routes with common stops
- Memory optimization: Use bit manipulation for visited tracking

💡 Optimization Mindset:
- The route-graph approach is usually optimal for interviews
- Route expansion saves space but adds implementation complexity
- Focus on correctness first, then optimize if asked
```

**A9:** What follow-up questions might be asked for "Bus Routes"?

```
🔄 Constraint Variations:
- "What if we want the actual route sequence?" → Track parent pointers in BFS
- "What if routes can change dynamically?" → Online algorithm design
- "What if there are costs per route?" → Dijkstra instead of BFS

🔄 Requirement Extensions:
- "What if we need all shortest paths?" → Collect all paths of minimum length
- "What if some stops are blocked?" → Filter routes during construction
- "What if we can walk between nearby stops?" → Add walking edges

🔄 System Design:
- "How to scale for a city with 10,000 routes?" → Precompute route graph, caching
- "What if queries are real-time?" → Preprocess and store shortest paths
- "How to handle route updates?" → Incremental graph updates
```

**A10:** What similar problems share the same pattern as "Bus Routes"?

```
Similar Problems (BFS with Super-edge expansion):
- Word Ladder II: Each transformation gives access to multiple next words
- Minimum Genetic Mutation: Mutations in gene banks
- Sliding Puzzle: Each move affects multiple positions

🎯 Pattern Recognition:
- Core similarity: One action gives access to multiple states/positions
- Key differences: What constitutes a "route" or "group"
- Template adaptation: Replace routes with transformation groups

📚 Study Strategy:
- Master the "super-edge" concept: one action → multiple accessible states
- Practice identifying when direct state-to-state is inefficient
- Focus on group-based thinking rather than individual state transitions

Universal Pattern: When problem has "groups" that internally connect all members
```

---

## 📊 Study Schedule

### Daily (Days 1-3):

- Q1: Pattern Recognition - "Super-edge" concept
- Q5: Common Mistakes - Route vs Stop thinking
- Q7: Interview Strategy - Route-graph approach

### Weekly (Days 4-14):

- Q2: Key Insights - Mental model mastery
- Q6: Complexity Analysis - Route-graph trade-offs
- Q8: Optimization Techniques - Bidirectional BFS

### Monthly (Days 15+):

- Q3: Multiple Approaches - Compare all 3 methods
- Q9: Follow-up Questions - Advanced variations
- Q10: Similar Problems - Pattern generalization

---

## 🎯 Success Metrics

Track your mastery:

- ✅ **Pattern Recognition**: Identify "super-edge" concept in <30 seconds
- ✅ **Approach**: Explain route-graph approach clearly
- ✅ **Implementation**: Code route-graph BFS without major bugs
- ✅ **Complexity**: Analyze O(R²×S) time, O(R²) space correctly
- ✅ **Interview Ready**: Handle follow-ups about optimizations confidently

_This Anki deck builds intuition for super-edge BFS patterns!_ 🚀
