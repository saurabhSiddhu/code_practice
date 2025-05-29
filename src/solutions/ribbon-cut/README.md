# Ribbon Cut - Dynamic Programming Problem

<div align="center">
  <a href="">
    <img src="https://img.shields.io/badge/Difficulty-Medium-yellow" alt="Difficulty" />
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/Pattern-Dynamic_Programming_Unbounded_Knapsack-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category            | Details                                                                    |
| ------------------- | -------------------------------------------------------------------------- |
| **Difficulty**      | Medium                                                                     |
| **Pattern**         | Dynamic Programming - Unbounded Knapsack Maximization                      |
| **Tags**            | `Dynamic Programming`, `Optimization`, `Memoization`, `Unbounded Knapsack` |
| **Interview Focus** | Common in Google, Amazon, Microsoft                                        |

## 📝 Problem Description

Given a ribbon of length `n` and an array of possible cut lengths, find the maximum number of pieces the ribbon can be cut into. Each cut length can be used multiple times (unbounded).

**Input**: `lengths = [2, 3, 5], ribbonLength = 5`  
**Output**: `2` (cut into pieces of length 2 + 3)

## 🧠 Why This is a Dynamic Programming Problem

### **1. Optimal Substructure** ✅

The optimal solution contains optimal solutions to subproblems:

```javascript
// For ribbon length 5 with cuts [2, 3]:
maxPieces(5) = max(
  1 + maxPieces(5-2),  // Cut 2, solve optimally for remaining 3
  1 + maxPieces(5-3)   // Cut 3, solve optimally for remaining 2
)
// The solution for length 5 depends on optimal solutions for lengths 3 and 2
```

### **2. Overlapping Subproblems** ✅

The same subproblems are solved multiple times:

```
Example: lengths=[2,3], ribbonLength=6

           maxPieces(6)
          /            \
   cut(2)/              \cut(3)
       /                  \
  maxPieces(4)         maxPieces(3)  ← Called multiple times
    /      \              /      \
cut(2)/    \cut(3)    cut(2)/   \cut(3)
    /        \          /         \
maxPieces(2) maxPieces(1) maxPieces(1) maxPieces(0)
                         ↑
                    Same subproblem!
```

### **3. Recurrence Relation** ✅

Clear mathematical relationship:

```javascript
// Recurrence:
maxPieces(n) = max(1 + maxPieces(n - cut[i])) for all valid cuts i

// Base cases:
maxPieces(0) = 0        // Perfect fit - no more cuts needed
maxPieces(negative) = -∞ // Impossible state
```

### **4. Exponential → Polynomial** ✅

Without DP: O(cuts^ribbonLength) - exponential branching  
With DP: O(ribbonLength × cuts) - each state computed once

## 🎯 What Makes This a Combination Problem

This is fundamentally about **exploring different combinations** of cuts to maximize pieces:

### Core Combination Concept

- **Decision at each step**: For any remaining length, try all possible cut lengths
- **Combination exploration**: Each cut creates a subproblem with remaining ribbon
- **Maximization objective**: Among all valid combinations, find maximum pieces

### Example Decision Tree: Length 5, Cuts [2,3,5]

```
                    5
                 /  |  \
             cut(2) cut(3) cut(5)
               3     2      0
             / |     |      |
         cut(2) cut(3) cut(3) done(1 piece)
            1   0     -1
            |   |    invalid
         cut(2) done(2 pieces)
           -1
         invalid

Result: Maximum 2 pieces (cuts: 2+3)
```

Result: Maximum 2 pieces (cuts: 2+3)

```

## 🧠 How to Develop Dynamic Programming Intuition

### **Step 1: Recognize the DP Signals** 🚨

| Signal | Question to Ask | Example in Ribbon Cut |
|--------|----------------|----------------------|
| **Optimization** | "Find max/min/optimal..." | "Find **maximum** number of pieces" |
| **Choices** | "Multiple ways to do something" | "Multiple cut lengths to choose from" |
| **Subproblems** | "Can I break this into smaller versions?" | "Cutting ribbon of length n → subproblems of smaller lengths" |
| **Repetition** | "Can I reuse previous calculations?" | "Same remaining lengths calculated multiple times" |

### **Step 2: The DP Thought Process** 🎯

```

1. 🤔 "What am I optimizing?"
   → Maximum pieces

2. 🤔 "What are my choices at each step?"
   → For any remaining length, choose which cut to make

3. 🤔 "How do I break this into subproblems?"
   → After making a cut, solve for the remaining ribbon length

4. 🤔 "What's my recurrence relation?"
   → maxPieces(n) = max(1 + maxPieces(n-cut[i])) for all cuts

5. 🤔 "What are my base cases?"
   → length 0 = 0 pieces needed, negative length = impossible

