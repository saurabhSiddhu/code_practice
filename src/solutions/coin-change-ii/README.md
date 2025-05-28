# Coin Change II

<div align="center">
  <a href="https://leetcode.com/problems/coin-change-ii/">
    <img src="https://img.shields.io/badge/LeetCode-Medium-yellow" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/coin-change-ii/">
    <img src="https://img.shields.io/badge/Pattern-Combination Counting-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                           |
| -------------- | ----------------------------------------------------------------- |
| **Difficulty** | Medium                                                            |
| **Pattern**    | Combination-Counting Unbounded Knapsack                           |
| **Tags**       | `DP`, `Dynamic Programming`, `Combinatorics`, `Combinations`      |
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

### What Makes This a Combination Problem

This is fundamentally a **combination exploration problem** disguised as an unbounded knapsack. We're exploring all possible combinations of coins to reach the target amount, but instead of finding the optimal combination (like in optimization problems), we're **counting how many valid combinations exist**.

### The Combination Pattern

Every unbounded knapsack problem follows the same decision tree structure:

- **Decision**: For each coin, decide how many times to use it (0, 1, 2, ...)
- **Exploration**: Recursively explore all possible combinations
- **Goal**: Count valid combinations (vs optimize in rod cutting, vs check existence in coin change I)

**Example with coins [1,2,5] and amount 5:**

```
Root: amount = 5, coins = [1,2,5]
├─ Use coin 1: amount = 4, explore with [1,2,5]
│  ├─ Use coin 1: amount = 3, explore with [1,2,5]
│  │  └─ ... eventually reaches 1+1+1+1+1 = 5 ✓
│  └─ Use coin 2: amount = 2, explore with [1,2,5]
│     └─ ... eventually reaches 2+2+1 = 5 ✓
├─ Use coin 2: amount = 3, explore with [1,2,5]
│  └─ Use coin 1: amount = 2, explore with [1,2,5]
│     └─ ... eventually reaches 2+1+1+1 = 5 ✓
└─ Use coin 5: amount = 0, found combination 5 = 5 ✓
```

### Why This Works for Combinations

1. **Systematic Exploration**: We systematically try every possible way to combine coins
2. **No Duplicates**: Processing coins in order prevents counting the same combination multiple times
3. **Complete Coverage**: Every valid combination is eventually discovered through this exploration

### Intuition

This problem is a classic example of the **Combination-Counting Unbounded Knapsack** pattern, where we need to find the number of ways to make up a target amount using an unlimited supply of coins.

**Key Insight**: We're not just solving a knapsack problem - we're exploring the complete space of all possible coin combinations and counting how many lead to our target sum.

### Approach

1. **Recursive with Memoization (Top-down):**

   - Use a recursive function that tries all possible combinations
   - Memoize results to avoid redundant calculations
   - Time Complexity: O(amount \* coins.length)
   - Space Complexity: O(amount \* coins.length)

2. **Dynamic Programming (Bottom-up):**
   - Create a DP array where dp[i] represents the number of ways to make amount i
   - Initialize dp[0] = 1 (one way to make amount 0)
   - For each coin, update the DP array
   - Time Complexity: O(amount \* coins.length)
   - Space Complexity: O(amount)

### Key Insights

1. **Combination vs Permutation**: The order of coins matters in our processing - we need to process coins in a specific order to avoid counting duplicate combinations (e.g., [1,2] and [2,1] are the same combination)
2. **Space Optimization**: We can use either a 1D or 2D DP array, but 1D is more space-efficient for this combination counting
3. **Base Case Logic**: dp[0] = 1 represents one way to make amount 0 (the empty combination)
4. **Relationship to Other Knapsack Problems**:
   - **Rod Cutting**: Explores same combinations but uses `Math.max()` to find optimal value
   - **Coin Change I**: Explores same combinations but uses `Math.min()` to find minimum coins
   - **This Problem**: Explores same combinations but uses `+` to count all valid combinations

### Comparison with Related Combination Problems

| Problem            | Combination Goal                 | Final Operation | Example Output     |
| ------------------ | -------------------------------- | --------------- | ------------------ |
| Rod Cutting        | Find optimal cutting combination | `Math.max(...)` | Maximum value      |
| Coin Change I      | Find minimum coin combination    | `Math.min(...)` | Minimum coins      |
| **Coin Change II** | **Count all valid combinations** | **`+ count`**   | **Number of ways** |
| Unbounded Knapsack | Find optimal item combination    | `Math.max(...)` | Maximum value      |

## ⏱️ Complexity Analysis

### Time Complexity

- **Recursive with Memoization:** O(amount × coins.length)

  - We explore each possible combination of (amount, coin_index) exactly once
  - Memoization ensures we don't recompute the same combination exploration states

- **Dynamic Programming:** O(amount × coins.length)
  - We iterate through each coin and systematically explore all amount combinations
  - Each combination state is computed in constant time

### Space Complexity

- **Recursive with Memoization:** O(amount × coins.length)

  - Space for the memoization table storing combination counts
  - Space for the recursion stack during combination exploration

- **Dynamic Programming:** O(amount)
  - We only need a 1D array to store combination counts for each amount
  - Space-optimized approach that maintains the essence of combination exploration

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1
Input: { amount: 5, coins: [1,2,5] }
Output: 4
Explanation: Four unique combinations to make amount 5:
  - 5 (single coin)
  - 2+2+1 (two 2's and one 1)
  - 2+1+1+1 (one 2 and three 1's)
  - 1+1+1+1+1 (five 1's)

// Example 2
Input: { amount: 3, coins: [2] }
Output: 0
Explanation: No combination of coin 2 can sum to amount 3
```

### Edge Cases

```javascript
// Edge Case 1: Zero amount
Input: { amount: 0, coins: [1,2,5] }
Output: 1
Explanation: One way to make amount 0 (empty combination - use no coins)

// Edge Case 2: No coins
Input: { amount: 5, coins: [] }
Output: 0
Explanation: Cannot form any combination with no coins available
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
