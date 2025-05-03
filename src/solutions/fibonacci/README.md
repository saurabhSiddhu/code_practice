# Fibonacci Number

## Problem Description
The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1:
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2), for n > 1

## Solution
The solution is implemented in `fibonacci.js` with two different approaches:

### Approach 1: Iterative (Primary Solution)
1. Handle base cases (n ≤ 1)
2. Use two variables to store previous values
3. Iterate from 2 to n, calculating each Fibonacci number
4. Use BigInt to handle large numbers

### Approach 2: Recursive with Memoization (Alternative Solution)
1. Use a Map to store previously calculated values
2. Recursively calculate F(n) = F(n-1) + F(n-2)
3. Check memo before calculation
4. Store results in memo for reuse

### Complexity Analysis
Primary Solution (Iterative):
- Time Complexity: O(n)
- Space Complexity: O(1)

Alternative Solution (Recursive):
- Time Complexity: O(n)
- Space Complexity: O(n) for memoization

### Category
dp

### Difficulty
🟢 EASY

### LeetCode Link
https://leetcode.com/problems/fibonacci-number/

## Test Cases
The solution includes:
- Base cases: F(0) = 0, F(1) = 1
- Small number: F(5) = 5
- Medium number: F(10) = 55
- Large number: F(100) = 354,224,848,179,261,915,075

### Performance Testing
- Tests with n = 100
- Uses BigInt for precise large number calculations
- Measures execution time over 100 iterations

## Running Tests
```bash
# Run tests for this solution
npm test --solution=fibonacci/fibonacci

# Run all tests
npm run test:all
```

## Notes
- Uses BigInt for handling large numbers precisely
- Iterative solution is more space-efficient
- Memoized solution is useful for understanding recursion
- Both solutions handle edge cases properly

## Related Problems
- Climbing Stairs (Easy)
- Min Cost Climbing Stairs (Easy)
- N-th Tribonacci Number (Easy)
- House Robber (Medium) 