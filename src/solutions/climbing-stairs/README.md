# Climbing Stairs

<div align="center">
  <a href="https://leetcode.com/problems/climbing-stairs/description/">
    <img src="https://img.shields.io/badge/LeetCode-Easy-green" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/climbing-stairs/description/">
    <img src="https://img.shields.io/badge/Pattern-Tribonacci DP-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                                        |
| -------------- | ------------------------------------------------------------------------------ |
| **Difficulty** | Easy                                                                           |
| **Pattern**    | Tribonacci Dynamic Programming                                                 |
| **Tags**       | `DP`                                                                           |
| **LeetCode**   | [View on LeetCode](https://leetcode.com/problems/climbing-stairs/description/) |

## 📝 Problem Description

Given a stair with ‘n’ steps, implement a method to count how many possible ways are there to reach the top of the staircase, given that, at every step you can either take 1 step, 2 steps, or 3 steps.

## 💡 Solution Approach

## 💡 Solution Approach

### Building Intuition with Decision Trees 🌳

The key to understanding this problem is to think **backwards**: "How could I have reached stair N?"

#### Step 1: Understand the Pattern with Small Examples

```
🪜 Stair 1: Only 1 way → [1]
🪜 Stair 2: 2 ways → [1+1], [2]
🪜 Stair 3: 4 ways → [1+1+1], [1+2], [2+1], [3]
```

#### Step 2: Decision Tree Analysis

For any stair N > 3, visualize the decision tree:

```
                    🎯 Goal: Reach Stair N
                           |
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    Take 1 step        Take 2 steps      Take 3 steps
        │                  │                  │
        ▼                  ▼                  ▼
   🎯 Stair N-1        🎯 Stair N-2        🎯 Stair N-1
   (ways(N-1))         (ways(N-2))         (ways(N-3))
```

**Key Insight**: To reach stair N, I must have come from stair N-1, N-2, or N-3 as my last step.

### Approach

**Top-Down (Recursive with Memoization):**

1. **Base Cases**: Handle stairs 1, 2, 3 directly
2. **Decision Analysis**: For stair N, consider where you could have come from
3. **Recursive Relation**: `ways(N) = ways(N-1) + ways(N-2) + ways(N-3)`
4. **Memoization**: Cache results to avoid redundant calculations

**Bottom-Up (Iterative):**

1. **Initialize**: Start with base cases (stairs 1, 2, 3)
2. **Build Up**: For each stair 4 to N, use the tribonacci pattern
3. **Space Optimization**: Only keep track of the last 3 values

### Key Insights

- **"Last Step Analysis"**: Always think "Where could I have been before my final step?"
- **Tribonacci Pattern**: This is essentially the tribonacci sequence where each number is the sum of the previous 3
- **Overlapping Subproblems**: The same stairs are calculated multiple times without memoization
- **Optimal Substructure**: The optimal solution contains optimal solutions to subproblems

## ⏱️ Complexity Analysis

## ⏱️ Complexity Analysis

### Time Complexity

**Top-Down with Memoization:**

```
O(n) - Each subproblem (stair) is calculated exactly once and cached
```

**Bottom-Up Iterative:**

```
O(n) - Single pass from stair 4 to n, constant work per iteration
```

**Naive Recursive (for comparison):**

```
O(3^n) - Exponential time due to redundant calculations without memoization
```

### Space Complexity

**Top-Down with Memoization:**

```
O(n) - Memoization table stores n values + O(n) recursion stack
```

**Bottom-Up Iterative (Optimized):**

```
O(1) - Only store the last three values (prev3, prev2, prev1)
```

**Bottom-Up with Array:**

```
O(n) - If storing all values in an array instead of optimizing
```

## 🧪 Test Cases

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1: Minimum case
Input: 1
Output: 1
Explanation: Only one way: [1]

// Example 2: Two-step case
Input: 2
Output: 2
Explanation: Two ways: [1+1], [2]

// Example 3: Three-step case (base tribonacci)
Input: 3
Output: 4
Explanation: Four ways: [1+1+1], [1+2], [2+1], [3]

// Example 4: Pattern verification
Input: 4
Output: 7
Explanation: ways(4) = ways(3) + ways(2) + ways(1) = 4 + 2 + 1 = 7

// Example 5: Tribonacci continues
Input: 5
Output: 13
Explanation: ways(5) = ways(4) + ways(3) + ways(2) = 7 + 4 + 2 = 13
```

### Edge Cases

```javascript
// Edge Case 1: Negative input
Input: -1
Output: 0
Explanation: Invalid input, no ways to climb negative stairs

// Edge Case 2: Zero stairs
Input: 0
Output: 0
Explanation: No stairs to climb

// Edge Case 3: Medium staircase
Input: 10
Output: 274
Explanation: Tests algorithm efficiency for medium inputs

// Edge Case 4: Large staircase
Input: 15
Output: 5768
Explanation: Verifies pattern holds for larger numbers
```

### Performance Test Cases

```javascript
// Performance Test 1: Large input
Input: 20;
Output: 121415;

// Performance Test 2: Very large input
Input: 30;
Output: 15902591;

// Performance Test 3: Maximum practical input
Input: 35;
Output: 181997601;
```

### Decision Tree Example for Stair 4

```
                    Stair 4 (Goal)
                   /      |      \
              Take 1   Take 2   Take 3
                 |        |        |
                 ▼        ▼        ▼
            Stair 3   Stair 2   Stair 1
            (4 ways)  (2 ways)  (1 way)

Total: 4 + 2 + 1 = 7 ways to reach Stair 4
```

## 🧠 Building Intuition: Decision Tree Method

### The Mental Framework

When you see this type of problem, follow this thought process:

#### 1. **Start Small** - Work Through Examples

```
🪜 n=1: [1] → 1 way
🪜 n=2: [1+1], [2] → 2 ways
🪜 n=3: [1+1+1], [1+2], [2+1], [3] → 4 ways
```

#### 2. **Ask the Right Question**

Instead of "What can I do from here?" ask:
**"How could I have gotten here?"**

#### 3. **Decision Tree Visualization**

For stair N, draw the decision tree:

```
                   Stair N
                  /   |   \
            From N-1  N-2  N-3
            (step 1) (step 2) (step 3)
```

#### 4. **Apply the Pattern**

```javascript
ways(N) = ways(N-1) + ways(N-2) + ways(N-3)
```

### Interactive Example: Stair 5

Let's trace through stair 5 step by step:

```
🎯 Goal: Reach Stair 5

🤔 Question: "Where could I have been before my last step?"

📊 Analysis:
  - From Stair 4 (take 1 step) → ways(4) = 7
  - From Stair 3 (take 2 steps) → ways(3) = 4
  - From Stair 2 (take 3 steps) → ways(2) = 2

✅ Answer: 7 + 4 + 2 = 13 ways
```

### Universal DP Pattern Recognition

This approach works for many DP problems:

1. **Identify your "state"** (current stair)
2. **Identify your "choices"** (1, 2, or 3 steps)
3. **Think backwards** ("Where did I come from?")
4. **Combine subproblems** (add up all possibilities)

## 💻 Implementation Details

### Two Optimized Approaches

#### 1. Top-Down with Memoization

```javascript
solve(numberOfStairs) {
  // Handle base cases
  if (numberOfStairs < 0) return 0;
  if (numberOfStairs === 1) return 1;
  if (numberOfStairs === 2) return 2;
  if (numberOfStairs === 3) return 4;

  // Use memoization to cache results
  const memo = new Map([[1, 1], [2, 2], [3, 4]]);

  const getNumberOfWays = (remainingStairs) => {
    if (memo.has(remainingStairs)) {
      return memo.get(remainingStairs);
    }

    // Apply tribonacci pattern: sum of previous 3 values
    const totalWays =
      getNumberOfWays(remainingStairs - 1) +
      getNumberOfWays(remainingStairs - 2) +
      getNumberOfWays(remainingStairs - 3);

    memo.set(remainingStairs, totalWays);
    return totalWays;
  };

  return getNumberOfWays(numberOfStairs);
}
```

#### 2. Bottom-Up Iterative (Space-Optimized)

```javascript
solveIterative(numberOfStairs) {
  if (numberOfStairs < 0) return 0;
  if (numberOfStairs === 1) return 1;
  if (numberOfStairs === 2) return 2;
  if (numberOfStairs === 3) return 4;

  // Only store last 3 values (space optimization)
  let prev3 = 1, prev2 = 2, prev1 = 4;

  for (let i = 4; i <= numberOfStairs; i++) {
    const current = prev1 + prev2 + prev3;
    [prev3, prev2, prev1] = [prev2, prev1, current];
  }

  return prev1;
}
```

## 🚀 How to Run

```bash
# Run basic tests
npm test climbing-stairs

# Run with performance tests
npm test climbing-stairs --skip-performance=false

# Run with detailed output
npm test climbing-stairs --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/climbing-stairs/description/)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)

