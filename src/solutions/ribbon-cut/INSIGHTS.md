# ribbon-cut - Interview Notes

## 🔧 Pattern/Category

Dynamic_Programming_Unbounded_Knapsack

## 🔑 Key Insight

This is a maximization version of unbounded knapsack where we want to maximize the number of pieces (not value). The key insight is that each cut length can be used unlimited times, and we want to find the combination that uses the most pieces for the given ribbon length.

## 🧠 Intuition

Think of it like making change with coins, but instead of minimizing coins, we want to maximize the number of pieces. Start with the longest possible pieces and work backwards, or use dynamic programming to build up from smaller lengths.

## ⚠️ Common Mistake

- Forgetting that this is maximization, not minimization (like coin change)
- Not handling the case where no valid cuts are possible (return -1 or 0)
- Confusing this with bounded knapsack (each length can only be used once)

## 📋 Template/Pattern

```javascript
// Dynamic_Programming_Unbounded_Knapsack Pattern:
// 1. Initialize DP array with impossible values (like -1)
// 2. Set base case: dp[0] = 0 (0 length needs 0 cuts)
// 3. For each length, try all possible cuts
// 4. Take maximum of all valid possibilities
```

## 🔄 Different Ways to Solve

1. **Recursive with Memoization**: Try all cuts recursively - O(n\*m) time, O(n) space
2. **Bottom-up DP**: Build table from 0 to ribbon length - O(n\*m) time, O(n) space
3. **BFS Approach**: Treat as shortest path problem - O(n\*m) time, O(n) space

## 🌍 Real World Analogies

- **Pizza Cutting**: You have a pizza of certain length and want to cut it into maximum number of equal pieces using specific cut sizes
- **Rope Cutting**: A rope needs to be cut into standard lengths, maximize the number of pieces
- **Resource Allocation**: Distribute a resource into standard units to maximize count

## 🔗 Similar Problems

- **Coin Change II** - Same pattern but counting ways instead of maximizing pieces
- **Rod Cutting** - Similar but usually about maximizing value, not count
- **Perfect Squares** - Find minimum number of perfect squares that sum to n

## ❓ Follow-up Questions

- "What if we want to minimize the number of cuts instead?" → Use min instead of max in DP
- "What if each cut length can only be used once?" → Change to bounded knapsack (0/1 knapsack)
- "What if we want to find all possible ways to cut?" → Modify to count combinations
- "How would you optimize for very large ribbon lengths?" → Use mathematical approaches or approximation algorithms
