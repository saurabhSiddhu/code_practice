# Reorder Routes To Make All Paths Lead To The City Zero - Interview Notes

## 🔧 Pattern/Category

**Tree Traversal + Graph Transformation** (DFS/BFS on bidirectional graph)

## 🔑 Key Insight

**Transform directed graph into bidirectional graph with edge labels!** For each original edge `[a,b]`, create:

- `a → b` with weight `1` (needs reversal if traversed)
- `b → a` with weight `0` (no reversal needed if traversed)

Then traverse from city 0 and sum the weights - this counts exactly the reversals needed!

## 🧠 Intuition

"I need to reach every city from city 0. If I encounter an original edge pointing away from my traversal direction, I need to reverse it. If I encounter a reverse edge (going toward city 0), I don't need to reverse anything."

**Mental Model**: Think of roads with tolls - original edges cost 1 (reversal), reverse edges cost 0.

## ⚠️ Common Mistake

- **Confusing edge directions**: Marking reverse edges as needing reversal instead of original edges
- **Missing the bidirectional insight**: Trying to work with only the original directed graph
- **Overthinking**: Not recognizing this is just tree traversal with weighted edges
- **Wrong traversal**: Starting from wrong node or not visiting all nodes

## 📋 Template/Pattern

```javascript
// Bidirectional Graph + Tree Traversal Pattern:
// 1. Build bidirectional graph with edge weights (reversal flags)
// 2. Traverse from root (city 0) using DFS or BFS
// 3. For each unvisited neighbor, add weight to total
// 4. Return total weight (number of reversals needed)

function solve({ n, connections }) {
  // Step 1: Build bidirectional graph
  let graph = Array.from({ length: n }, () => []);
  for (const [from, to] of connections) {
    graph[from].push([to, 1]); // Original edge needs reversal
    graph[to].push([from, 0]); // Reverse edge doesn't
  }

  // Step 2: Traverse and count
  let reversals = 0;
  let visited = new Set();
  let stack = [0]; // or queue for BFS

  while (stack.length > 0) {
    let current = stack.pop(); // or shift() for BFS
    visited.add(current);

    for (const [neighbor, needReversal] of graph[current]) {
      if (!visited.has(neighbor)) {
        reversals += needReversal;
        stack.push(neighbor); // or push() for BFS
      }
    }
  }

  return reversals;
}
```

## 🔄 Different Ways to Solve

1. **DFS with Stack** - O(n) time, O(height) space - **Optimal for most cases**
2. **BFS with Queue** - O(n) time, O(width) space - Good alternative, same correctness
3. **Recursive DFS** - O(n) time, O(height) stack space - Clean but risk of stack overflow
4. **Union-Find** - Overkill for this problem, worse complexity

## 🌍 Real World Analogies

- **Traffic Flow**: You're at city 0 and need all roads to eventually lead to you. Count how many one-way streets need to be flipped.
- **Water System**: Water flows from city 0 to all cities. Count pipes that need reversal.
- **Organization Chart**: You're the CEO (city 0) and need all reporting lines to flow up to you.

## 🔗 Similar Problems

- **Tree Problems**: Any tree traversal where you need to visit all nodes from a root
- **All Paths Lead to Rome**: Conceptually identical - finding minimum changes to direct all paths
- **Graph Connectivity**: Problems where you need to ensure reachability from a source

## ❓ Follow-up Questions

- **"Can you use BFS instead of DFS?"** → "Yes! Same O(n) time, might use more space but equally correct for trees."
- **"What if there were cycles?"** → "Need Union-Find or more complex cycle detection, but problem guarantees tree structure."
- **"How would you handle weighted edges?"** → "Same approach, just track both reversal cost and edge weights."
- **"What if multiple cities needed to reach all others?"** → "Multi-source traversal or find optimal root first."
- **"Space optimization for very deep trees?"** → "Iterative DFS preferred over recursive to avoid stack overflow."

## 🎯 Interview Success Keys

1. **Recognize the bidirectional transformation** immediately
2. **Explain why both DFS and BFS work** (tree property)
3. **Justify DFS choice** for better space complexity
4. **Handle edge cases** (single node, linear chain)
5. **Articulate the "reversal counting" insight** clearly