## 🎯 Pattern Recognition: Climbing Stairs vs Unbounded Knapsack

### Key Differences in Simple Terms

#### **Climbing Stairs (Sequential Problem - PERMUTATIONS)**

```
🪜 Fixed sequence: You MUST go from stair 1 → 2 → 3 → ... → N
🎯 Goal: Count ways to reach a specific position
📝 Pattern: "How many ways to get HERE?"
⚡ Example: Must climb stairs in order, can't skip around
🔑 KEY: ORDER MATTERS - [1,2] ≠ [2,1] (different ways!)
```

#### **Unbounded Knapsack (Choice Problem - COMBINATIONS)**

```
🎒 Any order: You can pick items in ANY sequence
🎯 Goal: Maximize value within weight limit
📝 Pattern: "What's the BEST combination?"
⚡ Example: Can grab any item anytime, order doesn't matter
🔑 KEY: ORDER DOESN'T MATTER - just total value/weight
```

### Simple Intuition Guide 🧠

Ask yourself these questions to identify the pattern:

#### **1. Am I going somewhere specific?**

- **YES** → Climbing Stairs pattern (sequential progression)
- **NO** → Knapsack pattern (flexible choices)

#### **2. Do I care about ORDER?**

- **YES** → Climbing Stairs (PERMUTATIONS - different orders count separately)
- **NO** → Knapsack (COMBINATIONS - only final result matters)

