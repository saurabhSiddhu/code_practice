# Lucky Numbers In A Matrix

<div align="center">
  <a href="https://leetcode.com/problems/lucky-numbers-in-a-matrix/description/">
    <img src="https://img.shields.io/badge/LeetCode-Easy-green" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/lucky-numbers-in-a-matrix/description/">
    <img src="https://img.shields.io/badge/Pattern-Matrix-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Difficulty** | Easy                                                                                     |
| **Pattern**    | Matrix/Constraint Satisfaction                                                           |
| **Tags**       | `Array`, `Matrix`                                                                        |
| **LeetCode**   | [View on LeetCode](https://leetcode.com/problems/lucky-numbers-in-a-matrix/description/) |

## 📝 Problem Description

Given an m x n matrix of distinct numbers, return all lucky numbers in the matrix in any order.

A lucky number is an element of the matrix such that it is the minimum element in its row and maximum in its column.

## 💡 Solution Approaches

### Main Approach: Candidate Validation

Find all row minimums as candidates, then validate if each is also a column maximum.

**Intuition:** Since a lucky number must be minimum in its row, we can first find all such candidates and then check the column constraint.

**Steps:**

1. Find minimum element in each row
2. For each row minimum, check if it's maximum in its column
3. Return all elements that satisfy both conditions

**Key Insights:**

- At most one lucky number can exist (proven mathematically)
- Row minimums are natural candidates to check
- Column maximum validation is O(m) per candidate

### Alternative Approach: Extrema Intersection

Use mathematical set intersection of row minimums and column maximums.

**Intuition:** A lucky number exists if and only if the maximum of all row minimums equals the minimum of all column maximums.

**Steps:**

1. Calculate minimum for each row
2. Calculate maximum for each column
3. Find max(row_mins) and min(col_maxs)
4. Return the value if they're equal, empty array otherwise

**Key Insights:**

- Mathematical optimization approach
- Leverages uniqueness property
- More elegant for theoretical analysis

## ⏱️ Complexity Analysis

### Main Approach

```
Time Complexity: O(m × n)
- Finding row minimums: O(m × n)
- Validating column maximums: O(m) per candidate, worst case O(m × n)

Space Complexity: O(m)
- Store row minimums array
```

### Alternative Approach

```
Time Complexity: O(m × n)
- Finding row minimums: O(m × n)
- Finding column maximums: O(m × n)
- Comparison operations: O(1)

Space Complexity: O(m + n)
- Store row minimums array: O(m)
- Store column maximums array: O(n)
```

## 🔬 Mathematical Properties

### Uniqueness Theorem

**Proven:** At most one lucky number can exist in any matrix.

This constraint simplifies the problem significantly and enables the mathematical intersection approach.

### Edge Cases

- **Single element**: Always lucky
- **Single row/column**: Reduces to min/max problem
- **No solution**: Common when constraints don't intersect
- **All equal elements**: Mathematical properties preserved

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
npm test lucky-numbers-in-a-matrix

# Run with performance tests
npm test lucky-numbers-in-a-matrix --skip-performance=false

# Run with detailed output
npm test lucky-numbers-in-a-matrix --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/lucky-numbers-in-a-matrix/description/)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)
