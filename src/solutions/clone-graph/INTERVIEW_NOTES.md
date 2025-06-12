# clone-graph - Interview Notes

## 🔧 Pattern/Category

Graph Traversal + Hash Map (DFS/BFS with memoization)

## 🔑 Key Insight

Need to track already cloned nodes to avoid infinite loops and ensure each node is cloned exactly once

## 🧠 Intuition

Think of it as making a photocopy of a network diagram - you need to copy each node and all its connections, but make sure you don't copy the same node twice

## ⚠️ Common Mistake

- Forgetting to handle cycles (infinite recursion)
- Not maintaining the original graph structure
- Creating multiple copies of the same node

## 📋 Template/Pattern

```javascript
// Graph Clone Template:
// 1. Use HashMap to track original -> clone mapping
// 2. Clone current node if not already cloned
// 3. Recursively clone all neighbors
// 4. Add cloned neighbors to current clone's neighbor list
```

## 🔄 Different Ways to Solve

1. **DFS (Recursive)**: Simple and intuitive - O(V+E) time/space
2. **BFS (Iterative)**: Uses queue, avoids recursion stack - O(V+E) time/space
3. **DFS (Iterative)**: Uses stack instead of recursion - O(V+E) time/space

## 🌍 Real World Analogies

- **Organization Chart Copying**: Clone entire company structure with all reporting relationships
- **Social Network Backup**: Copy user profiles and all their connections
- **File System Mirror**: Clone directory structure with all symlinks intact

## 🔗 Similar Problems

- **Copy List with Random Pointer** - Same cloning concept for linked lists
- **Clone Binary Tree** - Tree version of the cloning pattern
- **Deep Copy of Graph** - Generic graph cloning
- **Serialize/Deserialize Graph** - Related graph traversal + reconstruction
- **Course Schedule** - Graph traversal with cycle detection

## ❓ Follow-up Questions

- "What if graph has multiple components?" → Same approach works
- "How would you handle a directed graph?" → Same algorithm applies
- "What if nodes have additional properties?" → Clone all properties
- "Can you do it iteratively?" → Use BFS/DFS with stack
- "How to handle very large graphs?" → Consider memory optimization

## 📊 Complexity

- **Time**: O(V + E) where V = vertices, E = edges
- **Space**: O(V) for the hash map + O(H) for recursion stack height

## 🎯 Interview Tips

- Start with simple example (single node, then 2 connected nodes)
- Emphasize the need to avoid infinite loops
- Discuss both DFS and BFS approaches
- Follow-up: "What if graph is disconnected?" (same approach works)

## 📅 Solved On

12/6/2025

---

_These notes will help you recognize and solve similar problems in interviews_