#### **3. What am I optimizing?**

- **Count ways/possibilities** → Climbing Stairs
- **Best value/profit/minimum cost** → Knapsack

#### **4. What's my constraint?**

- **Position/sequence** → Climbing Stairs
- **Capacity/weight/budget** → Knapsack

### Quick Pattern Recognition Signals 🔍

#### **Climbing Stairs Signals:**

```
✅ "How many ways to..."
✅ "Reach position N"
✅ "Step by step progression"
✅ "Fixed sequence/order matters"
✅ "Count distinct paths"
✅ Words: steps, stairs, paths, ways, sequence
```

#### **Unbounded Knapsack Signals:**

```
✅ "Maximum value/profit"
✅ "Minimum cost/operations"
✅ "Unlimited use of items"
✅ "Weight/capacity constraint"
✅ "Order doesn't matter"
✅ Words: coins, items, capacity, maximize, minimize
```

### Pattern Decision Tree

```
🤔 Problem Analysis
      |
      ▼
📍 Do I need to reach a specific position/state?
      |
   YES ▼                    NO ▼
🪜 Sequential              🎒 Choice-based
   Problem                    Problem
      |                         |
      ▼                         ▼
   Count ways?              Optimize value?
      |                         |
   YES ▼                    YES ▼
Climbing Stairs          Unbounded Knapsack
(PERMUTATIONS)           (COMBINATIONS)
```

### 🎯 The Permutation vs Combination Rule

**Key Memory Device:**

- **When ORDER MATTERS** → Use Climbing Stairs pattern (Permutations)

  - Example: `[1,2]` and `[2,1]` are DIFFERENT ways to reach stair 3
  - "How many DISTINCT SEQUENCES?"

- **When ORDER DOESN'T MATTER** → Use Knapsack pattern (Combinations)
  - Example: Coins worth `[1,2]` and `[2,1]` have SAME total value
  - "What's the BEST combination?"

### Real Examples:

**Climbing Stairs Pattern (Permutations):**

- Coin Change II: Count ways to make amount (different orders = different ways)
- Number of ways to decode a string
- Ways to climb stairs/steps
- Path counting problems

**Knapsack Pattern (Combinations):**

- Coin Change I: Minimum coins needed (order doesn't matter)
- Maximum profit within weight limit
- Subset sum problems
- Resource optimization

The key insight: **Sequential vs Choice-based** problems have completely different approaches!
