# Fibonacci I

<div align="center">
  <a href="https://leetcode.com/problems/fibonacci-number/description/">
    <img src="https://img.shields.io/badge/LeetCode-Easy-green" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/fibonacci-number/description/">
    <img src="https://img.shields.io/badge/Pattern-Dynamic programming-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                                         |
| -------------- | ------------------------------------------------------------------------------- |
| **Difficulty** | Easy                                                                            |
| **Pattern**    | Dynamic programming                                                             |
| **Tags**       | `Fibonacci`                                                                     |
| **LeetCode**   | [View on LeetCode](https://leetcode.com/problems/fibonacci-number/description/) |

## 📝 Problem Description

The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,
F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
Given n, calculate F(n).

## 💡 Solution Approach

## 💡 Solution Approach

### Intuition

The Fibonacci sequence is a classic example of a problem with **optimal substructure** and **overlapping subproblems** - the hallmarks of Dynamic Programming. Each Fibonacci number F(n) depends on the two previous numbers F(n-1) and F(n-2), creating a recursive relationship that can be solved efficiently using DP.

The naive recursive approach has exponential time complexity O(2^n) because it recalculates the same subproblems multiple times. Dynamic Programming eliminates this redundancy.

### Approach

**Bottom-Up Dynamic Programming (Iterative):**

1. Handle base cases: F(0) = 0, F(1) = 1
2. Use two variables to track the previous two Fibonacci numbers
3. Iterate from 2 to n, calculating each Fibonacci number using the previous two
4. Update the variables to maintain the sliding window

**Top-Down Dynamic Programming (Memoization):**

1. Use recursion with memoization to cache previously calculated results
2. Base cases: F(0) = 0, F(1) = 1
3. For any F(n), check if it's already calculated and cached
4. If not, recursively calculate F(n-1) + F(n-2) and cache the result

### Key Insights

- **Optimal Substructure**: F(n) = F(n-1) + F(n-2) - the optimal solution contains optimal solutions to subproblems
- **Overlapping Subproblems**: Calculating F(n) requires the same subproblems (F(n-1), F(n-2), etc.) multiple times
- **Space Optimization**: We only need the last two values, so we can optimize space from O(n) to O(1)
- **Two Implementation Strategies**: Bottom-up (iterative) and top-down (recursive with memoization)

## ⏱️ Complexity Analysis

## ⏱️ Complexity Analysis

### Time Complexity

**Bottom-Up DP (Iterative):**

```
O(n) - We iterate from 2 to n once, performing constant work at each step
```

**Top-Down DP (Memoization):**

```
O(n) - Each subproblem F(i) is calculated exactly once and cached
```

**Naive Recursive (for comparison):**

```
O(2^n) - Exponential time due to redundant calculations
```

### Space Complexity

**Bottom-Up DP (Optimized):**

```
O(1) - We only store the last two Fibonacci numbers
```

**Top-Down DP (Memoization):**

```
O(n) - Memoization table stores n values + O(n) recursion stack
```

**Bottom-Up DP (Table):**

```
O(n) - If we store all values in an array (not optimal)
```

## 🧪 Test Cases

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1: Base case zero
Input: 0
Output: 0
Explanation: F(0) = 0 by definition

// Example 2: Base case one
Input: 1
Output: 1
Explanation: F(1) = 1 by definition

// Example 3: LeetCode example
Input: 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1

// Example 4: LeetCode example
Input: 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3

// Example 5: Medium value
Input: 10
Output: 55
Explanation: F(10) follows the Fibonacci sequence
```

### Edge Cases

```javascript
// Edge Case 1: Larger computation
Input: 15
Output: 610
Explanation: Tests DP efficiency for medium-sized inputs

// Edge Case 2: Performance boundary
Input: 20
Output: 6765
Explanation: Verifies algorithm handles larger computations efficiently
```

### Performance Test Cases

```javascript
// Large Input 1: Stress test
Input: 30;
Output: 832040;

// Large Input 2: Very large test
Input: 40;
Output: 102334155;

// Large Input 3: Maximum practical test
Input: 45;
Output: 1134903170;
```

## 🚀 How to Run

```bash
# Run basic tests
npm test fibonacci-i

# Run with performance tests
npm test fibonacci-i --skip-performance=false

# Run with detailed output
npm test fibonacci-i --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/fibonacci-number/description/)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)
