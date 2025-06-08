# Count Ways Score

<div align="center">
  <a href="https://www.geeksforgeeks.org/count-number-ways-reach-given-score-game/">
    <img src="https://img.shields.io/badge/LeetCode-Medium-yellow" alt="LeetCode Difficulty" />
  </a>
  <a href="https://www.geeksforgeeks.org/count-number-ways-reach-given-score-game/">
    <img src="https://img.shields.io/badge/Pattern-DFS, recursion-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------- |
| **Difficulty** | Medium                                                                                      |
| **Pattern**    | DFS, recursion                                                                              |
| **Tags**       | `DFS`                                                                                       |
| **LeetCode**   | [View on LeetCode](https://www.geeksforgeeks.org/count-number-ways-reach-given-score-game/) |

## 📝 Problem Description

Suppose there is a game where a player can score either 1, 2, or 4 points in each turn. Given a total score, n, find all the possible ways in which you can score these nn points.

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
// Example 1: Score 4 points
Input: 4
Output: 6
Explanation: Ways to score 4 points:
[4], [2,2], [2,1,1], [1,2,1], [1,1,2], [1,1,1,1]

// Example 2: Score 5 points
Input: 5
Output: 10
Explanation: Multiple ways using combinations of 1, 2, and 4 points

// Example 3: Score 3 points
Input: 3
Output: 3
Explanation: Ways to score 3 points:
[2,1], [1,2], [1,1,1]
```

### Edge Cases

```javascript
// Edge Case 1: Score 0
Input: 0
Output: 1
Explanation: One way to score 0 points - don't score anything

// Edge Case 2: Score 1
Input: 1
Output: 1
Explanation: Only one way to score 1 point - score 1

// Edge Case 3: Score 2
Input: 2
Output: 2
Explanation: Ways to score 2 points:
[2], [1,1]
```

### Performance Test Cases

```javascript
// Large Input
Input: 10
Output: 169
Explanation: Many combinations with 1s, 2s, and 4s that sum to 10
```

## 🚀 How to Run

```bash
# Run basic tests
npm test count-ways-score

# Run with performance tests
npm test count-ways-score --skip-performance=false

# Run with detailed output
npm test count-ways-score --detail
```

## 📚 References

- [LeetCode Problem](https://www.geeksforgeeks.org/count-number-ways-reach-given-score-game/)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)
