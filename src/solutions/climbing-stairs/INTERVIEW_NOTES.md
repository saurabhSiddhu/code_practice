# climbing-stairs - Interview Notes

## 🔧 Pattern/Category

Dynamic Programming (Fibonacci variation)

## 🔑 Key Insight

Each step can be reached from either 1 step below or 2 steps below - classic recurrence relation

## 🧠 Intuition

Think of it as "How many ways to get here?" = "Ways to get to previous step" + "Ways to get to step before that"

## ⚠️ Common Mistake

- Using recursion without memoization (exponential time)
- Forgetting base cases (n=1, n=2)
- Off-by-one errors in array indexing

## 📋 Template/Pattern

```javascript
// DP Bottom-up Template:
// 1. Handle base cases
// 2. Build solution from smaller subproblems
// 3. dp[i] = dp[i-1] + dp[i-2]
```

## 🔄 Different Ways to Solve

1. **Recursive**: Simple but exponential - O(2^n) time
2. **DP with memoization**: Top-down approach - O(n) time/space
3. **DP bottom-up**: Iterative with array - O(n) time/space
4. **Space optimized**: Only track last 2 values - O(n) time, O(1) space

## 🌍 Real World Analogies

- **Climbing actual stairs**: Each step, you can take 1 or 2 stairs
- **Fibonacci rabbits**: Population growth pattern
- **Tile placement**: Ways to fill a 2×n board with 1×2 tiles

## 📊 Complexity

- **Time**: O(n) - single pass
- **Space**: O(1) - only need last 2 values

## 🎯 Interview Tips

- Start with recursive solution to show understanding
- Mention the Fibonacci connection
- Optimize to O(1) space for bonus points
- Edge case: n=0 (usually 1 way - stay put)

## 📅 Solved On

12/6/2025

---

_These notes will help you recognize and solve similar problems in interviews_
