# 🎯 Anki Cards for Fibonacci

*Generated on: 6/28/2025*

---

## 📚 Quick Reference

**Problem:** Fibonacci  
**Pattern:** Linear Dynamic Programming  
**Difficulty:** Easy  
**LeetCode:** https://leetcode.com/problems/fibonacci-number/

---

## 🔧 Questions

**Q1:** What pattern does "Fibonacci" follow and when should I recognize it?

**Q2:** What are the key insights and intuition for "Fibonacci"?

**Q3:** What are the different approaches for "Fibonacci" and their trade-offs?

**Q4:** What is the optimal code template for "Fibonacci" pattern?

**Q5:** What are the common mistakes in "Fibonacci"?

**Q6:** What is the time and space complexity of "Fibonacci"?

**Q7:** How should I approach "Fibonacci" in an interview?

**Q8:** What are the key optimization techniques for "Fibonacci"?

**Q9:** What follow-up questions might be asked for "Fibonacci"?

**Q10:** What similar problems share the same pattern as "Fibonacci"?

---

## 🔧 Answers

**A1:** What pattern does "Fibonacci" follow and when should I recognize it?

```
Pattern: Linear DP / Simple Recurrence Relation

Recognition Signals:
✅ Each value depends on previous 2 values
✅ f(n) = f(n-1) + f(n-2) recurrence
✅ Sequence building problems
✅ Classic DP introduction problem

When to use: Any problem with linear recurrence on previous values
```

**A2:** What are the key insights and intuition for "Fibonacci"?

```
🧠 Key Insights:
💡 Each number is sum of two preceding numbers
💡 Overlapping subproblems → memoization helps
💡 Only need last 2 values to compute next → space optimization

🎯 Intuition:
- Natural approach: Recursive definition F(n) = F(n-1) + F(n-2)
- Mathematical insight: Linear recurrence relation
- Visual understanding: Each level depends only on previous 2 levels
- Real-world analogy: Population growth where current = sum of previous generations

🔑 Mental Model:
"To find F(n), I need F(n-1) and F(n-2), so I can build up from F(0) and F(1)"
```

**A3:** What are the different approaches for "Fibonacci" and their trade-offs?

```
Approach 1: Naive Recursion
├── Description: Direct recursive implementation F(n) = F(n-1) + F(n-2)
├── Time: O(2^n) | Space: O(n) call stack
├── Pros: Matches mathematical definition exactly
└── Cons: Exponential time due to repeated calculations

Approach 2: Memoized Recursion (Top-Down DP)
├── Description: Recursion + cache to avoid recalculation
├── Time: O(n) | Space: O(n) cache + O(n) call stack
├── Pros: Natural recursive thinking, only computes needed values
└── Cons: Extra space for call stack

Approach 3: Iterative DP (Bottom-Up)
├── Description: Build up from F(0), F(1) to F(n)
├── Time: O(n) | Space: O(n) for DP array
├── Pros: No recursion overhead, clear progression
└── Cons: Computes all values even if only need F(n)

Approach 4: Space-Optimized Iterative
├── Description: Only keep last 2 values, not full array
├── Time: O(n) | Space: O(1)
├── Pros: Optimal space complexity
└── Cons: Can't access intermediate values

Approach 5: Matrix Exponentiation
├── Description: Use matrix multiplication for O(log n) solution
├── Time: O(log n) | Space: O(1)
├── Pros: Fastest for very large n
└── Cons: Complex implementation, overkill for most cases

💡 Progression: Naive → Memoization → Iteration → Space Optimization → Matrix Math
```

**A4:** What is the optimal code template for "Fibonacci" pattern?

```javascript
// Space-Optimized Iterative (Most Practical)
function fibonacci(n) {
    if (n <= 1) return n;
    
    let prev2 = 0; // F(0)
    let prev1 = 1; // F(1)
    
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Memoized Recursion Alternative
function fibonacciMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

// Bottom-Up DP (if need intermediate values)
function fibonacciDP(n) {
    if (n <= 1) return n;
    
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// Matrix Exponentiation (Advanced)
function fibonacciMatrix(n) {
    if (n <= 1) return n;
    
    function matrixMultiply(A, B) {
        return [
            [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
            [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]
        ];
    }
    
    function matrixPower(matrix, power) {
        if (power === 1) return matrix;
        if (power % 2 === 0) {
            const half = matrixPower(matrix, power / 2);
            return matrixMultiply(half, half);
        }
        return matrixMultiply(matrix, matrixPower(matrix, power - 1));
    }
    
    const baseMatrix = [[1, 1], [1, 0]];
    const resultMatrix = matrixPower(baseMatrix, n);
    return resultMatrix[0][1];
}

// Template Choice Guide:
// - Small n: Any approach works
// - Medium n: Space-optimized iterative
// - Large n: Matrix exponentiation
// - Need all values: Bottom-up DP
```

**A5:** What are the common mistakes in "Fibonacci"?

