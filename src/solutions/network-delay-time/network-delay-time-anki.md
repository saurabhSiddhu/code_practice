# 🎯 Anki Cards for Network Delay Time

*Generated on: 6/28/2025*

---

## 📚 Quick Reference

**Problem:** Network Delay Time  
**Pattern:** Dijkstra's Algorithm / Single-Source Shortest Path  
**Difficulty:** Medium  
**LeetCode:** https://leetcode.com/problems/network-delay-time/

---

## 🔧 Questions

**Q1:** What pattern does "Network Delay Time" follow and when should I recognize it?

**Q2:** What are the key insights and intuition for "Network Delay Time"?

**Q3:** What are the different approaches for "Network Delay Time" and their trade-offs?

**Q4:** What is the optimal code template for "Network Delay Time" pattern?

**Q5:** What are the common mistakes in "Network Delay Time"?

**Q6:** What is the time and space complexity of "Network Delay Time"?

**Q7:** How should I approach "Network Delay Time" in an interview?

**Q8:** What are the key optimization techniques for "Network Delay Time"?

**Q9:** What follow-up questions might be asked for "Network Delay Time"?

**Q10:** What similar problems share the same pattern as "Network Delay Time"?

---

## 🔧 Answers

**A1:** What pattern does "Network Delay Time" follow and when should I recognize it?

```
Pattern: Single-Source Shortest Path (Dijkstra's Algorithm)

Recognition Signals:
✅ Weighted directed graph with non-negative weights
✅ Find shortest path from one source to all nodes
✅ "Minimum time/cost" from single starting point
✅ Need to reach ALL nodes (not just one target)

When to use: Single-source shortest path with non-negative weights
```

**A2:** What are the key insights and intuition for "Network Delay Time"?

```
🧠 Key Insights:
💡 Need shortest path from source K to ALL nodes
💡 Answer = maximum of all shortest distances (last node to receive signal)
💡 Dijkstra gives optimal solution for non-negative weights
💡 If any node unreachable, return -1

🎯 Intuition:
- Natural approach: BFS might work but doesn't handle weights optimally
- Mathematical insight: Greedy selection of closest unvisited node
- Visual understanding: Signal spreads like ripples, taking optimal paths
- Real-world analogy: Network packet routing - find fastest path to all destinations

🔑 Mental Model:
"Find shortest distance to every node, return the maximum (last to receive signal)"
```

**A3:** What are the different approaches for "Network Delay Time" and their trade-offs?

```
Approach 1: Bellman-Ford Algorithm
├── Description: Relax all edges V-1 times
├── Time: O(V × E) | Space: O(V)
├── Pros: Handles negative weights, simple implementation
└── Cons: Slower than needed (no negative weights here)

Approach 2: Dijkstra with Array (Simple)
├── Description: Find minimum distance node by linear search
├── Time: O(V²) | Space: O(V)
├── Pros: Simple implementation, good for dense graphs
└── Cons: Quadratic time, inefficient for sparse graphs

Approach 3: Dijkstra with Priority Queue (Optimal)
├── Description: Use min-heap to efficiently get closest node
├── Time: O((V + E) log V) | Space: O(V + E)
├── Pros: Optimal for sparse graphs, standard implementation
└── Cons: Slightly more complex with heap operations

Approach 4: Floyd-Warshall (Overkill)
├── Description: All-pairs shortest path algorithm
├── Time: O(V³) | Space: O(V²)
├── Pros: Finds all-pairs distances
└── Cons: Massive overkill for single-source problem

💡 Progression: Bellman-Ford → Simple Dijkstra → Optimized Dijkstra
```

**A4:** What is the optimal code template for "Network Delay Time" pattern?

```javascript
// Dijkstra with Priority Queue (Optimal)
function networkDelayTime(times, n, k) {
    // Build adjacency list
    const graph = Array.from({length: n + 1}, () => []);
    for (const [u, v, w] of times) {
        graph[u].push([v, w]); // [neighbor, weight]
    }
    
    // Distance array initialized to infinity
    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0; // Starting node distance is 0
    
    // Min-heap: [distance, node]
    const pq = [[0, k]];
    
    while (pq.length > 0) {
        // Get node with minimum distance
        pq.sort((a, b) => a[0] - b[0]);
        const [currentDist, u] = pq.shift();
        
        // Skip if we've found a better path already
        if (currentDist > dist[u]) continue;
        
        // Update distances to neighbors
        for (const [v, weight] of graph[u]) {
            const newDist = dist[u] + weight;
            if (newDist < dist[v]) {
                dist[v] = newDist;
                pq.push([newDist, v]);
            }
        }
    }
    
    // Find maximum distance (excluding index 0)
    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1; // Unreachable node
        maxTime = Math.max(maxTime, dist[i]);
    }
    
    return maxTime;
}

// Optimized with proper Min-Heap (if available)
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp();
    }
    
    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }
    
    bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx][0] <= this.heap[idx][0]) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }
    
    bubbleDown() {
        let idx = 0;
        while (2 * idx + 1 < this.heap.length) {
            const leftChild = 2 * idx + 1;
            const rightChild = 2 * idx + 2;
            let smallest = leftChild;
            
            if (rightChild < this.heap.length && 
                this.heap[rightChild][0] < this.heap[leftChild][0]) {
                smallest = rightChild;
            }
            
            if (this.heap[idx][0] <= this.heap[smallest][0]) break;
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}
```

