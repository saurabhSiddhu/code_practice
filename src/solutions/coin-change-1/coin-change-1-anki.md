# 🎯 Anki Cards for Coin Change

*Generated on: 6/28/2025*

---

## 📚 Quick Reference

**Problem:** Coin Change  
**Pattern:** Bottom-Up Dynamic Programming  
**Difficulty:** Medium  
**LeetCode:** https://leetcode.com/problems/coin-change/

---

## 🔧 Questions

**Q1:** What pattern does "Coin Change" follow and when should I recognize it?

**Q2:** What are the key insights and intuition for "Coin Change"?

**Q3:** What are the different approaches for "Coin Change" and their trade-offs?

**Q4:** What is the optimal code template for "Coin Change" pattern?

**Q5:** What are the common mistakes in "Coin Change"?

**Q6:** What is the time and space complexity of "Coin Change"?

**Q7:** How should I approach "Coin Change" in an interview?

**Q8:** What are the key optimization techniques for "Coin Change"?

**Q9:** What follow-up questions might be asked for "Coin Change"?

**Q10:** What similar problems share the same pattern as "Coin Change"?

---

## 🔧 Answers

**A1:** What pattern does "Coin Change" follow and when should I recognize it?

```
Pattern: Unbounded Knapsack / Bottom-Up DP (Minimum)

Recognition Signals:
✅ Minimum number of items to reach target
✅ Unlimited use of each item (unbounded)
✅ Optimal substructure: min(amount) depends on min(amount - coin)
✅ Classic "minimum coins/steps" phrasing

When to use: Finding minimum items when each item can be used repeatedly
```

**A2:** What are the key insights and intuition for "Coin Change"?

```
🧠 Key Insights:
💡 For amount X, try every coin and take minimum result
💡 dp[amount] = min(dp[amount - coin] + 1) for all usable coins
💡 Build solutions bottom-up from smaller amounts

🎯 Intuition:
- Natural approach: Try all possible coin combinations (exponential)
- Mathematical insight: Optimal substructure - best way to make amount X uses best way to make (X - coin)
- Visual understanding: Fill table from 0 to target, each cell uses previous cells
- Real-world analogy: Making change with fewest coins at cash register

🔑 Mental Model:
"To make amount X with minimum coins, try each coin and see which gives the best result"
```

**A3:** What are the different approaches for "Coin Change" and their trade-offs?

```
Approach 1: Recursive Brute Force
├── Description: Try all combinations, return minimum
├── Time: O(amount^coins) | Space: O(amount) recursion
├── Pros: Matches intuitive thinking
└── Cons: Exponential time, many repeated subproblems

Approach 2: Top-Down DP (Memoization)
├── Description: Recursion + memo to cache subproblems
├── Time: O(amount × coins) | Space: O(amount) 
├── Pros: Natural recursion, only computes needed subproblems
└── Cons: Recursion stack overhead

Approach 3: Bottom-Up DP (Optimal)
├── Description: Fill DP table from 0 to amount iteratively
├── Time: O(amount × coins) | Space: O(amount)
├── Pros: No recursion overhead, guaranteed to compute all needed
└── Cons: Computes all subproblems even if not needed

💡 Progression: Brute Force → Memoization → Tabulation
```

**A4:** What is the optimal code template for "Coin Change" pattern?

```javascript
// Universal Coin Change Template (Bottom-Up DP)
function coinChange(coins, amount) {
    // DP array: dp[i] = minimum coins to make amount i
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // Base case: 0 coins needed for amount 0
    
    // For each amount from 1 to target
    for (let i = 1; i <= amount; i++) {
        // Try each coin
        for (const coin of coins) {
            if (coin <= i) { // Can use this coin
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Top-Down Alternative
function coinChangeTopDown(coins, amount) {
    const memo = new Map();
    
    function dp(remaining) {
        if (remaining === 0) return 0;
        if (remaining < 0) return Infinity;
        if (memo.has(remaining)) return memo.get(remaining);
        
        let minCoins = Infinity;
        for (const coin of coins) {
            minCoins = Math.min(minCoins, dp(remaining - coin) + 1);
        }
        
        memo.set(remaining, minCoins);
        return minCoins;
    }
    
    const result = dp(amount);
    return result === Infinity ? -1 : result;
}

// Key Template Elements:
// 1. Initialize DP with impossible values (Infinity)
// 2. Set base case: dp[0] = 0
// 3. For each amount, try all coins and take minimum
// 4. Return -1 if impossible (still Infinity)
```

