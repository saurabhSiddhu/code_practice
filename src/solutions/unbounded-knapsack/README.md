# Unbounded Knapsack Problem - Combination Optimization

## Problem Description

Given a knapsack with a capacity W and a set of items, each with a weight and value, find the maximum value that can be achieved by selecting items where each item can be used multiple times (unbounded).

**This is fundamentally a combination exploration problem**: We systematically explore all possible combinations of items to find the one that maximizes value while staying within the weight constraint.

## Why This is a Combination Problem

The unbounded knapsack problem is essentially asking: "What combination of items (with repetition allowed) gives us the maximum value?"

### Combination Exploration Pattern

Every unbounded knapsack algorithm follows this decision tree:

- **Decision**: For each item, decide how many times to include it (0, 1, 2, ...)
- **Exploration**: Recursively explore all possible combinations
- **Goal**: Find the combination that maximizes value (vs counting in Coin Change II, vs minimizing in Coin Change I)

**Example with items [(weight=1, value=10), (weight=3, value=40)] and capacity=4:**

```
Root: capacity = 4, items = [(1,10), (3,40)]
├─ Use item 1: capacity = 3, value = 10, explore remaining
│  ├─ Use item 1: capacity = 2, value = 20, explore remaining
│  │  ├─ Use item 1: capacity = 1, value = 30, explore remaining
│  │  │  └─ Use item 1: capacity = 0, value = 40 ✓
│  │  └─ Skip items: combination [1,1,1,1] = 40 value
│  └─ Use item 2: capacity = 0, value = 50 ✓ (better!)
└─ Use item 2: capacity = 1, value = 40, explore remaining
   └─ Use item 1: capacity = 0, value = 50 ✓
```

**Key Insight**: We explore every possible way to combine items, then select the combination with maximum value.

## Approach

The solution uses dynamic programming to systematically explore all possible item combinations and find the optimal one. There are two implementations:

1. **Space-Optimized Solution (solve method)**

   - Uses a 1D DP array of size (capacity + 1)
   - Explores combinations efficiently by building up from smaller capacities
   - Time Complexity: O(n × capacity) - explores each item-capacity combination
   - Space Complexity: O(capacity)

2. **Alternative Solution (solveAlternative method)**
   - Uses a 2D DP array of size (n + 1) × (capacity + 1)
   - More intuitive visualization of the combination exploration process
   - Time Complexity: O(n × capacity) - explores each item-capacity combination
   - Space Complexity: O(n × capacity)

### Comparison with Related Combination Problems

| Problem                | Combination Goal                  | Final Operation     | Example Output    |
| ---------------------- | --------------------------------- | ------------------- | ----------------- |
| **Unbounded Knapsack** | **Find optimal item combination** | **`Math.max(...)`** | **Maximum value** |
| Rod Cutting            | Find optimal cutting combination  | `Math.max(...)`     | Maximum value     |
| Coin Change I          | Find minimum coin combination     | `Math.min(...)`     | Minimum coins     |
| Coin Change II         | Count all valid combinations      | `+ count`           | Number of ways    |

All these problems explore the same decision tree structure - they differ only in what they do with the combinations they find!

## Test Cases

### Basic Case

```javascript
{
    weights: [1, 3, 4, 5],
    values: [10, 40, 50, 70],
    capacity: 8
}
Expected: 110
Explanation: Optimal combination is item 2 (weight=3, value=40) + item 3 (weight=4, value=50) + item 1 (weight=1, value=10)
```

### Edge Cases

1. Zero Capacity

```javascript
{
    weights: [1, 2, 3],
    values: [10, 20, 30],
    capacity: 0
}
Expected: 0
```

2. Single Item

```javascript
{
    weights: [2],
    values: [5],
    capacity: 6
}
Expected: 15
```

### Performance Test

- Tests with 50 items
- Capacity of 100
- Measures execution time over 100 iterations

## Notes

- **Fundamental Pattern**: The unbounded knapsack problem is essentially a combination optimization problem - we explore all possible ways to combine items and select the optimal combination
- **Relationship to Other Problems**: Similar to coin change problems but optimizes for maximum value instead of counting combinations or minimizing coins
- **Algorithm Efficiency**: The space-optimized solution is preferred for large inputs as it uses only O(capacity) space
- **Learning Value**: The alternative 2D solution is valuable for understanding the underlying decision-making process and debugging
- **Real-world Applications**: Resource allocation, budget optimization, cutting stock problems, investment portfolio optimization

### Why Combination Exploration Matters

Understanding that this is fundamentally about exploring combinations helps in:

1. **Pattern Recognition**: Recognizing similar problems in interviews and real-world scenarios
2. **Solution Adaptation**: Adapting the same exploration framework to different optimization goals
3. **Optimization Strategies**: Choosing the right data structure and approach based on the problem constraints

## Running Tests

```bash
# Run tests for this solution
npm test --solution=unbounded-knapsack

# Run all tests
npm run test:all
```

## Related Problems

- **Coin Change II (LeetCode 518)**: Count combinations instead of optimizing value
- **Rod Cutting**: Optimize cutting combinations for maximum profit
- **Coin Change I (LeetCode 322)**: Find minimum coins instead of maximum value
- **Combination Sum (LeetCode 39)**: Find all combinations that sum to target
- **Perfect Squares (LeetCode 279)**: Minimum perfect square numbers to sum to n

### Problem Variations by Objective

| Problem Type           | Goal               | Operation           | Example                         |
| ---------------------- | ------------------ | ------------------- | ------------------------------- |
| **Unbounded Knapsack** | **Maximize value** | **`Math.max(...)`** | **Item selection optimization** |
| Coin Change I          | Minimize count     | `Math.min(...)`     | Fewest coins needed             |
| Coin Change II         | Count ways         | `+ count`           | Number of combinations          |
| Combination Sum        | Find all           | `collect solutions` | All valid combinations          |

All these problems share the same underlying combination exploration pattern - they just differ in what they do with the combinations they discover!
