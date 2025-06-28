# 🎯 Anki Cards for Unbounded Knapsack

*Generated on: 6/28/2025*

---

## 📚 Quick Reference

**Problem:** Unbounded Knapsack  
**Pattern:** Unbounded Dynamic Programming / Combination Optimization  
**Difficulty:** Medium  
**LeetCode:** Classic algorithmic problem

---

## 🔧 Questions

**Q1:** What pattern does "Unbounded Knapsack" follow and when should I recognize it?

**Q2:** What are the key insights and intuition for "Unbounded Knapsack"?

**Q3:** What are the different approaches for "Unbounded Knapsack" and their trade-offs?

**Q4:** What is the optimal code template for "Unbounded Knapsack" pattern?

**Q5:** What are the common mistakes in "Unbounded Knapsack"?

**Q6:** What is the time and space complexity of "Unbounded Knapsack"?

**Q7:** How should I approach "Unbounded Knapsack" in an interview?

**Q8:** What are the key optimization techniques for "Unbounded Knapsack"?

**Q9:** What follow-up questions might be asked for "Unbounded Knapsack"?

**Q10:** What similar problems share the same pattern as "Unbounded Knapsack"?

---

## 🔧 Answers

**A1:** What pattern does "Unbounded Knapsack" follow and when should I recognize it?

```
Pattern: Unbounded DP / Combination Optimization

Recognition Signals:
✅ Items can be used unlimited times
✅ Maximize/minimize value within capacity constraint
✅ Each item has weight and value properties
✅ "Unlimited" or "can use multiple times" keywords

When to use: Optimization problems with reusable resources and constraints
```

**A2:** What are the key insights and intuition for "Unbounded Knapsack"?

```
🧠 Key Insights:
💡 Each item can be used 0, 1, 2, ... times (unlimited)
💡 For each weight W, try including each item and take maximum
💡 dp[w] = max(dp[w], dp[w - weight[i]] + value[i]) for all items
💡 Build solutions from smaller weights to larger weights

🎯 Intuition:
- Natural approach: Try all possible combinations of items (exponential)
- Mathematical insight: Optimal substructure - best value for weight W uses best values for smaller weights
- Visual understanding: Fill DP table, each cell considers all items
- Real-world analogy: Packing a backpack with unlimited supply of each item type

🔑 Mental Model:
"For each capacity, try adding each item and see which gives maximum value"
```

**A3:** What are the different approaches for "Unbounded Knapsack" and their trade-offs?

```
Approach 1: Recursive Brute Force
├── Description: Try all combinations recursively
├── Time: O(k^capacity) where k is number of items | Space: O(capacity)
├── Pros: Matches natural thinking process
└── Cons: Exponential time, many repeated subproblems

Approach 2: Top-Down DP (Memoization)
├── Description: Recursion + memo to cache subproblems
├── Time: O(capacity × items) | Space: O(capacity)
├── Pros: Natural recursion, only computes needed subproblems
└── Cons: Recursion stack overhead

Approach 3: Bottom-Up DP (Optimal)
├── Description: Fill DP table from 0 to capacity iteratively
├── Time: O(capacity × items) | Space: O(capacity)
├── Pros: No recursion overhead, guaranteed optimal
└── Cons: Computes all subproblems even if not needed

Approach 4: Space-Optimized DP
├── Description: 1D DP array, process items one by one
├── Time: O(capacity × items) | Space: O(capacity)
├── Pros: Minimal space usage
└── Cons: Can't reconstruct which items were chosen

💡 Progression: Brute Force → Memoization → 2D DP → 1D DP
```

**A4:** What is the optimal code template for "Unbounded Knapsack" pattern?

```javascript
// 1D Bottom-Up DP (Most Efficient)
function unboundedKnapsack(weights, values, capacity) {
    // dp[w] = maximum value achievable with weight limit w
    const dp = new Array(capacity + 1).fill(0);
    
    // For each capacity from 1 to target
    for (let w = 1; w <= capacity; w++) {
        // Try each item
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) { // Can use this item
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    
    return dp[capacity];
}

// 2D DP Version (easier to understand)
function unboundedKnapsack2D(weights, values, capacity) {
    const n = weights.length;
    // dp[i][w] = max value using first i items with weight limit w
    const dp = Array.from({length: n + 1}, () => new Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            // Don't take current item
            dp[i][w] = dp[i - 1][w];
            
            // Take current item (can take multiple times)
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i][w], 
                    dp[i][w - weights[i - 1]] + values[i - 1] // Note: dp[i], not dp[i-1]
                );
            }
        }
    }
    
    return dp[n][capacity];
}

// Top-Down with Memoization
function unboundedKnapsackMemo(weights, values, capacity) {
    const memo = new Map();
    
    function dp(remainingCapacity) {
        if (remainingCapacity === 0) return 0;
        if (memo.has(remainingCapacity)) return memo.get(remainingCapacity);
        
        let maxValue = 0;
        
        // Try each item
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= remainingCapacity) {
                const value = values[i] + dp(remainingCapacity - weights[i]);
                maxValue = Math.max(maxValue, value);
            }
        }
        
        memo.set(remainingCapacity, maxValue);
        return maxValue;
    }
    
    return dp(capacity);
}

// With item tracking (to see which items were chosen)
function unboundedKnapsackWithItems(weights, values, capacity) {
    const dp = new Array(capacity + 1).fill(0);
    const items = new Array(capacity + 1).fill().map(() => []);
    
    for (let w = 1; w <= capacity; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                const newValue = dp[w - weights[i]] + values[i];
                if (newValue > dp[w]) {
                    dp[w] = newValue;
                    items[w] = [...items[w - weights[i]], i];
                }
            }
        }
    }
    
    return {maxValue: dp[capacity], items: items[capacity]};
}
```

