# 🎯 Anki Cards for Detect Cycles in 2D Grid

_Generated on: 6/17/2025_

---

## 📚 Quick Reference

**Problem:** Detect Cycles in 2D Grid  
**Pattern:** DFS Graph Traversal / Cycle Detection  
**Difficulty:** Medium  
**LeetCode:** https://leetcode.com/problems/detect-cycles-in-2d-grid/description/

---

## 🔧 Questions

**Q1:** What pattern does "Detect Cycles in 2D Grid" follow and when should I recognize it?

**Q2:** What are the key insights and intuition for "Detect Cycles in 2D Grid"?

**Q3:** What are the different approaches for "Detect Cycles in 2D Grid" and their trade-offs?

**Q4:** What is the optimal code template for "Detect Cycles in 2D Grid" pattern?

**Q5:** What are the common mistakes in "Detect Cycles in 2D Grid"?

**Q6:** What is the time and space complexity of "Detect Cycles in 2D Grid"?

**Q7:** How should I approach "Detect Cycles in 2D Grid" in an interview?

**Q8:** What are the key optimization techniques for "Detect Cycles in 2D Grid"?

**Q9:** What follow-up questions might be asked for "Detect Cycles in 2D Grid"?

**Q10:** What similar problems share the same pattern as "Detect Cycles in 2D Grid"?

---

## 🔧 Answers

**A1:** What pattern does "Detect Cycles in 2D Grid" follow and when should I recognize it?

```
Pattern: DFS Graph Traversal + Cycle Detection

Recognition Signals:
✅ 2D grid with characters/values
✅ Need to detect cycles in connected components
✅ Can move to adjacent cells (4-directional)
✅ Cycle must be of same values/characters
✅ Need to avoid immediate backtracking
✅ Minimum cycle length constraint (≥4)

Key Trigger: "Find cycle in 2D grid with same values"
```

**A2:** What are the key insights and intuition for "Detect Cycles in 2D Grid"?

```
Core Insights:
1. 🎯 Graph Problem in Disguise: Each cell = node, same adjacent chars = edges
2. 🎯 Parent Tracking Critical: Must track where we came from to avoid false cycles
3. 🎯 Visited Set Logic: Cycle = reaching visited cell that's NOT our parent
4. 🎯 Character Matching: Can only traverse cells with same character

Intuition:
- Start DFS from each unvisited cell
- Track parent to prevent immediate backtracking
- If we reach a visited cell (not parent) → cycle found
- One global visited set prevents revisiting processed cells

Mental Model: Walking through a maze, placing breadcrumbs, cycle = finding existing breadcrumb that's not where we just came from
```

**A3:** What are the different approaches for "Detect Cycles in 2D Grid" and their trade-offs?

```
Approach 1: DFS with Parent Tracking (Optimal)
Time: O(N×M), Space: O(N×M)
Pros: ✅ Simple, intuitive, optimal complexity
Cons: ❌ Recursive (stack overflow risk)

Approach 2: Union-Find (Disjoint Set)
Time: O(N×M×α(N×M)), Space: O(N×M)
Pros: ✅ No recursion, good for multiple queries
Cons: ❌ More complex, slightly slower

Approach 3: BFS with Parent Tracking
Time: O(N×M), Space: O(N×M)
Pros: ✅ Iterative, no stack overflow
Cons: ❌ More memory (queue), complex state management

Approach 4: Stack-based DFS
Time: O(N×M), Space: O(N×M)
Pros: ✅ Iterative, explicit control
Cons: ❌ More verbose, harder to implement

Google Recommendation: Start with DFS, mention alternatives
```

**A4:** What is the optimal code template for "Detect Cycles in 2D Grid" pattern?