```
❌ Common Mistakes:
- Using naive recursion for large n (exponential time)
- Wrong base cases (F(0)=0, F(1)=1 are standard)
- Off-by-one errors in loop bounds
- Not handling n=0 and n=1 edge cases
- Integer overflow for large Fibonacci numbers

✅ Correct Approach:
- Always use DP or space-optimized iteration for n > 30
- Memorize standard base cases: F(0)=0, F(1)=1
- Handle edge cases explicitly before main logic
- Consider BigInt for very large Fibonacci numbers
- Understand the time complexity of your chosen approach
```

**A6:** What is the time and space complexity of "Fibonacci"?

```
Approach Complexities:
📊 Naive Recursion:
   Time: O(2^n) - exponential branching
   Space: O(n) - maximum call stack depth

📊 Memoized Recursion:
   Time: O(n) - each subproblem computed once
   Space: O(n) - memo storage + call stack

📊 Iterative DP:
   Time: O(n) - single loop
   Space: O(n) - DP array storage

📊 Space-Optimized Iterative:
   Time: O(n) - single loop
   Space: O(1) - only 2 variables

📊 Matrix Exponentiation:
   Time: O(log n) - exponentiation by squaring
   Space: O(1) - constant matrix operations
```

**A7:** How should I approach "Fibonacci" in an interview?

```
🎯 Interview Strategy:
1. "I recognize this as the classic Fibonacci sequence"
2. "The naive recursion is O(2^n) - let me optimize that"
3. "I can use DP to make it O(n) time and space"
4. "Actually, I only need the last 2 values - O(1) space optimization"
5. "For very large n, matrix exponentiation gives O(log n)"

🗣️ Communication Tips:
- Start with the mathematical definition
- Explain why naive recursion is inefficient (draw recursion tree)
- Show the optimization progression step by step
- Discuss when each approach is appropriate
- Handle edge cases (n=0, n=1) explicitly

🎯 Show Understanding:
- "This is a classic DP example because of overlapping subproblems"
- "The key insight is that each value only depends on the previous 2"
- "We can trade space for time or optimize both"
```

**A8:** What are the key optimization techniques for "Fibonacci"?

```
🚀 Optimization Techniques:
1. Memoization: Cache computed values to avoid recalculation
2. Bottom-Up: Eliminate recursion overhead
3. Space Optimization: Only store what you need (last 2 values)
4. Matrix Exponentiation: Logarithmic time for very large n

🧠 Memory Optimizations:
- Rolling variables instead of arrays
- In-place updates when possible
- Consider integer overflow for large n

🔄 Advanced Optimizations:
- Binet's Formula: Direct calculation using golden ratio (floating point issues)
- Fast doubling method: Another O(log n) approach
- Modular arithmetic: When result needed mod some number

💡 Choose Based on Requirements:
- Need all intermediate values? → Full DP array
- Just final value? → Space-optimized
- Very large n? → Matrix exponentiation
- Repeated queries? → Precompute + memoization
```

**A9:** What follow-up questions might be asked for "Fibonacci"?

```
🤔 Common Follow-ups:
1. "What about Tribonacci (sum of last 3)?" → Extend pattern
2. "How to handle very large numbers?" → BigInt or modular arithmetic
3. "Can you do it in O(log n) time?" → Matrix exponentiation
4. "What if we need F(n) mod m?" → Modular arithmetic properties
5. "How about negative inputs?" → Extended Fibonacci definition
6. "Can you find nth Fibonacci without computing previous ones?" → Binet's formula or matrix method

🎯 Advanced Variations:
- Fibonacci with different starting values
- Sum of first n Fibonacci numbers
- Finding Fibonacci numbers in a range
- Checking if a number is Fibonacci
- Fibonacci-like sequences with different recurrence relations
```

**A10:** What similar problems share the same pattern as "Fibonacci"?

```
🔗 Related Problems:
1. Climbing Stairs → F(n) = F(n-1) + F(n-2) (1 or 2 steps)
2. House Robber → DP with recurrence relation
3. Tribonacci → F(n) = F(n-1) + F(n-2) + F(n-3)
4. Minimum Cost Climbing Stairs → Choice between F(n-1) and F(n-2) with costs
5. Decode Ways → Similar DP structure with constraints
6. Count Ways to Reach Nth Stair → Direct Fibonacci application
7. Tiling Problems → Often reduce to Fibonacci-like recurrences

🎯 Pattern Family: "Linear Recurrence Relations"
- Any sequence where F(n) depends on fixed number of previous terms
- Classic DP problems with simple state transitions
- Often optimizable to O(1) space
- Matrix exponentiation applicable for O(log n) time
```

---

## 🎯 Memory Aids

**🧠 Remember:** "Each Fibonacci number is the sum of the two preceding ones!"

**🔑 Key Optimization:** Only need last 2 values → O(1) space

**⚡ Quick Check:** F(0)=0, F(1)=1, then F(n) = F(n-1) + F(n-2)
