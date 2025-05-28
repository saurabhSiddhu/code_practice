# Rod Cutting

<div align="center">
  <a href="">
    <img src="https://img.shields.io/badge/LeetCode-Medium-yellow" alt="LeetCode Difficulty" />
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/Pattern-DP-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details              |
| -------------- | -------------------- |
| **Difficulty** | Medium               |
| **Pattern**    | DP                   |
| **Tags**       | `DP`                 |
| **LeetCode**   | [View on LeetCode]() |

## 📝 Problem Description

Given a rod of length ‘n’, we are asked to cut the rod and sell the pieces in a way that will maximize the profit. We are also given the price of every piece of length ‘i’ where ‘1 <= i <= n’.

## 💡 Solution Approach

### Intuition

brute force solution would be to try all the possible cuts and calulate the profit for each cut.
suppose we have rod of length 5 and prices as follows:

```
1. Length 1: $2
2. Length 2: $5
3. Length 3: $7
4. Length 4: $8
5. Length 5: $13

then brute force method would be to try all the possible cuts:
1. 5 * 1length = $10
2. 3 * 1length + 1 * 2length = $11
3. 2 * 1length + 1 * 3length = $12
4. 1 * 1length + 1 * 4length = $10
5. 1 * 2length + 1 * 3length = $12
6. 1 * 5length = $13
```

diagrammatically, we can represent the cuts as follows:
https://drive.google.com/file/d/1OO53Mrsba8e7f9XsKqDqFUu8AcrO-r1S/view?usp=sharing

It's clear that this problem is a variation of the unbounded knapsack problem, where we can take any number of pieces of each length. In the unbounded knapsack problem, we aim to maximize the total value by selecting items with given weights and values, allowing unlimited repetitions of each item.
We can either take a piece of the current length repeatedly or move to the next length and try to take a piece of that length.
this leads us to a recursive solution where we can either take a piece of length 1 or we can move to the next length and try to take a piece of that length.
This leads to a recursive solution where we either take the current piece or skip to the next length.

**Bottom-Up Approach for Rod Cutting Problem:**

The bottom-up approach builds the solution systematically by solving smaller subproblems first and using their results to solve larger problems. Think of it like filling out a table where:

1. **Create a 2D DP Table**: `dp[i][j]` represents the maximum profit using pieces 0 to i-1 with rod length j

2. **Table Structure**:

   ```
   Rows (i) = "Which pieces am I allowed to use?"
   Columns (j) = "What rod length am I working with?"
   ```

3. **Fill the Table**:
   For each cell `dp[i][j]`, we make a decision:

   - **Option A**: Don't use the current piece type → `dp[i-1][j]`
   - **Option B**: Use the current piece type → `prices[i-1] + dp[i][j-lengths[i-1]]`
   - **Choose**: `dp[i][j] = max(Option A, Option B)`

4. **Example Table** (for lengths=[1,2,3,4,5], prices=[2,6,7,10,13], rod=5):

   | Pieces Available | 0ft | 1ft | 2ft | 3ft | 4ft | 5ft |
   | ---------------- | --- | --- | --- | --- | --- | --- |
   | None             | $0  | $0  | $0  | $0  | $0  | $0  |
   | Only 1ft pieces  | $0  | $2  | $4  | $6  | $8  | $10 |
   | 1ft + 2ft pieces | $0  | $2  | $6  | $8  | $12 | $14 |
   | 1ft + 2ft + 3ft  | $0  | $2  | $6  | $8  | $12 | $14 |
   | All pieces       | $0  | $2  | $6  | $8  | $12 | $14 |

5. **Key Insight**: We use `dp[i][j - lengths[i-1]]` (not `dp[i-1][...]`) because we can use the same piece type multiple times (unbounded knapsack).

The final answer is found in `dp[n][total]`, representing the maximum profit using all available piece types with the full rod length.

### Approach

**Step-by-Step Bottom-Up Implementation:**