````

### **Step 3: Pattern Recognition** 🎪

Learn to spot these common DP patterns:

| Pattern | Characteristics | Example Problems |
|---------|---------------|------------------|
| **Unbounded Knapsack** | Unlimited use of items | Coin Change, Rod Cutting, **Ribbon Cut** |
| **0/1 Knapsack** | Use each item once | Classic Knapsack, Subset Sum |
| **Linear DP** | Sequential decisions | Fibonacci, House Robber |
| **Grid DP** | 2D optimization | Unique Paths, Edit Distance |
| **Tree DP** | Tree traversal + optimization | Binary Tree Max Path Sum |

### **Step 4: Practice Framework** 📚

**For Any DP Problem:**

1. **Start with Brute Force**
   ```javascript
   // Write the recursive solution first
   function solve(params) {
     // Base cases
     if (baseCondition) return baseValue;

     // Try all choices
     let best = worstPossible;
     for (choice in allChoices) {
       best = optimize(best, solve(newParams));
     }
     return best;
   }
````

2. **Add Memoization**

   ```javascript
   const memo = new Map();
   // Add memoization key and lookup
   ```

3. **Convert to Bottom-Up** (if needed)
   ```javascript
   // Build table from base cases up
   ```

### **Step 5: Debug Your DP Thinking** 🐛

**Common Mistakes & How to Avoid:**

| Mistake              | Wrong Thinking                    | Correct Thinking                                            |
| -------------------- | --------------------------------- | ----------------------------------------------------------- |
| **Wrong State**      | "I need to track too many things" | "What's the minimum info needed to make optimal decisions?" |
| **Wrong Transition** | "I'm not considering all choices" | "What are ALL possible moves from this state?"              |
| **Wrong Base Case**  | "My recursion doesn't stop"       | "What are the simplest cases where I know the answer?"      |
| **Off-by-one**       | "My indices are confusing"        | "Draw out small examples and trace through"                 |

## 💡 Interview Solution Strategy

### Which Approach to Present First?

**Start with Bottom-Up DP** - it's more intuitive and easier to explain:

1. **Think in terms of building up**: "For each length 1 to n, what's max pieces?"
2. **Simple iteration**: No recursion complexity to explain initially
3. **Clear visualization**: Easy to draw the DP table

### Bottom-Up Explanation

```javascript
// dp[i] = max pieces for ribbon of length i
dp[0] = 0  // Base case
for length 1 to n:
    for each cut:
        if (length >= cut && dp[length-cut] != -1):
            dp[length] = max(dp[length], dp[length-cut] + 1)
```

### If Asked for Alternative: Top-Down

- Show recursive thinking with memoization
- Explain how it's the same logic but with function calls
- Mention trade-offs (call stack vs iteration)

## ⏱️ Complexity Analysis

**Time Complexity**: `O(n × m)` where n = ribbon length, m = number of cut options  
**Space Complexity**: `O(n)` for DP array

## 🔄 Pattern Recognition: Unbounded Knapsack Variations

| Problem            | Goal       | Core Operation                      | Return Value |
| ------------------ | ---------- | ----------------------------------- | ------------ |
| **Ribbon Cut**     | Max pieces | `Math.max(result, prev + 1)`        | Max count    |
| **Coin Change I**  | Min coins  | `Math.min(result, prev + 1)`        | Min count    |
| **Coin Change II** | Count ways | `result += prev`                    | Total ways   |
| **Rod Cutting**    | Max value  | `Math.max(result, prev + value[i])` | Max value    |

**Key Insight**: Same structure, different aggregation function!

## 🧪 Critical Test Cases for Interviews

```javascript
// 1. Standard case
lengths: [2,3,5], ribbonLength: 5 → 2 (cuts: 2+3)

// 2. Impossible case
lengths: [3,5], ribbonLength: 7 → 0 (no valid combination)

// 3. Greedy fails
lengths: [1,3,4], ribbonLength: 4 → 4 (not 1+3=2 pieces, but 1+1+1+1=4)

// 4. Edge cases
ribbonLength: 0 → 0
lengths: [] → 0
```

## 🎯 Interview Tips

### What to Emphasize:

1. **Pattern Recognition**: "This is unbounded knapsack maximization"
2. **Base Cases**: Handle 0 length and impossible cuts
3. **Optimization**: Explain why we use Math.max vs Math.min
4. **Edge Cases**: Show you think about boundaries

### Common Follow-ups:

- "Can you optimize space?" → Yes, we only need previous states
- "What if we want the actual cuts?" → Track parent pointers
- "Time/space complexity?" → O(n×m) time, O(n) space

## 🚀 How to Run

```bash
npm test ribbon-cut
```
