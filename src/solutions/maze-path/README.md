# Maze Path

<div align="center">
  <a href="https://www.educative.io/interview-prep/coding/paths-in-maze-that-lead-to-same-room">
    <img src="https://img.shields.io/badge/LeetCode-Medium-yellow" alt="LeetCode Difficulty" />
  </a>
  <a href="https://www.educative.io/interview-prep/coding/paths-in-maze-that-lead-to-same-room">
    <img src="https://img.shields.io/badge/Pattern-Graph-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| **Difficulty** | Medium                                                                                                  |
| **Pattern**    | Graph                                                                                                   |
| **Tags**       | `Graph`                                                                                                 |
| **LeetCode**   | [View on LeetCode](https://www.educative.io/interview-prep/coding/paths-in-maze-that-lead-to-same-room) |

## 📝 Problem Description

The problem involves finding the confusion score of a maze, which is determined by counting the number of unique cycles of length 3 among the rooms. A cycle of length 3 would look like a trip from one room to a second, then to a third, and back to the first, without repetition of rooms or revisiting the starting room before the cycle is complete. The array corridors provides the connections between rooms, where each connection enables two-way travel between the connected rooms.

For example, if we have a cycle 1 → 2 → 3 → 1, it counts as one valid cycle. We need to ensure that each trio of rooms forms exactly one cycle for counting purposes. Cycles with more than three rooms or cycles that don't return to the starting room after exactly three steps are not considered in the confusion score.

The goal is to calculate the total number of these length 3 cycles in the entire maze based on the corridors provided.

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
npm test maze-path

# Run with performance tests
npm test maze-path --skip-performance=false

# Run with detailed output
npm test maze-path --detail
```

## 📚 References

- [LeetCode Problem](https://www.educative.io/interview-prep/coding/paths-in-maze-that-lead-to-same-room)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)
