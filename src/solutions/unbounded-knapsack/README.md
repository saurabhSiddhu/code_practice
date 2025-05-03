# Unbounded Knapsack Problem

## Problem Description
Given a knapsack with a capacity W and a set of items, each with a weight and value, find the maximum value that can be achieved by selecting items where each item can be used multiple times (unbounded).

## Approach
The solution uses dynamic programming to solve the unbounded knapsack problem. There are two implementations:

1. **Space-Optimized Solution (solve method)**
   - Uses a 1D DP array of size (capacity + 1)
   - Time Complexity: O(n * capacity)
   - Space Complexity: O(capacity)

2. **Alternative Solution (solveAlternative method)**
   - Uses a 2D DP array of size (n + 1) x (capacity + 1)
   - More intuitive but uses more memory
   - Time Complexity: O(n * capacity)
   - Space Complexity: O(n * capacity)

## Test Cases

### Basic Case
```javascript
{
    weights: [1, 3, 4, 5],
    values: [10, 40, 50, 70],
    capacity: 8
}
Expected: 110
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
- The unbounded knapsack problem is similar to the coin change problem
- The space-optimized solution is preferred for large inputs
- The alternative solution is useful for understanding the problem and debugging

## Running Tests
```bash
# Run tests for this solution
npm test --solution=unbounded-knapsack

# Run all tests
npm run test:all
```

## Related Problems
- TODO: Add related problems from LeetCode
- TODO: Add similar problems you've solved