```javascript
class Solution {
  solve(grid) {
    const visited = new Set();
    const rows = grid.length;
    const cols = grid[0].length;

    // Try each cell as starting point
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!visited.has(`${i}-${j}`)) {
          if (this.dfs(grid, i, j, -1, -1, visited)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  dfs(grid, row, col, parentRow, parentCol, visited) {
    // Boundary check
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      return false;
    }

    const key = `${row}-${col}`;
    const char = grid[row][col];

    // Cycle detection: reached visited cell (not parent)
    if (visited.has(key)) {
      return true;
    }

    // Mark as visited
    visited.add(key);

    // Explore 4 directions
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
    ];
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // Skip parent to avoid immediate backtracking
      if (newRow === parentRow && newCol === parentCol) continue;

      // Only traverse same character cells
      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length &&
        grid[newRow][newCol] === char
      ) {
        if (this.dfs(grid, newRow, newCol, row, col, visited)) {
          return true;
        }
      }
    }

    return false;
  }
}
```

**A5:** What are the common mistakes in "Detect Cycles in 2D Grid"?

```
❌ Mistake 1: Not Tracking Parent
if (dfs(grid, newRow, newCol, visited)) return true;
Problem: Immediate backtracking creates false cycles

✅ Fix: Always pass parent coordinates
if (dfs(grid, newRow, newCol, row, col, visited)) return true;

❌ Mistake 2: Wrong Cycle Detection Order
if (grid[row][col] === char && visited.has(key)) return true;
Problem: Character check after visited check

✅ Fix: Check visited first, character already validated
if (visited.has(key)) return true;

❌ Mistake 3: Boundary Check After Recursion
Problem: Causes unnecessary recursive calls

✅ Fix: Check boundaries before recursion
if (newRow >= 0 && newRow < grid.length && ...) {
    if (dfs(...)) return true;
}

❌ Mistake 4: Per-DFS Visited Set
Problem: Can't detect cycles across different starting points

✅ Fix: One global visited set for entire grid

❌ Mistake 5: Not Checking Character Match
Problem: Traversing different characters

✅ Fix: Only recurse if grid[newRow][newCol] === char
```

**A6:** What is the time and space complexity of "Detect Cycles in 2D Grid"?

```
Time Complexity: O(N × M)
- N = number of rows, M = number of columns
- Each cell visited at most once due to visited set
- For each cell, check 4 directions: O(4) = O(1)
- Total: O(N × M × 1) = O(N × M)

Space Complexity: O(N × M)
- Visited Set: O(N × M) to store coordinates of all cells
- Recursion Stack: O(N × M) in worst case (single long path)
- Total: O(N × M) + O(N × M) = O(N × M)

Best Case: O(1) space if no cycles and early termination
Worst Case: O(N × M) space for large connected components

Note: For very large grids, consider iterative approach to avoid stack overflow
```

**A7:** How should I approach "Detect Cycles in 2D Grid" in an interview?

```
Interview Strategy:

1. 🎯 Problem Understanding (2-3 minutes)
   - Clarify: What constitutes a cycle? (≥4 cells, same character)
   - Confirm: Can move in 4 directions only?
   - Example: Draw simple 2x2 grid with cycle

2. 🎯 Pattern Recognition (1-2 minutes)
   - "This is a graph cycle detection problem"
   - "Each cell is a node, same adjacent chars form edges"
   - "Need DFS with parent tracking"

3. 🎯 High-Level Approach (2-3 minutes)
   - Iterate through each cell
   - Start DFS from unvisited cells
   - Track parent to avoid backtracking
   - Detect cycles when reaching visited non-parent cell

4. 🎯 Implementation (10-15 minutes)
   - Start with DFS template
   - Add parent tracking parameters
   - Implement cycle detection logic
   - Handle boundary cases

5. 🎯 Testing & Edge Cases (3-5 minutes)
   - Single cell: false
   - 2x2 same chars: true
   - All different chars: false
   - Large grid with cycle: true

6. 🎯 Optimization Discussion (2-3 minutes)
   - Mention Union-Find alternative
   - Discuss iterative approaches
   - Space optimization possibilities

Key Phrases to Use:
- "This is a graph traversal problem"
- "Parent tracking prevents false cycles"
- "One global visited set for efficiency"
```

**A8:** What are the key optimization techniques for "Detect Cycles in 2D Grid"?

