const UnboundedKnapsack = require('./unbounded-knapsack');
const { runTests } = require('../../utils/test-runner');

// Create instance of the solution
const solution = new UnboundedKnapsack();

// Test cases
const testCases = [
    {
        input: {
            weights: [1, 3, 4, 5],
            values: [10, 40, 50, 70],
            capacity: 8
        },
        expected: 110,
        description: 'Basic case'
    },
    {
        input: {
            weights: [1, 2, 3],
            values: [10, 15, 40],
            capacity: 6
        },
        expected: 80,
        description: 'Multiple items of same type'
    },
    {
        input: {
            weights: [2, 3, 5],
            values: [1, 2, 3],
            capacity: 5
        },
        expected: 3,
        description: 'Best single item'
    },
    {
        input: {
            weights: [1],
            values: [10],
            capacity: 0
        },
        expected: 0,
        description: 'Zero capacity'
    },
    {
        input: {
            weights: Array(50).fill(0).map((_, i) => i + 1),
            values: Array(50).fill(0).map((_, i) => (i + 1) * 10),
            capacity: 100
        },
        expected: 1000,
        description: 'Performance test - Large input',
        performance: {
            iterations: 100,
            maxTime: 1000 // max 1000ms
        }
    },
    {
        input: {
            weights: Array(20).fill(1),
            values: Array(20).fill(0).map((_, i) => i + 1),
            capacity: 1000
        },
        expected: 20000,
        description: 'Performance test - Large capacity',
        performance: {
            iterations: 50,
            maxTime: 500 // max 500ms
        }
    }
];

// Run tests
runTests(solution, testCases);