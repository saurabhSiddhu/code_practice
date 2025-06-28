# Coin Change - Interview Notes

## 🔧 Pattern/Category

Unbounded Knapsack / Bottom-Up Dynamic Programming

## 🔑 Key Insight

**Minimize coins with unlimited use**: This is unbounded knapsack asking for minimum items, not maximum value. Each coin can be used unlimited times.

**Critical Realization**: For amount X, try every coin and take the minimum result. Build from amount 0 up to target, where dp[i] represents minimum coins needed for amount i.

## 🧠 Intuition

**Natural Approach**: Try all possible coin combinations recursively (exponential time).

**Optimized Insight**: Use DP bottom-up. For each amount, try adding each coin type and take the minimum. Only need to solve each subproblem once.

**Mental Model**: "To make amount X with minimum coins, try each coin and see which gives the best result from remaining amount"

## ⚠️ Common Mistakes

- **Wrong initialization**: Using 0 or amount+1 instead of Infinity for impossible states
- **Missing base case**: Forgetting dp[0] = 0 (zero coins needed for amount 0)
- **Coin validation**: Not checking if coin <= current amount before using
- **Return value confusion**: Not returning -1 when amount is impossible to make
- **Pattern confusion**: Mixing up with Coin Change II (counting ways vs minimum coins)

## 📋 Template/Pattern

```javascript
// Unbounded Knapsack (Minimum) Pattern:
// 1. Initialize DP array with Infinity (impossible values)
// 2. Set base case: dp[0] = 0 (zero coins for amount 0)
// 3. For each amount from 1 to target:
//    - Try each coin that fits (coin <= amount)
//    - Take minimum: dp[amount] = min(dp[amount], dp[amount-coin] + 1)
// 4. Return dp[target] if possible, else -1
```

## 🔄 Different Ways to Solve

1. **Recursive Brute Force**: Try all combinations → O(coins^amount) time, exponential
2. **Top-Down DP (Memoization)**: Recursion + cache → O(amount × coins) time, O(amount) space
3. **Bottom-Up DP (Optimal)**: Build table iteratively → O(amount × coins) time, O(amount) space ⭐
4. **BFS Approach**: Level = number of coins used → O(amount × coins) time, O(amount) space

## 🌍 Real World Analogies

- **Making Change at Register**: Use fewest coins to make exact change for customer
- **Packing with Container Sizes**: Minimize containers needed using available sizes repeatedly
- **Resource Allocation**: Minimize resource units while meeting exact requirement

## 🔗 Similar Problems

- **Coin Change II** → Count ways instead of minimum coins
- **Perfect Squares** → Minimum squares that sum to n (coins are 1², 2², 3²...)
- **Minimum Cost Climbing Stairs** → Choose minimum cost path with decisions
- **Jump Game II** → Minimum jumps to reach end
- **Word Break** → Can form string with dictionary (boolean version)
- **Combination Sum** → Find all combinations (not minimum)

## ❓ Follow-up Questions

- "What if you want the actual coins used?" → Backtrack through DP table or store parent pointers
- "What about limited coin quantities?" → Bounded knapsack variation
- "How to count number of ways?" → Change to += instead of min (Coin Change II)
- "What if coins have different weights/values?" → Full knapsack problem
- "Very large amounts?" → Mathematical approaches or BFS for practical optimization
- "What if we want lexicographically smallest solution?" → Modified DP with tie-breaking

## 🚨 Google Interview Red Flags Avoided

- ✅ **Pattern Recognition**: Identified as unbounded knapsack minimum variant
- ✅ **Optimal Algorithm**: Bottom-up DP, not exponential brute force
- ✅ **Correct Initialization**: Infinity for impossible, 0 for base case
- ✅ **Edge Case Handling**: Check coin validity, return -1 for impossible
- ✅ **Clear Complexity**: O(amount × coins) time and space analysis

## 🎯 Key Interview Talking Points

- **Why DP works**: Optimal substructure - best way to make X uses best way to make (X-coin)
- **Why Infinity initialization**: Represents impossible states clearly
- **Greedy doesn't work**: Counterexample with coins [1,3,4] and amount 6
- **Bottom-up vs top-down**: No recursion overhead, guaranteed to compute all needed subproblems
- **Space optimization**: Could optimize to O(min_coin_value) space but adds complexity
