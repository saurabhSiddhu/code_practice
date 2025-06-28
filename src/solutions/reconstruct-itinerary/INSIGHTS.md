# Reconstruct Itinerary - Interview Notes

## 🔧 Pattern/Category

Graph_DFS_Eulerian_Path_Hierholzer_Algorithm

## 🔑 Key Insight

This is NOT a simple backtracking problem! The key insight is recognizing this as an **Eulerian Path** problem:

- **Trigger Words**: "Use all edges exactly once" + "guaranteed solution exists"
- **Algorithm Choice**: Hierholzer's Algorithm using post-order DFS with edge removal
- **Optimization**: Global ticket sorting automatically creates sorted adjacency lists

**The Magic**: Since an Eulerian path is guaranteed, we don't need expensive backtracking. We can greedily traverse edges and use post-order traversal to build the path.

**Pattern Recognition**: When you see "use all edges/tickets exactly once" with guaranteed solution, think Eulerian Path → Hierholzer's Algorithm.

## 🧠 Intuition Building

### How to Think About Eulerian Path Problems:

1. **Identify the constraint**: Must use every edge exactly once
2. **Identify the guarantee**: Solution is guaranteed to exist
3. **Choose algorithm**: Hierholzer's (post-order DFS) not backtracking
4. **Handle ordering**: Sort adjacency lists for lexicographical requirement

### Mental Model for Hierholzer's Algorithm:

```
Traditional thinking: Try all paths until one works (backtracking)
Correct thinking: Greedily follow edges, build path in post-order

Think of it like walking through a maze where you MUST use every hallway exactly once.
When you hit a dead end, you've found part of your final path.
```

### Questions to Ask Yourself:

- "Do I need to use all edges exactly once?" → Think Eulerian Path
- "Is a solution guaranteed?" → No backtracking needed
- "What ordering do I need?" → Sort adjacency lists appropriately

## ⚠️ Common Mistakes (Including Your Specific Errors)

### 🚨 **Algorithm Choice Mistakes:**

- **Using backtracking when unnecessary**: Your `solve()` method uses O(E!) backtracking with graph copying
  - **Learning**: Recognize Eulerian Path pattern to avoid expensive solutions
  - **Fix**: Use Hierholzer's algorithm with O(E log E) complexity

### 🚨 **Implementation Inefficiencies:**

- **Using `shift()` instead of `pop()`**: O(n) operation vs O(1)
  - **Learning**: Always prefer O(1) operations when possible
  - **Fix**: Use reverse sorting + `pop()` for efficiency

## 🎯 Critical Discovery: The Sorting Strategy Breakthrough

### What Was Discovered

```javascript
// The "obvious" approach most candidates use:
for (const source in graph) {
  graph[source].sort(); // Sort each adjacency list separately
}

// Your clever discovery:
tickets.sort(([source1, dest1], [source2, dest2]) => {
  if (source1 === source2) {
    return -dest1.localeCompare(dest2);
  }
  return -source1.localeCompare(source2);
});
// This automatically creates sorted adjacency lists during graph building!
```

### Why This Matters in Interviews

- **Shows Systems Thinking**: Understanding how data flows through the algorithm
- **Optimization Mindset**: Achieving the same result with fewer operations
- **Code Elegance**: Single sort vs multiple sorts

## 🚨 Algorithm Choice: The Make-or-Break Decision

### ❌ The Trap: Expensive Backtracking

```javascript
// What many candidates write (your solve() method):
function dfs(source, graph, usedTickets) {
  if (usedTickets === tickets.length) return [source];

  for (let i = 0; i < dests.length; i++) {
    // 💸 EXPENSIVE: Creating new graph copy for each path
    const newGraph = { ...graph, [source]: [...dests.slice(0, i), ...dests.slice(i + 1)] };
    const result = dfs(dest, newGraph, usedTickets + 1);
    // Time: O(E!) Space: O(E²)
  }
}
```

### ✅ The Insight: Recognize Eulerian Path

```javascript
// What expert candidates recognize:
// "Use all edges exactly once" + "guaranteed solution" = Eulerian Path
// Therefore: Use Hierholzer's Algorithm, not backtracking!
```

## 🧠 Pattern Recognition Framework

### Trigger Words → Algorithm Mapping

| **Trigger Phrase**           | **Think**              | **Algorithm**           |
| ---------------------------- | ---------------------- | ----------------------- |
| "Use all edges exactly once" | Eulerian Path          | Hierholzer's            |
| "Guaranteed solution exists" | No backtracking needed | DFS with edge removal   |
| "Lexicographically smallest" | Greedy choice works    | Sort + greedy traversal |

### Interview Red Flags

- ❌ Using backtracking when Eulerian path is guaranteed
- ❌ Not recognizing the graph theory pattern
- ❌ Using O(n) operations when O(1) exists (`shift()` vs `pop()`)
- ❌ Complex graph copying instead of simple edge removal

## 🔧 Implementation Mastery: Stack vs Recursion

### The Evolution of Thinking

