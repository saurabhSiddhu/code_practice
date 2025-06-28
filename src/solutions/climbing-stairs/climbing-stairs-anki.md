# 🎯 Anki Cards for Climbing Stairs

*Generated on: 6/28/2025*

---

## 📚 Quick Reference

**Problem:** Climbing Stairs  
**Pattern:** Tribonacci Dynamic Programming  
**Difficulty:** Easy  
**LeetCode:** https://leetcode.com/problems/climbing-stairs/

---

## 🔧 Questions

**Q1:** What pattern does "Climbing Stairs" follow and when should I recognize it?

**Q2:** What are the key insights and intuition for "Climbing Stairs"?

**Q3:** What are the different approaches for "Climbing Stairs" and their trade-offs?

**Q4:** What is the optimal code template for "Climbing Stairs" pattern?

**Q5:** What are the common mistakes in "Climbing Stairs"?

**Q6:** What is the time and space complexity of "Climbing Stairs"?

**Q7:** How should I approach "Climbing Stairs" in an interview?

**Q8:** What are the key optimization techniques for "Climbing Stairs"?

**Q9:** What follow-up questions might be asked for "Climbing Stairs"?

**Q10:** What similar problems share the same pattern as "Climbing Stairs"?

---

## 🔧 Answers

**A1:** What pattern does "Climbing Stairs" follow and when should I recognize it?

```
Pattern: Tribonacci Dynamic Programming

Recognition Signals:
✅ Can take 1, 2, or 3 steps at each position
✅ Count total ways to reach target
✅ Each step depends on sum of previous 3 steps
✅ "How many ways" typically indicates DP counting

When to use: Counting problems with fixed step sizes and optimal substructure
```

**A2:** What are the key insights and intuition for "Climbing Stairs"?

```
🧠 Key Insights:
💡 To reach step N, sum ways from (N-1), (N-2), and (N-3)
💡 f(n) = f(n-1) + f(n-2) + f(n-3) - Tribonacci sequence
💡 Each position has optimal substructure - uses optimal solutions to subproblems
💡 Only need last 3 values for space optimization

🎯 Intuition:
- Natural approach: Try all possible step combinations (exponential)
- Mathematical insight: Recurrence relation with base cases
- Visual understanding: Decision tree where each node sums its children
- Real-world analogy: Counting paths on a staircase with step constraints

🔑 Mental Model:
"To reach step N, I could have come from step N-1, N-2, or N-3"
```

**A3:** What are the different approaches for "Climbing Stairs" and their trade-offs?

```
Approach 1: Naive Recursion
├── Description: Direct recursive implementation of recurrence
├── Time: O(3^n) | Space: O(n) call stack
├── Pros: Matches mathematical definition exactly
└── Cons: Exponential time due to overlapping subproblems

Approach 2: Memoized Recursion (Top-Down DP)
├── Description: Recursion + cache to store computed results
├── Time: O(n) | Space: O(n) memo + O(n) call stack
├── Pros: Natural recursive thinking, only computes needed values
└── Cons: Extra space for recursion stack

Approach 3: Iterative DP (Bottom-Up)
├── Description: Build up from base cases to target
├── Time: O(n) | Space: O(n) DP array
├── Pros: No recursion overhead, clear progression
└── Cons: Computes all intermediate values

Approach 4: Space-Optimized Iterative
├── Description: Only track last 3 values instead of full array
├── Time: O(n) | Space: O(1)
├── Pros: Optimal space complexity
└── Cons: Can't access all intermediate results

💡 Progression: Naive → Memoization → Full DP → Space Optimization
```

**A4:** What is the optimal code template for "Climbing Stairs" pattern?

```javascript
// Space-Optimized Iterative (Most Practical)
function climbStairs(n) {
    // Handle base cases
    if (n === 0) return 1; // One way to stay at ground
    if (n === 1) return 1; // Only one 1-step
    if (n === 2) return 2; // [1+1] or [2]
    
    // Track last 3 values: f(n-3), f(n-2), f(n-1)
    let prev3 = 1; // f(0)
    let prev2 = 1; // f(1) 
    let prev1 = 2; // f(2)
    
    // Build up to target
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2 + prev3;
        prev3 = prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Memoized Recursion Alternative
function climbStairsMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n === 0) return 1;
    if (n === 1) return 1;
    if (n === 2) return 2;
    
    memo[n] = climbStairsMemo(n - 1, memo) + 
              climbStairsMemo(n - 2, memo) + 
              climbStairsMemo(n - 3, memo);
    return memo[n];
}

// Bottom-Up DP (if need all intermediate values)
function climbStairsDP(n) {
    if (n <= 2) return n === 0 ? 1 : n;
    
    const dp = [1, 1, 2]; // f(0), f(1), f(2)
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    }
    
    return dp[n];
}

// Template Choice:
// - Space-optimized: Most interviews
// - Memoized: If recursion preferred
// - Full DP: If need all intermediate values
```