```
Optimization 1: Early Termination
- Return true immediately when first cycle found
- No need to check remaining cells

Optimization 2: Efficient Key Generation
// Instead of string concatenation
const key = `${row}-${col}`;

// Use mathematical mapping (if grid size known)
const key = row * cols + col;

Optimization 3: Direction Array Optimization
const dirs = [[0,1], [1,0], [0,-1], [-1,0]]; // Pre-define outside function

Optimization 4: Iterative Implementation
- Use explicit stack to avoid recursion overhead
- Better for very large grids (prevents stack overflow)

Optimization 5: Union-Find for Multiple Queries
- If need to check cycles multiple times
- Build connected components once, query efficiently

Optimization 6: Visited Set Optimization
- Use 2D boolean array instead of Set for better cache locality
- Space: same, Time: potentially faster access

Optimization 7: Character Preprocessing
- Group cells by character first
- Only check within same character groups

Performance Targets:
- Small grids (≤100x100): < 1ms
- Medium grids (≤1000x1000): < 100ms
- Large grids (≤10000x10000): < 10s
```

**A9:** What follow-up questions might be asked for "Detect Cycles in 2D Grid"?

```
Follow-up 1: "Find the shortest cycle"
Hint: Use BFS instead of DFS, track cycle length

Follow-up 2: "Return all cycles, not just detect existence"
Hint: Store path during DFS, reconstruct cycle when found

Follow-up 3: "What if grid is very large and sparse?"
Hint: Use Union-Find, only process non-empty cells

Follow-up 4: "Implement iteratively without recursion"
Hint: Use explicit stack with [row, col, parent] tuples

Follow-up 5: "Handle directed graphs instead of undirected"
Hint: Use 3-color DFS (white, gray, black states)

Follow-up 6: "Optimize for memory usage"
Hint: Use bit manipulation for visited set, in-place marking

Follow-up 7: "Support dynamic updates (add/remove cells)"
Hint: Union-Find with rollback, or incremental DFS

Follow-up 8: "Find cycle with specific properties (min/max length)"
Hint: Track additional state during traversal

Follow-up 9: "Parallelize the algorithm"
Hint: Partition grid, use thread-safe data structures

Follow-up 10: "Handle 8-directional movement"
Hint: Extend directions array, same algorithm
```

**A10:** What similar problems share the same pattern as "Detect Cycles in 2D Grid"?

```
🎯 Core Pattern: Graph Cycle Detection

Direct Variations:
1. Number of Islands - Connected components in 2D grid
2. Surrounded Regions - DFS with boundary conditions
3. Pacific Atlantic Water Flow - Multi-source DFS
4. Word Search - DFS with backtracking

Graph Problems:
5. Detect Cycle in Undirected Graph - Pure graph version
6. Graph Valid Tree - Cycle detection + connectivity
7. Redundant Connection - Find edge that creates cycle
8. Find Eventual Safe States - Cycle detection in directed graph

Advanced Variations:
9. Longest Increasing Path in Matrix - DFS with memoization
10. Keys and Rooms - Graph traversal with conditions

Pattern Keywords:
- "Connected components"
- "DFS/BFS traversal"
- "Cycle detection"
- "Graph validation"
- "2D grid navigation"
- "Same value/character paths"

Master this pattern for:
✅ 2D grid traversal problems
✅ Graph connectivity problems
✅ Cycle detection variations
✅ Component analysis problems
```

---

## 📊 Study Schedule

### Daily (Days 1-3):

- Q1: Pattern Recognition
- Q2: Key Insights
- Q5: Common Mistakes

### Weekly (Days 4-14):

- Q3: Different Approaches
- Q4: Code Template
- Q6: Complexity Analysis

### Monthly (Days 15+):

- Q7: Interview Strategy
- Q8: Optimization Techniques
- Q9: Follow-up Questions
- Q10: Similar Problems

---

## 🎯 Success Metrics

Track your mastery:

- ✅ **Pattern Recognition**: Identify DFS + Parent Tracking in <30 seconds
- ✅ **Approach**: Explain cycle detection logic clearly
- ✅ **Implementation**: Code without parent tracking bugs
- ✅ **Complexity**: Analyze O(N×M) time/space correctly
- ✅ **Interview Ready**: Handle follow-ups confidently

_Master cycle detection to ace graph traversal interviews!_ 🚀
