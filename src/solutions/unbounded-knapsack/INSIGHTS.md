# Unbounded Knapsack - Interview Notes

## 🔧 Pattern/Category

Unbounded Dynamic Programming / Combination Optimization

## 🔑 Key Insight

**Maximize value with unlimited item reuse**: Unlike 0/1 knapsack, each item can be used multiple times. This changes the DP recurrence from dp[i-1] to dp[i] in the 2D approach.

**Critical Realization**: For each capacity, try adding each item type and take the maximum value. Build from capacity 0 up to target, considering all items at each capacity.

## 🧠 Intuition

**Natural Approach**: Try all possible combinations of items with repetition (exponential).

**Optimized Insight**: Use DP where each item can contribute multiple times. Key difference from 0/1 knapsack: when considering item i for capacity w, use dp[i][w-weight] (can reuse item i) instead of dp[i-1][w-weight].

**Mental Model**: "For each capacity, try adding each item type and see which gives maximum value, allowing unlimited reuse"

## ⚠️ Common Mistakes

- **0/1 knapsack confusion**: Using dp[i-1][w-weight] instead of dp[i][w-weight] for unbounded
- **Loop order confusion**: Wrong nesting of capacity and items loops
- **Weight validation**: Not checking if item weight <= current capacity
- **Pattern mixing**: Confusing with coin change (minimization vs maximization)
- **Base case errors**: Wrong initialization of DP table

## 📋 Template/Pattern

```javascript
// Unbounded Knapsack Pattern:
// 1. Create DP array: dp[w] = max value for capacity w
// 2. Initialize with 0 (no items = 0 value)
// 3. For each capacity from 1 to target:
//    - For each item:
//      - If item fits: dp[w] = max(dp[w], dp[w-weight] + value)
// 4. Return dp[capacity]
//
// Key: Use dp[w-weight] not dp_prev[w-weight] (allows reuse)
```

## 🔄 Different Ways to Solve

1. **1D Bottom-Up DP**: Space-optimized iterative → O(capacity × items) time, O(capacity) space ⭐
2. **2D Bottom-Up DP**: Easier to understand → O(capacity × items) time, O(capacity × items) space
3. **Top-Down Memoization**: Recursive with caching → O(capacity × items) time, O(capacity) space
4. **Recursive Brute Force**: Try all combinations → O(items^capacity) time, exponential

## 🌍 Real World Analogies

- **Vending Machine Stocking**: Maximize value while staying within weight limit, unlimited stock of each item
- **Investment Portfolio**: Maximize returns with unlimited shares of each stock type within budget
- **Cargo Loading**: Fill container to maximize value, unlimited supply of each item type
- **Recipe Optimization**: Maximize nutrition within calorie limit, can use ingredients multiple times

## 🔗 Similar Problems

- **Coin Change** → Minimize items instead of maximize value (same structure)
- **Coin Change II** → Count ways instead of optimize value
- **Perfect Squares** → Minimize squares that sum to n (items are 1², 2², 3²...)
- **Rod Cutting** → Maximize value by cutting rod (classic unbounded knapsack)
- **Combination Sum** → Find combinations that sum to target
- **Word Break** → Can form string with unlimited dictionary words

## ❓ Follow-up Questions

- "What if items have limited quantities?" → Bounded knapsack (multiple instances)
- "How to reconstruct which items were chosen?" → Backtrack through DP table
- "What about multiple knapsacks?" → Multi-dimensional DP extension
- "Can you solve with approximation?" → FPTAS algorithms for large instances
- "What if items have additional constraints?" → Multi-constraint knapsack variations
- "How to handle very large capacities?" → Mathematical optimizations or approximations

## 🚨 Google Interview Red Flags Avoided

- ✅ **Pattern Recognition**: Distinguished unbounded from 0/1 knapsack correctly
- ✅ **Recurrence Relation**: Used dp[i] not dp[i-1] for unlimited reuse
- ✅ **Space Optimization**: 1D DP array instead of 2D when possible
- ✅ **Loop Order**: Correct nesting (capacity outer, items inner for 1D)
- ✅ **Edge Case Handling**: Weight validation, empty knapsack cases

## 🎯 Key Interview Talking Points

- **Unbounded vs 0/1**: Emphasize unlimited reuse changes the recurrence relation
- **Why dp[i] works**: Can reuse current item type, so refer to current row in 2D DP
- **Space optimization**: How 1D array works by processing items in correct order
- **Real-world applications**: When unlimited supply assumption makes sense
- **Pattern extensions**: How this applies to other unlimited resource problems
