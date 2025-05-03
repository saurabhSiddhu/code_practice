/**
 * Unbounded Knapsack Problem
 * 
 * Difficulty: 🟡 MEDIUM
 * Category: dp
 * LeetCode: https://leetcode.com/problems/coin-change-ii/
 * 
 * Time Complexity:
 * O(n * capacity) where n is the number of items
 * 
 * Space Complexity:
 * O(capacity) for the DP array
 */

/**
 * Unbounded Knapsack Solution
 * Given weights and values of n items, put these items in a knapsack of capacity W
 * to get the maximum total value in the knapsack, where you can put unlimited number of items.
 */
class UnboundedKnapsack {
    solve(input) {
        const { weights, values, capacity } = input;
        const n = weights.length;
        
        // Create a DP array to store maximum value for each capacity
        const dp = new Array(capacity + 1).fill(0);
        
        // Fill dp[] using bottom-up approach
        for (let w = 1; w <= capacity; w++) {
            for (let i = 0; i < n; i++) {
                if (weights[i] <= w) {
                    dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
                }
            }
        }
        
        return dp[capacity];
    }

    /**
     * Alternative solution using 2D DP array
     * This approach is more memory intensive but easier to understand
     */
    solveAlternative(input) {
        const { weights, values, capacity } = input;
        const n = weights.length;
        
        // Create 2D DP array
        const dp = Array(n + 1).fill(0)
            .map(() => Array(capacity + 1).fill(0));
        
        // Fill DP array
        for (let i = 1; i <= n; i++) {
            for (let w = 0; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(
                        dp[i - 1][w],
                        dp[i][w - weights[i - 1]] + values[i - 1]
                    );
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        
        return dp[n][capacity];
    }

    get testCases() {
        return [
            {
                description: "Basic case",
                input: {
                    weights: [1, 3, 4, 5],
                    values: [10, 40, 50, 70],
                    capacity: 8
                },
                expected: 110,
                category: "basic"
            },
            {
                description: "Edge case - zero capacity",
                input: {
                    weights: [1, 2, 3],
                    values: [10, 20, 30],
                    capacity: 0
                },
                expected: 0,
                category: "edge"
            },
            {
                description: "Edge case - single item",
                input: {
                    weights: [2],
                    values: [5],
                    capacity: 6
                },
                expected: 15,
                category: "edge"
            },
            {
                description: "Performance test",
                input: {
                    weights: Array(50).fill(0).map((_, i) => i + 1),
                    values: Array(50).fill(0).map((_, i) => (i + 1) * 10),
                    capacity: 100
                },
                expected: 1000,
                category: "performance",
                benchmark: {
                    name: "Large Input Test",
                    iterations: 100
                }
            }
        ];
    }
}

module.exports = UnboundedKnapsack;