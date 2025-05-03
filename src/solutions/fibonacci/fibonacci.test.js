const Fibonacci = require('./fibonacci');
const { runTests } = require('../../utils/test-runner');

// Create instance of the solution
const solution = new Fibonacci();

// Test cases
const testCases = [
    {
        input: 0,
        expected: 0,
        description: 'Base case: n = 0'
    },
    {
        input: 1,
        expected: 1,
        description: 'Base case: n = 1'
    },
    {
        input: 2,
        expected: 1,
        description: 'n = 2'
    },
    {
        input: 5,
        expected: 5,
        description: 'n = 5'
    },
    {
        input: 10,
        expected: 55,
        description: 'n = 10'
    }
];

// Run tests
runTests(solution, testCases); 