**A5:** What are the common mistakes in "Coin Change"?

```
❌ Common Mistakes:
- Initializing DP array with 0 instead of Infinity
- Forgetting base case dp[0] = 0
- Not checking if coin <= current amount before using
- Using amount + 1 instead of Infinity (fails for edge cases)
- Confusing with Coin Change II (counting ways vs minimum coins)

✅ Correct Approach:
- Initialize with Infinity to represent impossible states
- Always set dp[0] = 0 as base case
- Check coin validity before using: if (coin <= i)
- Return -1 when result is still Infinity
- Understand this finds minimum count, not number of ways
```

**A6:** What is the time and space complexity of "Coin Change"?

```
Bottom-Up DP Approach:
📊 Time Complexity: O(amount × coins)
   - Outer loop: amount iterations
   - Inner loop: coins iterations
   - Each operation: O(1)

📊 Space Complexity: O(amount)
   - DP array of size (amount + 1)
   - No additional space needed

📊 Top-Down DP:
   - Time: O(amount × coins) - same after memoization
   - Space: O(amount) memoization + O(amount) recursion stack

📊 Brute Force: O(coins^amount) time - exponential!
```

**A7:** How should I approach "Coin Change" in an interview?

```
🎯 Interview Strategy:
1. "This is asking for minimum coins - classic DP problem"
2. "I need to try each coin for each amount and take the minimum"
3. "Let me think about the recurrence: dp[i] = min(dp[i-coin] + 1)"
4. "Base case is dp[0] = 0, impossible states are Infinity"
5. "Let me trace through a small example..."

🗣️ Communication Tips:
- Identify this as unbounded knapsack variant
- Explain why greedy doesn't work (counter-example)
- Walk through the DP transition carefully
- Show how subproblems build up to final answer
- Discuss time/space complexity trade-offs
```

**A8:** What are the key optimization techniques for "Coin Change"?

```
🚀 Optimization Techniques:
1. Early Termination: If dp[i] stays Infinity, amount i is impossible
2. Coin Sorting: Sort coins descending to try larger coins first
3. Pruning: Skip coins larger than current amount
4. Space Optimization: Only need previous values, but full array simpler

🧠 Advanced Optimizations:
- BFS approach: Level represents number of coins used
- Mathematical: For specific coin sets, closed-form solutions exist
- Approximation: For very large amounts, approximation algorithms

🔄 Space vs Time:
- Current: O(amount) space
- Could optimize to O(min_coin) space but complex
- Usually not worth the complexity
```

**A9:** What follow-up questions might be asked for "Coin Change"?

```
🤔 Common Follow-ups:
1. "What if you want to count number of ways?" → Coin Change II
2. "Can you return the actual coins used?" → Backtrack through DP
3. "What about limited coins?" → Bounded knapsack variation
4. "What if coins have different weights/values?" → Full knapsack
5. "How would you handle very large amounts?" → Mathematical/BFS approaches
6. "What if we want lexicographically smallest solution?" → Modified DP

🎯 Advanced Variations:
- Coin Change with specific constraints
- Minimum coins with maximum value
- Coin change in different number systems
```

**A10:** What similar problems share the same pattern as "Coin Change"?

```
🔗 Related Problems:
1. Coin Change II → Count ways instead of minimum
2. Perfect Squares → Minimum squares that sum to n
3. Minimum Cost Climbing Stairs → Choose minimum cost path
4. Jump Game II → Minimum jumps to reach end
5. Word Break → Can form string with dictionary words
6. Combination Sum → Find combinations that sum to target
7. Partition Equal Subset Sum → Subset with target sum

🎯 Pattern Family: "Unbounded Knapsack / Minimum Items"
- Any problem asking for minimum items to reach target
- Unlimited use of each item type
- Optimal substructure with minimum/maximum objective
- Bottom-up DP building from smaller to larger subproblems
```

---

## 🎯 Memory Aids

**🧠 Remember:** "Try every coin, take the minimum, build bottom-up!"

**🔑 Key Formula:** `dp[amount] = min(dp[amount - coin] + 1)` for all valid coins

**⚡ Quick Check:** Initialize with Infinity, base case dp[0] = 0, check coin <= amount
