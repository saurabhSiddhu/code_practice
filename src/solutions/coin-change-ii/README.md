# Coin Change II

<div align="center">
  <a href="https://leetcode.com/problems/coin-change-ii/">
    <img src="https://img.shields.io/badge/LeetCode-Medium-yellow" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/coin-change-ii/">
    <img src="https://img.shields.io/badge/Pattern-Unbounded Knapsack-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                           |
| -------------- | ----------------------------------------------------------------- |
| **Difficulty** | Medium                                                            |
| **Pattern**    | Unbounded Knapsack                                                |
| **Tags**       | `DP`, `Dynamic Programming`, `Combinatorics`                      |
| **LeetCode**   | [View on LeetCode](https://leetcode.com/problems/coin-change-ii/) |

## 📝 Problem Description

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

### Examples

**Example 1:**
```
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: There are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
```

**Example 2:**
```
Input: amount = 3, coins = [2]
Output: 0
Explanation: The amount of 3 cannot be made up just with coins of 2.
```

**Example 3:**
```
Input: amount = 10, coins = [10]
Output: 1
```

## 💡 Solution Approach

### Intuition
This problem is a classic example of the Unbounded Knapsack pattern, where we need to find the number of ways to make up a target amount using an unlimited supply of coins.

### Approach

1. **Recursive with Memoization (Top-down):**
   - Use a recursive function that tries all possible combinations
   - Memoize results to avoid redundant calculations
   - Time Complexity: O(amount * coins.length)
   - Space Complexity: O(amount * coins.length)

2. **Dynamic Programming (Bottom-up):**
   - Create a DP array where dp[i] represents the number of ways to make amount i
   - Initialize dp[0] = 1 (one way to make amount 0)
   - For each coin, update the DP array
   - Time Complexity: O(amount * coins.length)
   - Space Complexity: O(amount)  

### Key Insights

1. The order of coins matters - we need to process coins in a specific order to avoid counting duplicate combinations
2. We can use either a 1D or 2D DP array, but 1D is more space-efficient
3. The base case is dp[0] = 1, representing one way to make amount 0 (using no coins)

## ⏱️ Complexity Analysis

### Time Complexity
- **Recursive with Memoization:** O(amount * coins.length)
  - We process each amount and each coin once
  - Memoization ensures we don't recompute the same states

- **Dynamic Programming:** O(amount * coins.length)
  - We iterate through each coin and each possible amount
  - Each state is computed in constant time

### Space Complexity
- **Recursive with Memoization:** O(amount * coins.length)
  - Space for the memoization table
  - Space for the recursion stack

- **Dynamic Programming:** O(amount)
  - We only need a 1D array of size amount + 1
  - No additional space is needed

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1
Input: { amount: 5, coins: [1,2,5] }
Output: 4
Explanation: Four ways to make amount 5 using coins [1,2,5]

// Example 2
Input: { amount: 3, coins: [2] }
Output: 0
Explanation: Cannot make amount 3 using only coin 2
```

### Edge Cases

```javascript
// Edge Case 1: Zero amount
Input: { amount: 0, coins: [1,2,5] }
Output: 1
Explanation: One way to make amount 0 (using no coins)

// Edge Case 2: No coins
Input: { amount: 5, coins: [] }
Output: 0
Explanation: Cannot make any amount with no coins
```

### Performance Test Cases

```javascript
// Large Input 1
Input: { amount: 500, coins: [1,2,5,10,20,50,100] }
Output: 6295434

// Large Input 2
Input: { amount: 1000, coins: [1,2,5,10,20,50,100,200] }
Output: 321335886
```

## 🚀 How to Run

```bash
# Run basic tests
npm test coin-change-ii

# Run with performance tests
npm test coin-change-ii --skip-performance=false

# Run with detailed output
npm test coin-change-ii --detail

# Debug the solution
npm run debug coin-change-ii
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/coin-change-ii/)
- [Pattern Documentation](https://www.designgurus.io/blog/grokking-the-coding-interview-patterns)
- [Dynamic Programming Tutorial](https://www.geeksforgeeks.org/dynamic-programming/)
- [Unbounded Knapsack Problem](https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/)