**A5:** What are the common mistakes in "Unbounded Knapsack"?

```
❌ Common Mistakes:
- Using 0/1 knapsack logic (dp[i-1] instead of dp[i] for unbounded)
- Wrong loop order (items inside capacity vs capacity inside items)
- Not checking weight constraint before adding item
- Confusing with coin change (this maximizes value, not minimizes count)
- Wrong base case initialization

✅ Correct Approach:
- In 2D DP: use dp[i][w - weight] not dp[i-1][w - weight] (key difference!)
- Check weight[i] <= w before using item
- Initialize DP with 0 (represents 0 value with 0 items)
- Understand this maximizes value, unlike coin change variants
- In 1D DP: iterate capacity outer, items inner
```

**A6:** What is the time and space complexity of "Unbounded Knapsack"?

```
1D Bottom-Up DP:
📊 Time Complexity: O(capacity × items)
   - Outer loop: capacity iterations
   - Inner loop: items iterations
   - Each operation: O(1)

📊 Space Complexity: O(capacity)
   - DP array of size (capacity + 1)
   - Optimal space usage

2D DP Version:
📊 Time Complexity: O(capacity × items)
   - Same time complexity
   
📊 Space Complexity: O(capacity × items)
   - 2D DP table
   - Less space efficient but easier to understand

📊 Top-Down Memoization:
   - Time: O(capacity × items) after memoization
   - Space: O(capacity) memo + O(capacity) recursion stack
```

**A7:** How should I approach "Unbounded Knapsack" in an interview?

```
🎯 Interview Strategy:
1. "This is an unbounded knapsack - items can be used multiple times"
2. "I need to maximize value while staying within weight capacity"
3. "For each capacity, I'll try adding each item and take the maximum"
4. "Key difference from 0/1 knapsack: can reuse items unlimited times"
5. "Let me trace through a small example..."

🗣️ Communication Tips:
- Clearly distinguish from 0/1 knapsack (emphasize "unlimited use")
- Explain the DP recurrence relation carefully
- Show why we can reuse dp[i] instead of dp[i-1] in 2D version
- Walk through how decisions build up optimally
- Discuss space optimization from 2D to 1D

🎯 Key Insights to Mention:
- Optimal substructure property
- How unlimited use changes the recurrence
- Why greedy doesn't work (counterexample)
- Connection to other DP problems
```

**A8:** What are the key optimization techniques for "Unbounded Knapsack"?

```
🚀 Optimization Techniques:
1. Space Optimization: Use 1D array instead of 2D
2. Early Termination: Skip items heavier than current capacity
3. Item Sorting: Sort by value/weight ratio for better practical performance
4. Pruning: Skip dominated items (heavier but less valuable)

🧠 Advanced Optimizations:
- Branch and bound for exact solutions
- Approximation algorithms for very large instances
- Core algorithm for practical speedup
- Fractional relaxation for upper bounds

🔄 Implementation Optimizations:
- Process items by decreasing value/weight ratio
- Use bit manipulation for very small capacities
- Memoization with limited cache size for very large problems
```

**A9:** What follow-up questions might be asked for "Unbounded Knapsack"?

```
🤔 Common Follow-ups:
1. "What if each item has limited quantity?" → Bounded knapsack
2. "How to find which items were actually chosen?" → Backtracking
3. "What about multiple knapsacks?" → Multi-dimensional DP
4. "Can you solve it with approximation?" → FPTAS algorithms
5. "What if items have additional constraints?" → Multi-constraint knapsack
6. "How to handle very large capacities?" → Approximation algorithms

🎯 Advanced Variations:
- Multi-objective knapsack (value and weight optimization)
- Knapsack with dependencies between items
- Online knapsack (items arrive over time)
- Stochastic knapsack (uncertain values/weights)
```

**A10:** What similar problems share the same pattern as "Unbounded Knapsack"?

```
🔗 Related Problems:
1. Coin Change → Minimize items instead of maximize value
2. Coin Change II → Count ways instead of optimize value
3. Perfect Squares → Minimize squares that sum to n
4. Combination Sum → Find all combinations that sum to target
5. Rod Cutting → Maximize value by cutting rod into pieces
6. Word Break → Can form string with unlimited dictionary words
7. Minimum Cost Climbing Stairs → Choose optimal path with costs

🎯 Pattern Family: "Unbounded DP / Unlimited Resource Optimization"
- Problems where resources can be used unlimited times
- Optimization objective (maximize/minimize) with constraints
- Each decision can be repeated multiple times
- Bottom-up DP building from smaller to larger subproblems
```

---

## 🎯 Memory Aids

**🧠 Remember:** "Unlimited items = use dp[i] not dp[i-1] in 2D, maximize value!"

**🔑 Key Difference:** Unbounded allows reuse → dp[i][w-weight] + value (not dp[i-1])

**⚡ Quick Check:** Can use items multiple times? Process each capacity with all items available.
