# Two Sum

## Problem Description
Given an array of integers `nums` and an integer `target`, return indices of the two numbers in the array such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.

## Solution
The solution is implemented in `two-sum.js` with two different approaches:

### Approach 1: Hash Map (Primary Solution)
1. Use a hash map to store numbers and their indices
2. For each number, check if its complement (target - num) exists in the map
3. If found, return the current index and the complement's index
4. If not found, add the current number and index to the map

### Approach 2: Two Pointers (Alternative Solution)
1. Create array of number-index pairs to preserve original indices
2. Sort the pairs by number value
3. Use two pointers (left and right) to find pairs that sum to target
4. Return original indices in sorted order

### Complexity Analysis
Primary Solution (Hash Map):
- Time Complexity: O(n)
- Space Complexity: O(n)

Alternative Solution (Two Pointers):
- Time Complexity: O(n log n) due to sorting
- Space Complexity: O(n) for storing pairs

### Category
array

### Difficulty
🟢 EASY

### LeetCode Link
https://leetcode.com/problems/two-sum/

## Test Cases
The solution includes:
- Basic test case: `[2, 7, 11, 15]` with target `9`
- Edge case with duplicate numbers: `[3, 2, 4]` with target `6`
- Edge case with same numbers: `[3, 3]` with target `6`
- Performance test with 10,000 numbers

### Custom Validation
The performance test includes a custom validator that checks:
1. Result is an array of two different indices
2. Indices are within array bounds
3. Numbers at the indices sum to target

## Running Tests
```bash
# Run tests for this solution
npm test --solution=two-sum/two-sum

# Run all tests
npm run test:all
```

## Notes
- The hash map solution is more efficient for most cases
- The two pointer solution is useful when array is already sorted
- Solution handles edge cases like empty arrays and invalid inputs

## Related Problems
- 3Sum (Medium)
- 4Sum (Medium)
- Two Sum II - Input Array Is Sorted (Medium)
- Two Sum III - Data structure design (Easy) 