**A5:** What are the common mistakes in "Network Delay Time"?

```
❌ Common Mistakes:
- Using BFS instead of Dijkstra (doesn't handle weights properly)
- Forgetting to check if all nodes are reachable
- Not handling 1-indexed nodes correctly (nodes 1 to n)
- Returning sum instead of maximum of distances
- Not initializing distances to infinity
- Processing same node multiple times without distance check

✅ Correct Approach:
- Use Dijkstra for weighted shortest path
- Initialize distances to infinity, source to 0
- Handle 1-indexed nodes (ignore index 0)
- Return maximum distance among all reachable nodes
- Return -1 if any node unreachable
- Skip nodes if current distance > recorded distance
```

**A6:** What is the time and space complexity of "Network Delay Time"?

```
Dijkstra with Priority Queue:
📊 Time Complexity: O((V + E) log V)
   - Each node visited once: O(V log V) from heap operations
   - Each edge relaxed once: O(E log V) from heap insertions
   - Overall: O((V + E) log V)

📊 Space Complexity: O(V + E)
   - Adjacency list: O(V + E)
   - Distance array: O(V)
   - Priority queue: O(V) in worst case

Simple Dijkstra (without heap):
📊 Time Complexity: O(V²)
   - Finding minimum distance node: O(V) × V iterations
   - Better for dense graphs where E ≈ V²

📊 Space Complexity: O(V + E)
   - Adjacency list dominates space usage
```

**A7:** How should I approach "Network Delay Time" in an interview?

```
🎯 Interview Strategy:
1. "This is asking for shortest path from one source to all nodes"
2. "I need the maximum of all shortest distances (last node to receive signal)"
3. "Since weights are non-negative, Dijkstra's algorithm is optimal"
4. "I'll use a priority queue to efficiently get the closest unvisited node"
5. "If any node is unreachable, I return -1"

🗣️ Communication Tips:
- Identify this as single-source shortest path problem
- Explain why Dijkstra is appropriate (non-negative weights)
- Walk through the greedy selection process
- Show how priority queue optimizes the algorithm
- Discuss the "maximum distance" insight for the answer

🎯 Key Points to Mention:
- Handling 1-indexed nodes
- Why we need maximum, not sum of distances
- Early termination possibilities
- Alternative algorithms and their trade-offs
```

**A8:** What are the key optimization techniques for "Network Delay Time"?

```
🚀 Optimization Techniques:
1. Priority Queue: Use min-heap instead of linear search for closest node
2. Early Termination: Stop when all nodes processed or target reached
3. Distance Checking: Skip nodes if current distance > recorded distance
4. Efficient Graph Representation: Adjacency list for sparse graphs

🧠 Advanced Optimizations:
- Fibonacci Heap: Theoretical O((V + E) + V log V) but complex
- Bidirectional Dijkstra: If we only need distance to specific nodes
- A* Algorithm: If we have heuristic information about goal

🔄 Implementation Optimizations:
- Custom heap implementation vs library sort()
- Array-based heap vs object-based
- In-place distance updates when possible
```

**A9:** What follow-up questions might be asked for "Network Delay Time"?

```
🤔 Common Follow-ups:
1. "What if edges have negative weights?" → Bellman-Ford algorithm
2. "How to find the actual path, not just distance?" → Parent tracking
3. "What about all-pairs shortest paths?" → Floyd-Warshall
4. "Can you handle dynamic edge updates?" → Dynamic algorithms
5. "What if we want K shortest paths?" → Modified Dijkstra
6. "How to handle very large graphs?" → Approximation algorithms

🎯 Advanced Variations:
- Network delay with multiple sources
- Finding critical edges that increase delay most
- Minimum spanning tree for network design
- Handling network failures and rerouting
```

**A10:** What similar problems share the same pattern as "Network Delay Time"?

```
🔗 Related Problems:
1. Cheapest Flights Within K Stops → Shortest path with constraints
2. Path with Maximum Probability → Modified Dijkstra with probabilities
3. Minimum Cost to Make at Least One Valid Path → Dijkstra variant
4. Course Schedule III → Priority queue optimization
5. Find the City With Smallest Number of Neighbors → All-pairs shortest path
6. Swim in Rising Water → Binary search + path finding
7. Robot Room Cleaner → Graph traversal with state

🎯 Pattern Family: "Single-Source Shortest Path"
- Any problem requiring shortest/optimal path from one source
- Weighted graph problems with non-negative weights
- Network optimization and routing problems
- Time/cost minimization from single starting point
```

---

## 🎯 Memory Aids

**🧠 Remember:** "Dijkstra for single-source shortest path, return max distance!"

**🔑 Key Insight:** Use priority queue to always process closest unvisited node

**⚡ Quick Check:** Non-negative weights? Use Dijkstra. Need all distances? Return maximum.
