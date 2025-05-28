# Coin Change I - Minimum Coins Combination Problem

<div align="center">
  <a href="https://leetcode.com/problems/coin-change/">
    <img src="https://img.shields.io/badge/LeetCode-Medium-yellow" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/coin-change/">
    <img src="https://img.shields.io/badge/Pattern-Combination_Optimization_Unbounded_Knapsack-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                        |
| -------------- | -------------------------------------------------------------- |
| **Difficulty** | Medium                                                         |
| **Pattern**    | Combination-Optimization Unbounded Knapsack                    |
| **Tags**       | `Dynamic Programming`, `Combinations`, `Optimization`          |
| **LeetCode**   | [View on LeetCode](https://leetcode.com/problems/coin-change/) |

## 📝 Problem Description

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

## 🎯 What Makes This a Combination Problem

This problem is fundamentally about **exploring different combinations** of coins to find the optimal solution:

### Core Combination Concept

- **Decision at each step**: For each coin denomination, decide whether to include it (0, 1, 2, or more times)
- **Combination exploration**: Try all possible ways to combine different coins
- **Optimization objective**: Among all valid combinations, find the one using minimum coins

### Example: Amount = 6, Coins = [1, 3, 4]

```
Combination Decision Tree:
                    6
                 /  |  \
              [1]  [3]  [4]
               5    3    2
             / |  \ |     |
           [1][3] [3][4] [4]
            4  2   0  -2   -2
           /|  |
         [1][3][4]
          3  -1 -2

Valid Combinations:
• [1,1,1,1,1,1] = 6 coins
• [1,1,1,3] = 4 coins
• [1,1,4] = 3 coins
• [3,3] = 2 coins ← MINIMUM
• [1,3,4] = Invalid (sum = 8)
```

### Combination Exploration Pattern

The algorithm explores combinations by making decisions at each step:

| Decision | Meaning | Next State |
|----------|---------|------------|
| **Skip coin** | Don't use current coin denomination | Move to next coin type |
| **Take coin** | Use current coin once | Stay with same coin (unlimited use) |

This creates a **decision tree** where each path represents a different combination of coins.

### Optimization Pattern

- **Combination generation**: Recursive exploration with `take` or `skip` decisions
- **Optimization function**: `Math.min()` to find minimum coins needed
- **Comparison**: Unlike Coin Change II (counts combinations), this finds the **best** combination

## 💡 Solution Approach

### Intuition

At each step, we explore combinations by trying each coin denomination. For each coin, we can either:

1. **Skip it** and move to the next coin
2. **Take it** (if amount allows) and continue exploring with the same coin set

### Approach

1. **Recursive Combination Exploration**: For each coin, explore taking 0, 1, 2, ... coins until amount is exceeded
2. **Pruning**: Skip combinations that exceed the target amount
3. **Optimization**: Track minimum coins across all valid combinations
4. **Memoization**: Cache results to avoid recomputing overlapping subproblems

### Key Insights

- Each recursive call represents exploring a different combination path
- The base case (amount = 0) represents a valid combination found
- Invalid combinations (amount < 0) are pruned immediately
- The final result is the minimum across all explored combinations

## ⏱️ Complexity Analysis

### Time Complexity
```
• Naive Recursive: O(coins^amount) - exponential branching factor
• With Memoization: O(coins × amount) - each state computed once
• Bottom-up DP: O(coins × amount) - systematic state exploration
```

### Space Complexity
```
• Recursive + Memo: O(coins × amount) cache + O(amount) call stack
• Bottom-up DP: O(coins × amount) for DP table
• Space-Optimized DP: O(amount) using 1D array (possible optimization)
```

### Detailed Analysis

| Approach | Time | Space | Stack Overflow Risk | Cache Efficiency |
|----------|------|-------|-------------------|------------------|
| **Naive Recursive** | O(coins^amount) | O(amount) | High | None |
| **Top-Down + Memo** | O(coins × amount) | O(coins × amount) | Medium | High |
| **Bottom-Up DP** | O(coins × amount) | O(coins × amount) | None | N/A |

## 🎯 Pattern Recognition

### Unbounded Knapsack Family

This problem belongs to the **Unbounded Knapsack** family where each item (coin) can be used unlimited times:

| Problem Type | Objective | Final Operation | Example |
|--------------|-----------|----------------|---------|
| **Coin Change I** | Minimize coins used | `Math.min(options)` | Find fewest coins for amount |
| **Coin Change II** | Count combinations | `sum += ways` | Count ways to make amount |
| **Unbounded Knapsack** | Maximize value | `Math.max(options)` | Maximum value within weight |
| **Rod Cutting** | Maximize revenue | `Math.max(options)` | Maximum revenue from cuts |

### Common Structure

All problems share the same **combination exploration pattern**:

```javascript
// Generic unbounded knapsack structure
function solve(items, target) {
  function explore(i, remaining) {
    if (remaining === 0) return BASE_VALUE;
    if (i >= items.length || remaining < 0) return INVALID_VALUE;
    
    // Skip current item
    let result = explore(i + 1, remaining);
    
    // Take current item (if valid)
    if (remaining >= items[i].cost) {
      let takeResult = ITEM_VALUE + explore(i, remaining - items[i].cost);
      result = OPTIMIZE_FUNCTION(result, takeResult);
    }
    
    return result;
  }
}
```

## 🔄 Related Combination Problems

| Problem                | Combination Objective | Operation    |
| ---------------------- | --------------------- | ------------ |
| **Coin Change I**      | Find minimum coins    | `Math.min()` |
| **Coin Change II**     | Count combinations    | `+ count`    |
| **Unbounded Knapsack** | Maximum value         | `Math.max()` |
| **Rod Cutting**        | Maximum value         | `Math.max()` |

All these problems share the same **decision tree structure** but differ in their final optimization operation.

## 📊 Solution Implementation Comparison

This solution provides **two different approaches** to solve the same combination optimization problem:

### Approach Comparison Table

| Aspect | `solve()` - Top-Down Memoization | `solveAlternative()` - Bottom-Up DP |
|--------|----------------------------------|-------------------------------------|
| **Strategy** | Recursive with memoization | Iterative dynamic programming |
| **Direction** | Top-down (amount → 0) | Bottom-up (0 → amount) |
| **Space Usage** | O(coins × amount) cache + O(amount) stack | O(coins × amount) DP table |
| **Implementation** | More intuitive, follows natural recursion | More systematic, fills table methodically |
| **Cache Key** | `"coinIndex,remainingAmount"` | Array indices `dp[i][j]` |
| **Base Case** | `remainingAmount === 0 → return 0` | `dp[i][0] = 0` for all i |
| **Recurrence** | `min(skip, 1 + take)` with recursive calls | `min(dp[i-1][j], 1 + dp[i][j-coin])` |
| **Pruning** | Early termination on invalid states | Systematic exploration of all states |
| **Debugging** | Easier to trace recursive calls | Easier to inspect DP table state |

### Code Structure Comparison

| Component | Top-Down Approach | Bottom-Up Approach |
|-----------|-------------------|-------------------|
| **Validation** | ✓ Same input validation logic | ✓ Same input validation logic |
| **Initialization** | Map for memoization cache | 2D array with Infinity values |
| **Core Logic** | Recursive function with cache lookup | Nested loops filling DP table |
| **Combination Exploration** | `getMinNumberOfCoins(i+1, amt)` (skip)<br>`getMinNumberOfCoins(i, amt-coin)` (take) | `dp[i-1][j]` (skip)<br>`dp[i][j-coin]` (take) |
| **Result** | Single function call result | Access final DP table cell |

### Performance Analysis

| Test Case | Top-Down (ms) | Bottom-Up (ms) | Winner |
|-----------|---------------|----------------|--------|
| Basic cases | ~0-1ms | ~0ms | Tie |
| Large inputs | ~1-2ms | ~0-1ms | Bottom-Up |
| Memory efficiency | Higher (recursion stack) | Lower (no stack) | Bottom-Up |
| Code readability | Higher (natural recursion) | Medium (loop structure) | Top-Down |

### When to Use Each Approach

**Use Top-Down (`solve()`) when:**
- Learning dynamic programming concepts
- Need intuitive understanding of problem structure  
- Debugging recursive relationships
- Problem has natural recursive structure

**Use Bottom-Up (`solveAlternative()`) when:**
- Optimizing for performance
- Avoiding stack overflow issues
- Need predictable memory usage
- Building production systems

### DP Table Visualization Example

For `coins = [1, 3, 4]` and `amount = 6`:

```
DP Table: dp[i][j] = min coins using first i coins to make amount j

     j→  0   1   2   3   4   5   6
i↓   
0       0   ∞   ∞   ∞   ∞   ∞   ∞   (no coins)
1       0   1   2   3   4   5   6   (coin: 1)
2       0   1   2   1   2   3   2   (coins: 1,3)  
3       0   1   2   1   1   2   2   (coins: 1,3,4)

Final Answer: dp[3][6] = 2 (using coins 3+3)
```

**Key Insights from DP Table:**
- Row 0: Impossible to make any positive amount with 0 coins (∞)
- Column 0: Always 0 coins needed to make amount 0
- Each cell represents optimal solution using available coins up to row i
- Final answer in bottom-right corner: `dp[n][amount]`

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1: Standard combination optimization
Input: coins = [1, 3, 4], amount = 6
Output: 2
Explanation: 6 = 3 + 3 (minimum 2 coins)

// Example 2: No valid combination exists
Input: coins = [2], amount = 3
Output: -1
Explanation: Cannot make 3 with only coin denomination 2

// Example 3: Zero amount edge case
Input: coins = [1], amount = 0
Output: 0
Explanation: No coins needed for amount 0
```

### Edge Cases

```javascript
// Edge Case 1: Empty coin set
Input: coins = [], amount = 5
Output: -1
Explanation: No coins available

// Edge Case 2: All coins larger than amount
Input: coins = [10, 15, 20], amount = 5
Output: -1
Explanation: No valid combinations possible

// Edge Case 3: Single coin exact match
Input: coins = [5], amount = 5
Output: 1
Explanation: One coin exactly matches the amount
```

### Performance Test Cases

```javascript
// Large Input: Tests memoization effectiveness
Input: coins = [1, 2, 5, 10, 20, 50, 100], amount = 500
Output: 5
Explanation: 500 = 100×5 (optimal combination)
```

## 🚀 How to Run

```bash
# Run basic tests
npm test coin-change-1

# Run with performance tests
npm test coin-change-1 --skip-performance=false

# Run with detailed output
npm test coin-change-1 --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/coin-change/)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)