```javascript
// Level 1: Backtracking (Brute Force)
// Time: O(E!), Space: O(E²) - graph copying

// Level 2: Recursive Hierholzer's
// Time: O(E log E), Space: O(E) - but recursion overhead

// Level 3: Stack-based Hierholzer's (Optimal)
// Time: O(E log E), Space: O(E) - no recursion overhead
```

### Why Stack Wins

```javascript
// Recursive: Hidden complexity, stack overflow risk
function dfs(source) {
  // Recursion uses system stack
  while (graph[source].length) {
    dfs(graph[source].pop());
  }
  path.push(source);
}

// Stack: Explicit control, cleaner debugging
while (stack.length > 0) {
  let curr = stack[stack.length - 1];
  if (graph[curr] && graph[curr].length > 0) {
    stack.push(graph[curr].pop()); // Go deeper
  } else {
    path.push(stack.pop()); // Post-order addition
  }
}
```

## 🎭 Interview Scenario Analysis

### How the Discussion Would Go

**Interviewer**: "Walk me through your approach."

**❌ Weak Response**: "I'll try all possible paths using backtracking..."

- Shows lack of pattern recognition
- Leads to inefficient solution
- Misses the graph theory insight

**✅ Strong Response**: "This is an Eulerian path problem. Since we need to use all edges exactly once and a solution is guaranteed, I'll use Hierholzer's algorithm..."

- Demonstrates pattern recognition
- Shows theoretical knowledge
- Leads to optimal solution

### Follow-up Questions They'll Ask

1. **"Why not backtracking?"** → "Because Eulerian path is guaranteed, no need to explore invalid paths"
2. **"How do you handle lexicographical ordering?"** → "Sort adjacency lists, use reverse sort + pop() for efficiency"
3. **"Stack vs recursion trade-offs?"** → "Stack avoids recursion overhead and stack overflow"

## 📋 Template/Pattern

```javascript
// Hierholzer's Algorithm Pattern for Eulerian Path:
// 1. Build adjacency graph from edges
// 2. Sort each adjacency list (reverse for pop() efficiency)
// 3. Use stack-based DFS with post-order path building
// 4. Reverse final path

function findEulerianPath(edges, start) {
  // Build graph with sorted adjacency lists
  const graph = {};
  for (const [src, dst] of edges) {
    (graph[src] ||= []).push(dst);
  }
  for (const src in graph) {
    graph[src].sort().reverse(); // For pop() efficiency
  }

  // Hierholzer's algorithm
  const stack = [start];
  const path = [];

  while (stack.length > 0) {
    const curr = stack[stack.length - 1];
    if (graph[curr] && graph[curr].length > 0) {
      stack.push(graph[curr].pop());
    } else {
      path.push(stack.pop());
    }
  }

  return path.reverse();
}
```

## 🔄 Different Ways to Solve

1. **Backtracking with Graph Copying**: Try all paths recursively - O(E!) time, O(E²) space
2. **Hierholzer's Recursive**: Post-order DFS with edge removal - O(E log E) time, O(E) space
3. **Hierholzer's Stack**: Iterative version using explicit stack - O(E log E) time, O(E) space
4. **Optimized Sorting**: Global ticket sort to create sorted adjacency lists automatically

## 🌍 Real World Analogies

- **Tourist Route Planning**: Visit all attractions (edges) exactly once, return to start
- **Mail Delivery**: Traverse all streets exactly once in a neighborhood
- **Circuit Board Tracing**: Draw connections without lifting pen, each wire exactly once
- **GPS Route Optimization**: Use each road segment exactly once for complete coverage

## 🔗 Similar Problems

- **Word Ladder II**: Path reconstruction with DFS
- **Course Schedule**: Cycle detection and topological sorting
- **Alien Dictionary**: Topological sorting with lexicographical constraints
- **Eulerian Circuit**: Similar but must return to starting point
- **Hamiltonian Path**: Visit all vertices (not edges) exactly once

## ❓ Follow-up Questions

- **"What if we need to visit vertices instead of edges?"** → Hamiltonian Path (much harder, NP-complete)
- **"What if we need to return to start?"** → Eulerian Circuit (check in-degree = out-degree for all nodes)
- **"What if solution isn't guaranteed?"** → Check Eulerian path conditions first
- **"How would you handle larger datasets?"** → Discuss space optimizations and streaming approaches
- **"What if we want all possible valid itineraries?"** → Modified DFS with path collection

## 💡 Interview Success Tips

### Technical Points to Mention:

1. **Pattern Recognition**: "This is an Eulerian Path problem, not general path finding"
2. **Algorithm Knowledge**: "I'll use Hierholzer's algorithm for optimal complexity"
3. **Implementation Choice**: "Stack-based approach avoids recursion overhead"
4. **Optimization Insight**: "Global sorting creates sorted adjacency lists efficiently"

### Follow-up Discussion Points:

- **Complexity Analysis**: Why Hierholzer's is O(E log E) vs backtracking's O(E!)
- **Graph Theory**: Conditions for Eulerian path existence
- **Data Structure Choices**: Array vs Set for adjacency lists, pop() vs shift()
- **Edge Cases**: Handling disconnected graphs, invalid inputs
