# Fibonacci - Interview Notes

## 🔧 Pattern/Category

Linear Dynamic Programming / Simple Recurrence

## 🔑 Key Insight

**Classic DP introduction**: Fibonacci demonstrates the core DP concept - overlapping subproblems with optimal substructure. Each number depends on exactly the previous 2 numbers.

**Critical Realization**: The naive recursive solution has exponential time due to repeated calculations. DP optimizes this to linear time, and space can be optimized to O(1) since only last 2 values are needed.

## 🧠 Intuition

**Natural Approach**: Direct recursive implementation F(n) = F(n-1) + F(n-2) matches mathematical definition.

**Optimized Insight**: Since each computation uses only the previous 2 results, we can build bottom-up or use memoization. Space optimization: only store last 2 values.

**Mental Model**: "To find F(n), I need F(n-1) and F(n-2), so build up from F(0) and F(1)"

## ⚠️ Common Mistakes

- **Exponential recursion**: Using naive recursion for large n (timeout for n > 40)
- **Wrong base cases**: Standard is F(0)=0, F(1)=1, but some variants differ
- **Off-by-one errors**: Confusing 0-indexed vs 1-indexed Fibonacci definitions
- **Integer overflow**: Large Fibonacci numbers exceed standard integer limits
- **Over-engineering**: Using matrix exponentiation when simple iteration suffices

## 📋 Template/Pattern

```javascript
// Space-Optimized Fibonacci Pattern:
// 1. Handle base cases F(0)=0, F(1)=1
// 2. Use two variables to track previous values
// 3. Iterate from 2 to n, updating: current = prev1 + prev2
// 4. Shift variables: prev2 = prev1, prev1 = current
// 5. Return final result
```

## 🔄 Different Ways to Solve

1. **Naive Recursion**: Direct F(n) = F(n-1) + F(n-2) → O(2^n) time, O(n) space
2. **Memoized Recursion**: Cache results → O(n) time, O(n) space
3. **Bottom-Up DP**: Iterative table → O(n) time, O(n) space  
4. **Space-Optimized**: Only track last 2 values → O(n) time, O(1) space ⭐
5. **Matrix Exponentiation**: For very large n → O(log n) time, O(1) space

## 🌍 Real World Analogies

- **Population Growth**: Each generation depends on previous generations
- **Rabbit Breeding**: Original Fibonacci problem - pairs reproduce after maturity
- **Staircase Climbing**: Ways to reach step n (can take 1 or 2 steps)
- **Tile Covering**: Ways to cover 2×n board with 2×1 dominoes

## 🔗 Similar Problems

- **Climbing Stairs** → Direct Fibonacci application (2 steps = previous 2 positions)
- **Tribonacci** → Extended to 3 previous values instead of 2
- **House Robber** → DP with similar recurrence but with constraints
- **Decode Ways** → DP counting with validation conditions
- **Min Cost Climbing Stairs** → Optimize cost instead of count ways

## ❓ Follow-up Questions

- "What about Tribonacci (sum of last 3)?" → Extend pattern to track 3 values
- "How to handle very large n efficiently?" → Matrix exponentiation O(log n)
- "What about negative n?" → Extended Fibonacci: F(-n) = (-1)^(n+1) * F(n)
- "How to handle integer overflow?" → Use BigInt or modular arithmetic
- "Can you find nth Fibonacci without computing previous?" → Binet's formula or matrix method
- "What if we need all Fibonacci up to n?" → Keep full DP array

## 🚨 Google Interview Red Flags Avoided

- ✅ **Optimal Approach**: Space-optimized O(n) time, O(1) space solution
- ✅ **Pattern Recognition**: Identified as classic linear DP problem
- ✅ **Edge Case Handling**: Proper base cases F(0)=0, F(1)=1
- ✅ **Scalability**: Avoided exponential recursion, discussed large n approaches
- ✅ **Clean Implementation**: Simple, readable iterative solution

## 🎯 Key Interview Talking Points

- **Why DP helps**: Overlapping subproblems - F(n-2) computed multiple times in naive approach
- **Space optimization insight**: Only need last 2 values, not entire sequence
- **Complexity progression**: O(2^n) → O(n) → O(log n) → O(1) space
- **Pattern extensions**: How this applies to other linear recurrence relations
- **Alternative approaches**: When matrix exponentiation or Binet's formula make sense
