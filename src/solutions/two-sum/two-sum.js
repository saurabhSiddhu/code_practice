/**
 * Two Sum Problem
 * 
 * Given an array of integers nums and an integer target, return indices of the two numbers 
 * in the array such that they add up to target. You may assume that each input would have 
 * exactly one solution, and you may not use the same element twice.
 * 
 * Difficulty: 🟢 EASY
 * Category: array
 * LeetCode: https://leetcode.com/problems/two-sum/
 * 
 * Time Complexity:
 * O(n) where n is the length of the input array
 * 
 * Space Complexity:
 * O(n) for storing the hash map
 */

/**
 * Two Sum Solution
 * Given an array of integers nums and an integer target,
 * return indices of the two numbers such that they add up to target.
 */
class TwoSum {
    constructor() {
        this.testCases = [
            {
                description: "Basic case with two numbers that sum to target",
                input: { nums: [2, 7, 11, 15], target: 9 },
                expected: [0, 1],
                category: "basic"
            },
            {
                description: "Edge case with duplicate numbers",
                input: { nums: [3, 2, 4], target: 6 },
                expected: [1, 2],
                category: "edge"
            },
            {
                description: "Edge case with same numbers",
                input: { nums: [3, 3], target: 6 },
                expected: [0, 1],
                category: "edge"
            },
            {
                description: "Performance test with large array",
                input: { 
                    nums: Array.from({ length: 10000 }, (_, i) => i + 1),
                    target: 10001
                },
                expected: [0, 9999],
                category: "performance",
                validator: (result, expected) => {
                    if (!Array.isArray(result) || result.length !== 2) return false;
                    const [i, j] = result;
                    const nums = Array.from({ length: 10000 }, (_, i) => i + 1);
                    return nums[i] + nums[j] === 10001;
                }
            }
        ];
    }

    solve(input) {
        const { nums, target } = input;
        const map = new Map();
        
        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (map.has(complement)) {
                return [map.get(complement), i];
            }
            map.set(nums[i], i);
        }
        
        return [];
    }

    /**
     * Alternative solution using two pointers
     * This approach requires sorting the array first
     * Time: O(n log n), Space: O(n)
     */
    solveAlternative(input) {
        const { nums, target } = input;
        
        if (!nums || nums.length < 2) return [];
        
        // Create array of number-index pairs
        const pairs = nums.map((num, idx) => ({ num, idx }));
        
        // Sort by number
        pairs.sort((a, b) => a.num - b.num);
        
        let left = 0;
        let right = pairs.length - 1;
        
        while (left < right) {
            const sum = pairs[left].num + pairs[right].num;
            
            if (sum === target) {
                return [pairs[left].idx, pairs[right].idx].sort((a, b) => a - b);
            }
            
            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        
        return [];
    }
}

module.exports = TwoSum; 