1. **Initialize**: Create a 2D array `dp[n+1][total+1]` filled with zeros
2. **Base Case**: First row and column remain 0 (no pieces or no length = no profit)
3. **Fill Table**: For each piece type i and length j:
   - Start with previous solution: `dp[i][j] = dp[i-1][j]`
   - If current piece fits: `dp[i][j] = max(dp[i][j], prices[i-1] + dp[i][j-lengths[i-1]])`
4. **Return**: `dp[n][total]` contains the maximum profit

### Key Insights

- **Unbounded Knapsack Pattern**: We can use any piece type multiple times, which is why we use `dp[i][j - lengths[i-1]]` instead of `dp[i-1][j - lengths[i-1]]`
- **Optimal Substructure**: The maximum profit for any rod length depends on optimal solutions of smaller lengths
- **Bottom-Up Efficiency**: Building the solution table systematically avoids redundant calculations and ensures O(n\*total) time complexity

## ⏱️ Complexity Analysis

### Time Complexity

```
Top-Down (Memoized Recursion): O(n * total)
- We have n pieces and total rod length
- Each unique state (index, remainingLength) is computed once
- Total unique states: n * total

Bottom-Up (2D DP): O(n * total)
- Nested loops: outer loop runs n times, inner loop runs (total + 1) times
- Each cell computation is O(1)

Space-Optimized (1D DP): O(n * total)
- Single loop over pieces: n iterations
- Inner loop over lengths: total iterations
```

### Space Complexity

```
Top-Down (Memoized Recursion): O(n * total + n)
- Memoization table: O(n * total) for storing computed results
- Recursion stack depth: O(n) in worst case

Bottom-Up (2D DP): O(n * total)
- 2D DP table: (n + 1) × (total + 1) = O(n * total)
- No additional recursion overhead

Space-Optimized (1D DP): O(total)
- Single array of size (total + 1)
- Constant extra space for variables
```

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1: Standard rod cutting problem
Input: [[1, 2, 3, 4, 5], [2, 6, 7, 10, 13], 5]
Output: 14
Explanation: Best solution is 2ft + 2ft + 1ft = $6 + $6 + $2 = $14

// Example 2: Simple case with only one piece type
Input: [[1], [1], 4]
Output: 4
Explanation: Use four 1ft pieces: 1 + 1 + 1 + 1 = $4

// Example 3: Multiple optimal solutions
Input: [[1, 2, 3], [1, 5, 6], 4]
Output: 10
Explanation: Use 2×2ft pieces = $5 + $5 = $10
```

### Edge Cases

```javascript
// Edge Case 1: Empty rod (length 0)
Input: [[1, 2, 3], [2, 5, 7], 0]
Output: 0
Explanation: No rod to cut, no profit possible

// Edge Case 2: No pieces available
Input: [[], [], 5]
Output: 0
Explanation: No pieces to cut with, no profit possible

// Edge Case 3: Rod length smaller than smallest piece
Input: [[3, 4, 5], [7, 8, 10], 2]
Output: 0
Explanation: Cannot cut any piece from a 2ft rod when smallest piece is 3ft

// Edge Case 4: Single piece type that perfectly fits
Input: [[5], [13], 5]
Output: 13
Explanation: Use exactly one 5ft piece for maximum profit
```

### Performance Test Cases

```javascript
// Large Input: Stress test with many piece types and large rod
Input: [
  Array.from({ length: 200 }, (_, i) => i + 1),  // lengths: [1,2,3,...,200]
  Array.from({ length: 200 }, (_, i) => (i + 1) * 3),  // prices: [3,6,9,...,600]
  200
]
Output: 600
Explanation: Best solution is using 200 pieces of length 1, each worth $3

// Medium Input: Realistic scenario
Input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 5, 8, 9, 10, 17, 17, 20, 24, 30], 20]
Output: 60
Explanation: Use 2×10ft pieces = $30 + $30 = $60
```

## 🚀 How to Run

```bash
# Run basic tests
npm test rod-cutting

# Run with performance tests
npm test rod-cutting --skip-performance=false

# Run with detailed output
npm test rod-cutting --detail
```

## 📚 References

- [LeetCode Problem]()
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)
