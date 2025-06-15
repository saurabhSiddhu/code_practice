# Cycles 2d Grid

<div align="center">
  <a href="https://leetcode.com/problems/detect-cycles-in-2d-grid/description/">
    <img src="https://img.shields.io/badge/LeetCode-Medium-yellow" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/detect-cycles-in-2d-grid/description/">
    <img src="https://img.shields.io/badge/Pattern-BFS-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category | Details |
|----------|---------|
| **Difficulty** | Medium |
| **Pattern** | BFS |
| **Tags** | `2d array` |
| **LeetCode** | [View on LeetCode](https://leetcode.com/problems/detect-cycles-in-2d-grid/description/) |

## 📝 Problem Description

iven a 2D array of characters grid of size m x n, you need to find if there exists any cycle consisting of the same value in grid.
of length 4 or more in the grid that starts and ends at the same cell. From a given cell, you can move to one of the cells adjacent to it - in one of the four directions (up, down, left, or right), if it has the same value of the current cell.A cycle is a path 
 you cannot move to the cell that you visited in your last move. For example, the cycle (1, 1) -> (1, 2) -> (1, 1) is invalid because from (1, 2) we visited (1, 1) which was the last visited cell.Also,
turn true if any cycle of the same value exists in grid, otherwise, return false.Re

## 💡 Solution Approach

### Intuition
[Explain your initial thoughts and intuition about solving the problem]

### Approach
[Describe your approach step by step]

### Key Insights
- [Key insight 1]
- [Key insight 2]
- [Key insight 3]

## ⏱️ Complexity Analysis

### Time Complexity
```
[Add time complexity analysis here]
```

### Space Complexity
```
[Add space complexity analysis here]
```

## 🧪 Test Cases

### Basic Test Cases
```javascript
// Example 1
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]

// Example 2
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]
```

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
```

### Performance Test Cases
```javascript
// Large Input
Input: [Add large input]
Output: [Add expected output]
```

## 🚀 How to Run

```bash
# Run basic tests
npm test cycles-2d-grid

# Run with performance tests
npm test cycles-2d-grid --skip-performance=false

# Run with detailed output
npm test cycles-2d-grid --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/detect-cycles-in-2d-grid/description/)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)