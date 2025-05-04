const Solution = require('./coin-change-ii');

const testCases = [
    {
        description: 'Basic test case',
        input: {
            amount: 5,
            coins: [1, 2, 5]
        },
        expected: 4, // 4 ways to make 5: 1+1+1+1+1, 1+1+1+2, 1+2+2, 5
        category: 'basic'
    },
    {
        description: 'Edge case with no solution',
        input: {
            amount: 3,
            coins: [2]
        },
        expected: 0, // no way to make 3 with only 2s
        category: 'edge'
    },
    {
        description: 'Performance test case - large amount with many coins',
        input: {
            amount: 500,
            coins: [1, 2, 5, 10, 20, 50, 100, 200]
        },
        expected: 6295434, // Calculated using dynamic programming
        category: 'performance'
    },
    {
        description: 'Performance test case - very large amount with few coins',
        input: {
            amount: 1000,
            coins: [1, 2, 5]
        },
        expected: 100501, // Calculated using dynamic programming
        category: 'performance'
    }
];

module.exports = {
    Solution,
    testCases
};