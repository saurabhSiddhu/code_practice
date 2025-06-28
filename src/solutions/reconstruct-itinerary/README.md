# Reconstruct Itinerary

<div align="center">
  <a href="https://leetcode.com/problems/reconstruct-itinerary/description/">
    <img src="https://img.shields.io/badge/LeetCode-Hard-red" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/reconstruct-itinerary/description/">
    <img src="https://img.shields.io/badge/Pattern-DFS-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                                              |
| -------------- | ------------------------------------------------------------------------------------ |
| **Difficulty** | Hard                                                                                 |
| **Pattern**    | DFS                                                                                  |
| **Tags**       | `Graph`                                                                              |
| **LeetCode**   | [View on LeetCode](https://leetcode.com/problems/reconstruct-itinerary/description/) |

## 📝 Problem Description

You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.
ckets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.All of the ti
erary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].For example, the itin
m at least one valid itinerary. You must use all the tickets once and only once.You may assume all tickets for

## 💡 Solution Approaches

### 🎯 Three Different Implementations

#### 1. **Backtracking with Graph Copying** (`solve()`)

- **Approach**: Classic backtracking with deep graph copying for each recursive call
- **Time**: O(E!) worst case - explores all possible paths
- **Space**: O(E²) due to graph copying
- **Use Case**: When you need to understand backtracking fundamentals

#### 2. **Hierholzer's Algorithm - Recursive** (`solveAlternative()`)

- **Approach**: Post-order DFS with edge removal (Eulerian path)
- **Time**: O(E log E) for sorting + O(E) for traversal
- **Space**: O(E) for graph + O(E) for recursion stack
- **Key Insight**: Problem guarantees Eulerian path exists, so no backtracking needed

#### 3. **Hierholzer's Algorithm - Stack** (`solveWithStack()`)

- **Approach**: Iterative version using explicit stack
- **Time**: O(E log E) for sorting + O(E) for traversal
- **Space**: O(E) for graph + O(E) for stack
- **Best Choice**: Most memory efficient, no recursion overhead

### 🧠 Core Intuition

This is an **Eulerian Path** problem in disguise:

- Must visit every edge exactly once
- Guaranteed solution exists
- Need lexicographically smallest path

**Key Recognition**: When you see "use all edges exactly once", think Hierholzer's algorithm, not expensive backtracking.

### 🔍 Critical Implementation Details

#### **Sorting Strategy** (The Clever Discovery)

```javascript
// Global sort achieves per-node sorting automatically
tickets.sort(([source1, dest1], [source2, dest2]) => {
  if (source1 === source2) {
    return -dest1.localeCompare(dest2); // Reverse for pop()
  }
  return -source1.localeCompare(source2);
});
```

**Why This Works**: Tickets with same source get grouped together with destinations in reverse lex order, perfect for `pop()` operations.

#### **Stack vs Recursion Pattern**

```javascript
// Stack approach - cleaner and more explicit
while (stack.length > 0) {
  let curr = stack[stack.length - 1]; // peek
  if (graph[curr] && graph[curr].length > 0) {
    stack.push(graph[curr].pop()); // go deeper
  } else {
    path.push(stack.pop()); // backtrack (post-order)
  }
}
```

## ⏱️ Complexity Analysis

### Time Complexity

- **Backtracking**: O(E!) - worst case explores all permutations
- **Hierholzer's**: O(E log E) - dominated by sorting step
- **Best Approach**: Hierholzer's with stack

### Space Complexity

- **Backtracking**: O(E²) - due to graph copying in recursion
- **Hierholzer's Recursive**: O(E) - graph + recursion stack
- **Hierholzer's Stack**: O(E) - graph + explicit stack
- **Best Approach**: Stack version

## 🧪 Test Cases

### Example 1: Basic Case

```javascript
Input: [
  ['MUC', 'LHR'],
  ['JFK', 'MUC'],
  ['SFO', 'SJC'],
  ['LHR', 'SFO']
];
Output: ['JFK', 'MUC', 'LHR', 'SFO', 'SJC'];
```

### Example 2: Multiple Valid Paths (Lexicographical Choice)

```javascript
Input: [
  ['JFK', 'SFO'],
  ['JFK', 'ATL'],
  ['SFO', 'ATL'],
  ['ATL', 'JFK'],
  ['ATL', 'SFO']
];
Output: ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO'];
// ATL comes before SFO lexicographically from JFK
```

### Example 3: Dead End Case

```javascript
Input: [
  ['JFK', 'KUL'],
  ['JFK', 'NRT'],
  ['NRT', 'JFK']
];
Output: ['JFK', 'NRT', 'JFK', 'KUL'];
// Must go JFK->NRT->JFK first, then JFK->KUL (dead end)
```

## 🎯 Key Learnings & Interview Insights

### ✅ **What Worked Well**

1. **Pattern Recognition**: Identified this as Eulerian path problem
2. **Creative Sorting**: Global ticket sorting automatically creates sorted adjacency lists
3. **Algorithm Choice**: Hierholzer's over backtracking for guaranteed Eulerian path
4. **Implementation Options**: Provided both recursive and iterative versions

### ❌ **Common Pitfalls to Avoid**

1. **Expensive Backtracking**: Don't use backtracking when Eulerian path is guaranteed
2. **Wrong Sorting**: Don't forget lexicographical ordering requirement
3. **shift() vs pop()**: Use reverse sorting + pop() for O(1) instead of O(n)
4. **Graph Mutation Safety**: Hierholzer's allows safe edge removal

### 🚀 **Interview Red Flags vs Green Flags**

- **❌ Red**: Using backtracking with graph copying (O(E!) time, O(E²) space)
- **❌ Red**: Using shift() operations (O(n) per operation)
- **✅ Green**: Recognizing Eulerian path pattern
- **✅ Green**: Clever sorting strategy that achieves efficiency
- **✅ Green**: Understanding when graph mutation is safe vs unsafe
- **✅ Green**: Providing multiple approaches with trade-off analysis

### 🧠 **Problem Pattern Recognition**

**Trigger Words**: "use all edges exactly once", "reconstruct path", "guaranteed solution"
**Think**: Eulerian Path → Hierholzer's Algorithm → Post-order DFS with edge removal

### 🔧 **Implementation Best Practices**

1. **Sort Strategy**: Global sort by [source, destination] creates sorted adjacency lists
2. **Edge Removal**: Use reverse sort + pop() for O(1) operations
3. **Stack vs Recursion**: Stack version avoids recursion overhead and stack overflow
4. **Post-order Traversal**: Add nodes to result after visiting all neighbors

## 📚 Related Problems

- **Eulerian Path/Circuit Problems**
- **DFS with Edge Removal**
- **Lexicographical Ordering in Graphs**
  Explanation: [Add explanation]

// Example 2
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]

````

### Edge Cases
```javascript
// Edge Case 1
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]

// Edge Case 2
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]
````

### Performance Test Cases

```javascript
// Large Input
Input: [Add large input]
Output: [Add expected output]
```

## 🚀 How to Run

```bash
# Run basic tests
npm test reconstruct-itinerary

# Run with performance tests
npm test reconstruct-itinerary --skip-performance=false

# Run with detailed output
npm test reconstruct-itinerary --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/reconstruct-itinerary/description/)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)