**A5:** What are the common mistakes in "Climbing Stairs"?

```
❌ Common Mistakes:
- Wrong base case: f(0) = 0 instead of 1 (breaks recurrence)
- Using Fibonacci instead of Tribonacci (missing 3-step option)
- Off-by-one errors in loop bounds or array indexing
- Not handling edge cases (n = 0, 1, 2) properly
- Confusing step sizes (thinking 1,2 steps instead of 1,2,3)

✅ Correct Approach:
- Base cases: f(0)=1, f(1)=1, f(2)=2, then apply recurrence
- Recognize this as Tribonacci, not Fibonacci sequence
- Handle small values of n before entering main logic
- Understand f(0)=1 means "one way to stay put"
- Space optimize by tracking only last 3 values
```

**A6:** What is the time and space complexity of "Climbing Stairs"?

```
Approach Complexities:
📊 Naive Recursion:
   Time: O(3^n) - each call branches into 3 recursive calls
   Space: O(n) - maximum recursion depth

📊 Memoized Recursion:
   Time: O(n) - each subproblem computed once
   Space: O(n) - memoization cache + O(n) call stack

📊 Iterative DP:
   Time: O(n) - single loop from 3 to n
   Space: O(n) - DP array storage

📊 Space-Optimized Iterative:
   Time: O(n) - single loop
   Space: O(1) - only 3 variables stored

📊 Best Choice: Space-optimized gives optimal O(n) time, O(1) space
```

**A7:** How should I approach "Climbing Stairs" in an interview?

```
🎯 Interview Strategy:
1. "I need to count ways to reach step N with 1, 2, or 3 step moves"
2. "This looks like a DP problem - I can reach N from N-1, N-2, or N-3"
3. "The recurrence is f(n) = f(n-1) + f(n-2) + f(n-3)"
4. "Let me establish base cases: f(0)=1, f(1)=1, f(2)=2"
5. "I can optimize space by only tracking the last 3 values"

🗣️ Communication Tips:
- Start with the intuition: "How can I reach step N?"
- Explain why it's Tribonacci, not Fibonacci
- Walk through small examples to verify base cases
- Show the space optimization technique
- Discuss time/space trade-offs of different approaches

🎯 Key Points:
- Why f(0) = 1 makes sense (one way to stay at start)
- Connection to other DP problems
- How optimal substructure applies here
```

**A8:** What are the key optimization techniques for "Climbing Stairs"?

```
🚀 Optimization Techniques:
1. Space Optimization: Track only last 3 values instead of full array
2. Early Returns: Handle base cases before main algorithm
3. Memoization: Cache results to avoid recalculation
4. Bottom-Up: Eliminate recursion overhead

🧠 Advanced Optimizations:
- Matrix exponentiation: O(log n) time for very large n
- Mathematical formula: Closed-form if treating as pure Tribonacci
- Rolling array: Cyclical indexing for space efficiency

🔄 Practical Optimizations:
- Input validation to handle edge cases cleanly
- Integer overflow handling for large n values
- Iterative over recursive to avoid stack limits
```

**A9:** What follow-up questions might be asked for "Climbing Stairs"?

```
🤔 Common Follow-ups:
1. "What if you can take 1, 2, 3, ..., k steps?" → Generalized DP
2. "What about variable step costs?" → Weighted path optimization
3. "Can you print the actual steps taken?" → Path reconstruction
4. "What if some stairs are broken?" → Constraint handling
5. "How to handle very large n efficiently?" → Matrix exponentiation
6. "What about going down stairs too?" → Bidirectional movement

🎯 Advanced Variations:
- Minimum cost to reach top with step costs
- Maximum cost path (if stairs have values)
- Climbing stairs with obstacles or forbidden steps
- 2D stair climbing (grid movement)
```

**A10:** What similar problems share the same pattern as "Climbing Stairs"?

```
🔗 Related Problems:
1. Fibonacci Number → Similar recurrence with 2 terms
2. House Robber → DP with constraint (can't rob adjacent)
3. Min Cost Climbing Stairs → Optimize cost instead of count ways
4. Decode Ways → Count ways to decode with constraints
5. Jump Game → Reachability with variable step sizes
6. Unique Paths → 2D version of counting paths
7. Count Ways to Score → DP counting with different scoring options

🎯 Pattern Family: "Linear DP Counting"
- Problems asking to count ways to reach target
- Each position depends on fixed number of previous positions
- Simple recurrence relations with base cases
- Often optimizable to O(1) space
```

---

## 🎯 Memory Aids

**🧠 Remember:** "Tribonacci DP: f(n) = f(n-1) + f(n-2) + f(n-3)!"

**🔑 Key Insight:** Only need last 3 values → O(1) space optimization

**⚡ Quick Check:** Base cases f(0)=1, f(1)=1, f(2)=2, then apply recurrence
